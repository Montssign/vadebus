import styled, { css } from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 16px;
    font-weight: normal;
  }

  .options-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 16px;
      background: none;
      border: none;
      opacity: 1;
      transition: 0.2s;

      &:hover {
        opacity: 0.7;
        transform: translateY(-3px);
      }
    }
  }

  .toggle-show-details {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    background: none;
    border: none;
    opacity: 1;
    transition: 0.2s;

    .toggle-show-icon {
      transition: 0.3s;
    }

    .toggle-show-icon-up {
      transform: rotate(180deg);
    }

    &:hover {
      opacity: 0.7;

      .toggle-show-icon {
        transform: translateY(-3px);
      }

      .toggle-show-icon-up {
        transform: translateY(-3px) rotate(180deg);
      }
    }
  }
`;

export const NodeContainer = styled.section`
  display: flex;
  overflow: hidden;
  max-height: 0px;
  transition: 0.2s;

  ${props =>
    props.active &&
    css`
      margin-top: 16px;
      max-height: 100px;
    `}
`;

export const Circle = styled.section`
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  color: ${props => props.color || '#d2d2d2'};
  background-color: currentColor;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Line = styled.section`
  flex: 1;
  height: 2px;
  background-color: #d2d2d2;
`;

export const Details = styled.section`
  transition: 0.2s;
  pointer-events: none;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: #f8f7fd;
  font-size: 16px;
  padding: 8px;
  position: absolute;
  border-radius: 4px;
  bottom: calc(100% + 18px);
  left: -8px;
  width: fit-content;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 15px;
    width: 0px;
    height: 0px;
    border: 8px solid transparent;
    border-left: 8px solid rgba(0, 0, 0, 0.7);
    border-bottom: 8px solid rgba(0, 0, 0, 0.7);
    transform: rotate(-45deg);
  }
`;

export const NodeItem = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  .node {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  h5 {
    font-size: 14px;
    font-weight: normal;
    max-width: 60px;
    white-space: nowrap;
  }

  ${Circle} {
    &:hover {
      ${Details} {
        opacity: 1;
      }
    }
  }
`;
