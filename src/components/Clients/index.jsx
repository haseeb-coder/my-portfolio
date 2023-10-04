import React, { useRef } from 'react';
import { Slide } from 'react-awesome-reveal';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import client01 from '../../../assets/images/client01.jpeg';
import client02 from '../../../assets/images/client02.jpeg';
import client03 from '../../../assets/images/client06.jpeg';
import client04 from '../../../assets/images/client04.jpeg';
import client05 from '../../../assets/images/client05.jpeg';

import { StyledContainer, Testimonials, Buttonse } from './style';
import ClientSlider from './ClientSlider';

let clients = [
  {
    name: 'Williams',
    position: 'Business Analytics',
    img: client01,
    stars: 5,
    disc: 'Working with Haseeb has been an absolute game-changer for our project. Their commitment to excellence and extraordinary problem-solving skills are unparalleled.Not only did they deliver ahead of schedule, but the quality of their work left us in awe. ',
  },
  {
    name: 'Anna',
    position: 'Co-founder dynmo services',
    img: client02,
    stars: 4,
    disc: 'I am truly amazed by Haseeb ability to turn complex challenges into extraordinary solutions. Their dedication to our project, combined with their innovative approach, resulted in a delivery that exceeded all expectations.',
  },
  {
    name: 'Ashubam',
    position: 'Ecomerce Store Owner',
    img: client03,
    stars: 3,
    disc: 'Haseeb is a true standout in the field of software engineering. Their extraordinary delivery not only saved our project but also propelled it to new heights. The level of professionalism and communication throughout the process was exceptional. ',
  },
  {
    name: 'Nina',
    position: 'Beaution Expert',
    img: client05,
    stars: 5,
    disc: '"I had the pleasure of working with Haseeb, and I must say, it was a transformative experience. Their dedication and attention to detail are second to none. The extraordinary delivery they provided was a game-changer for our business.',
  },
  {
    name: 'Rock Adward',
    position: 'CEO Asian-Empower',
    img: client04,
    stars: 4,
    disc: 'Haseeb is a rare gem in the world of software development. Their professionalism, and attention to detail make them a true standout. What even more impressive is their ability to deliver high-quality work well ahead of schedule.',
  },
 
];

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Clients = () => {
  const arrowRef = useRef(null);
  let clientsDic = '';
  clientsDic = clients.map((item, i) => <ClientSlider item={item} key={i} />);
  return (
    <StyledContainer id='client'>
      <Slide direction='left'>
        <span className='green'>testimonials</span>
        <h1>what clients say</h1>
      </Slide>

      <Testimonials>
        <Slider ref={arrowRef} {...settings}>
          {clientsDic}
        </Slider>
        <Buttonse>
          <button onClick={() => arrowRef.current.slickPrev()}>
            <IoIosArrowBack />
          </button>
          <button onClick={() => arrowRef.current.slickNext()}>
            <IoIosArrowForward />
          </button>
        </Buttonse>
      </Testimonials>
    </StyledContainer>
  );
};

export default Clients;
