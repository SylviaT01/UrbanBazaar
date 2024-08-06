import React, { useState } from 'react';

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
          <label className="block mb-2">Product name:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Product Name"
          />
          <label className="block mb-2">Brand:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Brand"
          />
          <label className="block mb-2">Description:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Description"
          />
          <label className="block mb-2">Price:</label>
          <input
            className="mb-4 border py-2 px-4 border-gray-300 w-full rounded-md"
            type="text"
            placeholder="Price"
          />
          <label className="block mb-2">Discount:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Discount"
          />
        </div>
        <div>
          <label className="block mb-2">Tags:</label>
          <input
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Tags"
          />
          <label className="block mb-2">Product Image:</label>
          <div className="flex space-x-4">
            <div
              className="mb-4 border py-2 px-4 border-black w-32 h-32 flex items-center justify-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{ borderStyle: 'dashed', cursor: 'pointer' }}
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
                  <img src={image} alt="Product" className="max-h-full max-w-full" />
                ) : (
                  <span>Drag and drop or click to browse</span>
                )}
              </label>
            </div>
            <div className="flex space-x-4">
              {additionalImages.map((img, index) => (
                <div
                  key={index}
                  className="mb-4 border py-2 px-4 border-black w-32 h-32 flex items-center justify-center"
                  style={{ borderStyle: 'dashed', cursor: 'pointer' }}
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
                      <img src={img} alt={`Additional Product ${index + 1}`} className="max-h-full max-w-full" />
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
            className="mb-4 border py-2 px-4 border-black w-full"
            type="text"
            placeholder="Publish Category"
          />
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
