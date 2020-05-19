import React from 'react';
import PropTypes from 'prop-types';

import { MdAdd } from 'react-icons/md';
import { Container } from './styles';

function AddButton({ children, to }) {
  return (
    <Container to={to}>
      <MdAdd size={30} /> <p>{children}</p>
    </Container>
  );
}
AddButton.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
export default AddButton;
