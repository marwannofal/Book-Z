import "./Footer.css";

const Footer = () => {
  const today = new Date();

  return (
    <div className=" footer">
      <p>
        &copy;{today.getFullYear()}
        <span> Book-Z </span>All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
