import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import defaultPhoto from "../../assets/default.png";
import UserContext from "../Context/UserContext";
import { PostsContext } from "../Context/PostsContext";
import "./UserProfile.css";
import api from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RateDialog from "./Dialogs/RatingDialog";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { userData } = useContext(UserContext);
  const { post } = useContext(PostsContext);
  const { isAuthenticated, user } = userData;
  const [profilePhoto, setProfilePhoto] = useState(defaultPhoto);
  const serverBaseUrl = "http://localhost:5050";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setCurrentUser(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId, triggerFetch]);

  useEffect(() => {
    if (currentUser && currentUser.image) {
      setProfilePhoto(currentUser.image);
    }
  }, [currentUser]);

  const handleRateUser = async (ratingData) => {
    // console.log(ratingData);
    try {
      await api.post(`/users/ratings/${userId}`, ratingData);
      setIsRateDialogOpen(false);
      setTriggerFetch((prev) => !prev);
      setCurrentUser((prev) => ({
        ...prev,
        averageRating: currentUser.averageRating,
      }));
      alert("Rating successfully");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }
  const handleGoBack = (e) => {
    e.stopPropagation();
    window.history.back();
  };

  return (
    <div className="profile-v">
      <button onClick={(e) => handleGoBack(e)} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="profile-info">
        <div className="profile-photo">
          <img src={`${serverBaseUrl}${profilePhoto}`} alt="Profile" />
        </div>
        <div className="info">
          <h2>{currentUser.username}</h2>
          <p>Phone: {currentUser.phoneNumber}</p>
          <p>Email: {currentUser.email}</p>
          <p>Rating: {currentUser.averageRating} / 5</p>
          {isAuthenticated && user.id !== post.userId ? (
            <div className="buttons">
              <button onClick={() => setIsRateDialogOpen(true)}>
                Rate <span>{currentUser.username}</span>
              </button>
            </div>
          ) : (
            <div>
              {" "}
              Login to Rate <span>{currentUser.username}</span>
            </div>
          )}
        </div>
      </div>
      <RateDialog
        isOpen={isRateDialogOpen}
        onRequestClose={() => setIsRateDialogOpen(false)}
        onSubmit={handleRateUser}
      />
    </div>
  );
};

export default UserProfile;
