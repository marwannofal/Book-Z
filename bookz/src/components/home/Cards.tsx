// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../../lib/store";
// import { fetchPosts } from "../../lib/thunks/fetchPostsThunk";
// import Link from "next/link";
// import Image from "next/image";

// const Cards = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { posts, status } = useSelector((state: RootState) => state.fetchPosts);

//   const baseURL = "http://localhost:5050";

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchPosts());
//     }
//   }, [dispatch, status]);
  
//   const postsToShow = posts.slice(0, 6);

//   return (
//     <div className="flex justify-center px-4 lg:px-0">
//       <div className="w-full max-w-screen-lg mb-16 fade-in opacity-0 transition-opacity duration-600">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           Posts
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {postsToShow.map((post) => (
//             <Link href={`/book/${post.id}`} key={post.id} passHref>
//               <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
//                 <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                   <div className="text-center text-white p-4">
//                     <h3 className="text-xl font-semibold">{post.title}</h3>
//                     {/* Add any additional text or information you want to display on hover */}
//                   </div>
//                 </div>
//                 <Image
//                   src={`${baseURL}${post.images[0].url}`}
//                   alt={post.title}
//                   width={400}
//                   height={250}
//                   className="object-cover w-full h-72"
//                 />
//               </div>
//             </Link>
//           ))}
//         </div>
//         {posts.length >= 6 && (
//           <div className="mt-8 flex justify-center">
//             <Link href="/books/" passHref>
//               <div className="py-4 text-center w-screen px-6 rounded-lg border-2  text-blue-500 font-semibold text-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 cursor-pointer">
//                 Show More
//               </div>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cards;


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { fetchPosts } from "../../lib/thunks/fetchPostsThunk";
import Link from "next/link";
import Image from "next/image";

const Cards = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, status } = useSelector((state: RootState) => state.fetchPosts);

  const baseURL = "http://localhost:5050";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);
  
  const postsToShow = posts.slice(0, 6);

  return (
    <div className="flex justify-center px-4 lg:px-0">
      <div className="w-full max-w-screen-lg mb-16 fade-in opacity-0 transition-opacity duration-600">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsToShow.map((post) => (
            <Link href={`/book/${post.id}`} key={post.id} passHref>
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    {/* Add any additional text or information you want to display on hover */}
                  </div>
                </div>
                <Image
                  src={post.images?.[0]?.url ? `${baseURL}${post.images[0].url}` : '/path/to/default/image.jpg'}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-72"
                />
              </div>
            </Link>
          ))}
        </div>
        {posts.length >= 6 && (
          <div className="mt-8 flex justify-center">
            <Link href="/books/" passHref>
              <div className="py-4 text-center w-screen px-6 rounded-lg border-2  text-blue-500 font-semibold text-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 cursor-pointer">
                Show More
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
