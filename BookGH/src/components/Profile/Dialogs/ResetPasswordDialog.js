import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./dialog.css";

const ResetPasswordDialog = ({ onClose }) => {
  const { userData, resetPassword } = useContext(UserContext);
  const { user } = userData;

  // const [currentPassword, setCurrentPassword] = useState("");

  //use state for PWd state
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //use state for Match Pwd state
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  //use effect for check validation on the pwd and matchPwd when change
  useEffect(() => {
    //here for the pwd
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    //here for the pwdMatch
    const match = pwd === matchPwd;
    setValidMatch(match);
    // eslint-disable-next-line
  }, [pwd, matchPwd]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // if (name === "currentPassword") setCurrentPassword(value);
  //   if (name === "newPassword") setPwd(value);
  //   else if (name === "confirmPassword") setMatchPwd(value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (currentPassword !== user.password) {
    //   alert("Current password is incorrect");
    //   return;
    // }
    if (validPwd && validMatch) {
      resetPassword(pwd, user.username);
      alert("Password changed successfully");
      onClose();
    }
  };

  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="current_password">Current Password:</label>
          <input
            type="password"
            id="current_password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            className="form-control"
            required
            placeholder="Enter current password"
          /> */}
          <label htmlFor="password">
            Password:{"  "}
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="form-control"
            placeholder="Enter password"
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <span>
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>{" "}
            8 to 24 characters. <br />
            Must include uppercase and lowercase letter, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
          <label htmlFor="confirm_pwd">
            Confirm Password:{"  "}
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch && matchPwd ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="form-control"
            placeholder="Confirm password"
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <span>
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>{" "}
            Must match the password input field.
          </p>
          <button type="submit">Reset Password</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordDialog;
