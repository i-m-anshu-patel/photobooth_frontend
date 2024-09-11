import React from 'react'

const Gallery = ({ galleryImages }) => {
  return (
    <div className="flex flex-col items-center mt-2 w-full">
      <div className="flex justify-between items-center w-full max-w-screen-lg">
        <p className="text-xl">Gallery</p>
        <div className="flex space-x-3">
          <button className="btn bg-blue-500 px-2 py-1 text-white rounded-sm">Save</button>
          <button className="btn bg-red-500 px-2 py-1 text-white rounded-sm">Print</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-4 w-full max-w-screen-lg">
        {galleryImages.map((image, index) => (
          <div key={index} className="w-full h-auto rounded-lg">
            <img src={image} alt={`Captured ${index + 1}`} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
