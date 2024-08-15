import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";

const UpdateProfile = () => {
  const { authToken } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = authToken || localStorage.getItem("access_token");
      try {
        const response = await fetch("https://backend-urbanbazaar.onrender.com/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch profile data");
        }

        const userData = await response.json();
        setUsername(userData.username || "");
        setEmail(userData.email || "");
        setPhoneNumber(userData.phone_number || "");
      } catch (error) {
        setErrorMessage(error.message || "Error fetching profile data");
      }
    };

    fetchUserData();
  }, [authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = authToken || localStorage.getItem("access_token");

    const updatedProfile = {
      username,
      email,
      phone_number: phoneNumber.toString(), // Convert phone number to string
      ...(newPassword && { newPassword }),
    };

    if (newPassword) {
      updatedProfile.currentPassword = currentPassword;
      if (newPassword !== confirmPassword) {
        setErrorMessage("New passwords do not match");
        return;
      }
    }
    console.log("Request body:", updatedProfile);

    try {
      const response = await fetch("https://backend-urbanbazaar.onrender.com/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to update profile");
        return;
      }

      setSuccessMessage("Profile updated successfully");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Error updating profile");
    }
  };

  return (
    <div className="flex justify-center items-center bg-blue-50 ">
      <form
        className="bg-white rounded max-w-sm mx-auto md:max-w-none gap-4 mb-8 w-full "
        onSubmit={handleSubmit}
      >
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        )}
        <div className="mt-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter Username"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter email address"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter phone number"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl text-blue-700">Password Change</h2>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter current password"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter new password"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Confirm new password"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
