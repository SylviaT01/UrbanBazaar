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
                />


            </div>
        </div>
    )
}
export default AboutUs;