import { useState, useEffect } from 'react';

import eye1 from '../assets/images/homepage/Img1.png'
import eye2 from '../assets/images/homepage/Img2.png'
import eye3 from '../assets/images/homepage/Img3.png'

const images = [eye1, eye2, eye3];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = images.length;
  const slideDuration = 3000;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [current, isPaused]);

  return (
    <div
      className="relative cursor-pointer w-full h-[50vh] sm:h-[60vh] lg:h-[65vh] overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 z-20">
        <div
          className="h-full bg-[#4c83bb] transition-all duration-300"
          style={{
            width: `${((current + 1) / totalSlides) * 100}%`,
          }}
        />
      </div>

      {/* Slide */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
