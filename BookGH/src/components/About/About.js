import React from "react";
import image1 from "../../assets/exchangePP.jpg";
import image2 from "../../assets/exchange2.jpg";
import "./about.css";

const About = () => {
  return (
    <div className="container-a">
      <h1 className="heading">About Us</h1>
      <p className="description">
        Student Book Exchange: It’s a website where students first create a
        profile for themselves or they can use it as guests. Then, they post the
        books and summaries they have and the books and summaries they want. If
        another student has the books or summaries that the first student wants,
        they can exchange them. The website will have categories for the books
        and summaries and classifications based on the department each book or
        summary follows. Each student will have a rating based on their
        exchange of feedback.
      </p>
      <div className="imageContainer">
        <img src={image1} alt="exChange" className="image" />
        <img src={image2} alt="exChange" className="image" />
      </div>
    </div>
  );
};

export default About;
