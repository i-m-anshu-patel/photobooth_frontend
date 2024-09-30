import React from 'react'

const ImagePreviewModal = ({ selectedImages, isSelectMode, handlePrint, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40'>
      <div className="w-1/2 bg-white shadow-lg p-4 transition-transform transform translate-x-0 border z-50 max-h-[90vh] overflow-y-auto">
        <div className='flex mt-2'>
          <h2 className="text-lg font-semibold mb-4">Selected Images</h2>
          <div className='ms-auto'>
            <button
              onClick={handlePrint}
              className="btn bg-red-500 text-white mb-4 mx-2 px-3 py-1 rounded-sm"
              disabled={!isSelectMode || selectedImages.length !== 4}
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="btn bg-yellow-500 text-white mb-4 mx-2 px-3 py-1 rounded-sm"
            >
              Close Preview
            </button>
          </div>
        </div>
        <div id="image-grid" className="grid grid-cols-2 gap-3">
          {selectedImages.map((image, index) => (
            <>
              <div key={index} className="w-full h-auto">
                <img src={image} alt={`Selected ${index + 1}`} className="w-full h-auto" />
              </div>
              <div key={index} className="w-full h-auto">
                <img src={image} alt={`Selected ${index + 1}`} className="w-full h-auto" />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImagePreviewModal
