import { useState, useRef, useEffect, useCallback } from "react";

interface CarouselProps {
  images: { src: string; link: string }[];
  interval?: number;
}

const Carousel = ({ images, interval = 3000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);

  const changeSlide = useCallback(
    (direction: "prev" | "next") => {
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        }

        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      });
    },
    [images.length]
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = endX.current - startX.current;
    if (deltaX > 50) {
      changeSlide("prev");
    } else if (deltaX < -50) {
      changeSlide("next");
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      changeSlide("next");
    }, interval);

    return () => clearInterval(slideInterval);
  }, [changeSlide, interval]);

  return (
    <div
      className="relative w-full max-w-lg mx-auto overflow-hidden m-2 bg-white p-2"
      style={{ paddingLeft: "10%", paddingRight: "10%" }}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <a
            key={index}
            href={image.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-full px-2"
          >
            <img
              src={image.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-36 object-cover bg-gray-300 rounded-xl "
            />
          </a>
        ))}
      </div>

      {/* 캐러셀 이미지 인디케이터 */}
      <div className=" justify-center transform flex space-x-2 mt-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
