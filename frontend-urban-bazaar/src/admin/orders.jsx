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
      <div className="flex gap-5 justify-between px-5 pt-2 w-full bg-white max-w-[1240px] max-md:max-w-full items-center"></div>
      <div className="flex gap-5 justify-between items-start self-start text-base tracking-widest leading-none whitespace-nowrap text-neutral-400 max-md:max-w-full">
        <img
          src={logo}
          className="object-contain shrink-0 mt-1.5 aspect-[1.83] w-[75px]"
          alt="Logo"
        />
        <div className="flex flex-col items-start h-[41px] gap-50">
          <div className="flex px-20 flex-wrap gap-50 justify-between items-center w-full max-w-[301px]">
            <div className="flex items-center bg-stone-300 rounded h-[42px] min-w-[240px] w-[301px] px-2">
              <button
                type="button"
                className="flex items-center justify-center bg-transparent border-none p-0"
              >
                <img
                  src={search}
                  className="object-contain w-6 aspect-square mr-2"
                  alt="Search"
                />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="flex-grow bg-transparent border-none outline-none"
              />
            </div>
            <div className="flex absolute right-2 z-0 gap-5 items-center self-start bottom-[9px] min-w-[240px] w-[285px]"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-5 items-start px-2.5 pt-2.5 pb-4 min-h-[50px]">
          <DarkModeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <div className="flex gap-5 items-center w-6">
            <img
              src={bell}
              className="object-contain self-stretch my-auto w-6 aspect-square"
              alt="Notifications"
            />
          </div>
        </div>
        <div className="flex gap-2.5 justify-center items-center self-start px-1 py-1.5 min-h-[43px]">
          <img
            src={profile1}
            className="object-contain self-stretch my-auto w-8 rounded-full aspect-square"
            alt="Profile"
          />
        </div>
      </div>
      <div className="mt-7 ml-28 text-2xl font-bold tracking-tight leading-loose text-gray-800">
        Orders
      </div>
      <div className="flex flex-col mt-5 w-full max-w-[1240px] max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-base font-medium tracking-widest whitespace-nowrap min-h-[570px] max-md:mt-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
