import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "./logo-removebg-preview.png";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";

function Footer() {
  return (
    <footer>
      <div className="upper">
        {/* <Link to="/">
          <img src={logo} alt="" />
        </Link> */}
        <img src={logo} alt="" />
      </div>
      <div className="icons">
        <a
          href="https://twitter.com/sikehish"
          target="blank"
          rel="noopener noreferrer"
        >
          <AiOutlineTwitter />
        </a>
        <a
          href="https://instagram.com/sikehish"
          target="blank"
          rel="noopener noreferrer"
        >
          <AiOutlineInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/hisham-akmal-ba7455226/"
          target="blank"
          rel="noopener noreferrer"
        >
          <AiOutlineLinkedin />
        </a>
        <a
          href="https://github.com/sikehish"
          target="blank"
          rel="noopener noreferrer"
        >
          <AiOutlineGithub />
        </a>
      </div>
      <div className="bottom-footer">
        <p>Made with &#10084; by Hisham</p>
        <p>© Copyright 2022 steadious</p>
      </div>
    </footer>
  );
}

export default Footer;
