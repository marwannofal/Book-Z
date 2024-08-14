import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { fetchPost } from "../../lib/thunks/fetchPostThunk";
import Image from "next/image";
import Loading from "@/components/loading";
import Modal from "@/components/Modal";

const baseURL = "http://localhost:5050";

const PostPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;
  const { post, status, error } = useSelector((state: RootState) => state.post);
  const { isAuthenticated } = useSelector((state: RootState) => state.login);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchPost(id as string));
    }
  }, [id, dispatch]);

  const handlePrevClick = () => {
    if (post && post.imageUrls.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? post.imageUrls.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextClick = () => {
    if (post && post.imageUrls.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === post.imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleGoBack = () => {
    router.back();
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <div className="text-gray-500">No post found</div>;
  }

  const book = post;
  const imgSrc = `${baseURL}${book.imageUrls[currentImageIndex]}`;

  return (
    <div className="mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-lg border border-gray-200 m-2">
      {/* Back Button */}
      <div className="flex mb-3">
        <button
          onClick={handleGoBack}
          className=" bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition duration-300"
        >
          &lt; Back
        </button>
        <p className="text-gray-600 pl-4 ">{book.userName}</p>
      </div>
      <div className="flex flex-col md:flex-col gap-6">
        {/* Left Side: Images */}
        <div className="  relative">
          <div
            className="relative mb-4 w-full cursor-pointer"
            // onClick={handleImageClick}
          >
            {book.imageUrls.length > 0 && (
              <Image
                src={imgSrc}
                className="relative mb-4 w-full cursor-pointer object-cover rounded-lg max-h-96"
                onClick={handleImageClick}
                alt={book.title}
                layout="responsive"
                width={300}
                height={400}
                // className="object-cover rounded-lg max-h-96 "
              />
            )}
            {/* Navigation Buttons */}
            <button
              onClick={handlePrevClick}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
            >
              &lt;
            </button>
            <button
              onClick={handleNextClick}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
            >
              &gt;
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-2">
            {book.imageUrls.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer p-1 border-2 rounded-md ${
                  index === currentImageIndex
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={`${baseURL}${image}`}
                  alt={`${book.title} - Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover rounded-md max-h-20"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-2/3">
          <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
          <p className="text-gray-600 mb-2">{book.category}</p>
          <p className="text-gray-800 mb-4">{book.description}</p>
          <p className="text-sm text-gray-600">
            Condition: <span className="font-medium">{book.condition}</span>
          </p>
          <a
            href={`https://wa.me/${book.phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-5/12 bg-blue-500 mt-2 text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-center hover:bg-green-600 transition duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.001 2.002c-5.524 0-10 4.478-10 10.002 0 1.77.46 3.48 1.337 4.985l-1.438 5.25 5.331-1.399a9.935 9.935 0 004.77 1.217c5.523 0 9.999-4.477 9.999-10.002s-4.476-10.002-10-10.002zm-.032 18.003c-1.484 0-2.934-.408-4.192-1.165l-.299-.18-3.181.835.847-3.096-.194-.308c-.84-1.34-1.285-2.895-1.285-4.476 0-4.48 3.654-8.134 8.135-8.134 4.48 0 8.134 3.655 8.134 8.135s-3.654 8.135-8.135 8.135zm4.471-6.48c-.24-.12-1.426-.706-1.647-.787-.222-.081-.383-.12-.545.12-.161.239-.626.787-.767.948-.142.161-.283.18-.523.06-.24-.121-1.015-.374-1.932-1.19-.715-.637-1.197-1.427-1.337-1.666-.141-.239-.015-.368.106-.488.109-.109.24-.283.361-.425.12-.14.161-.239.241-.398.081-.159.04-.299-.02-.418-.061-.119-.545-1.302-.746-1.784-.2-.481-.401-.421-.545-.421h-.46c-.122 0-.32.04-.49.239-.16.201-.642.625-.642 1.523s.657 1.762.748 1.883c.091.12 1.294 1.98 3.137 2.775.439.19.781.303 1.047.387.44.14.84.12 1.159.073.353-.053 1.086-.444 1.239-.872.153-.428.153-.797.107-.873-.046-.076-.182-.12-.38-.199z"
              />
            </svg>
            Contact on WhatsApp
          </a>
        </div>
      </div>
      {/* Modal for Full View */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        imgSrc={imgSrc}
        alt={book.title}
      />
    </div>
  );
};

export default PostPage;
