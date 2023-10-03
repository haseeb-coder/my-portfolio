import React from 'react';
import PropTypes from 'prop-types';
import { StyledContainer } from './style';

const Project = ({ item }) => {
  const { img, disc, link } = item;
  return (
    <StyledContainer className='project'>
      <img src={img} alt='project' />
      <div className='disc'>
        <h1>{disc}</h1>
        <p>
          <a href={link} target='_blank' rel='noopener noreferrer'>
            Demo
          </a>
        </p>
      </div>
    </StyledContainer>
  );
};

Project.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string.isRequired,
    disc: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default Project;
