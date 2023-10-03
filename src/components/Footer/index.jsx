import React from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FiMail, FiPhoneCall } from 'react-icons/fi';
import { AiFillGithub, AiFillLinkedin, AiOutlineArrowUp } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdAlternateEmail } from 'react-icons/md';

import { StyledContainer, Profile, ArrowUp, Form } from './style';

const Footer = () => {
  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <StyledContainer id='footer'>
      <Profile>
        <h1> Query?</h1>
        <div className='links'>
          <h2>Contact me directly:</h2>
          <div>
            <span>
              <FiPhoneCall />
            </span>
            <a href='tel:+923316207320'>+92 331 6207320</a>
          </div>
          <div>
            <span>
              <HiOutlineMailOpen />
            </span>
            <a href='mailto:haseebsiddique26@gmail.com'>haseebsiddique26@gmail.com</a>
          </div>
        </div>

        <div className='address'>
          <h1>Address:</h1>
          <p>Lahore, Punjab Pakistan (54780)</p>
        </div>

        <div className='profiles'>
          <h1>Check my Profiles</h1>
          <div className='icons'>
            <span>
              <a href='https://github.com/your-github-username'>
                <AiFillGithub />
              </a>
            </span>
            <span>
              <a href='https://github.com/haseeb-coder'>
                <AiFillLinkedin />
              </a>
            </span>
          </div>
        </div>

        <ArrowUp onClick={scrollUp}>
          <AiOutlineArrowUp />
        </ArrowUp>
      </Profile>
      <Form>
        <form>
          <div className='name'>
            <span>
              <CgProfile />
            </span>
            <input type='text' placeholder='Fullname....'></input>
          </div>

          <div className='email'>
            <span>
              <MdAlternateEmail />
            </span>
            <input type='text' placeholder='Email...'></input>
          </div>

          <div className='message'>
            <span className='messageIcon'>
              <FiMail />
            </span>
            <textarea cols='30' rows='10' placeholder='Message'></textarea>
          </div>

          <button type='button'>Submit</button>
        </form>
      </Form>
    </StyledContainer>
  );
};

export default Footer;
