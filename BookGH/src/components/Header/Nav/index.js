import "./nav.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavData } from "./navData";

const Nav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      currentPath === "/login" ||
      currentPath === "/signup" ||
      currentPath === "/"
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentPath]);

  return (
    <div className="nav">
      <ul className={`navList ${isVisible ? "color" : ""}`}>
        {NavData.map((val, key) => {
          return (
            <li
              className="row"
              key={key}
              onClick={() => (window.location.pathname = val.link)}
            >
              {/* <div id="icon">{val.icon} </div> */}
              {/* <div id="title"></div> */}
              {val.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Nav;
