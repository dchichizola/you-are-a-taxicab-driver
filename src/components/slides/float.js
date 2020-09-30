import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import "./slides.css";

const FloatSlide = () => {
  const [revealResult, setRevealResult] = useState(false);
  const [first, setFirst] = useState(0.2);
  const [second, setSecond] = useState(0.4);
  return (
    <section class="float-slide">
      <h2>Floating Point Addition</h2>
      <form>
        <div>
          <input type="number" step="0.1" value={first} onInput={event => setFirst(parseFloat(event.target.value))}/>
          +
          <input type="number" step="0.1" value={second} onInput={event => setSecond(parseFloat(event.target.value))} />
        </div>
      </form>
      <button onClick={() => setRevealResult(!revealResult)}>Reveal Result</button>
      {
        revealResult && (<output>{first + second}</output>)
      }
    </section>
  );
};

export {
  FloatSlide,
};
