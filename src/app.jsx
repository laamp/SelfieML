import React from "react";
import Webcam from "./webcam";
import "./css/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      bSnapPhoto: true,
      errors: []
    };

    this.toggleState = this.toggleState.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.reset = this.reset.bind(this);
    this.confirmPhoto = this.confirmPhoto.bind(this);
  }

  toggleState(bShouldTakePhoto) {
    this.setState({ bSnapPhoto: bShouldTakePhoto });
  }

  setErrors(errs) {
    this.setState({ errors: errs });
  }

  reset() {
    this.setState({ bSnapPhoto: true, errors: [] });
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
            setErrors={this.setErrors}
          />
          <div className="bounding-box"></div>
        </section>

        <section className="controls">
          <div className="controls-left">
            <h2>Preview</h2>
            <div className="picture-preview"></div>
          </div>
          <div className="controls-right">
            <div className="text-output">
              {this.state.errors.length < 1 ? (
                <p className="success">
                  {this.state.bSnapPhoto
                    ? "Loading..."
                    : "Photo captured (Click 'reset camera' to take another)"}
                </p>
              ) : (
                <ul className="error">
                  {this.state.errors.map((err, i) => (
                    <li key={`err-${i}`}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="buttons">
              <button onClick={this.reset} className="reset">
                <h3>RESET CAMERA</h3>
              </button>
              <button onClick={this.confirmPhoto} className="reset">
                <h3>CONFIRM PHOTO</h3>
              </button>
            </div>
          </div>
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
