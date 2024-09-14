import React, { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ImagePreviewModal from './ImagePreviewModal' // Import the new modal component
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
      alert("Please select exactly 4 images for printing.")
      return
    }

    // Generate a 2x2 grid of the images
    const grid = document.getElementById('image-grid')

    // Use html2canvas to convert the grid to an image
    const canvas = await html2canvas(grid)
    const imgData = canvas.toDataURL('image/png')

    // Generate a PDF and add the image
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    })

    // Add the grid image to the PDF (centered on the page)
    pdf.addImage(imgData, 'PNG', 20, 20, 555, 555)

    // Print the PDF
    pdf.autoPrint()
    window.open(pdf.output('bloburl'))
  }

  return (
    <div className="flex flex-col items-center mt-2 w-full">
      <div className="flex justify-between items-center w-full max-w-screen-lg">
        <p className="text-xl">Gallery</p>
        <div className="flex space-x-4">
          <button onClick={toggleSelectMode} className="btn">
            {isSelectMode ? 'Cancel' : 'Select'}
          </button>
          <button onClick={() => setpreviewSelectedImagesModal(true)} className="btn" disabled={!isSelectMode || selectedImages.length < 1}>
            Preview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4 w-full max-w-screen-lg">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(image)}
            className={`w-full h-auto rounded-lg cursor-pointer ${isSelectMode && selectedImages.includes(image) ? 'border-4 border-blue-500' : ''}`}
          >
            <img src={image} alt={`Captured ${index + 1}`} className="w-full h-auto rounded-lg" />
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
  )
}

export default Gallery
