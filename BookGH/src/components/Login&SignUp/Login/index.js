import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import "./Login.css";
import Footer from "../../Footer";
import UserContext from "../../Context/UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const UsernameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [Username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //use state for check visibility of the className
  const [isVisible, setIsVisible] = useState(false);

  //use effect for motion and focus
  useEffect(() => {
    if (currentPath === "/login") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentPath]);

  useEffect(() => {
    setErrMsg("");
  }, [Username, pwd]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/account/login", {
        Username,
        Password: pwd,
      });

      if (response.status === 200) {
        const user = response.data;
        login(user);
        navigate("/home");
      } else {
        setErrMsg("Login failed");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrMsg(error.response.data.message || "Login failed");
      } else {
        setErrMsg("No server response");
      }
    }
    errRef.current.focus();
  };

  return (
    <div className={`landing ${isVisible ? "background-l" : ""}`}>
      <section className={`container-l ${isVisible ? "show" : ""}`}>
        <h2>Login</h2>
        <p
          ref={errRef}
          className={errMsg ? "errMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="Username">Username:</label>
            <input
              type="text"
              id="Username"
              ref={UsernameRef}
              onChange={(e) => setUsername(e.target.value)}
              value={Username}
              className="form-control"
              placeholder="Enter Username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              className="form-control"
              placeholder="Enter Password"
              required
            />
          </div>
          <button className="btn btn-primary">Login</button>
          <p>
            Didn't have an account?{" "}
            <Link to="/signup" className="link">
              SignUp
            </Link>
          </p>
        </form>
      </section>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
