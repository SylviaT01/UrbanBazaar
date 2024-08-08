// Forms/SignUp.jsx
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import mall from '../assets/mall.jpg';


export default function SignUp() {
  const { signup } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}/.test(password)) {
      setError('Password must be at least 8 characters long and include numbers and symbols');
      return;
    }
      signup(name, email, password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-lg bg-customBlue rounded-lg overflow-hidden shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Left half with image */}
          <div
            className="bg-cover bg-center md:w-1/2"
            style={{ backgroundImage: `url(${mall})` }}
          >
            {/* <div className="bg-blue-300 bg-opacity-50 h-full flex flex-col justify-center items-center p-4 md:p-12">
              <h2 className="text-4xl font-semibold text-gray-700 text-center">Join Medimart</h2>
              <p className="text-gray-700 mt-4 text-center">Create your account today.</p>
            </div> */}
          </div>

          {/* Right half with form */}
          <div className="md:w-1/2 px-4 py-8 md:px-12">
            <div className="flex items-center justify-center md:h-full">
              <div className="w-full max-w-md">
                <div className="bg-customBlue overflow-hidden">
                  <h2 className="text-3xl font-semibold mb-4 text-center">Sign up</h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Your Username"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder=" Your Phone Number"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Password"
                      />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </span>
                    </div>
                    <div className="relative">
                      <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
                        Repeat Password
                      </label>
                      <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Repeat Password"
                      />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center cursor-pointer"
                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                      >
                        <FontAwesomeIcon icon={showPasswordConfirmation ? faEyeSlash : faEye} />
                      </span>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full py-2 px-4 mt-4 bg-blue-300 hover:bg-blue-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="mt-6 text-center">
                    <div className="text-gray-500">or</div>
                    <div className="flex items-center justify-center mt-4 space-x-4">
                      <button className="flex items-center justify-center py-1 px-3 w-auto bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm text-sm">
                        <img src="/path/to/google-icon.png" alt="Google" className="w-4 h-4 mr-2" />
                          Sign up with Google
                      </button>
                      <button className="flex items-center justify-center py-1 px-3 w-auto bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm text-sm">
                        <img src="/path/to/facebook-icon.png" alt="Facebook" className="w-4 h-4 mr-2" />
                         Sign up with Facebook
                      </button>
                    </div>
                  </div>
                    <div className="text-center mt-4">
                      <span className="text-sm text-gray-600">Already have an account?</span>{' '}
                      <Link to="/login" className="text-sm font-medium text-blue-500 hover:text-blue-400">
                        Sign in
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
