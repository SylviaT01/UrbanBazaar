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
    <div className="w-full relative bg-aliceblue h-[1024px] overflow-hidden text-left text-base text-black font-poppins p-2">
      <h2 className="text-2xl mb-4">General Information</h2>
      <div className='p-8 border border-gray-300 rounded' > 
      <div className="grid grid-cols-2 gap-8 ">
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
            
}

export default AddProductPage;
