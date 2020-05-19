import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  flex: 1;

  @media (max-width: 1200px) {
    max-width: 1000px;
  }

  @media (max-width: 1000px) {
    max-width: 800px;
  }
`;
