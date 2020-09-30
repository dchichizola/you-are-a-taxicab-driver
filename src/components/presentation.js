import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './presentation.css';

const useIndexedSlides = (storeKey) => {
  const storedSlideIndex = parseInt(window.localStorage.getItem(storeKey, 10) || '0');

  const [slideIndex, setSlideIndex] = useState(storedSlideIndex);

  const setAndStoreSlide = (newSlideIndex) => {
    console.log('current', slideIndex)
    console.log('set', newSlideIndex)
    window.localStorage.setItem(storeKey, newSlideIndex)
    setSlideIndex(newSlideIndex);
  };
  return [slideIndex, setAndStoreSlide]
};

const useGlobalEvent = (event, handler) => {
  useEffect(() => {
    window.addEventListener(event, handler);

    return () => {
      window.removeEventListener(event, handler);
    };
  }, [event, handler]);
}


const Presentation = ({ slides, storeKey }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useIndexedSlides(storeKey);
  const onKeyDown = (event) => {
    switch (event.keyCode) {
      case 37:
        setActiveSlideIndex(Math.max(0, activeSlideIndex - 1)); break;
      case 39:
        setActiveSlideIndex(Math.min(activeSlideIndex + 1, slides.length - 1)); break;
    }
  };

  useGlobalEvent('keydown', onKeyDown);

  return (
    <>
      <input
        class="presentation-controls" type="range"
        min={0} max={slides.length - 1} step={1}
        value={activeSlideIndex}
        onInput={event => setActiveSlideIndex(event.target.value)}
      />
      <article class="presentation">
        {slides.map((slideElement, slideIndex) => <Slide offset={slideIndex - activeSlideIndex} children={slideElement} />)}
      </article>
    </>
  );
};

const Slide = ({ offset, children }) => {
  return (
    <section class="slide" style={{ transform: `translate(${offset * 100}%)` }}>
      {children}
    </section>
  );
};

export {
  Presentation,
  Slide,
};
