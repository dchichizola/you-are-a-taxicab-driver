import { h, Fragment } from 'preact';
import "./slides.css";

const IntroSlide = ({ heading, subtitle }) => {
  return (
    <section class="intro-slide">
      <h2>{heading}</h2>
      <p>{subtitle}</p>
    </section>
  );
};

export {
  IntroSlide,
};