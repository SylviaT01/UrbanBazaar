import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from "../contexts/userContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from '../assets/logo.svg';
import instagramIcon from '../assets/instagramIcon.png';
import youtubeIcon from '../assets/youtubeIcon.png';
import twitterIcon from '../assets/twitterIcon.png';
import facebookIcon from '../assets/facebookIcon.png';

const Footer = () => {
    const { authToken } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // Use the useNavigate hook

    useEffect(() => {
        AOS.init();
    }, []);

    const openLoginModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <footer className="text-black py-4 bg-blue-100 relative  ">
            <div className="container px-10 max-w-sm mx-auto md:max-w-none gap-4 mb-8 w-full">
                <div className="flex flex-col md:flex-row md:justify-between items-center p-4">
                    <Link to="/" className="mb-4 md:mb-0">
                        <img src={logo} alt="UrbanBazaar Logo" className="h-12 md:h-16" />
                    </Link>
                    <p className="text-gray-600 font-medium text-center mb-4 md:mb-0">
                        © 2024 URBANBAZAAR. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                            <img src={instagramIcon} alt="Instagram" className="h-5 w-5 md:h-6 md:w-6" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                            <img src={youtubeIcon} alt="YouTube" className="h-5 w-5 md:h-6 md:w-6" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                            <img src={twitterIcon} alt="Twitter" className="h-5 w-5 md:h-6 md:w-6" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                            <img src={facebookIcon} alt="Facebook" className="h-5 w-5 md:h-6 md:w-6" />
                        </a>
                    </div>
                </div>

                <hr className="my-8 border-t-2 border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-5 ">
                    <div className="footer-col-1 flex flex-col">
                        <h2 className="text-lg font-medium text-gray-700 underline">Our Company</h2>
                        <div className="link-col-left flex flex-col text-left gap-1 font-normal">
                            <Link to="/about" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">About us</Link>
                            <Link to="/products" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">Products</Link>
                            <Link to="/contact" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">Contact Us</Link>
                            <Link to="/privacy" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">Privacy Policy</Link>
                        </div>
                    </div>
                    <div className="footer-col-1 flex flex-col">
                        <h2 className="text-lg font-medium text-gray-700 underline">Customer Care</h2>
                        <div className="link-col-left flex flex-col text-left gap-1 font-normal">
                            <button
                                onClick={authToken ? () => navigate("/userprofile") : openLoginModal}
                                className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline text-left"
                            >
                                My Account
                            </button>
                            <Link to="/delivery" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">Delivery & Returns</Link>
                            <Link to="/faqs" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">FAQs</Link>
                        </div>
                    </div>
                    <div className="footer-col-1 flex flex-col">
                        <h2 className="text-lg font-medium text-gray-700 underline">Payment Methods</h2>
                        <div className="link-col-left flex flex-col text-left gap-1 font-normal">
                            <Link to="/mpesa" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">Mpesa</Link>
                            <Link to="/paypal" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">Paypal</Link>
                            <Link to="/payless" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">Payless</Link>
                        </div>
                    </div>
                    <div className="footer-col-1 flex flex-col">
                        <h2 className="text-lg font-medium text-gray-700 underline">Contact Us</h2>
                        <div className="link-col-left flex flex-col text-left gap-1 font-normal">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-blue-400" />
                                <p className="font-normal text-gray-700">Bilha Towers Ground Floor, Shop Number 45KE</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-blue-400" />
                                <p className="font-normal text-gray-700">+254712345678</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-blue-400" />
                                <p className="font-normal text-gray-700">urbanbazaar583@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg w-[500px] p-6">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-semibold mb-4">You need to log in</h3>
                            <p className="text-center mb-4">Please log in to access your account.</p>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-2"
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-500 text-white py-2 px-4 rounded"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
        
    );
};

export default Footer;
