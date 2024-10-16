import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import ImagePreviewModal from './ImagePreviewModal';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const CameraVIew = ({ setGalleryImages }) => {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(3); // Countdown state starting from 5
  const [capturing, setCapturing] = useState(false); // Capturing status
  const [images, setImages] = useState([]); // Store captured images
  const [pictureCount, setPictureCount] = useState(0); // Count the number of pictures taken
  const [imagePreviewModalMode, setImagePreviewModalMode] = useState(false);

  const videoConstraints = {
    facingMode: 'user', // 'environment' for back camera
  };

  // Merge selected images into a 2x2 grid in a PDF and print it
  const handlePrint = async () => {
    const grid = document.getElementById('image-grid');
    const canvas = await html2canvas(grid);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 20, 20, 555, 555);

    // Add text below the images
    const text = "Your Text Here"; // Change this to your desired text
  
    const textWidth = pdf.getTextWidth(text); // Get the width of the text
    const centerX = (pdfWidth - textWidth) / 2;
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(25); // Set font size
    pdf.text(text, centerX - 10, 650); // Add text (x, y coordinates)

    // Print the PDF
    pdf.autoPrint();
    window.open(pdf.output('bloburl'));
};
  



  // Capture a single picture
  const capture = (sequence) => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageWithSequence = { sequenceId: sequence, imageSrc: imageSrc };
    setImages((prevImages) => [...prevImages, imageWithSequence]);
  };

  // Start the process of taking pictures with countdown
  const startCountdownAndCapture = () => {
    setImages([]); // Clear previous images
    setPictureCount(0); // Reset the picture count
    setCapturing(true); // Start capturing process
    setCountdown(3); // Start countdown at 3 seconds
  };

  // This effect handles the countdown and capturing
  useEffect(() => {
    let timer;
    if (capturing && countdown > 0) {
      // Decrease countdown every second
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && pictureCount < 4) {
      // Capture picture when countdown reaches 0
      capture(pictureCount);
      setPictureCount(pictureCount + 1); // Increment picture count
      setCountdown(3); // Reset countdown to 5 for the next picture
    }

    if (pictureCount === 4) {
      // Stop the process after 4 pictures
      setCapturing(false);
      setImagePreviewModalMode(true);
    }

    return () => clearTimeout(timer); // Clean up the timer
  }, [countdown, capturing, pictureCount]);

  return (
    <div className="grid grid-cols-2 w-full h-screen gap-4">
      {/* Webcam Display */}
      <div className="w-full h-full flex items-center justify-center relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="object-cover"
        />
        {/* Countdown displayed over the webcam */}
        {capturing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl font-bold text-red-600">
              {countdown > 0 ? countdown : 'Smile!'}
            </h1>
          </div>
        )}
      </div>

      {/* Controls (Capture Button) */}
      <div className="flex items-center justify-center">
        {!capturing && (
          <button
            onClick={startCountdownAndCapture}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Click
          </button>
        )}
      </div>

      {imagePreviewModalMode && (
        <ImagePreviewModal
          selectedImages={images}
          isSelectMode={true}
          handlePrint={handlePrint}
          onClose={() => setImagePreviewModalMode(false)}
        />
      )
      };
    </div>
)};

export default CameraVIew;
