import React from "react";
import * as faceapi from "face-api.js";
import "./css/webcam.scss";

class Webcam extends React.Component {
  constructor(props) {
    super(props);

    this.getVideo = this.getVideo.bind(this);
    this.takePicture = this.takePicture.bind(this);

    // load models here
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models")
      // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      // faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      // faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ]).then(this.getVideo);

    window.takePicture = this.takePicture;
  }

  componentDidMount() {
    // snag the video node from this component
    this.video = document.querySelector("#video");

    this.video.addEventListener("play", () => {
      // create canvas for bounding boxes
      this.canvas = faceapi.createCanvasFromMedia(this.video);
      document.querySelector(".video-container").append(this.canvas);
      const displaySize = {
        width: this.video.width,
        height: this.video.height
      };
      faceapi.matchDimensions(this.canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
          this.video,
          new faceapi.TinyFaceDetectorOptions()
        );
        // use other models here
        // .withFaceLandmarks()
        // .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        if (resizedDetections.length > 0 && this.props.bSnapPhoto) {
          const face = resizedDetections[0].box;

          if (face.width > 200 && face.height > 200) {
            if (face.x > 200 && face.x < 460 && face.y > 100 && face.y < 300) {
              this.takePicture();
            }
          }
        }

        this.canvas
          .getContext("2d")
          .clearRect(0, 0, this.canvas.width, this.canvas.height);
        faceapi.draw.drawDetections(this.canvas, resizedDetections);
      }, 500);
    });
  }

  getVideo() {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      })
      .then(stream => {
        this.video.srcObject = stream;
      })
      .catch(err => console.error(err));
  }

  takePicture() {
    this.props.toggleState(false);

    const newCanvas = document.createElement("canvas");
    const ctx = newCanvas.getContext("2d");
    newCanvas.width = this.video.videoWidth;
    newCanvas.height = this.video.videoHeight;
    ctx.drawImage(this.video, 0, 0);
    const data = newCanvas.toDataURL("image/png");
    document.querySelector(
      ".picture-preview"
    ).innerHTML = `<img src="${data}" alt="Click to send" />`;
  }

  render() {
    return <video id="video" width="640" height="480" autoPlay muted></video>;
  }
}

export default Webcam;
