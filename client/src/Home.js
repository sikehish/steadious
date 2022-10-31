import React from "react";
// import logo from "./3958832-removebg-preview.png";
import logo from "./3884687-removebg-preview.png";
import "./Home.css";

function Home() {
  return (
    <section className="welcome-page">
      <div className="home">
        <div className="home-div">
          <p className="font-black">
            Welcome to <em>steadious.</em>
          </p>
          <p>Your college buddy</p>
        </div>
        <div className="clock">
          <div className="top"></div>
          <div className="right"></div>
          <div className="bottom"></div>
          <div className="left"></div>
          <div className="center"></div>
          <div className="shadow"></div>
          <div className="hour"></div>
          <div className="minute"></div>
          <div className="second"></div>
        </div>
      </div>

      <div className="info">
        <p className="font-bold">What can you do with Steadious?</p>
        <ul className="list">
          <li>
            <h1 className="font-black">Manage your attendance</h1>
            <p>
              Time is precious, and so is your attendance! With our website/app
              you'd be able to track your attendance better.
            </p>
          </li>
          <li>
            <h1 className="font-black">Caclulate your scores</h1>
            <p>
              We've all been there! It's not easy to calculate SGPA's and
              CGPA's, so we take away the abstraction from you.
            </p>
          </li>
          <li>
            <h1 className="font-black">Productivity</h1>
            <p>
              Productivity is the key to success, and with steadious, youre
              bound to be more productive :)
            </p>
          </li>
          <li>
            <h1 className="font-black">Enhanced college life</h1>
            <p>
              You now no longer need to worry about attendance, we've got you
              covered! Features are being added currently.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
