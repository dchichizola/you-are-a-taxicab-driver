import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import "./slides.css";

const useOnDrag = (onDrag) => {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0});

  const onPointerDown = (event) => {
    event.target.setPointerCapture(event.pointerId);
    setPos({ x: event.clientX, y: event.clientY });
    setDragging(true);
  };

  const onPointerUp = (event) => {
    event.target.releasePointerCapture(event.pointerId);
    setDragging(false);
  };

  const onPointerMove = (event) => {
    if (!dragging)
      return;
    onDrag({ x: pos.x - event.clientX, y: pos.y - event.clientY }, event);
    setPos({ x: event.clientX, y: event.clientY });
  };

  return [{ onPointerDown, onPointerUp, onPointerMove }];
};

const ScrollImageSlide = ({ image, height, width }) => {
  const [imagePos, setImagePos] = useState({ x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [eventHandlers] = useOnDrag(drag => setImagePos(pos => ({ x: pos.x - drag.x, y: pos.y - drag.y })));

  return (
    <section class="scroll-image-slide" {...eventHandlers}>
      <img
        height={height * zoom}
        width={width * zoom}
        style={{ pointerEvents: 'none', transform: `translate(${imagePos.x}px, ${imagePos.y}px)` }}
        src={image}
      />
      <form onSubmit={(event) => event.preventDefault()}>
        <button onClick={() => setZoom(zoom => zoom + 0.1)}>Zoom in</button>
        <button onClick={() => setZoom(zoom => zoom - 0.1)}>Zoom out</button>
        <button onClick={() => setImagePos({ x: 0, y: 0 })}>Reset</button>
      </form>
    </section>
  );
};

export {
  ScrollImageSlide,
};
