import styled from 'styled-components';

export const Container = styled.div`
  flex: ${props => props.weight || 0};
  transition: 0.2s;

  &:nth-child(1) {
    margin-left: 0;
  }

  &:nth-last-child(1) {
    margin-right: 0;
  }

  @media (max-width: 800px) {
    flex: unset;
    width: 100%;
  }
`;

export const RealPanel = styled.div`
  border-radius: 4px;
  background: #f8f7fd;
  padding: 16px;
  margin: 8px;
  transition: 0.2s;
`;
