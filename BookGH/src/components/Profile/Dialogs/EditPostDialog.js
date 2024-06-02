import "./dialog.css";
import { PostsContext } from "../../Context/PostsContext";
import { useContext } from "react";
import api from "../../../api/axios";
import { useState } from "react";

const EditPostDialog = ({ post, onClose }) => {
  const { setPosts, setUserPosts } = useContext(PostsContext);

  // State variables to hold the edited post data
  const [editedTitle, setEditedTitle] = useState(post ? post.title : "");
  const [editedImage, setEditedImage] = useState(null);
  const [editedDescription, setEditedDescription] = useState(
    post ? post.description : ""
  );
  const [editedCondition, setEditedCondition] = useState(
    post ? post.condition : "Used"
  );
  const [status, setStatus] = useState(post ? post.status : "available");

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setEditedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the updated post object
    const updatedPost = {
      title: editedTitle,
      image: editedImage ? editedImage : post.image,
      Condition: editedCondition,
      description: editedDescription,
      availability: status,
    };
    try {
      const response = await api.put(`/books/update/${post.id}`, updatedPost, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === response.data.id ? response.data : post
          )
        );
        setUserPosts((prevUserPosts) =>
          prevUserPosts.map((post) =>
            post.id === response.data.id ? response.data : post
          )
        );
        window.location.reload();
        onClose();
      } else {
        console.error("Error updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    // onUpdatePost(updatedPost);
  };

  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            value={editedCondition}
            onChange={(e) => setEditedCondition(e.target.value)}
            required
          >
            <option value="New">New</option>
            <option value="Like_New">Like New</option>
            <option value="Used">Used</option>
            <option value="Damaged">Damaged</option>
          </select>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="completed">Completed</option>
          </select>
          <div className="buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostDialog;
