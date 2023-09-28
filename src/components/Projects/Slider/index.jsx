import React from "react";
import Slider from "react-slick";
import Project from "../Project";

let data = [
  {
    img: "../../../../images/drapp.png",
    disc: "my first project",
  },

  {
    img: "../../../../images/drapp.png",
    disc: "my first project",
  },
  {
    img: "../../../../images/drapp.png",
    disc: "my first project",
  },
  {
    img: "../../../../images/drapp.png",
    disc: "my first project",
  },
  {
    img: "../../../../images/drapp.png",
    disc: "my first project",
  },
  {
    img: "../../../../images/drapp.png",
    disc: "my first project",
  },
];
var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
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
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SliderComponent = () => {
  let sliderProject = "";
  sliderProject = data.map((item, i) => <Project item={item} key={i} />);
  return <Slider {...settings}>{sliderProject}</Slider>;
};

export default SliderComponent;
