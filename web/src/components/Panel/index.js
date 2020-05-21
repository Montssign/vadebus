import React from 'react';
import PropTypes from 'prop-types';

import { Container, RealPanel } from './styles';

function Panel({ children, weight, gap }) {
  return (
    <Container weight={weight}>
      <RealPanel gap={gap}>{children}</RealPanel>
    </Container>
  );
}

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  weight: PropTypes.number.isRequired,
  gap: PropTypes.number,
};

Panel.defaultProps = {
  gap: 0,
};

export default Panel;
