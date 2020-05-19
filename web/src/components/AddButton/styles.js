import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  background-color: rgb(4, 141, 219);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  color: #f8f7fd;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 8px;

  p {
    margin-left: 8px;
  }
`;
