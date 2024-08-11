// export default AddProductPage;
import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";

function AddProductPage() {
  const { currentUser, authToken } = useContext(UserContext); // Get currentUser and authToken from context
  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([null, null]);
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    description: "",
    price: "",
    discount: "",
    tags: "",
    publishCategory: "",
    sku: "default-sku", // Provide default values
    stock: 0, // Provide default values
    weight: 0.0, // Provide default values
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleAddProductClick = async () => {
    if (currentUser.username !== "admin") {
      alert("You do not have permission to add products.");
      return;
    }

    const data = {
      title: formData.title,
      brand: formData.brand,
      description: formData.description,
      price: formData.price,
      discountPercentage: formData.discount,
      tags: formData.tags.split(","), // Ensure tags is an array
      images: [image, ...additionalImages.filter((img) => img !== null)],
      category: formData.publishCategory,
      sku: formData.sku,
      stock: formData.stock,
      weight: formData.weight,
      // Add default values or empty strings if fields are optional
    };

    console.log("Sending data to server:", data);

    try {
      const response = await fetch("http://127.0.0.1:5000/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Unknown error");
      }

      const result = await response.json();
      console.log("Server response:", result);
      alert(result.message);

      // Clear form data and images
      setFormData({
        title: "",
        brand: "",
        description: "",
        price: "",
        discount: "",
        tags: "",
        publishCategory: "",
        sku: "default-sku",
        stock: 0,
        weight: 0.0,
      });
      setImage(null);
      setAdditionalImages([null, null]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
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
                name="title"
                type="text"
                className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px]"
                placeholder="Product Name"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2">Brand:</label>
              <input
                name="brand"
                className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px]"
                type="text"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <label className="block mb-2">Description:</label>
          <input
            name="description"
            className="border py-2 px-4 border-gray-300 rounded-md w-full h-[100px] mb-4"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2">Price:</label>
              <input
                name="price"
                className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px]"
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2">Discount:</label>
              <input
                name="discount"
                className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px]"
                type="text"
                placeholder="Discount"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2">Tags:</label>
          <input
            name="tags"
            className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px] mb-4"
            type="text"
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={handleInputChange}
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
            name="publishCategory"
            className="border py-2 px-4 border-gray-300 rounded-md w-full h-[40px] mb-4"
            type="text"
            placeholder="Publish Category"
            value={formData.publishCategory}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md"
          onClick={handleAddProductClick}
        >
          Add Products
        </button>
      </div>
    </div>
  );
}

export default AddProductPage;
