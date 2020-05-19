import React from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function Maps({ children, google, height }) {
  const containerStyle = {
    position: 'relative',
    height,
  };

  return (
    <Map
      containerStyle={containerStyle}
      google={google}
      initialCenter={{ lat: -23.6655683, lng: -46.4550519 }}
      zoom={14}
    >
      {children}
    </Map>
  );
}

Maps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  google: PropTypes.shape({
    apiKey: PropTypes.string,
  }).isRequired,
  height: PropTypes.number,
};

Maps.defaultProps = {
  children: <></>,
  height: 250,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCbCYHx1YxC07g2bD9b0CjzxGtJ-t03-sU',
})(Maps);
