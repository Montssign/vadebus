import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin-top: 16px;

  .bus-route-form-input {
    max-width: 350px;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #f8f7fd;
  margin: 16px 0 0;
`;

export const OpenSearchButton = styled.button`
  position: absolute;
  top: -32px;
  right: 16px;
  z-index: 1;
  max-width: 200px;
  width: 100%;
  margin: 5px 0 0;
  height: 44px;
  background: #3b9eff;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, '#3b9eff')};
  }
`;

export const Modal = styled.section`
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalContent = styled.section`
  margin-top: 16px;
  font-size: 40px;

  h6 {
    margin-bottom: 16px;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    color: #222;

    &::placeholder {
      color: #555;
    }
  }
`;
