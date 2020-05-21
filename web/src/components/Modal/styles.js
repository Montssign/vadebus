import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 111;
  pointer-events: none;
  transition: 0.2s;
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0;
  padding-top: 100px;

  ${props =>
    props.active &&
    css`
      pointer-events: initial;
      opacity: 1;
    `}

  > div {
    position: relative;
  }
`;

export const Background = styled.button`
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: block;
  border: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Button = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 8px;
  right: 0;
  color: rgba(0, 0, 0, 0.4);
  transition: 0.2s;

  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;
