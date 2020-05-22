import styled, { css } from 'styled-components';

export const Container = styled.ul`
  width: 315px;
  height: 40px;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  padding: 8px 16px;
  color: #f8f7fd;
  border-radius: 4px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const ContainerOptions = styled.ul`
  position: absolute;
  background-color: #f8f7fd;
  color: #222;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  border-radius: 4px;
  overflow: hidden;
  opacity: 1;

  ${props =>
    !props.show &&
    css`
      opacity: 0;
      pointer-events: none;
    `}

  li {
    transition: 0.2s;
    cursor: pointer;

    button {
      background: none;
      border: none;
      padding: 8px 16px;
      display: block;
      width: 100%;
      height: 100%;
      text-align: left;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;
