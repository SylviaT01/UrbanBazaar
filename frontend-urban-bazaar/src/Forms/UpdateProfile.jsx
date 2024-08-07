import React, { useState } from "react";

function UpdateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-700 py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1DA1F2' }}>
      <div className="max-w-screen-lg bg-white rounded-lg overflow-hidden shadow-md h-[500px]">
        {/* Main Content */}
        <div className=" p-8 bg-red-700">
          <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="firstName" className="block mb-1">
                First Name
              </label>
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter first name"
                />
              </div>
              <label htmlFor="lastName" className="block mb-1">
                Last Name
              </label>
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <label htmlFor="displayName" className="block mb-1">
              Display Name
            </label>
            <div className="mb-4">
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <label htmlFor="email" className="block mb-1">
              Email Address
            </label>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter email address"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">Password Change</h3>
            <label htmlFor="currentPassword" className="block mb-1">
              Current Password
            </label>
            <div className="mb-4">
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter current password"
              />
            </div>
            <label htmlFor="newPassword" className="block mb-1">
              New Password
            </label>
            <div className="mb-4">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter new password"
              />
            </div>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <div className="mb-6">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Repeat new password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
