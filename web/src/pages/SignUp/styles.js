import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  opacity: 1;
  transition: 0.3s;
  overflow: auto;

  &.hide {
    opacity: 0;
    height: 0;
  }

  .back {
    display: flex;
    align-items: center;
    background: none;
    text-align: left;
    opacity: 0.8;
    padding: 0 8px;
    width: fit-content;
    transition: 0.2s;

    svg {
      transition: 0.2s;
    }

    &:hover {
      background: none;
      opacity: 1;
      svg {
        margin-left: -8px;
      }
    }
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  *:nth-child(1) {
    width: 70%;
    margin-right: 16px;
  }
  *:nth-child(2) {
    width: 30%;
  }
`;
