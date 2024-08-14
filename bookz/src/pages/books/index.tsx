import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Loading from "@/components/loading";
import Image from "next/image";

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

const books = [
  {
    id: 1,
    title: "Book Title 1",
    category: "Fantasy",
    condition: "Used",
    description:
      "A thrilling fantasy novel that takes you on a journey through magical lands.",
    phoneNumber: "+1234567890",
    images: [
      "/assets/exchangePP.jpg",
      "/assets/exchange2.jpg",
      "/assets/exchangePP.jpg",
      "/assets/exchange2.jpg",
    ],
  },
  {
    id: 2,
    title: "Book Title 2",
    category: "ScienceFiction",
    condition: "Like New",
    description:
      "An intriguing science fiction story that explores futuristic technology and adventures.",
    phoneNumber: "+0987654321",
    images: [
      "/assets/exchangePP.jpg",
      "/assets/exchangePP.jpg",
      "/assets/exchangePP.jpg",
      "/assets/exchangePP.jpg",
    ],
  },
  // Add more books here
];

const baseURL = "http://localhost:5050";

const BooksPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedCondition, setSelectedCondition] =
    useState<string>("All Conditions");
  const { posts, status, error } = useSelector(
    (state: RootState) => state.fetchPosts
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredBooks = posts.filter((book) => {
    const matchesCategory = selectedCategory
      ? book.category === selectedCategory
      : true;
    const matchesCondition =
      selectedCondition === "All Conditions"
        ? true
        : book.condition === selectedCondition;
    const matchesSearchTerm = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesCondition && matchesSearchTerm;
  });

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!posts) {
    return <div>there is No posts </div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile: Categories Combo Box and condition*/}
      {isMobile && (
        <>
          <div className="w-full bg-gray-100 p-4 border-b border-gray-300 md:hidden">
            <label
              htmlFor="category"
              className="block text-xl font-semibold mb-2"
            >
              Select Category :
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label
              htmlFor="condition"
              className="block text-lg font-semibold mb-2 mt-1"
            >
              Condition :
            </label>
            <select
              id="condition"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Conditions">All Conditions</option>
              <option value="Used">Used</option>
              <option value="Like New">Like New</option>
              <option value="New">New</option>
            </select>
          </div>
        </>
      )}

      {/* Left Sidebar: Categories */}
      {!isMobile && (
        <div className="w-full md:w-1/6 bg-gray-100 p-4 border-r border-b border-gray-300 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li
              key="all"
              className={`cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-200 ${
                selectedCategory === "" ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedCategory("")}
            >
              All Categories
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-200 ${
                  selectedCategory === category ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Center: Books Section */}
      <div className="w-full md:w-2/3 p-4">
        {!isMobile && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div className="flex flex-col gap-4 ">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white hover:bg-slate-100 hover:shadow-sm rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left Side: Images */}
              <div className="w-full md:w-1/3 flex flex-col relative">
                {/* Large Image with Navigation */}
                <div className="relative">
                  <Link href={`/book/${book.id}`} key={book.id} passHref>
                  <Image
                    src={book.images?.[currentImageIndex]?.url ? `${baseURL}${book.images[currentImageIndex].url}` : '/path/to/default/image.jpg'}
                    width={250}
                    height={400}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                  />

                  </Link>
                  {/* Navigation Buttons */}
                  {/* <button
                    onClick={handlePrevClick}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={handleNextClick}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                    {">"}
                  </button> */}
                </div>
                <Link href={`/book/${book.id}`} key={book.id} passHref>
                  {/* Thumbnails */}
                  <div className="flex flex-row gap-2 mt-2 p-2">
                    {book.images.slice(1).map((image, index) => (
                      <Image
                        key={index}
                        // src={image}
                        width={250}
                        height={400}
                        src={`${baseURL}${image.url}`}
                        alt={`${book.title} - Thumbnail ${index + 1}`}
                        className="w-1/3 h-32 object-cover rounded-lg hover:opacity-75 transition duration-300"
                      />
                    ))}
                  </div>
                </Link>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                <Link href={`/book/${book.id}`} key={book.id} passHref>
                  <div>
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-gray-500">{book.category}</p>
                    <p className="mt-2 text-gray-700">{book.description}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Condition:{" "}
                      <span className="font-medium">{book.condition}</span>
                    </p>
                  </div>
                  <div className="h-48"></div>
                </Link>
                <div className="mt-4">
                  <a
                    href={`https://wa.me/${book.phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-center hover:bg-green-600 transition duration-300"
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
                        clipRule="evenodd"
                      />
                    </svg>
                    Contact on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar: Add New Post Poster */}
      <div className="md:w-1/4 p-2">
        {!isMobile && (
          <>
            <div className="mb-6">
              <label
                htmlFor="condition"
                className="block text-lg font-semibold mb-2"
              ></label>
              <select
                id="condition"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Conditions">All Conditions</option>
                <option value="Used">Used</option>
                <option value="Like_New">Like New</option>
                <option value="New">New</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>

            <div className="w-full border-gray-300 flex flex-col items-center text-center md:mt-0">
              <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                <p className="text-lg font-semibold mb-2">Create a New Post</p>
                <p className="text-sm mb-4">
                  Share your latest book post with the community.
                </p>
                <Link href="/add">
                  <p className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                    Create New Post
                  </p>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
