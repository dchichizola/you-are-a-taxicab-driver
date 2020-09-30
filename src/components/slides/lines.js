import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import "./slides.css";

const SVG = ({ children, style }) => {
  return (
    <svg style={style} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

const Line = ({ start, end }) => {
  return (
    <path d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} stroke="black" stroke-width="8" />
  )
};

const ThinLine = ({ start, end }) => {
  return (
    <path d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} stroke="black" stroke-width="2" />
  )
};

const GridPattern = () => {
  return (
    <>
      <defs>
        <pattern id="smallGrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="gray" stroke-width="1"/>
        </pattern>
      </defs>
  
      <rect width="100%" height="100%" fill="url(#smallGrid)" />
    </>
  );
}

const LinesSlide = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const origin = {
    x: Math.floor((window.innerWidth / 2) / 32)*32,
    y: Math.floor((window.innerHeight / 2) / 32)*32,
  };

  const onPointerMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    setMousePos({ x: event.clientX - rect.x, y: event.clientY - rect.y });
  }
  const roundedMousePosition = {
    x: Math.floor(mousePos.x/32)*32,
    y: Math.floor(mousePos.y/32)*32,
  }
  const mouseFromOrigin = {
    x: origin.x - roundedMousePosition.x,
    y: origin.y - roundedMousePosition.y,
  };

  const start = {
    x: 0,
    y: 0,
  }
  const distance = Math.floor(Math.sqrt(
    Math.pow(mouseFromOrigin.x, 2) + Math.pow(mouseFromOrigin.y, 2)
  )/32);

  const line = [];
  for (let i = 0; i < distance + 1; i++) {
    line.push({
      x: Math.round((start.x - mouseFromOrigin.x / distance) * i/32) * 32,
      y: Math.round((start.y - mouseFromOrigin.y / distance) * i/32) * 32
    })
  }

  return (
    <section class="lines-slide" onPointerMove={onPointerMove}>
      <SVG style={{ pointerEvents: 'none' }}>
        <GridPattern />
        {line.map(({ x, y}, index) => (
          <>
            <rect x={origin.x + x} y={origin.y + y} width={32} height={32} />
            <text x={origin.x + x} y={origin.y + y} width={32} height={32}>{index}</text>
          </>
        ))}
      </SVG>
    </section>
  )
};

export {
  LinesSlide,
};
