import React, { useRef } from "react";
import Slider from "react-slick";
import Project from "../Project";
import drapp from "../../../../assets/images/drapp.png";
import drapp_01 from "../../../../assets/images/drapp_01.png";
import drapp_02 from "../../../../assets/images/drapp_02.png";
import eventzero from "../../../../assets/images/eventzero.png";
import eventzero2 from "../../../../assets/images/eventzero2.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { StyledContainer, Buttons } from "./style";

let data = [
  {
    img: drapp,
    disc: "Online book your dr and meet at the Clinic or online",
    link: "https://haseeb-hellodoc-project.netlify.app/",
  },
  {
    img: drapp_01,
    disc: "Book your appointment before it's to late book know",
    link: "https://haseeb-hellodoc-project.netlify.app/",
  },
  {
    img: eventzero,
    disc: "Organize your event to reduce Carbon Emissions",
    link: "https://eventzero.io/",
  },
  {
    img: drapp_02,
    disc: "Online Book your Dr and take appointements",
    link: "https://haseeb-hellodoc-project.netlify.app/",
  },

  {
    img: eventzero2,
    disc: "Carbon free envoirmnemnt",
    link: "https://eventzero.io/",
  },
];

var settings = {
  className: "center",
  centerMode: true,
  dots: false,
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
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        centerMode: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

const SliderComponent = () => {
  const arrowRef = useRef(null);
  let sliderProjects = data.map((item, i) => <Project item={item} key={i} />);
  return (
    <StyledContainer>
      <Slider ref={arrowRef} {...settings}>
        {sliderProjects}
      </Slider>
      <Buttons>
        <button className="back" onClick={() => arrowRef.current.slickPrev()}>
          <IoIosArrowBack />
        </button>
        <button className="next" onClick={() => arrowRef.current.slickNext()}>
          <IoIosArrowForward />
        </button>
      </Buttons>
    </StyledContainer>
  );
};

export default SliderComponent;
