import React, { useState } from 'react';

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-custom" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              className="mt-1 p-2 border rounded w-full" 
              placeholder="Enter first name" 
            />
          </div>
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              className="mt-1 p-2 border rounded w-full" 
              placeholder="Enter last name" 
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Display Name</label>
          <input 
            type="text" 
            name="displayName" 
            value={formData.displayName} 
            onChange={handleChange} 
            className="mt-1 p-2 border rounded w-full" 
            placeholder="Enter display name" 
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="mt-1 p-2 border rounded w-full" 
            placeholder="Enter email address" 
          />
        </div>






















































      </form>
    </div>
   
  )  
};

export default UpdateProfileForm;