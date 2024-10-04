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
    <div className="flex flex-col items-center pt-7 w-full">
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
              onClick={() => handleImageClick(image)}
              className={`relative w-full h-auto rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-105 duration-200 ${
                isSelectMode && selectedImages.includes(image)
                  ? 'border-4 border-blue-500'
                  : 'border border-white'
              }`}
            >
              <img
                src={image}
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
