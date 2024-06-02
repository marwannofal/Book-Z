import "./Feed.css";
import { PostsContext } from "../Context/PostsContext";
import NewPost from "./newPost";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import { Link } from "react-router-dom";

const serverBaseUrl = "http://localhost:5050";

const Feed = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const { userData } = useContext(UserContext);
  const { isAuthenticated } = userData;

  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isAuthenticated);
  }, [isAuthenticated]);

  const openNewPostDialog = () => {
    setShowNewPostDialog(true);
  };

  const closeNewPostDialog = () => {
    setShowNewPostDialog(false);
  };

  //filter posts by available or completed posts
  const filteredPostsBy = Array.isArray(posts)
    ? posts.filter((post) => post.availability === "Available")
    : [];

  // Filter posts based on the search term
  const filteredPosts = searchTerm
    ? filteredPostsBy.filter((post) =>
        post.title
          ? post.title.toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    : filteredPostsBy;

  const addNewPost = async (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setShowNewPostDialog(false);
  };

  return (
    <div className="content">
      <div className="container">
        <div className="post-header">
          <h3>Posts</h3>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="By Book Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={`btn-add ${isVisible ? "" : "hide"}`}
            onClick={openNewPostDialog}
          >
            <FaPlus /> <span className="new-post-text">New Post</span>
          </button>
        </div>
        {showNewPostDialog && (
          <NewPost onClose={closeNewPostDialog} onAddPost={addNewPost} />
        )}
        <div className="posts">
          {filteredPosts.map((post) => (
            <Link to={`/books/${post.id}`} key={post.id} className="card-link">
              <div className="card">
                <img src={`${serverBaseUrl}${post.image}`} alt={post.title} />
                <div className="card-content">
                  <h3>{post.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
