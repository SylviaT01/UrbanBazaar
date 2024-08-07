import { Link } from 'react-router-dom';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";
import logo from '../assets/logo.svg';
import instagramIcon from '../assets/instagramIcon.png';
import youtubeIcon from '../assets/youtubeIcon.png';
import twitterIcon from '../assets/twitterIcon.png';
import facebookIcon from '../assets/facebookIcon.png';

const Footer = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <footer className="text-black py-4 bg-blue-100">
            <div className="container mx-auto px-10">
                <div className="flex justify-between items-center">
                    <Link to="/">
                        <img src={logo} alt="UrbanBazaar Logo" className="h-16" />
                    </Link>
                    <p className="text-gray-600 font-medium text-center">© 2024 URBANBAZAAR. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                            <img src={instagramIcon} alt="Instagram" className="h-6 w-6" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                            <img src={youtubeIcon} alt="YouTube" className="h-6 w-6" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                            <img src={twitterIcon} alt="Twitter" className="h-6 w-6" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                            <img src={facebookIcon} alt="Facebook" className="h-6 w-6" />
                        </a>
                    </div>
                </div>
                <hr className="my-8 border-t-2 border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-5">
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
                            <Link to="/account" className="footer-nav-links text-gray-700 hover:text-blue-500 hover:underline">My Account</Link>
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
                                <p className="font-normal text-gray-700">urbanbazaar@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
