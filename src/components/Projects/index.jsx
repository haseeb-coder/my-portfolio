import React from 'react';
import { Zoom } from 'react-awesome-reveal';

import SliderComponent from './Slider';
import { StyledContainer, Slide } from './style';
const Projects = () => {
  return (
    <StyledContainer id='project'>
      <Zoom>
        <h1>
          Recent <span className='green'> Projects</span>
        </h1>
        <p>I have compeleted a lot of projects</p>
      </Zoom>

      <Slide>
        <SliderComponent />
      </Slide>
    </StyledContainer>
  );
};

export default Projects;
