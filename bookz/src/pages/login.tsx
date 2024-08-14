import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { loginUser } from "../lib/thunks/loginThunk";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/loading";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");

    try {
      await dispatch(loginUser({ username, password })).unwrap();
      router.push("/profile");
    } catch (err) {
      setErrMsg("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200 my-10">
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      {errMsg && <p className="text-red-600 mb-4">{errMsg}</p>}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-1"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter Password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
        >
          Login
        </button>

        {status === "loading" && <Loading />}
        {status === "failed" && <p className="text-red-600 mt-4">{error}</p>}
      </form>

      <p className="mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
