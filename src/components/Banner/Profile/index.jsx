import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { AiOutlineInstagram, AiOutlineGithub } from 'react-icons/ai';
import { GiEarthAmerica } from 'react-icons/gi';
import { FaLinkedinIn } from 'react-icons/fa';

import myImage from '../../../../assets/images/myImage.png';

import { StyleContainer, Texts, Social, Profile } from './style';

const ProfileComponent = () => {
  return (
    <StyleContainer id='home'>
      <Slide direction='left'>
        <Texts>
          <h4>
            Hi...!<span className='green'> I am</span>
          </h4>
          <h1 className='green'>Haseeb ur Rehman</h1>
          <h3>Software Engineer</h3>
          <p>
            As a dedicated Software Engineer, I am passionate about harnessing technology to drive innovation and solve
            complex problems. With a proven track record of designing and developing cutting-edge software solutions, I
            bring a dynamic blend of technical expertise and creativity to every project I undertake.
          </p>
          <button>Lets talk</button>
          <Social>
            <p>Check out my</p>
            <div className='social-icons'>
              <span>
                <a href='#'>
                  <AiOutlineInstagram />
                </a>
              </span>
              <span>
                <a href='#'>
                  <GiEarthAmerica />
                </a>
              </span>
              <span>
                <a href='https://www.linkedin.com/in/haseeb-ur-rehman-siddique-b92542173'>
                  <FaLinkedinIn />
                </a>
              </span>
              <span>
                <a href='https://github.com/haseeb-coder'>
                  <AiOutlineGithub />
                </a>
              </span>
            </div>
          </Social>
        </Texts>
      </Slide>
      <Slide direction='right'>
        <Profile>
          <img src={myImage} alt='' />
        </Profile>
      </Slide>
    </StyleContainer>
  );
};

export default ProfileComponent;
