import React, { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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
            className={`w-full h-auto rounded-lg cursor-pointer ${selectedImages.includes(image) ? 'border-4 border-blue-500' : ''}`}
          >
            <img src={image} alt={`Captured ${index + 1}`} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div>

      {/* Modal for viewing the clicked image */}
      {currentImage && !isSelectMode && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative">
            <img src={currentImage} alt="Full view" className="max-w-full max-h-full" />
            <button
              onClick={() => setCurrentImage(null)}
              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

{previewSelectedImagesModal && (
  <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40'>
    <div className="w-1/2 bg-white shadow-lg p-4 transition-transform transform translate-x-0 border z-50">
      <div className='flex mt-2'>
        <h2 className="text-lg font-semibold mb-4">Selected Images</h2>
        <div className='ms-auto '>
          <button
            onClick={handlePrint}
            className="btn bg-red-500 text-white mb-4 mx-2 px-3 py-1 rounded-sm"
            disabled={!isSelectMode || selectedImages.length !== 4}
          >
            Print
          </button>
          <button
            onClick={() => setpreviewSelectedImagesModal(false)}
            className="btn bg-yellow-500 text-white mb-4 mx-2 px-3 py-1 rounded-sm"
          >
            Close Preview
          </button>
        </div>
      </div>
      <div id="image-grid" className="grid grid-cols-2 gap-3">
        {selectedImages.map((image, index) => (
          <div key={index} className="w-full h-auto">
            <img src={image} alt={`Selected ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default Gallery
