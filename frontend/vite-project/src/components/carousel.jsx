"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

const Slide = ({ slide, index, current, handleSlideClick }) => {
  const slideRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    <li
      ref={slideRef}
      className="relative flex flex-1 flex-col items-center justify-center text-center text-white transition-all duration-300 ease-in-out mx-[4vmin] w-[70vmin] h-[70vmin] z-10"
      onClick={() => handleSlideClick(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden"
        style={{
          transform: current === index ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" : "none",
        }}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out"
          alt={title}
          src={src}
          onLoad={imageLoaded}
          style={{ opacity: current === index ? 1 : 0.5 }}
        />
        {current === index && (
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-1000"></div>
        )}
      </div>
      <article
        className={`relative p-4 transition-opacity duration-1000 ease-in-out ${
          current === index ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold">{title}</h2>
        <button className="mt-6 px-4 py-2 bg-white text-black rounded-2xl shadow-md hover:shadow-lg transition duration-200">
          {button}
        </button>
      </article>
    </li>
  );
};

const CarouselControl = ({ type, title, handleClick }) => (
    <button
      className={`w-10 h-10 mx-2 flex items-center justify-center bg-black dark:bg-black border border-transparent rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  
  
);

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrent((current + 1) % slides.length);
  };

  const handleSlideClick = (index) => {
    if (current !== index) setCurrent(index);
  };

  const id = useId();

  return (
    <div
      className="relative w-full max-w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
      aria-live="polite"
    >
      <h2 id={`carousel-heading-${id}`} className="sr-only">
        Image Carousel
      </h2>
      <ul
        className="absolute flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
      <div className="absolute  bg-black flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl type="previous" title="Previous slide" handleClick={handlePreviousClick} />
        <CarouselControl type="next" title="Next slide" handleClick={handleNextClick} />
      </div>
    </div>
  );
};

export default Carousel;
