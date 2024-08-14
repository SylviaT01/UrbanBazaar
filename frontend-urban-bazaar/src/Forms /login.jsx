import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import supermarket from "../assets/supermarket.jpg.jpg";
import googleIcon from "../assets/google icon.png";
import facebookIcon from "../assets/facebookIcon.png";

export default function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user) {
        if (user.is_admin === true) {
          navigate("/dashboard");
        } else {
          navigate("/"); 
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-lg bg-white rounded-lg overflow-hidden shadow-md h-[500px]">
          <div className="flex flex-col md:flex-row">
            {/* Right white half */}
            <div className="md:w-1/2 px-4 py-8 md:px-8">
              <div className="flex items-center justify-center md:h-full">
                <div className="w-full max-w-md">
                  <div className="bg-white overflow-hidden">
                    <h2 className="text-3xl font-semibold mb-4 text-center">
                      Log in
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
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
                          className="input-field border border-gray-300 rounded-md px-3 py-2 w-full"
                          placeholder="Your Email"
                        />
                      </div>
                      <div className="relative">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="input-field border border-gray-300 rounded-md px-3 py-2 w-full"
                          placeholder="Password"
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </span>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="btn-primary w-full py-2 px-4 mt-4 bg-blue-300 hover:bg-blue-500 text-white font-semibold rounded"
                        >
                          Log in
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="text-sm">
                          <Link
                            to="#"
                            className="font-medium text-blue-500 hover:text-blue-400"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mt-4 space-x-4 ">
                          <button className="flex items-center justify-center py-1 px-3 w-auto text-black rounded-md shadow-sm text-sm border border-gray-200">
                            <img
                              src={googleIcon}
                              alt="Google"
                              className="w-5 h-5 mr-2"
                            />
                            Google
                          </button>
                          <button className="flex items-center justify-center py-1 px-3 w-auto text-black rounded-md shadow-sm text-sm border border-gray-200">
                            <img
                              src={facebookIcon}
                              alt="Facebook"
                              className="w-4 h-4 mr-2"
                            />
                            Facebook
                          </button>
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">
                          Don't have an account?
                        </span>{" "}
                        <Link
                          to="/signup"
                          className="text-sm font-medium text-blue-500 hover:text-blue-400"
                        >
                          Sign up
                        </Link>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={handleGoHome}
                          className="mt-4 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-500"
                        >
                          Go Home
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Left blue half */}
            <div
              className="relative flex flex-col justify-center items-center md:w-1/2 px-4 py-4 md:px-8 bg-cover bg-center opacity-70"
              style={{
                height: "500px",
                backgroundImage: `url(${supermarket})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 opacity-50"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-semibold text-black text-center">
                  Welcome to UrbanBazaar
                </h2>
                <p className="text-black mt-4 text-center">
                  Your one stop shop for all you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
