import React from 'react';
import { Parallax } from 'react-parallax';
import AboutUsParallax from '../assets/AboutUsParallax.jpg';
import AboutUsImage1 from '../assets/AboutUsImage1.jpg';
import CustomerCentric from '../assets/customer-centric.svg';
import Integrity from '../assets/Integrity.svg';
import Quality from '../assets/Quality.svg';
import Innovation from '../assets/innovation.svg';
import Sustainability from '../assets/Sustainability.svg';
import Convenience from '../assets/Convenience.svg';
import Excellence from '../assets/Excellence.svg';
import Community from '../assets/Community.svg';

const AboutUs = () => {
    const values = [
        {
            id: 1,
            icon: <img src={CustomerCentric} alt="customer-centric" />,
            title: "Customer-Centric",
            text: "We place our customers at the heart of everything we do. Our goal is to understand and anticipate their needs, ensuring a seamless and satisfying shopping experience.",
        },
        {
            id: 2,
            icon: <img src={Integrity} alt="integrity" />,
            title: "Integrity",
            text: "We uphold the highest standards of integrity in all our actions. We believe in being honest, transparent, and ethical in every aspect of our business.",
        },
        {
            id: 3,
            icon: <img src={Quality} alt="quality" />,
            title: "Quality",
            text: "Quality is at the core of our offerings.We strive to provide high-quality products and services that meet and exceed the expectations of our customers.",
        },
        {
            id: 4,
            icon: <img src={Innovation} alt="innovation" />,
            title: "Innovation",
            text: "We are committed to continuous innovation, leveraging the latest technologies to enhance our platform and deliver the best possible experience for our users.",
        },
        {
            id: 5,
            icon: <img src={Convenience} alt="convenience" />,
            title: "Convenince",
            text: "We aim to make shopping as convenient as possible by providing a wide range of products, easy-to-use interfaces, and efficient services.",
        },
        {
            id: 6,
            icon: <img src={Community} alt="community" />,
            title: "Community",
            text: "We believe in fostering a strong sense of community. UrbanBazaar is dedicated to supporting and giving back to the communities we serve.",
        },
        {
            id: 7,
            icon: <img src={Sustainability} alt="sustainability" />,
            title: "Sustainability",
            text: "We are committed to sustainable practices that protect our planet. We strive to reduce our environmental footprint and promote eco-friendly products and solutions.",
        },
        {
            id: 8,
            icon: <img src={Excellence} alt="excellence" />,
            title: "Excellence",
            text: "We pursue excellence in everything we do. From customer service to product selection, we are dedicated to achieving the highest standards of quality and performance.",
        },



    ]
    return (
        <div className='bg-gray-200'>
            <div className='header'>
                <Parallax
                    className="w-full md:h-[calc(100vh-5rem)] object-cover brightness-[.6]"
                    bgImage={AboutUsParallax}
                    strength={225}
                >
                    <div style={{ height: 500 }}>
                        <p className="text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] uppercase font-extralight text-blue-100 text-4xl md:text-8xl px-4">
                            More About UrbanBazaar
                        </p>

                    </div>
                </Parallax>
            </div>
            <div className='my-8 text-center px-4 md:px-6 lg:px-8'>
                <p className="tracking-widest font-semibold uppercase text-lg md:text-xl lg:text-2xl p-4 text-black">
                    Welcome to UrbanBazaar!
                </p>
                <p className='text-base md:text-lg lg:text-xl px-4 md:px-8 lg:px-16 pb-4 font-extralight'>UrbanBazaar is the fastest-growing e-commerce platform in the region, quickly becoming the #1 choice for online shopping. We provide a wide range of products to millions of customers from convenient locations, ensuring a seamless shopping experience. With our extensive catalog and user-friendly interface, UrbanBazaar is revolutionizing the way people shop online.</p>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-10">
                <div className="w-full h-full p-4 ">
                    <img src={AboutUsImage1} alt="Woman shopping" />
                </div>
                <div className="p-8  my-8 text-center">
                    <h2 className="text-lg capitalize font-bold">Our Mission</h2>
                    <div className="h-1 mt-2 w-224 bg-[#75c4e9]" />
                    <p className="text-xl  mt-8 leading-8 font-extralight">
                        UrbanBazaar aims to help our customers find what they need quickly and easily by offering a wide selection of products at affordable prices. We are committed to providing high-quality individual customer care and ensuring a convenient shopping experience for everyone.
                    </p>
                </div>
            </section>
            <div className="py-8">
                <div className="container mx-auto flex justify-center items-center flex-col">
                    <h2 className="text-lg font-semibold mb-4">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {values.map((value) => (
                            <div
                                key={value.id}
                                className="bg-slate-100 hover:scale-105 duration-300 ease-linear shadow-lg py-2 px-4 flex justify-start items-center gap-4 mx-8 md:mx-0 rounded-lg"
                            >
                                <div className="w-28 h-18 flex items-center justify-center bg-slate-100 rounded-full border border-blue-200 p-2">
                                    <span className="text-4xl text-blue-300">{value.icon}</span>
                                </div>
                                <div className="flex flex-col text-left">
                                    <h3 className="text-sm font-medium">{value.title}</h3>
                                    <p className="text-black font-extralight text-xs">{value.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutUs;