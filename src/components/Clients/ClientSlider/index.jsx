import React from 'react';
import PropTypes from 'prop-types';
import { IoIosQuote } from 'react-icons/io';
import { AiOutlineStar } from 'react-icons/ai';

import { StyledContainer, HeaderStyle, Body, Footer } from './style';

const ClientSlider = ({ item }) => {
  const { name, stars, img, disc, position } = item;
  return (
    <StyledContainer>
      <HeaderStyle>
        <span className='quote'>
          <IoIosQuote />
        </span>
        {Array(stars)
          .fill()
          .map((_, i) => (
            <span className='star' key={i}>
              <AiOutlineStar />
            </span>
          ))}
      </HeaderStyle>
      <Body>{disc}</Body>
      <Footer>
        <img src={img} alt={name} />
        <div className='details'>
          <h1>{name}</h1>
          <p>{position}</p>
        </div>
      </Footer>
    </StyledContainer>
  );
};

ClientSlider.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    stars: PropTypes.number,
    img: PropTypes.string,
    disc: PropTypes.string,
    position: PropTypes.string,
  }).isRequired,
};

export default ClientSlider;
