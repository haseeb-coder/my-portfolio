import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 12.5rem;
  background-color: #4e5156;
  margin: 0 0.7rem;
  padding: 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease-in-out;
  }
  .disc {
    position: absolute; /* Fixed typo here */
    right: 0;
    left: 0;
    bottom: -10rem;
    text-align: left;
    padding: 0.5rem;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8));
    transition: all 400ms ease-in-out;

    h1 {
      font-size: 1rem;
    }
    p {
      width: 90%;
      font-size: 0.8rem;
      a {
        margin-left: 0.4rem;
        color: #001af9;
      }
    }
  }
  &:hover > img {
    transform: scale(1.3);
  }

  &:hover > .disc {
    bottom: 0;
  }
`;
