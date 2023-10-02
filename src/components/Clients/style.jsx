import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }
  span {
    font-weight: 700;
    text-transform: uppercase;
  }

  h1 {
    padding-top: 1rem;
    text-transform: capitalize;
    margin-bottom: 1rem;
  }

  .slick-list,
  .slick-slider,
  .slick-track {
    padding: 0;
  }

  .slick-dots {
    text-align: left;
    margin-left: 1rem;
  }

  .slick-dots li button:before {
    content: " ";
  }

  .slick-dots li button {
    width: 9px;
    height: 4px;
    background: linear-gradient(
      159deg,
      rgb(45, 45, 58) 0%,
      rgb(43, 43, 53) 100%
    );
    padding: 0.1rem;
    margin-top: 1rem;
    border-radius: 50px;
    transition: transform 400ms ease-in-out;
  }

  .slick-dots li.slick-active button {
    background: #01be96;
    width: 15px;
  }

  .slick-dots li {
    margin: 0;
  }
`;

export const Testimonials = styled.div`
 margin-top: 2rem
 position: relative;
`;

export const Buttonse = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-right: 1rem;
  button {
    background-color: #01be96;
    margin-left: 0.5rem;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.1rem;
  }

  @media (max-width: 530px) {
    display: none;
  }
`;
