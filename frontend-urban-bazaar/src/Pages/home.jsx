import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';

const Home = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };

    const goToPrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className="flex items-center justify-center">
        <div className="w-full max-w-full overflow-hidden relative">
            <div className="slider-container h-full">
                <Slider ref={sliderRef} {...settings}>
                    <div className='relative'>
                        <img src={slide1} alt="Woman after shopping" className="w-full h-[400px] object-cover" />
                    </div>
                    <div className='relative'>
                        <img src={slide2} alt="Enjoy the view" className="w-full h-[400px] object-cover" />
                    </div>
                    <div className="relative">
                        <img src={slide3} alt="Smile after shopping" className="w-full h-[400px] object-cover" />
                    </div>
                </Slider>
                <button onClick={goToPrevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-300 p-2 rounded-full shadow-md z-10">
                    <GoChevronLeft />
                </button>
                <button onClick={goToNextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-300 p-2 rounded-full shadow-md z-10">
                    <GoChevronRight />
                </button>
            </div>
        </div>
        </div>
    );
};

export default Home;
