import { useEffect, useState } from "react";

function SlideShow() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch("/data/slideshow.json")
      .then((res) => res.json())
      .then((data) => setSlides(Array.isArray(data.slides) ? data.slides : []));
  }, []);

  const handlePrev = () =>
    setCurrent((c) => (c > 0 ? c - 1 : slides.length - 1));
  const handleNext = () =>
    setCurrent((c) => (c < slides.length - 1 ? c + 1 : 0));

  useEffect(() => {
    setImgError(false);
  }, [current]);

  const slide = slides[current];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto mt-8">
      <div className="relative w-full aspect-[3/2] bg-gray-200 flex items-center justify-center rounded overflow-hidden">
        {slide && !imgError ? (
          <img
            src={slide.image}
            alt={slide.caption}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500 text-lg">No image found</span>
          </div>
        )}
      </div>
      <div className="mt-4 text-center text-lg italic min-h-[2rem]">
        {slide ? slide.caption : ""}
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={slides.length === 0}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={slides.length === 0}
        >
          Next
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        {slides.length > 0 ? `${current + 1} / ${slides.length}` : ""}
      </div>
    </div>
  );
}
export default SlideShow;
