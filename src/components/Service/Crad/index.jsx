import React from 'react';
import PropTypes from 'prop-types';
import { StyledContainer } from './style';
const Card = props => {
  const { Icon, disc, title } = props;

  return (
    <StyledContainer>
      <div className='content'>
        <span className='green'>
          <Icon />
        </span>
        <h1>{title}</h1>
        <p>{disc}</p>
      </div>
    </StyledContainer>
  );
};

Card.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  disc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
