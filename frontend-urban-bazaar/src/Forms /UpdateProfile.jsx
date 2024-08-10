// import React, { useState } from "react";

// const UpdateProfile = () => {
//   const [username, setUsername] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedProfile = {
//       username,
//       displayName,
//       email,
//       currentPassword,
//       newPassword,
//       confirmPassword,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer YOUR_TOKEN_HERE",
//         },
//         body: JSON.stringify(updatedProfile),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update profile");
//       }

//       const result = await response.json();
//       console.log("Profile updated successfully:", result);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-50">
//       <form
//         className="bg-white p-8 rounded shadow-md w-[900px] max-w-custom"
//         onSubmit={handleSubmit}
//       >
//         <div className="mt-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter Username"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Display Name</label>
//           <input
//             type="text"
//             value={displayName}
//             onChange={(e) => setDisplayName(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter display name"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter email address"
//           />
//         </div>
//         <div className="mt-4">
//           <h2 className="text-xl text-blue-700">Password Change</h2>
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Current Password</label>
//           <input
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter current password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Repeat new password"
//           />
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-[#B5E0F6] text-black rounded hover:bg-[#B5E0F6]-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;

// import React, { useState, useContext, useEffect } from "react";
// import { UserContext } from "../contexts/userContext";

// const UpdateProfile = () => {
//   const { currentUser, authToken } = useContext(UserContext);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     // Create an object only with necessary fields
//     const updatedProfile = {
//       username,
//       email,
//       ...(newPassword && { newPassword }), // Include newPassword if it's set
//     };

//     // Add currentPassword if newPassword is set
//     if (newPassword) {
//       updatedProfile.currentPassword = currentPassword;
//       if (newPassword !== confirmPassword) {
//         setErrorMessage("New passwords do not match");
//         return;
//       }
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:5000/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedProfile),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to update profile");
//       }

