import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { Container, ContainerOptions } from './styles';

function Select({ options, defaultValue, value: listenValue, onChange }) {
  const [value, setValue] = useState(
    options[options.findIndex(item => item.id === defaultValue)] || {}
  );
  const [show, setShow] = useState(false);

  const setValues = useCallback(
    option => {
      setValue(option);
      onChange(option.id);
      setTimeout(() => {
        setShow(false);
      }, 0);
    },
    [onChange]
  );

  useEffect(() => {
    const index = options.findIndex(item => item.id === listenValue);
    if (index >= 0) {
      setValues(options[index]);
    }
  }, [listenValue, options, setValues]);

  return (
    <Container onClick={() => setShow(!show)}>
      <p>{value.name}</p>
      <MdKeyboardArrowDown size={25} />
      <ContainerOptions show={show}>
        {options.map(option => (
          <li key={option.id}>
            <button type="button" onClick={() => setValues(option)}>
              {option.name}
            </button>
          </li>
        ))}
      </ContainerOptions>
    </Container>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  defaultValue: '',
  value: '',
  onChange: () => {},
};

export default Select;
