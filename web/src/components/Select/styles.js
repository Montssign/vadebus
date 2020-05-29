import styled from 'styled-components';
import PerfectScroll from 'react-perfect-scrollbar';

export const Container = styled.div`
  width: 315px;
  height: 40px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.white ? 'rgba(0,0,0,0.1)' : 'rgba(0, 0, 0, 0.4)'};
  border: none;
  color: ${props => (props.white ? '#333' : '#f8f7fd')};
  border-radius: 4px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
  cursor: pointer;

  p {
    font-size: 16px;
    padding: 8px 16px;
    width: 100%;

    &[placeholder='true'] {
      opacity: 0.7;
    }
  }

  input.input-select {
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
    border: none;
    background: none;
    padding: 8px 16px;
    top: 0;
    left: 0;
    margin: 0 !important;
    background: transparent;
  }
`;

export const Scroll = styled(PerfectScroll)`
  position: absolute;
  background-color: #f8f7fd;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  border-radius: 4px;
  overflow: hidden;
  opacity: 1;
  box-shadow: 0 0 6px #333;
  height: fit-content;
  max-height: 300px;
  z-index: 999;

  &[showlist='false'] {
    opacity: 0;
    pointer-events: none;
  }

  ul {
    li {
      transition: 0.2s;
      cursor: pointer;

      button.select-button {
        background: none;
        border: none;
        padding: 8px 16px;
        display: block;
        width: 100%;
        height: 100%;
        text-align: left;
        color: #222;
        font-size: 16px;
        font-weight: normal;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;
