import React from "react";
import * as faceapi from "face-api.js";

class Webcam extends React.Component {
  constructor() {
    super();

    this.getVideo = this.getVideo.bind(this);
    window.getVideo = this.getVideo;

    // load models here
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models")
      // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      // faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      // faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ]).then(this.getVideo);
  }

  componentDidMount() {
    // snag the video node from this component
    this.video = document.querySelector("#video");

    this.video.addEventListener("play", () => {
      // create canvas for bounding boxes
      const canvas = faceapi.createCanvasFromMedia(this.video);
      canvas.style.marginLeft = "80px";
      document.querySelector(".video-container").append(canvas);
      const displaySize = {
        width: this.video.width,
        height: this.video.height
      };
      faceapi.matchDimensions(canvas, displaySize);

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

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);

        console.log(detections);
      }, 100);
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

  render() {
    return <video id="video" width="640" height="480" autoPlay muted></video>;
  }
}

export default Webcam;
