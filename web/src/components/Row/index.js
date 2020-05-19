import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Row({ children }) {
  return <Container>{children}</Container>;
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Row;
