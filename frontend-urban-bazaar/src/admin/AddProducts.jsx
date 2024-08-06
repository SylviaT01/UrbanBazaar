import React, { useState } from "react";

function AddProductPage() {
  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([null, null]);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleAdditionalImageChange = (e, index) => {
    const newImages = [...additionalImages];
    newImages[index] = URL.createObjectURL(e.target.files[0]);
    setAdditionalImages(newImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full relative bg-aliceblue h-[1024px] overflow-hidden text-left text-base text-black font-poppins p-8">
      <h2 className="text-2xl mb-4">General Information</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2">Product name:</label>
              <input
                className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px]"
                type="text"
                placeholder="Product Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2">Brand:</label>
              <input
                className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px]"
                type="text"
                placeholder="Brand"
              />
            </div>
          </div>
          <label className="block mb-2">Description:</label>
          <input
            className="border py-2 px-4 border-gray-300 rounded-md w-full h-[100px] mb-4"
            type="text"
            placeholder="Description"
          />
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2">Price:</label>
              <input
                className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px]"
                type="text"
                placeholder="Price"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2">Discount:</label>
              <input
                className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px]"
                type="text"
                placeholder="Discount"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2">Tags:</label>
          <input
            className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px] mb-4"
            type="text"
            placeholder="Tags"
          />
          <label className="block mb-2">Product Image:</label>
          <div className="flex space-x-4 mb-4">
            <div
              className="border py-2 px-4 border-black w-60 h-60 flex items-center justify-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{ borderStyle: "dashed", cursor: "pointer" }}
            >
              <input
                className="hidden"
                type="file"
                accept="image/*"
                id="imageUpload"
                onChange={handleImageChange}
              />
              <label
                htmlFor="imageUpload"
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                {image ? (
                  <img
                    src={image}
                    alt="Product"
                    className="max-h-full max-w-full"
                  />
                ) : (
                  <span className="text-md">
                    Drag and drop <span className="text-blue-500">or</span>{" "}
                    click to browse
                  </span>
                )}
              </label>
            </div>
            <div className="flex space-x-4">
              {additionalImages.map((img, index) => (
                <div
                  key={index}
                  className="border py-2 px-4 border-black w-30 h-30 flex items-center justify-center"
                  style={{ borderStyle: "dashed", cursor: "pointer" }}
                >
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    id={`additionalImageUpload${index}`}
                    onChange={(e) => handleAdditionalImageChange(e, index)}
                  />
                  <label
                    htmlFor={`additionalImageUpload${index}`}
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`Additional Product ${index + 1}`}
                        className="max-h-full max-w-full"
                      />
                    ) : (
                      <span>Click to upload</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <label className="block mb-2">Publish Category:</label>
          <input
            className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px] mb-4"
            type="text"
            placeholder="Publish Category"
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
          Add Products
        </button>
      </div>
    </div>
  );
}

export default AddProductPage;
