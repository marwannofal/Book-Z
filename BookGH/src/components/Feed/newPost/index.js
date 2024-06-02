import React, { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import UserContext from "../../Context/UserContext";
import api from "../../../api/axios";
import "./newPost.css";

const NewPost = ({ onClose, onAddPost }) => {
  // Destructuring userData to get the user directly
  const { user } = useContext(UserContext).userData;

  // State variables
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("Used");

  // Handler for title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handler for image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handler for condition change
  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formDataObject = {
      Title: title,
      Image: image,
      UserId: user.id,
      Condition: condition,
      Description: description,
    };

    // Append each field to formData
    Object.entries(formDataObject).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await api.post(`/users/books/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Book created successfully", response.data);
        onAddPost(response.data);
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error creating book:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }

    // Clearing form fields and closing modal
    setTitle("");
    setImage(null);
    setDescription("");
    setCondition("New");
    onClose();
  };

  return (
    <div className="new-post-modal">
      <div className="new-post-content">
        <div className="popup-header">
          <h2>Add New Post</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Book Name:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <label htmlFor="images">Upload Image:</label>
          <input
            type="file"
            id="images"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            value={condition}
            onChange={handleConditionChange}
            required
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
            <option value="Damaged">Damaged</option>
          </select>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
