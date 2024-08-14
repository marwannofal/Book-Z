import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const Custom404: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="Home description" />
      </Head>
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-4">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <p className="text-lg text-gray-500 mb-8">
        It might have been moved or deleted.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => router.push("/books")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go to Books
        </button>
        <Link href="/">
          <p className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">
            Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
