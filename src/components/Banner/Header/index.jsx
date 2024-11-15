import React, { useState } from 'react';
import { GiCandlebright } from 'react-icons/gi';

import { StyleContainer, Logo, Nav } from './style';

const Header = () => {
  const [bar, setBar] = useState(false);
  const handleBarClick = () => {
    setBar(!bar);
    
  };
  return (
    <StyleContainer bar={bar}>
      <Logo>
        <span className='green'>
          <GiCandlebright />
        </span>
        <h1>Portfolio</h1>
      </Logo>
      <Nav bar={bar}>
        <span>
          <a href='#home'>Home</a>
        </span>
        <span>
          <a href='#service'>Services</a>
        </span>
        <span>
          <a href='#client'>Testominals</a>
        </span>
        <span>
          <a href='#project'>Projects</a>
        </span>
        <span>
          <a href='#contact'>Contact</a>
        </span>
      </Nav>
      <div className='bars' onClick={handleBarClick}>
        <div className='bar' />
      </div>
    </StyleContainer>
  );
};

export default Header;
