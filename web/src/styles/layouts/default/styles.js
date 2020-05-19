import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import bus from '~/assets/images/bus.jpg';

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(
      234.58deg,
      rgba(112, 0, 255, 0.74) 0%,
      #6c8bf5ee 100%
    ),
    url(${bus});
`;

export const Content = styled(PerfectScrollbar)`
  max-height: 100vh;
  width: 100vw;
  overflow-y: auto;
  max-height: calc(100vh - 64px);
`;
