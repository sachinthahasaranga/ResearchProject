import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 320,
  height: 240,
  facingMode: "user",
};

const FaceCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImage(imgSrc);
    onCapture(imgSrc); // Pass image to parent component
  };

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" ,marginBottom:'30px'}}>
      <Webcam
        audio={false}
        style={{borderRadius:'30px'}}
        height={240}
        width={320}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <br />
      <button type="button" onClick={capture} style={{ marginTop: "10px" }}>
        Capture Face
      </button>
      {image && (
        <div style={{ marginTop: "1rem" }}>
          <img src={image} alt="Captured face" width="150" style={{borderRadius:'20px'}} />
        </div>
      )}
    </div>
  );
};

export default FaceCapture;
