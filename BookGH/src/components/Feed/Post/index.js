import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../Context/PostsContext";
import UserContext from "../../Context/UserContext";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./post.css";
import api from "../../../api/axios";

const serverBaseUrl = "http://localhost:5050";

const PostPage = () => {
  const { post, setPost } = useContext(PostsContext);
  const { userData } = useContext(UserContext);
  const { isAuthenticated } = userData;
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/books/${postId}`);
        // console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchPost();
  }, [postId, setPost]);

  const [isFullView, setIsFullView] = useState(false);

  const handleGoBack = (e) => {
    e.stopPropagation();
    window.history.back();
  };

  const handleToggleFullView = () => {
    setIsFullView(!isFullView);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <div className="postHead">
        <button onClick={(e) => handleGoBack(e)} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="postInfo">
          <Link to={`/users/${post.userId}`} className="user-link">
            <p>{post.userName}</p>
          </Link>
          <p>{post.postDate}</p>
        </div>
      </div>
      <div
        className={`image-container ${isFullView ? "full-view" : ""}`}
        onClick={handleToggleFullView}
      >
        <img src={`${serverBaseUrl}${post.imageUrl}`} alt={post.title} />
      </div>
      <h1>{post.title}</h1>
      <p>Condition: {post.condition}</p>
      <p>Description: {post.description}</p>
      {isAuthenticated ? (
        <a
          href={`https://wa.me/+962${post.phoneNumber}?text=Hello%20World`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn-whatsApp">Chat in WhatsApp</button>
        </a>
      ) : (
        <h2>Login to contact</h2>
      )}
    </div>
  );
};

export default PostPage;
