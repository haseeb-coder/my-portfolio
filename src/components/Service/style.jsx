import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin-top: 4rem;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  h1 {
    padding-top: 1rem;
  }
  @media (max-width: 840px) {
    width: 90%;
  }
`;
export const Cards = styled.div`
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  margin-top: 4rem;
  gap: 1.2rem;
`;
