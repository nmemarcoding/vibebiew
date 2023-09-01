import React, { useState } from 'react';
import { publicRequest } from '../../hooks/requestMethods';
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    publicRequest().post('/auth/register', formData)
    .then(res => {
        navigate('/login');
    })
    .catch(err => console.log(err))

  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 sm:p-8 rounded-lg sm:shadow-md w-full sm:w-96 sm:border">
        <div className="flex justify-center mb-6">
          <span className="text-4xl font-bold text-[#6F9A47]">VibeView</span>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="First Name" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Last Name" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input 
                    type="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Email" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                <input 
                    type="password" 
                    name="password"
                    value={formData.password} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Password" 
                />
            </div>
            <button type="submit" className="w-full bg-[#style: changed theme color]  p-2 rounded-md hover:bg-blue-600 mb-4">Sign Up</button>
        </form>

        <div className="text-center">
          <span className="text-gray-600">Already have an account?</span>
          <a href="/login" className="text-[#6F9A47] font-bold ml-2 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
