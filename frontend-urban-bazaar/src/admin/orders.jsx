import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import darkmode from "../assets/darkmode.svg";
import bell from "../assets/bell.svg";
import profile1 from "../assets/profile1.svg";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
    return (
      <button
        type="button"
        onClick={toggleDarkMode}
        className="flex items-center justify-center bg-transparent border-none p-0"
      >
        <img
          src={darkmode}
          className={`object-contain w-6 aspect-square ${
            isDarkMode ? "filter invert" : ""
          }`}
          alt="Darkmode"
        />
      </button>
    );
  };

const Orders = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [orders, setOrders] = useState([]);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
        document.body.classList.toggle("dark-mode", !isDarkMode);

    }; 

    useEffect(() => {
        fetch("http://127.0.0.1:5000/order")
          .then((response) => response.json())
          .then((data) => setOrders(data))
          .catch((error) => console.error("Error fetching orders:", error));
      }, []);

      return (
        <div
          className={`flex overflow-hidden flex-col items-center px-20 pb-8 ${
            isDarkMode ? "bg-gray-800" : "bg-sky-50"
          } max-md:px-5`}
        >
        </div>
      )
}; 
