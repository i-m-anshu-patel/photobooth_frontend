import React, { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ImagePreviewModal from './ImagePreviewModal'
import SingleImagePreviewModal from './SingleImagePreviewModal'

const Gallery = ({ galleryImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [previewSelectedImagesModal, setpreviewSelectedImagesModal] = useState(false);

  // Toggle image selection
  const handleSelectImage = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img !== image))
    } else {
      if (selectedImages.length < 4) {
        setSelectedImages([...selectedImages, image])
      } else {
        alert("You can only select up to 4 images for printing.")
      }
    }
  }

  // Handle clicking an image (opens modal in view mode)
  const handleImageClick = (image) => {
    if (isSelectMode) {
      handleSelectImage(image)
    } else {
      setCurrentImage(image)
    }
  }

  // Toggle between select and view mode
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (!isSelectMode) {
      setSelectedImages([]) // Clear selections when entering select mode
    }
  }

  // Merge selected images into a 2x2 grid in a PDF and print it
  const handlePrint = async () => {
    if (selectedImages.length !== 4) {
        alert("Please select exactly 4 images for printing.");
        return;
    }

    const grid = document.getElementById('image-grid');
    const canvas = await html2canvas(grid);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth; // Use full page width
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    const x = 0; // Align to left edge
    const y = (pdfHeight - imgHeight) / 2; // Center vertically

    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

    // Add text at the bottom of the page
    const text = "Your Custom Text Here"; // Change this to your desired text
    const textHeight = 20; // Estimated height of the text in points
    const textY = pdfHeight - textHeight - 20; // Position 20 points from the bottom

    pdf.setFontSize(12); // Set font size
    pdf.text(text, 20, textY); // Add text (x, y coordinates)

    pdf.autoPrint();
    window.open(pdf.output('bloburl'));
};


  return (
    <div className="flex flex-col items-center pt-7 w-full min-h-screen">
      {/* Container box with a modern, card-like design */}
      <div className="w-full max-w-screen-lg bg-slate-900 bg-opacity-70 shadow-2xl rounded-lg p-8 mb-2 border border-white">
        <div className="flex justify-between items-center w-full mb-6">
          <p className="text-3xl text-white font-semibold">Gallery</p>
          <div className="flex space-x-4">
            <button
              onClick={toggleSelectMode}
              className={`px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-900 text-white rounded-md hover:shadow-lg transition-all ${isSelectMode ? 'border-2 border-blue-500' : 'border-none'}`}
            >
              {isSelectMode ? 'Cancel Selection' : 'Select'}
            </button>
            <button
              onClick={() => setpreviewSelectedImagesModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md hover:shadow-lg transition-all"
              disabled={!isSelectMode || selectedImages.length < 1}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(image.imageSrc)}
              className={`relative w-full h-auto rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-105 duration-200 ${
                isSelectMode && selectedImages.includes(image.imageSrc)
                  ? 'border-4 border-blue-500'
                  : 'border border-white'
              }`}
            >
              <img
                src={image.imageSrc}
                alt={`Captured ${index + 1}`}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          ))}
        </div>

        {/* Modal for viewing the clicked image */}
        {currentImage && !isSelectMode && (
          <SingleImagePreviewModal
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
        )}

        {/* Preview Selected Images Modal */}
        {previewSelectedImagesModal && (
          <ImagePreviewModal
            selectedImages={selectedImages}
            isSelectMode={isSelectMode}
            handlePrint={handlePrint}
            onClose={() => setpreviewSelectedImagesModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Gallery
