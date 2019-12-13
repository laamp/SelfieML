import React from "react";

class Webcam extends React.Component {
  componentDidMount() {
    this.video = document.querySelector("#video");
    this.getVideo();
  }

  getVideo() {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      })
      .then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch(err => console.error("Cannot get video stream", err));
  }

  render() {
    return <video id="video" width="640" height="480" autoPlay muted></video>;
  }
}

export default Webcam;
