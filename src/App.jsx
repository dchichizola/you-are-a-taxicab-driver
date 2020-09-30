import { h, Fragment } from 'preact';
import './App.css';
import pitchImage from './images/pitch-2.jpg';
import changeImage from './images/change.jpg';
import stateImage from './images/state.jpg';
import wonderfulImage from './images/wonderful.jpg';
import intImage from './images/int.jpg';
import newYorkImage from './images/newyork.jpg';

import { Presentation } from './components/presentation';
import { IntroSlide } from './components/slides/intro';
import { ContentsSlide } from './components/slides/contents';
import { DotPointSlide } from './components/slides/dotpoint';
import { ScrollImageSlide } from './components/slides/scrollimage';
import { CodeSlide } from './components/slides/code';
import { VectorSlide, UnitVectorSlide } from './components/slides/grid';
import { FloatSlide } from './components/slides/float';
import { LinesSlide } from './components/slides/lines';

function App() {
  const slides = [
    <IntroSlide heading="The World is New York" subtitle="and you are a taxicab 🚕 driver" />,
    <IntroSlide subtitle="Discrete space, temporal geometry and determinism in (hobbyist) game development 🎮" />,
    <IntroSlide subtitle="(a weird talk on game dev by luke kaalim)" />,
    <ContentsSlide contents={[
      <em style={{ fontStyle: 'normal', textDecoration: 'underline' }}>{"Preface (You are here ✨)"}</em>,
      "The Pitch",
      "Modeling Everything",
      "Deterministic Robots",
      "The IEEE 754 Floating Point Standard",
      "Infinite Manhattan Space",
      "A Tale of Two Lines",
      "Simulation Subdivision"
    ]} />,
    <DotPointSlide heading="Preface" points={[
      "Fun exploration of weird concepts",
      "Mostly just an excuse: these are not good ideas",
      "Really poor math skills",
      "Project is not (and nowhere near) done, very WIP",
      "Kinda more like a dev diary?"
    ]} />,
    <IntroSlide heading="The Pitch"/>,
    <ScrollImageSlide image={pitchImage} width={4096} height={4096} />,
    <DotPointSlide heading="Robot Fight Game!" points={[
      "You can move and turn your robot around",
      "You can shoot a bullet from your robot",
      "If the bullet hits an enemy robot: you win!",
    ]} />,
    <DotPointSlide heading="Robot Mechanics" points={[
      "You can move and turn your robot around",
      "Your robot can't walk through walls",
      "Your robot can't walk through other robots",
      "Your robot can shoot bullets"
    ]} />,
    <DotPointSlide heading="Bullet Mechanics" points={[
      "Bullets originate from robots",
      "Bullets fly forwards in the direction they face",
      "Bullets can hit robots (scoring points)",
      "Bullets can hit obstacles (doing nothing)",
      "Bullets stop moving when they hit something"
    ]} />,
    <ContentsSlide contents={[
      "Preface",
      "The Pitch",
      <em style={{ fontStyle: 'normal', textDecoration: 'underline' }}>{"Modeling Everything (You are here ✨)"}</em>,
      "Deterministic Robots",
      "The IEEE 754 Floating Point Standard",
      "Infinite Manhattan Space",
      "A Tale of Two Lines",
      "Simulation Subdivision"
    ]} />,
    <CodeSlide code={`
type World = {
  robots: Robot[],
  bullets: Bullet[],
  obstacles: Obstacle[],
};
    `} />,
    <CodeSlide code={`
type RobotID = string;
type Robot = {
  id: RobotID,
  position: Vector2D, // distance from origin
  direction: Vector2D, // unit vector
};
    `} />,
    <VectorSlide />,
    <UnitVectorSlide />,
    <CodeSlide code={`
type BulletID = string;
type Bullet = {
  id: BulletID,
  position: Vector2D, // distance from origin
  direction: Vector2D, // unit vector
};
    `} />,
    <CodeSlide code={`
type Obstacle = {
  position: Vector2D,
  width: number,
  height: number,
};
    `} />,
  <ScrollImageSlide image={changeImage} width={2048*1.5} height={4096*1.5} />,
  <IntroSlide heading="Deterministic Robots"/>,
  <CodeSlide code={`type Robot = {
  id: RobotID,
  position: Vector2D, // distance from origin
  direction: Vector2D, // unit vector
  velocity: Vector2D, // rate of change
}
type Bullet = {
  id: BulletID,
  position: Vector2D, // distance from origin
  // direction: Vector2D
  velocity: Vector2D, // velocity === direction * speed
};`} />,
  <CodeSlide code={`const updateWorld = (world, deltaTime) => {
  const robots = robots.map(
    robot => updateRobot(robot, deltaTime)
  );
  const bullets = bullets.map(
    bullet => updateBullet(bullet, deltaTime)
  );
  return {
    ...world,
    robots,
    bullets,
  };
}`} />,
  <CodeSlide code={`const updateRobot = (robot, deltaTime) => {
  return {
    ...robot,
    position: robot.position + (robot.velocity * deltaTime)
  };
}
// ...
// same thing for the bullet as well`} />,
  <DotPointSlide heading="Modeling Changes" points={[
    "Modeling \"linear\" Changes",
    "Can sample any point in time (deterministic!)",
    "Players cant change their velocities: a zero player game :(",
    "Really just a simulation..."
  ]} />,
  <DotPointSlide heading="Modeling Changes of Changes" points={[
    "Players take Actions that alter the Simulation State!",
    "The world is when you check your time against the Simulation State"
  ]} />,
  <CodeSlide code={`
const newState = reduce(event, previousState);
const staticWorld = simulate(state, time);
// You can consider our "state" to actually be a function 
  `} />,
  <ScrollImageSlide image={stateImage} width={2048} height={2048} />,
  <ScrollImageSlide image={wonderfulImage} width={2048} height={2048} />,
  <IntroSlide heading="The IEEE 754 Floating Point Standard"/>,
  <ContentsSlide contents={[
    "Preface",
    "The Pitch",
    "Modeling Everything",
    "Deterministic Robots",
    <em style={{ fontStyle: 'normal', textDecoration: 'underline' }}>{"The IEEE 754 Floating Point Standard (You are here ✨)"}</em>,
    "Infinite Manhattan Space",
    "A Tale of Two Lines",
    "Simulation Subdivision"
  ]} />,
  <DotPointSlide heading="By the way... how are we coding this?" points={[
    "Unity Game Engine",
    "CSharp scripts for \'behaviors\'",
    "F# Project for Simulation",
    "Standalone .NET Server... maybe 🤷",
  ]} />,
  <FloatSlide />,
  <DotPointSlide heading="Floating Point Problems" points={[
    "Small loss of precision will build up over time",
    "Desync issues with players",
    "DeltaTime is dependant on player FRAMERATE, which is always unique and random per player"
  ]} />,
  <DotPointSlide heading="Floating Points Problems" points={[
    "Most platforms implement the same floating point standard",
    "Floating point arithmetic is NON DETERMINISTIC across architectures",
    "(or rather, nothing in the spec indicates that it must be deterministic)"
  ]} />,
  <DotPointSlide heading="Floating Points Problems" points={[
    "Okay that's kinda a lie: there are ways to get cross-platform determinism",
    "But they require compiler stuff and configuration and all that jazz",
    "if only there were a simple way to measure numbers..."
  ]} />,
  <IntroSlide subtitle="int"/>,
  <ScrollImageSlide image={intImage} width={2048*1.5} height={4096*1.5} />,
  <DotPointSlide heading={`\"Integer\" Space`} points={[
    "There is a \"smallest\" distance two objects can be apart:",
    "Any closer and they are considered to be in the same spot"
  ]} />,
  <VectorSlide />,
  <DotPointSlide heading={`\"Integer\" Space`} points={[
    "Square roots of integers often don't make sense",
    "Without decimals, distances between two points often become... strange",
  ]} />,
  <IntroSlide heading="Infinite Manhattan Space"/>,
  <LinesSlide />,
  <ScrollImageSlide image={newYorkImage} width={4096*1.5} height={4096*1.5} />,
  ];
  return <main>
    <Presentation slides={slides} storeKey="SLIDES" />
  </main>;
}

export default App;