//       const result = await response.json();
//       setSuccessMessage("Profile updated successfully");
//       setErrorMessage(""); // Clear any previous errors
//     } catch (error) {
//       setErrorMessage(error.message || "Error updating profile");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-50">
//       <form
//         className="bg-white p-8 rounded shadow-md w-[900px] max-w-custom"
//         onSubmit={handleSubmit}
//       >
//         {errorMessage && (
//           <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
//             {errorMessage}
//           </div>
//         )}
//         {successMessage && (
//           <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
//             {successMessage}
//           </div>
//         )}
//         <div className="mt-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter Username"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter email address"
//           />
//         </div>
//         <div className="mt-4">
//           <h2 className="text-xl text-blue-700">Password Change</h2>
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Current Password</label>
//           <input
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter current password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Repeat new password"
//           />
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-[#B5E0F6] text-black rounded hover:bg-[#B5E0F6]-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;
// import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../contexts/userContext";

// const UpdateProfile = () => {
//   const { currentUser, authToken } = useContext(UserContext);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   console.log(currentUser);

//   // Fetch user data when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = authToken || localStorage.getItem("access_token");
//       try {
//         const response = await fetch("http://127.0.0.1:5000/profile", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Failed to fetch profile data");
//         }

//         const userData = await response.json();
//         setUsername(userData.username || "");
//         setEmail(userData.email || "");
//         // Assuming the response doesn't include password for security reasons
//       } catch (error) {
//         setErrorMessage(error.message || "Error fetching profile data");
//       }
//     };

//     fetchUserData();
//   }, [authToken]); // Dependency array, rerun if authToken changes

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     const updatedProfile = {
//       username,
//       email,
//       ...(newPassword && { newPassword }), // Include newPassword if it's set
//     };

//     if (newPassword) {
//       updatedProfile.currentPassword = currentPassword;
//       if (newPassword !== confirmPassword) {
//         setErrorMessage("New passwords do not match");
//         return;
//       }
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:5000/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedProfile),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to update profile");
//       }

//       const result = await response.json();
//       setSuccessMessage("Profile updated successfully");
//       setErrorMessage(""); // Clear any previous errors
//     } catch (error) {
//       setErrorMessage(error.message || "Error updating profile");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-50">
//       <form
//         className="bg-white p-8 rounded shadow-md w-[900px] max-w-custom"
//         onSubmit={handleSubmit}
//       >
//         {errorMessage && (
//           <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
//             {errorMessage}
//           </div>
//         )}
//         {successMessage && (
//           <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
//             {successMessage}
//           </div>
//         )}
//         <div className="mt-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter Username"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter email address"
//           />
//         </div>
//         <div className="mt-4">
//           <h2 className="text-xl text-blue-700">Password Change</h2>
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Current Password</label>
//           <input
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter current password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Repeat new password"
//           />
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-[#B5E0F6] text-black rounded hover:bg-[#B5E0F6]-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;
// import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../contexts/userContext";

// const UpdateProfile = () => {
//   const { currentUser, authToken } = useContext(UserContext);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = authToken || localStorage.getItem("access_token");
//       try {
//         const response = await fetch("http://127.0.0.1:5000/profile", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Failed to fetch profile data");
//         }

//         const userData = await response.json();
//         setUsername(userData.username || "");
//         setEmail(userData.email || "");
//       } catch (error) {
//         setErrorMessage(error.message || "Error fetching profile data");
//       }
//     };

//     fetchUserData();
//   }, [authToken]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     const updatedProfile = {
//       username,
//       email,
//       ...(newPassword && { newPassword }),
//     };

//     if (newPassword) {
//       updatedProfile.currentPassword = currentPassword;
//       if (newPassword !== confirmPassword) {
//         setErrorMessage("New passwords do not match");
//         return;
//       }
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:5000/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedProfile),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to update profile");
//       }

//       setSuccessMessage("Profile updated successfully");
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage(error.message || "Error updating profile");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-50">
//       <form
//         className="bg-white p-8 rounded shadow-md w-[900px] max-w-custom"
//         onSubmit={handleSubmit}
//       >
//         {errorMessage && (
//           <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
//             {errorMessage}
//           </div>
//         )}
//         {successMessage && (
//           <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
//             {successMessage}
//           </div>
//         )}
//         <div className="mt-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter Username"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter email address"
//           />
//         </div>
//         <div className="mt-4">
//           <h2 className="text-xl text-blue-700">Password Change</h2>
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Current Password</label>
//           <input
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter current password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Repeat new password"
//           />
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-[#B5E0F6] text-black rounded hover:bg-[#B5E0F6]-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;
// UpdateProfile.js
// import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../contexts/userContext";

// const UpdateProfile = () => {
//   const { currentUser, authToken } = useContext(UserContext);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = authToken || localStorage.getItem("access_token");
//       console.log("Fetching user data from:", "http://127.0.0.1:5000/profile");
//       console.log("Using token:", token);

//       try {
//         const response = await fetch("http://127.0.0.1:5000/profile", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Response status:", response.status);
//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error("Error fetching profile data:", errorData);
//           throw new Error(errorData.message || "Failed to fetch profile data");
//         }

//         const userData = await response.json();
//         console.log("Fetched user data:", userData);
//         setUsername(userData.username || "");
//         setEmail(userData.email || "");
//       } catch (error) {
//         setErrorMessage(error.message || "Error fetching profile data");
//       }
//     };

//     fetchUserData();
//   }, [authToken]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     const updatedProfile = {
//       username,
//       email,
//       ...(newPassword && { newPassword }),
//     };

//     if (newPassword) {
//       updatedProfile.currentPassword = currentPassword;
//       if (newPassword !== confirmPassword) {
//         setErrorMessage("New passwords do not match");
//         return;
//       }
//     }

//     console.log("Sending PATCH request to:", "http://127.0.0.1:5000/profile");
//     console.log("Using token:", token);
//     console.log("Request body:", updatedProfile);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedProfile),
//       });

//       console.log("Response status:", response.status);
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error updating profile:", errorData);
//         throw new Error(errorData.message || "Failed to update profile");
//       }

//       setSuccessMessage("Profile updated successfully");
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage(error.message || "Error updating profile");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-50">
//       <form
//         className="bg-white p-8 rounded shadow-md w-[900px] max-w-custom"
//         onSubmit={handleSubmit}
//       >
//         {errorMessage && (
//           <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
//             {errorMessage}
//           </div>
//         )}
//         {successMessage && (
//           <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
//             {successMessage}
//           </div>
//         )}
//         <div className="mt-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter Username"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter email address"
//           />
//         </div>
//         <div className="mt-4">
//           <h2 className="text-xl text-blue-700">Password Change</h2>
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Current Password</label>
//           <input
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter current password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Repeat new password"
//           />
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-[#B5E0F6] text-black rounded hover:bg-[#B5E0F6]-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;
// UpdateProfile.js
// import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../contexts/userContext";

// const UpdateProfile = () => {
//   const { currentUser, authToken } = useContext(UserContext);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState(""); // Added field
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = authToken || localStorage.getItem("access_token");
//       console.log("Fetching user data from:", "http://127.0.0.1:5000/profile");
//       console.log("Using token:", token);

//       try {
//         const response = await fetch("http://127.0.0.1:5000/profile", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Response status:", response.status);
//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error("Error fetching profile data:", errorData);
//           throw new Error(errorData.message || "Failed to fetch profile data");
//         }

//         const userData = await response.json();
//         console.log("Fetched user data:", userData);
//         setUsername(userData.username || "");
//         setEmail(userData.email || "");
//         setPhoneNumber(userData.phone_number || ""); // Handle phone number
//       } catch (error) {
//         setErrorMessage(error.message || "Error fetching profile data");
//       }
//     };

//     fetchUserData();
//   }, [authToken]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     const updatedProfile = {
//       username,
//       email,
//       phone_number: phoneNumber, // Include phone number
//       ...(newPassword && { newPassword }),
//     };

//     if (newPassword) {
//       updatedProfile.currentPassword = currentPassword;
//       if (newPassword !== confirmPassword) {
//         setErrorMessage("New passwords do not match");
//         return;
//       }
//     }

//     console.log("Sending PATCH request to:", "http://127.0.0.1:5000/profile");
//     console.log("Using token:", token);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedProfile),
//       });

//       console.log("Response status:", response.status);
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error updating profile:", errorData);
//         throw new Error(errorData.message || "Failed to update profile");
//       }

//       setSuccessMessage("Profile updated successfully");
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage(error.message || "Error updating profile");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-50">
//       <form
//         className="bg-white p-8 rounded shadow-md w-[900px] max-w-custom"
//         onSubmit={handleSubmit}
//       >
//         {errorMessage && (
//           <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
//             {errorMessage}
//           </div>
//         )}
//         {successMessage && (
//           <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
//             {successMessage}
//           </div>
//         )}
//         <div className="mt-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter Username"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter email address"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Phone Number</label>
//           <input
//             type="number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter phone number"
//           />
//         </div>
//         <div className="mt-4">
//           <h2 className="text-xl text-blue-700">Password Change</h2>
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Current Password</label>
//           <input
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter current password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="mt-1 p-2 border rounded w-full"
//             placeholder="Repeat new password"
//           />
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-[#B5E0F6] text-black rounded hover:bg-[#B5E0F6]-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;
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
        const response = await fetch("http://127.0.0.1:5000/profile", {
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
      const response = await fetch("http://127.0.0.1:5000/profile", {
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
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form
        className="bg-white p-8 rounded shadow-md w-[900px] max-w-custom"
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
