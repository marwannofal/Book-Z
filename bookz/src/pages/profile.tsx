import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { RootState, AppDispatch } from "../lib/store";
import { logout } from "../lib/slices/loginSlice";
import { fetchUserPosts } from "../lib/thunks/fetchUserPostsThunk";
import { uploadProfilePhoto } from "../lib/thunks/uploadProfilePhotoThunk";

const baseURL = "http://localhost:5050";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.login
  );

  const { fetchedUser } = useSelector(
    (state: RootState) => state.fetchUserPosts
  );

  const { profilePhoto, status } = useSelector(
    (state: RootState) => state.profile
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePhotoUpload = () => {
    if (selectedFile && user?.id) {
      dispatch(uploadProfilePhoto({ userId: user.id, file: selectedFile }));
      setSelectedFile(null);
    }
  };

  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserPosts(user.id + "")); // Fetch user books/posts
    }
  }, [dispatch, user?.id]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // const handleResetPassword = () => {
  //   if (user) {
  //     dispatch(setPassword(newPassword));
  //     setNewPassword("");
  //   }
  // };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Link href="/login" className="underline">
          <p className="text-xl text-gray-600">
            Please <span className="text-blue-500">login</span> to view your
            profile.
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg mt-10">
        {/* Profile Header */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex">
            <div className="flex flex-col">
              <img
                src={
                  profilePhoto || fetchedUser?.image
                    ? `http://localhost:5050${
                        profilePhoto || fetchedUser?.image
                      }`
                    : "/default-avatar.png"
                }
                alt={fetchedUser?.username}
                className="w-28 h-28 rounded-full object-cover ml-2.5"
              />
              <input
                type="file"
                accept="image/*"
                id="upload-photo"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label
                htmlFor="upload-photo"
                style={{
                  color: "#64748b",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                className="pl-2"
              >
                Upload New Photo
              </label>
              <button
                onClick={handlePhotoUpload}
                disabled={status === "loading"}
                className={`mt-2 text-sm text-blue-500 ${
                  selectedFile === null ? "hidden" : ""
                }`}
              >
                {status === "loading" ? "Uploading..." : "Confirm Upload"}
              </button>
            </div>
            <div className="ml-6 mt-3">
              <h1 className="text-3xl font-semibold mb-2">
                {fetchedUser?.username}
              </h1>
              <p className="text-gray-600">{fetchedUser?.email}</p>
              {fetchedUser?.phoneNumber && (
                <p className="text-gray-600">{fetchedUser?.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="ml-auto">
            <span className="text-yellow-500 text-lg font-bold">
              ⭐ {fetchedUser?.averageRating?.toFixed(1)}
            </span>
            <p className="text-gray-500">
              {fetchedUser?.ratings?.length} Ratings
            </p>
          </div>
        </div>
        <hr className="mt-10" />

        {/* About Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">
            About {fetchedUser?.username}
          </h2>
          <p className="text-gray-700 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            ullamcorper, neque sit amet dignissim tristique, purus dui lacinia
            eros, eget tincidunt mauris nulla sit amet lorem.
          </p>
        </div>

        {/* Books Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {fetchedUser?.books.map((book) => (
              <div
                key={book.id}
                className="bg-gray-50 shadow-sm rounded-lg overflow-hidden"
              >
                <img
                  src={book.images[0] || "/default-book.png"}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  {/* <p className="text-gray-600 mt-2 text-sm">
                    {book.description}
                  </p> */}
                  {/* <p className="text-gray-400 mt-2 text-xs">
                    Posted on
                    {new Date(book.createdAt).toLocaleDateString()} 
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
