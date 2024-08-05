import React from 'react';
import { Parallax } from 'react-parallax';
import AboutUsParallax from '../assets/AboutUsParallax.jpg'


const AboutUs = () => {
    return (
        <div className='bg-gray-200'>
            <div className='header'>
                <Parallax
                    className="w-full h-[calc(100vh-5rem)] object-cover brightness-[.6]"
                    bgImage={AboutUsParallax}
                    strength={225}
                >
                    <div style={{ height: 500 }}>
                        <p className="text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] uppercase font-extralight text-blue-100 text-8xl">
                            More About UrbanBazaar
                        </p>
                        {/* <p className="text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-extralight text-blue-100 text-4xl">
                            Happy Shopping
                        </p> */}
                    </div>
                </Parallax>
            </div>
            <div className='my-8 text-center'>
                <p className="tracking-widest font-semibold uppercase text-xl p-5 text-black">
                    Welcome to UrbanBazaar!
                </p>
                <p className='text-4xl px-[20rem] pb-5 font-extralight'>UrbanBazaar is the fastest-growing e-commerce platform in the region, quickly becoming the #1 choice for online shopping. We provide a wide range of products to millions of customers from convenient locations, ensuring a seamless shopping experience. With our extensive catalog and user-friendly interface, UrbanBazaar is revolutionizing the way people shop online.</p>
            </div>

        </div>
    )
}
export default AboutUs;