import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import Courses from "../features/Courses/Courses";
import Hero from "../components/Hero";
import image from "./images/course1.jpg";

const HomePage = (props: IPage) => {
  useEffect(() => {
    logging.info(`loading ${props.name}`);
  }, [props.name]);
  return (
    <div>
      <Hero
        image={image}
        title="Messen - vergleichen - verbessern"
        subtitle="Verbssere dein Golfspiel mit zuverlässigen Statistiken."
        buttonLink="/register"
        buttonText="Registrieren"
      />
      <Courses />
    </div>
  );
};

export default HomePage;
