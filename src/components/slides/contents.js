import { h, Fragment } from 'preact';
import "./slides.css";

const ContentsSlide = ({ contents }) => {
  return (
    <section class="contents-slide">
      <ol>
        {contents.map(content => <li>{content}</li>)}
      </ol>
    </section>
  );
};

export {
  ContentsSlide,
};