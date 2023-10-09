import styled from 'styled-components';

export const Container = styled.div``;

export const Banner = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  height: 100vh;

  @media (max-width: 640px) {
    height: 100%;
    padding-bottom: 1rem;
  }
`;

export const StyleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  padding-left: 0.25rem
  margin: 0 auto;
  width: 80%;
  .bars{
    display: none;
  }
  @media (max-width: 840px) {
    width: 90%;
  }

  @media (max-width: 640px) {
    .bars {
      width: 40px;
      height: 40px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      z-index: 100;
      overflow: hidden;

      .bar {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: ${props => (props.bar ? 'transparent' : '#fff')};
        transition: transform 0.2s ease-in-out,
          background-color 0.2s ease-in-out;

        &:before,
        &:after {
          content: "";
          width: 100%;
          height: 2px;
          background-color: #fff;
          position: absolute;
          transition: transform 0.2s ease-in-out;
        }

        &:before {
          transform: ${props => (props.bar ? 'rotate(45deg)' : 'translateY(10px)')};
          transition: transform 0.2s ease-in-out,
            background-color 0.2s ease-in-out;
        }

        &:after {
          transform: ${props => (props.bar ? 'rotate(-45deg)' : 'translateY(-10px)')};
          transition: transform 0.2s ease-in-out,
            background-color 0.2s ease-in-out;
        }
      }
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    font-size: 1.8rem;
  }
  h1 {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

export const Nav = styled.div`
  @media (max-width: 640px) {
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: #01be96;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    gap: 2rem;
    font-weight: 700;
    height: ${props => (props.bar ? '100vh' : '0')};
    transition:
      height 0.4s ease-in-out,
      background-color 0.2s ease-in-out;
    overflow: hidden;
    z-index: 99;
  }
  span {
    margin-left: 1rem;

    a {
      color: #fff;
      text-decoration: none;
      font-weight: 400;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -5px;
        left: 0;
        background-color: #fff;
        transform: scaleX(0); /* Initially hide the underline */
        transform-origin: left;
        transition: transform 0.2s ease-in-out;
      }

      &:hover:before {
        transform: scaleX(1); /* Show the underline on hover */
        transform-origin: right;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
