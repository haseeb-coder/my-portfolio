import styled from "styled-components";

export const StyledContainer = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  padding: 1.5rem 1rem;
  margin: 0 1rem;
`;

export const HeaderStyle = styled.div`
  display: flex;

  .quote {
    font-size: 3rem;
    color: #01be96;
    opacity: 0.7;
  }
  .star {
    color: #ffcd3c;
    font-size: 1.3rem;
  }
`;

export const Body = styled.p`
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
`;

export const Footer = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    width: 4rem;
    border-radius: 50px;
  }
  h1 {
    font-size: 1.2rem;
    font-weight: 700;
    @media (max-width: 580px) {
      font-size: 1rem;
    }
    @media (max-width: 538px) {
      font-size: 0.9rem;
    }
  }
  p {
    font-size: 0.8rem;
    color: #01be96;
    @media (max-width: 538px) {
      font-size: 0.6rem;
    }
  }
`;
