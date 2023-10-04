import React, { useState } from 'react';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FiMail, FiPhoneCall } from 'react-icons/fi';
import { AiFillGithub, AiFillLinkedin, AiOutlineArrowUp } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdAlternateEmail } from 'react-icons/md';

import { StyledContainer, Profile, ArrowUp, Form } from './style';

const Footer = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Perform form submission logic here
    // For demonstration, we'll simply reset the form data
    setFormData({
      fullName: '',
      email: '',
      message: '',
    });
  };

  return (
    <StyledContainer id='contact'>
      <Profile>
        <h1> Query?</h1>
        <div className='links'>
          <Slide direction='left'>
            <h2>Contact me directly:</h2>
          </Slide>
          <div>
            <Slide direction='left'>
              <span>
                <FiPhoneCall />
              </span>
              <a href='tel:+923316207320'>+92 331 6207320</a>
            </Slide>
          </div>
          <div>
            <Slide direction='left'>
              <span>
                <HiOutlineMailOpen />
              </span>
              <a href='mailto:haseebsiddique26@gmail.com'>haseebsiddique26@gmail.com</a>
            </Slide>
          </div>
        </div>

        <div className='address'>
          <Slide direction='left'>
            <h1>Address:</h1>
            <p>Lahore, Punjab Pakistan (54780)</p>
          </Slide>
        </div>

        <div className='profiles'>
          <h1>Check my Profiles</h1>
          <Zoom>
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
          </Zoom>
        </div>

        <ArrowUp onClick={scrollUp}>
          <Fade>
            <AiOutlineArrowUp />
          </Fade>
        </ArrowUp>
      </Profile>
      <Form>
        <Slide direction='right'>
          <form>
            <div className='name'>
              <span>
                <CgProfile />
              </span>
              <input
                type='text'
                name='fullName'
                placeholder='Fullname....'
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className='email'>
              <span>
                <MdAlternateEmail />
              </span>
              <input
                type='email'
                name='email'
                placeholder='Email...'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className='message'>
              <span className='messageIcon'>
                <FiMail />
              </span>
              <textarea
                cols='30'
                rows='10'
                name='message'
                placeholder='Message'
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <button type='button' onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </Slide>
      </Form>
    </StyledContainer>
  );
};

export default Footer;
