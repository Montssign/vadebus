import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Body({ children }) {
  return <Container>{children}</Container>;
}

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Body;
