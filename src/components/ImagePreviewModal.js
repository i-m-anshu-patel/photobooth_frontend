import React from "react";

const ImagePreviewModal = ({
  selectedImages,
  isSelectMode,
  handlePrint,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 overflow-y-auto h-full">
      <div className="sm:w-[90%] md:w-[75%] lg:w-1/2 bg-slate-900 shadow-lg p-4 transition-transform transform translate-x-0 border z-50 max-h-[90vh] overflow-y-auto h-full">
        <div className="flex mt-2">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Selected Images
          </h2>
          <div className="ms-auto">
            <button
              onClick={handlePrint}
              className="btn bg-red-500 text-white mb-4 mx-2 px-3 py-1 rounded-md"
              disabled={!isSelectMode || selectedImages.length !== 4}
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="btn bg-yellow-500 text-white mb-4 mx-2 px-3 py-1 rounded-md"
            >
              Close Preview
            </button>
          </div>
        </div>
        <div id="image-grid">
          {selectedImages.map((image, index) => (
            <div className="grid grid-cols-2 gap-1 m-0 p-0  rounded-md ">
              <img
                src={image.imageSrc}
                alt={`Selected ${index + 1}`}
                className="w-full h-full rounded-sm border border-white"
              />

              <img
                src={image.imageSrc}
                alt={`Selected ${index + 1}`}
                className="w-full h-full rounded-sm border border-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
