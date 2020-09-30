import { h, Fragment } from 'preact';
import "./slides.css";

const DotPointSlide = ({ heading, points }) => {
  return (
    <section class="dot-point-slide">
      <h3>{heading}</h3>
      <ul>
        {points.map(point => <li>{point}</li>)}
      </ul>
  </section>
  );
}

export {
  DotPointSlide,
};