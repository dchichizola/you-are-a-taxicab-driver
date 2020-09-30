import { h, Fragment } from 'preact';
import "./slides.css";

const CodeSlide = ({ code }) => {
  return (
    <section class="code-slide">
      <pre>{code}</pre>
    </section>
  );
};

export {
  CodeSlide,
};
