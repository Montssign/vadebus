/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { Container, Scroll } from './styles';

function Select({
  options,
  defaultValue,
  onChange,
  white,
  placeholder,
  value: listenValue,
}) {
  const [value, setValue] = useState(
    options[options.findIndex(item => item.id === defaultValue)] || {}
  );
  const [show, setShow] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const [quering, setQuering] = useState('');

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
    if (listenValue === '') {
      setValues('');
    }
    const index = options.findIndex(item => item.id === listenValue);
    if (index >= 0) {
      setValues(options[index]);
    }
  }, [listenValue, options, setValues]);

  useEffect(() => {
    setDisplayValue(value && value.name);
  }, [value]);

  useEffect(() => {
    setQuering('');
  }, [show]);

  const optionsFiltered = useMemo(
    () =>
      options.filter(
        item =>
          String(item.name)
            .toLowerCase()
            .indexOf(quering.toLowerCase()) >= 0
      ),
    [quering, options]
  );

  return (
    <Container white={white} onClick={() => setShow(!show)}>
      {!show && (
        <p placeholder={String(!displayValue)}>{displayValue || placeholder}</p>
      )}
      {show && (
        <input
          autoFocus
          value={quering}
          onChange={e => setQuering(e.target.value)}
          className="input-select"
          placeholder={placeholder}
        />
      )}
      <MdKeyboardArrowDown size={25} />
      <Scroll showlist={String(show)}>
        <ul>
          {optionsFiltered.length > 0 &&
            optionsFiltered.map(option => (
              <li key={option.id}>
                <button
                  className="select-button"
                  type="button"
                  onClick={() => setValues(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          {optionsFiltered.length === 0 && (
            <li>
              <button
                className="select-button"
                type="button"
                onClick={() => {}}
              >
                Não há registros no momento
              </button>
            </li>
          )}
        </ul>
      </Scroll>
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
  white: PropTypes.bool,
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  defaultValue: '',
  value: '',
  onChange: () => {},
  white: false,
  placeholder: '',
};

export default Select;
