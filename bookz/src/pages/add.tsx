import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/store";
import { createPost } from "../lib/thunks/createPostThunk";
import { FormDataType } from "../types/FormData";

const categories = [
  "Fantasy",
  "ScienceFiction",
  "HistoricalFiction",
  "LiteraryFiction",
  "Mystery",
  "Thriller",
  "AdventureFiction",
  "Horror",
  "ContemporaryFantasy",
  "Memoir",
  "Classics",
  "ChildrensLiterature",
  "ShortStory",
  "YoungAdult",
  "Biography",
  "History",
  "GraphicNovel",
  "CrimeFiction",
  "ContemporaryRomance",
  "WomensFiction",
  "Dystopian",
  "ComedyHorror",
  "Romance",
  "DetectiveAndMystery",
];

const conditions = ["New", "Like_New", "Used", "Damaged"];

const AddPostPage: React.FC = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.login
  );

  const [formData, setFormData] = useState<FormDataType>({
    userId: user?.id.toString() || "",
    username: user?.username || "",
    title: "",
    condition: "Used",
    description: "",
    availability: "Available",
    category: "Fantasy",
    images: [],
    phoneNumber: user?.phoneNumber || "",
  });
  console.log(formData);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // For displaying image previews

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prevData) => ({ ...prevData, images: files }));

      // Generate previews
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    // Append form data to FormData object
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];

      if (key === "images") {
        // Append each file in the images array
        (value as File[]).forEach((file) => data.append("images", file));
      } else if (typeof value === "string") {
        // Append string values
        data.append(key, value);
      }
    });

    try {
      await dispatch(createPost(data)).unwrap();
      router.push("/books"); // Redirect to posts page (adjust path if needed)
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200 my-6">
      <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="condition"
            className="block text-gray-700 font-semibold mb-2"
          >
            Condition
          </label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 font-semibold mb-2"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 grid grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-32 h-32 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`${
            isAuthenticated ? "" : "disabled"
          } bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300`}
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;
