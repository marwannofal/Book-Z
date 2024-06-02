import "./Landing.css";
import { Link } from "react-router-dom";
import LandingTitle from "./LandingTitle";
import Footer from "../Footer";

const Landing = () => {
  return (
    <div className="landing ">
      <div className="container">
        <div className="text">
          <h1>Hello There</h1>
          <LandingTitle />
        </div>
        <div className="buttons">
          <Link to="/login" className="primary-button">
            Login
          </Link>
          <Link to="/signup" className="primary-button">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
