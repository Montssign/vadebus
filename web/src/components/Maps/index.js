import React from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function Maps({ children, google, height, location, ...rest }) {
  const containerStyle = {
    position: 'relative',
    height,
  };

  return (
    <Map
      {...rest}
      containerStyle={containerStyle}
      google={google}
      initialCenter={location}
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
  location: PropTypes.shape({
    lng: PropTypes.string,
    lat: PropTypes.string,
  }),
};

Maps.defaultProps = {
  children: <></>,
  height: 250,
  location: { lng: 0, lat: 0 },
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCbCYHx1YxC07g2bD9b0CjzxGtJ-t03-sU',
})(Maps);
