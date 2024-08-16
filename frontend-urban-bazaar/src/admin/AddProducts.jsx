import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = "zyzsn08y"; // Replace with your actual Cloudinary upload preset name
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dhxwbv56x/image/upload`; // Replace with your Cloudinary cloud name

function AddProductPage() {
  const { currentUser, authToken } = useContext(UserContext);
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
    sku: "default-sku",
    stock: 0,
    weight: 0.0,
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 1 weeks",
    returnPolicy: "30 days return policy",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Image upload failed.");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setImage(imageUrl);
      } catch (error) {
        console.error("Failed to upload image:", error.message);
      }
    }
  };

  const handleAdditionalImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        const newImages = [...additionalImages];
        newImages[index] = imageUrl;
        setAdditionalImages(newImages);
      } catch (error) {
        console.error(
          `Failed to upload additional image ${index + 1}:`,
          error.message
        );
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setImage(imageUrl);
      } catch (error) {
        console.error("Failed to upload dropped image:", error.message);
      }
    }
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
      tags: formData.tags.split(","),
      images: [image, ...additionalImages.filter((img) => img !== null)],
      category: formData.publishCategory,
      sku: formData.sku,
      stock: formData.stock,
      weight: formData.weight,
      warrantyInformation: formData.warrantyInformation,
      shippingInformation: formData.shippingInformation,
      returnPolicy: formData.returnPolicy,
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
    <div className="w-full relative bg-aliceblue min-h-screen overflow-hidden text-left text-base text-black font-poppins p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl mb-4">General Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label className="block mb-2">Product name:</label>
              <input
                name="title"
                type="text"
                className="border py-2 px-4 border-gray-300 rounded-md w-full"
                placeholder="Product Name"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label className="block mb-2">Brand:</label>
              <input
                name="brand"
                className="border py-2 px-4 border-gray-300 rounded-md w-full"
                type="text"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <input
              name="description"
              className="border py-2 px-4 border-gray-300 rounded-md w-full h-32"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label className="block mb-2">Price:</label>
              <input
                name="price"
                className="border py-2 px-4 border-gray-300 rounded-md w-full"
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-2">Discount:</label>
              <input
                name="discount"
                className="border py-2 px-4 border-gray-300 rounded-md w-full"
                type="text"
                placeholder="Discount"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tags:</label>
          <input
            name="tags"
            className="border py-2 px-4 border-gray-300 rounded-md w-full"
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
                  <span className="text-md text-center">
                    Drag and drop <span className="text-blue-500">or</span>{" "}
                    click to browse
                  </span>
                )}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {additionalImages.map((img, index) => (
                <div
                  key={index}
                  className="border py-2 px-4 border-black w-full h-30 flex items-center justify-center"
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
          <div className="mb-4">
            <label className="block mb-2">Publish Category:</label>
            <input
              name="publishCategory"
              className="border py-2 px-4 border-gray-300 rounded-md w-full "
              type="text"
              placeholder="Publish Category"
              value={formData.publishCategory}
              onChange={handleInputChange}
            />
          </div>
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
