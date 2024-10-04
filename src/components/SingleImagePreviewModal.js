import React from 'react'

const SingleImagePreviewModal = ({currentImage, setCurrentImage}) => {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative">
            <img src={currentImage} alt="Full view" className="max-w-full max-h-full border border-white" />
            <button
              onClick={() => setCurrentImage(null)}
              className="absolute top-2 right-2 bg-white bg-opacity-60 text-black p-2 rounded-full w-8 h-8 flex items-center justify-center"
            >
              X
            </button>
          </div>
        </div>
  )
}

export default SingleImagePreviewModal
