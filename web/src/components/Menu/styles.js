import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding: 16px;
    font-size: 16px;
    color: #6c8bf5;
    opacity: 0.8;

    &[active='true'] {
      opacity: 1;
      font-weight: bold;
    }
  }
`;
