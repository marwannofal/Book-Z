import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../lib/store";
import { signupUser } from "../lib/thunks/signupThunk";

const USER_REGEX = /^[a-zA-Z\u0600-\u06FF][a-zA-Z0-9\u0600-\u06FF-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX = /^[0-9]{10,15}$/;

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  // Validate username
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  // Validate email
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // Validate password and matching password
  useEffect(() => {
    const isPwdValid = PWD_REGEX.test(password);
    setValidPassword(isPwdValid);
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  // Validate phone number
  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");

    if (
      !validUsername ||
      !validEmail ||
      !validPassword ||
      !validMatch ||
      !validPhone
    ) {
      setErrMsg("Please fill in all fields correctly.");
      return;
    }

    try {
      await dispatch(
        signupUser({
          username, // Corrected the casing to match the thunk structure
          email,
          phoneNumber,
          password,
        })
      ).unwrap();
      setSuccess(true);
    } catch (err) {
      setErrMsg("Signup failed. Please try again.");
    }
  };

  if (success) {
    router.push("/login");
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200 my-6">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

      {errMsg && <p className="text-red-600 mb-4">{errMsg}</p>}

      <form onSubmit={handleSignup}>
        {/* Username Input */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-1"
          >
            Username:{" "}
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
          {!validUsername && username && (
            <p className="text-red-500 text-sm">
              4 to 24 characters. Must begin with a letter. Letters, numbers,
              underscores, hyphens allowed.
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email:{" "}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter Email"
            required
          />
          {!validEmail && email && (
            <p className="text-red-500 text-sm">
              Please enter a valid email address in the format
              'example@example.com'.
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-1"
          >
            Password:{" "}
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
          {!validPassword && password && (
            <p className="text-red-500 text-sm">
              8 to 24 characters. Must include uppercase and lowercase letters,
              a number, and a special character.
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-semibold mb-1"
          >
            Confirm Password:{" "}
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Confirm Password"
            required
          />
          {!validMatch && confirmPassword && (
            <p className="text-red-500 text-sm">Must match the password.</p>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label
            htmlFor="phone-number"
            className="block text-sm font-semibold mb-1"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Enter Phone Number"
            required
          />
          {!validPhone && phoneNumber && (
            <p className="text-red-500 text-sm">
              Please enter a valid phone number with 10 to 15 digits.
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 ${
            !validUsername ||
            !validEmail ||
            !validPassword ||
            !validMatch ||
            !validPhone
              ? "disabled bg-slate-600 cursor-not-allowed"
              : ""
          }`}
          disabled={
            !validUsername ||
            !validEmail ||
            !validPassword ||
            !validMatch ||
            !validPhone
          }
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignUpPage;
