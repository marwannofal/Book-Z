// pages/member/[id].tsx
import { GetServerSideProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../lib/store";
import { fetchUserPosts } from "../../../lib/slices/postSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/loading";

interface MemberProps {
  memberId: string;
}

const MemberDetails: React.FC<MemberProps> = ({ memberId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userPosts, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchUserPosts(memberId));
  }, [dispatch, memberId]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-4">Member Details</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Posts by this Member</h2>
        {userPosts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <ul>
            {userPosts.map((post) => (
              <li key={post.id} className="mb-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p>
                  <strong>Condition:</strong> {post.condition}
                </p>
                <p>
                  <strong>Description:</strong> {post.description}
                </p>
                <img
                  src={post.imagesUrl[0]}
                  alt={post.title}
                  className="w-full h-60 object-cover mt-2"
                />
                <p>
                  <strong>Phone:</strong> {post.phoneNumber}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => router.back()}
        className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700"
      >
        Go Back
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  return {
    props: {
      memberId: id,
    },
  };
};

export default MemberDetails;
