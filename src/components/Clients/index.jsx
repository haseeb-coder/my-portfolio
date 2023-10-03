import React, { useRef } from 'react';
import { Slide } from 'react-awesome-reveal';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import client from '../../../assets/images/client.png';

import { StyledContainer, Testimonials, Buttonse } from './style';
import ClientSlider from './ClientSlider';

let clients = [
  {
    name: 'John',
    position: 'Business Analytics',
    img: client,
    stars: 3,
    disc: 'Awesome work done by Haseeb',
  },
  {
    name: 'John',
    position: 'Salesforce',
    img: client,
    stars: 4,
    disc: 'Awesome work done by Haseeb',
  },
  {
    name: 'John',
    position: '',
    img: client,
    stars: 5,
    disc: 'Awesome work done by Haseeb',
  },
  {
    name: 'John',
    position: '',
    img: client,
    stars: 3,
    disc: 'Awesome work done by Haseeb',
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
