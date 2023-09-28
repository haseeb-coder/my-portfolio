import React, { useState } from 'react';
import {GiCandlebright} from 'react-icons/gi';

import {StyleContainer, Logo, Nav} from './style'


const Header = () => {
  const [bar, setBar] = useState(false);
  return (
    <StyleContainer bar={bar}>
      <Logo>
        <span className='green'><GiCandlebright/></span>
          <h1>Portfolio</h1>
      </Logo>
      <Nav bar={bar}>
        <span><a href="#">Home</a></span>
        <span><a href="#">Services</a></span>
        <span><a href="#">Testominals</a></span>
        <span><a href="#">Projects</a></span>
        <span><a href="#">Portfolio</a></span>      
      </Nav>
      <div className='bars'
      onClick={() =>setBar(!bar)}>
        <div className='bar'/>
      </div>
    </StyleContainer>
  )
}

export default Header