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

const VectorSlide = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const origin = {
    x: Math.round((window.innerWidth / 2) / 32)*32,
    y: Math.round((window.innerHeight / 2) / 32)*32,
  }

  const onPointerMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    setMousePos({ x: event.clientX - rect.x, y: event.clientY - rect.y });
  }

  const roundedMousePosition = {
    x: Math.round(mousePos.x/32)*32,
    y: Math.round(mousePos.y/32)*32,
  }

  const mouseFromOrigin = {
    x: roundedMousePosition.x - origin.x,
    y: roundedMousePosition.y - origin.y,
  };

  const midpoint = {
    x: Math.round((roundedMousePosition.x + origin.x) / 2),
    y: Math.round((roundedMousePosition.y + origin.y) / 2),
  };

  const distance = Math.round(Math.sqrt(
    Math.pow(mouseFromOrigin.x, 2) + Math.pow(mouseFromOrigin.y, 2)
  )/32);

  return (
    <section class="grid-slide" onPointerMove={onPointerMove}>
      <SVG style={{ pointerEvents: 'none' }}>
        <GridPattern />
        <Line
          start={origin}
          end={roundedMousePosition}
        />
        <text x={origin.x} y={origin.y}>{JSON.stringify({ x: 0, y: 0 })}</text>
        <text x={midpoint.x} y={midpoint.y}>{distance}</text>
        <text x={roundedMousePosition.x} y={roundedMousePosition.y}>
          {JSON.stringify({ x: mouseFromOrigin.x/32, y: mouseFromOrigin.y/32 })}
        </text>
      </SVG>
    </section>
  );
};

const UnitVectorSlide = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const origin = {
    x: Math.round((window.innerWidth / 2) / 32)*32,
    y: Math.round((window.innerHeight / 2) / 32)*32,
  }

  const onPointerMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    setMousePos({ x: event.clientX - rect.x, y: event.clientY - rect.y });
  }

  const roundedMousePosition = {
    x: Math.round(mousePos.x/32)*32,
    y: Math.round(mousePos.y/32)*32,
  }

  const mouseFromOrigin = {
    x: roundedMousePosition.x - origin.x,
    y: roundedMousePosition.y - origin.y,
  };

  const distance = Math.round(Math.sqrt(
    Math.pow(mouseFromOrigin.x, 2) + Math.pow(mouseFromOrigin.y, 2)
  ));

  const unitMouse = {
    x: (mouseFromOrigin.x/(distance/128)) + origin.x,
    y: (mouseFromOrigin.y/(distance/128)) + origin.y,
  };

  return (
    <section class="grid-slide" onPointerMove={onPointerMove}>
      <SVG style={{ pointerEvents: 'none' }}>
        <GridPattern />
        <Line
          start={origin}
          end={unitMouse}
        />
        <ThinLine
          start={origin}
          end={roundedMousePosition}
        />
          <circle
            fill="none"
            stroke="black"
            stroke-width="8"
            r={128}
            cy={origin.y}
            cx={origin.x}
          />
        <text x={roundedMousePosition.x} y={roundedMousePosition.y}>
          {JSON.stringify({ x: mouseFromOrigin.x/32, y: mouseFromOrigin.y/32 })}
        </text>
      </SVG>
    </section>
  );
};

export {
  VectorSlide,
  UnitVectorSlide,
};
