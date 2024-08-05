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

