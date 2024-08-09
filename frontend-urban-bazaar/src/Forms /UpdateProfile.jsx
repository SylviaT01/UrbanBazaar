import React, { useState } from 'react';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      username,
      displayName,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_TOKEN_HERE' 
        },
        body: JSON.stringify(updatedProfile)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      console.log('Profile updated successfully:', result);
      

    } catch (error) {
      console.error('Error updating profile:', error);
    
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form className="bg-white p-8 rounded shadow-md w-[900px] max-w-custom" onSubmit={handleSubmit}>
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
          <label className="block text-gray-700">Display Name</label>
          <input 
            type="text" 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)} 
            className="mt-1 p-2 border rounded w-full" 
            placeholder="Enter display name" 
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
            placeholder="Repeat new password" 
          />
        </div>
        <div className="mt-6 text-center">
          <button type="submit" className="px-4 py-2 bg-[#B5E0F6] text-black rounded hover:bg-[#B5E0F6]-600">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile
