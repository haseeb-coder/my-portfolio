import React from "react";
import SliderComponent from "./Slider";
import { StyledContainer, Slide } from "./style";

const Projects = () => {
  return (
    <StyledContainer>
      <h1>
        Recent <span className="green"> Projects</span>
      </h1>
      <p>My first projecct</p>

      <Slide>
        <SliderComponent/>
      </Slide>
    </StyledContainer>
  );
};

export default Projects;

