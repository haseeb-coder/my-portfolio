import styled from "styled-components";



export const StyledContainer = styled.div`
  position: relative;
  top: 45%;
  right: -1rem;
`;

export const Buttons = styled.div`
  button {
    width: 2rem;
    height: 2rem;
    background-color: #02B08D;
    cursor: pointer;
    color: rgba(255, 255, 255, 100);
    border: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .back {
    left: -1rem;
  }

  .next {
    right: -1rem;
  }
`;
