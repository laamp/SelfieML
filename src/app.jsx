import React from "react";
import Webcam from "./webcam";
import "./css/app.scss";

const App = () => (
  <>
    <header>
      <h1>Face Capture</h1>
    </header>

    <section>
      <Webcam />
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
