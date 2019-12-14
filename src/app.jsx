import React from "react";
import Webcam from "./webcam";
import "./css/app.scss";

const App = () => (
  <>
    <header>
      <h1>Face Capture</h1>
    </header>

    <section className="video-container">
      <Webcam />
      <div className="bounding-box"></div>
    </section>

    <section className="controls">
      <div className="picture-preview"></div>
      <button className="reset"></button>
    </section>

    <footer>
      <div>
        <p>Lance Smith 2019</p>
        <a href="https://github.com/laamp/SelfieML">GitHub</a>
      </div>
    </footer>
  </>
);

export default App;
