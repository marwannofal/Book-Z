import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NewPost from "../Feed/newPost";
import ResetPasswordDialog from "./Dialogs/ResetPasswordDialog";
import EditUserInfoDialog from "./Dialogs/EditUserInfoDialog";
import EditPostDialog from "./Dialogs/EditPostDialog";
import { FaEdit, FaPlus, FaKey, FaTrash } from "react-icons/fa";
import { PostsContext } from "../Context/PostsContext";
import UserContext from "../Context/UserContext";
import Logout from "../Login&SignUp/Logout/Logout";
import defaultPhoto from "../../assets/default.png";
import api from "../../api/axios";
import "./profile.css";

const Profile = () => {
  const serverBaseUrl = "http://localhost:5050";

  const { userData, setUserData } = useContext(UserContext);
  const { isAuthenticated, user } = userData;

  const { setPosts, userPosts, setUserPosts } = useContext(PostsContext);
  const [profilePhoto, setProfilePhoto] = useState(defaultPhoto);

  useEffect(() => {
    // Check if the user is authenticated
    if (!!user && !!user.image) {
      setProfilePhoto(user.image);
    }
  }, [user]);

  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditUserInfoDialog, setShowEditUserInfoDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Posts");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Filtered posts based on the selected option
  const filteredPosts =
    selectedOption === "Posts"
      ? userPosts.filter((post) => post.availability === "Available")
      : userPosts.filter((post) => post.availability === "completed");

  const openDialog = (dialog, post) => {
    switch (dialog) {
      case "newPost":
        setShowNewPostDialog(true);
        break;
      case "editUserInfo":
        setShowEditUserInfoDialog(true);
        break;
      case "resetPassword":
        setShowResetPasswordDialog(true);
        break;
      case "editPost":
        setShowEditPostDialog(true);
        setEditingPost(post);
        break;
      default:
        break;
    }
  };

  const closeDialog = (dialog) => {
    switch (dialog) {
      case "newPost":
        setShowNewPostDialog(false);
        break;
      case "editUserInfo":
        setShowEditUserInfoDialog(false);
        break;
      case "resetPassword":
        setShowResetPasswordDialog(false);
        break;
      case "editPost":
        setShowEditPostDialog(false);
        break;
      default:
        break;
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await api.delete(`/books/delete/${postId}`, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 204) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        setUserPosts((prevUserPosts) =>
          prevUserPosts.filter((post) => post.id !== postId)
        );
        console.log("Post deleted successfully");
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const addNewPost = async (newPost) => {
    setUserPosts((prevUserPosts) => [...prevUserPosts, newPost]);
    setShowNewPostDialog(false);
  };

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await api.post(
          `/users/uploaduserphoto/${user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200 || response.status === 201) {
          const newProfilePhotoURL = response.data.imageUrl;
          setProfilePhoto(newProfilePhotoURL);
          try {
            const response = await api.get(`/users/withall/${user.id}`);
            setUserData({
              ...userData,
              user: { ...userData.user, image: response.data.image },
            });
          } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
          }
          // localStorage.setItem("profilePhoto", newProfilePhotoURL);
        } else {
          console.error("Error uploading photo:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="profile">
          <div className="profile-info">
            <div className="profile-photo">
              <img src={`${serverBaseUrl}${profilePhoto}`} alt="Profile" />
              <input
                type="file"
                accept="image/*"
                id="upload-photo"
                style={{ display: "none" }}
                onChange={handleProfilePhotoChange}
              />
              <label
                htmlFor="upload-photo"
                style={{
                  color: "#64748b",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                <FaEdit className="edit-icon" /> Upload New Photo
              </label>
            </div>
            <div className="info">
              <h2>{user.username}</h2>
              <p>Phone: {user.phoneNumber}</p>
              <p>Email: {user.email}</p>
              <p>Rating: {user.averageRating} / 5</p>
              <div className="buttons">
                <button onClick={() => openDialog("editUserInfo")}>
                  <FaEdit /> Edit Your Info
                </button>
                <button onClick={() => openDialog("resetPassword")}>
                  <FaKey /> Reset Password
                </button>
                <Logout />
              </div>
            </div>
          </div>
          <hr />
          {showEditPostDialog && (
            <EditPostDialog
              post={editingPost}
              onClose={() => closeDialog("editPost")}
            />
          )}
          {showNewPostDialog && (
            <NewPost
              onClose={() => closeDialog("newPost")}
              onAddPost={addNewPost}
            />
          )}
          {showEditUserInfoDialog && (
            <EditUserInfoDialog onClose={() => closeDialog("editUserInfo")} />
          )}
          {showResetPasswordDialog && (
            <ResetPasswordDialog onClose={() => closeDialog("resetPassword")} />
          )}
          <div className="container">
            <div className="post-header">
              <div className="select-container" ref={dropdownRef}>
                <div className="select-selected" onClick={() => setOpen(!open)}>
                  {selectedOption}
                  <div className="select-arrow"></div> {/* Arrow icon */}
                </div>
                {open && (
                  <div className="select-dropdown ">
                    <div
                      className="select-option"
                      onClick={() => {
                        setSelectedOption("Posts");
                        setOpen(!open);
                      }}
                    >
                      Posts
                    </div>
                    <div
                      className="select-option"
                      onClick={() => {
                        setSelectedOption("Archive");
                        setOpen(!open);
                      }}
                    >
                      Archive
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => openDialog("newPost")}>
                <FaPlus /> Add New Post
              </button>
            </div>
            <div className="posts">
              {/* Display filtered posts based on selected option */}
              {filteredPosts.length === 0 ? (
                <p>
                  {selectedOption === "Posts"
                    ? "You haven't added any available books yet."
                    : "No completed books found in archive."}
                </p>
              ) : (
                filteredPosts.map((post) => (
                  <div className="card" key={post.id}>
                    <Link to={`/books/${post.id}`} className="card-link">
                      <img
                        src={`${serverBaseUrl}${post.imageUrl}`}
                        alt={post.title}
                      />
                    </Link>
                    <div className="card-content">
                      <div className="post-buttons">
                        <button onClick={() => openDialog("editPost", post)}>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeletePost(post.id)}>
                          <FaTrash />
                        </button>
                      </div>
                      <h3>{post.title}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="profile">
          <div className="profile-info">
            <div className="profile-photo">
              <img src={`${profilePhoto}`} alt="Profile" />
            </div>
            <div className="info">
              <h3 className="gust">
                <p> You need to be logged in to view this page.</p>&nbsp;
                <Link className="link" to="/login">
                  Login
                </Link>
                &nbsp;Or&nbsp;
                <Link className="link" to="/signup">
                  Sign Up
                </Link>
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
