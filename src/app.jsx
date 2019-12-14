import React from "react";
import Webcam from "./webcam";
import "./css/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      bSnapPhoto: true
    };

    this.toggleState = this.toggleState.bind(this);
    this.reset = this.reset.bind(this);
    this.confirmPhoto = this.confirmPhoto.bind(this);
  }

  toggleState(bShouldTakePhoto) {
    this.setState({ bSnapPhoto: bShouldTakePhoto });
  }

  reset() {
    this.setState({ bSnapPhoto: true });
    document.querySelector(".picture-preview").innerHTML = "";
  }

  // this is where the photo would be sent to its destination
  confirmPhoto() {
    if (!this.state.bSnapPhoto) {
      this.reset();
      window.alert("Photo sent!");
    } else {
      window.alert("Please take a photo first");
    }
  }

  render() {
    return (
      <>
        <header>
          <h1>Face Capture</h1>
        </header>

        <section className="video-container">
          <Webcam
            bSnapPhoto={this.state.bSnapPhoto}
            toggleState={this.toggleState}
          />
          <div className="bounding-box"></div>
        </section>

        <section className="controls">
          <div className="picture-preview"></div>
          <button onClick={this.reset} className="reset">
            <h3>RESET CAMERA</h3>
          </button>
          <button onClick={this.confirmPhoto} className="reset">
            <h3>CONFIRM PHOTO</h3>
          </button>
        </section>

        <footer>
          <div>
            <p>Lance Smith 2019</p>
            <a href="https://github.com/laamp/SelfieML">GitHub</a>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
