import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  .content {
    transition: transform 0.4s ease-in-out; /* Apply transition to the entire card */
    &:hover {
      transform: scale(1.1);
    }
  }
  span {
    font-size: 4rem;
  }
  h1 {
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }
  p {
    letter-spacing: 1px;
    margin-left: 15px;
    text-align: start;
    font-size: 0.9rem;
  }
`;
