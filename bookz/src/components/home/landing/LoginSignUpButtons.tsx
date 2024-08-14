import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import { logout } from "../../../lib/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginSignUpButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useSelector((state: RootState) => state.login);

  if (!isAuthenticated) {
    return (
      <div className="self-center flex flex-row mt-20">
        <Link
          href="/login"
          className="min-w-28 inline-flex items-center justify-center bg-BookBlue text-white rounded-3xl shadow-md transition-all duration-300 ease-in-out text-lg font-medium h-12 px-6 py-2 mt-5 ml-2 hover:bg-[#003e7d] focus:outline-none focus:border-2 focus:border-blue-600 active:shadow-lg"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center bg-BookBlue text-white rounded-3xl shadow-md transition-all duration-300 ease-in-out text-lg font-medium h-12 px-6 py-2 mt-5 ml-2 hover:bg-[#003e7d] focus:outline-none focus:border-2 focus:border-blue-600 active:shadow-lg"
        >
          Sign Up
        </Link>
      </div>
    );
  } else {
    return (
      <div className="self-center flex flex-row mt-20">
        <Link
          href="/add"
          className="inline-flex items-center justify-center bg-BookBlue text-white rounded-3xl shadow-md transition-all duration-300 ease-in-out text-lg font-medium h-12 px-6 py-2 mt-5 ml-2 hover:bg-[#003e7d] focus:outline-none focus:border-2 focus:border-blue-600 active:shadow-lg"
        >
          New Post
        </Link>
        <button
          onClick={() => dispatch(logout())}
          className="inline-flex items-center justify-center bg-BookBlue text-white rounded-3xl shadow-md transition-all duration-300 ease-in-out text-lg font-medium h-12 px-6 py-2 mt-5 ml-2 hover:bg-[#003e7d] focus:outline-none focus:border-2 focus:border-blue-600 active:shadow-lg"
        >
          Logout
        </button>
      </div>
    );
  }
};

export default LoginSignUpButton;
