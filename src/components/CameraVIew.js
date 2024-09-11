import React , { useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CameraVIew = () => {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(3); // Countdown state starting from 5
  const [capturing, setCapturing] = useState(false); // Capturing status
  const [images, setImages] = useState([]); // Store captured images
  const [pictureCount, setPictureCount] = useState(0); // Count the number of pictures taken

  const videoConstraints = {
    facingMode: 'user', // 'environment' for back camera
  };

  // Capture a single picture
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages((prevImages) => [...prevImages, imageSrc]);
  };

  // Start the process of taking pictures with countdown
  const startCountdownAndCapture = () => {
    setImages([]); // Clear previous images
    setPictureCount(0); // Reset the picture count
    setCapturing(true); // Start capturing process
    setCountdown(3); // Start countdown at 5 seconds
  };

  // This effect handles the countdown and capturing
  useEffect(() => {
    let timer;
    if (capturing && countdown > 0) {
      // Decrease countdown every second
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && pictureCount < 4) {
      // Capture picture when countdown reaches 0
      capture();
      setPictureCount(pictureCount + 1); // Increment picture count
      setCountdown(3); // Reset countdown to 5 for the next picture
    }

    if (pictureCount === 4) {
      // Stop the process after 4 pictures
      setCapturing(false);
    }

    return () => clearTimeout(timer); // Clean up the timer
  }, [countdown, capturing, pictureCount]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
      {/* Webcam Display */}
      <div className="w-full max-w-screen-lg h-auto relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />

        {/* Countdown displayed over the webcam */}
        {capturing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl font-bold text-red-600">
              {countdown > 0 ? countdown : "Smile!"}
            </h1>
          </div>
        )}
      </div>

      {/* Capture Button */}
      {!capturing && (
        <button
          onClick={startCountdownAndCapture}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Start Countdown and Capture 4 Pictures
        </button>
      )}

      {/* Display Captured Images */}
      {/* <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-screen-lg">
        {images.map((image, index) => (
          <div key={index} className="w-full h-auto rounded-lg">
            <img src={image} alt={`Captured ${index + 1}`} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div> */}
    </div>
  );
};

  


export default CameraVIew
