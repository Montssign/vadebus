import React from 'react';
import PropTypes from 'prop-types';

import { Container, RealPanel } from './styles';

function Panel({ children, weight }) {
  return (
    <Container weight={weight}>
      <RealPanel>{children}</RealPanel>
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
};

export default Panel;
