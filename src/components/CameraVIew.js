import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import ImagePreviewModal from "./ImagePreviewModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { filterlist } from "../utils/filterlist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";

const CameraVIew = () => {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(3); // Countdown state starting from 5
  const [capturing, setCapturing] = useState(false); // Capturing status
  const [images, setImages] = useState([]); // Store captured images
  const [pictureCount, setPictureCount] = useState(0); // Count the number of pictures taken
  const [imagePreviewModalMode, setImagePreviewModalMode] = useState(false);
  const [filters, setfilters] = useState("None");
  const [filterClassname, setFilterClassname] = useState("");
  const [filterModalMode, setFilterModalMode] = useState(false);
  const userData = useSelector((store) => store.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    } else if (!userData.payment_status) {
      navigate("/settings");
    }
  }, [userData, navigate]);

  const videoConstraints = {
    facingMode: "user", // 'environment' for back camera
  };

  // Merge selected images into a 2x2 grid in a PDF and print it
  const handlePrint = async () => {
    const grid = document.getElementById("image-grid");
    const canvas = await html2canvas(grid);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    pdf.addImage(imgData, "PNG", 20, 20, 555, 650);

    // Add text below the images
    const text = "Special One"; // Change this to your desired text

    const textWidth = pdf.getTextWidth(text); // Get the width of the text
    const centerX = (pdfWidth - textWidth) / 2;
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(25); // Set font size
    pdf.text(text, centerX, 750);

    // Print the PDF
    pdf.autoPrint();
    window.open(pdf.output("bloburl"));
  };

  const applyFilterToImage = useCallback(
    (src, sequence) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = src;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        switch (filters) {
          case "grayscale":
            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = avg; // Red
              data[i + 1] = avg; // Green
              data[i + 2] = avg; // Blue
            }
            break;

          case "sepia":
            for (let i = 0; i < data.length; i += 4) {
              const tr =
                0.393 * data[i] + 0.769 * data[i + 1] + 0.189 * data[i + 2];
              const tg =
                0.349 * data[i] + 0.686 * data[i + 1] + 0.168 * data[i + 2];
              const tb =
                0.272 * data[i] + 0.534 * data[i + 1] + 0.131 * data[i + 2];
              data[i] = tr > 255 ? 255 : tr; // Red
              data[i + 1] = tg > 255 ? 255 : tg; // Green
              data[i + 2] = tb > 255 ? 255 : tb; // Blue
            }
            break;

          case "brighten":
            const brightnessFactor = 50; // Adjust as needed
            for (let i = 0; i < data.length; i += 4) {
              data[i] = Math.min(data[i] + brightnessFactor, 255);
              data[i + 1] = Math.min(data[i + 1] + brightnessFactor, 255);
              data[i + 2] = Math.min(data[i + 2] + brightnessFactor, 255);
            }
            break;

          case "darken":
            const darkenFactor = 50; // Adjust as needed
            for (let i = 0; i < data.length; i += 4) {
              data[i] = Math.max(data[i] - darkenFactor, 0);
              data[i + 1] = Math.max(data[i + 1] - darkenFactor, 0);
              data[i + 2] = Math.max(data[i + 2] - darkenFactor, 0);
            }
            break;

          case "contrast":
            const contrastFactor = 1.5; // Adjust for more or less contrast
            for (let i = 0; i < data.length; i += 4) {
              data[i] = (data[i] - 128) * contrastFactor + 128;
              data[i + 1] = (data[i + 1] - 128) * contrastFactor + 128;
              data[i + 2] = (data[i + 2] - 128) * contrastFactor + 128;
            }
            break;

          case "saturation":
            const saturationFactor = 1.5; // Adjust for more or less saturation
            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] += (data[i] - avg) * saturationFactor; // Red
              data[i + 1] += (data[i + 1] - avg) * saturationFactor; // Green
              data[i + 2] += (data[i + 2] - avg) * saturationFactor; // Blue
            }
            break;

          case "pixelate":
            const pixelationFactor = 10; // Higher number = more pixelation
            const pixelatedCanvas = document.createElement("canvas");
            const pixelatedCtx = pixelatedCanvas.getContext("2d");
            pixelatedCanvas.width = canvas.width / pixelationFactor;
            pixelatedCanvas.height = canvas.height / pixelationFactor;

            pixelatedCtx.drawImage(
              canvas,
              0,
              0,
              pixelatedCanvas.width,
              pixelatedCanvas.height
            );
            pixelatedCtx.drawImage(
              pixelatedCanvas,
              0,
              0,
              pixelatedCanvas.width,
              pixelatedCanvas.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            ctx.drawImage(pixelatedCanvas, 0, 0);
            break;

          default:
            break;
        }

        ctx.putImageData(imageData, 0, 0);
        const imageWithSequence = {
          sequenceId: sequence,
          imageSrc: canvas.toDataURL(),
        };
        setImages((prevImages) => [...prevImages, imageWithSequence]);
      };
    },
    [filters]
  );

  // Memoizing capture function to avoid unnecessary re-renders
  const capture = useCallback(
    (sequence) => {
      const imageSrc = webcamRef.current.getScreenshot();
      applyFilterToImage(imageSrc, sequence);
    },
    [applyFilterToImage]
  );

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
  }, [countdown, capturing, pictureCount, capture]);

  return (
    <div className="w-full min-h-screen relative">
      {/* Webcam Display */}
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className={
            "absolute top-0 sm:w-full md:w-11/12 md:ms-14 h-[85%] object-cover border-2 border-white " +
            filterClassname
          }
        />
      </div>
      {/* Countdown displayed over the webcam */}
      {capturing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-red-600">
            {countdown > 0 ? countdown : "Smile!"}
          </h1>
        </div>
      )}

      {/* Footer for Capture and Filter Buttons */}
      <div className="absolute bottom-0 left-0 w-full h-[15%] flex justify-center items-center p-4 sm:p-2 md:p-4 z-40">
        <button
          onClick={startCountdownAndCapture}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 mx-2"
        >
          Capture
        </button>
        <button
          onClick={() => setFilterModalMode(!filterModalMode)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Filters
        </button>
      </div>

      {imagePreviewModalMode && (
        <ImagePreviewModal
          selectedImages={images}
          isSelectMode={true}
          handlePrint={handlePrint}
          onClose={() => {
            setImagePreviewModalMode(false);
            setImages([]); // Clear previous images
            setPictureCount(0); // Reset the picture count
          }}
        />
      )}

      {filterModalMode && (
        <FilterModal
          filters={filters}
          setfilters={setfilters}
          setFilterClassname={setFilterClassname}
          setFilterModalMode={setFilterModalMode}
        />
      )}
    </div>
  );
};

export default CameraVIew;
