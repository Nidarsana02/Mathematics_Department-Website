import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import deptImg from '../assets/images/dept_img.jpg';
import gallery2 from '../assets/images/dept_img.jpg';
import gallery3 from '../assets/images/dept_img.jpg';

const images = [
  { src: deptImg, showWelcome: true },
  { src: gallery2, showWelcome: false },
  { src: gallery3, showWelcome: false },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const changeSlide = (newIndex) => {
    setFade(false); // Start fade out
    setTimeout(() => {
      setCurrent(newIndex);
      setFade(true); // Fade back in
    }, 300); // Match fade duration (CSS: 300ms)
  };

  const nextSlide = () => {
    changeSlide((current + 1) % images.length);
  };

  const prevSlide = () => {
    changeSlide((current - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`main relative transition-opacity duration-300 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `linear-gradient(rgba(6,6,6,0.5), rgba(39,38,38,0.5)), url(${images[current].src})`,
      }}
    >
      {images[current].showWelcome && (
        <>
          <div className="welcome">
            <h1>Welcome to the Department of Mathematics</h1>
          </div>

          <div className="know_more">
            <a href="#">KNOW MORE</a>
          </div>
        </>
      )}

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
        onClick={prevSlide}
      >
        <ArrowLeft />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
        onClick={nextSlide}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default HeroCarousel;
