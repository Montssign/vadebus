import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  DirectionsService,
  Autocomplete,
  InfoWindow,
} from '@react-google-maps/api';

import makerIcon from '~/assets/images/marker.svg';
import { SearchCenter } from './styles';

const mapContainerStyle = {
  width: '100%',
};

const libraries = ['geometry', 'drawing', 'places'];

function Maps({
  location,
  markers,
  directions,
  height,
  onClick,
  onCenterChanged,
  onDragEnd,
  onLoad: onLoadProp,
}) {
  const [map, setMap] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [search, setSearch] = useState('');
  const [autocomplete, setAutcomplete] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const directionsCallback = useCallback(
    response => {
      if (response !== null) {
        if (response.status === 'OK') {
          console.log(response);
          const time = response.routes[0].legs.reduce((prev, current) => {
            return prev + current.duration.value;
          }, 0);
          directions.setEstimatedTime(time);
          setDirectionsResponse(response);
        } else {
          setDirectionsResponse(null);
        }
      }
    },
    [directions]
  );

  useEffect(() => {
    setDirectionsResponse(null);
  }, [directions.destination]);

  function onLoadAutoComplete(autocompleteP) {
    setAutcomplete(autocompleteP);
  }

  function onPlaceChanged() {
    if (autocomplete && autocomplete.getPlace()) {
      const coordinates = {};
      if (
        autocomplete.getPlace().geometry &&
        autocomplete.getPlace().geometry.location
      ) {
        coordinates.lat = autocomplete.getPlace().geometry.location.lat();
        coordinates.lng = autocomplete.getPlace().geometry.location.lng();
        setCenter(coordinates);
        setSearch(
          autocomplete.getPlace().formatted_address ||
            autocomplete.getPlace().name ||
            search
        );
      }
    }
  }

  useEffect(() => {
    setCenter({ lat: location.lat, lng: location.lng });
  }, [location.lat, location.lng]);

  const asAutocomplete = useMemo(
    () =>
      !!(
        autocomplete &&
        autocomplete.getPlace() &&
        autocomplete.getPlace().geometry &&
        autocomplete.getPlace().geometry.location
      ),
    [autocomplete]
  );

  const mapOptions = {
    clickableIcons: false,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#cfc8e6' }] },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f7f5ff' }],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#574a85' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.icon',
        stylers: [{ hue: '#7863bf' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#7863bf' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#b5b2bf' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#cecce3' }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{ color: '#eae9f7' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#777777' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [{ color: '#9997a8' }],
      },
      {
        featureType: 'transit.station.bus',
        elementType: 'all',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'all',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
      libraries={libraries}
      onError={() => <h4>Erro ao carregar mapa</h4>}
      onLoad={isLoad => !isLoad && <h4>Carregando mapa</h4>}
    >
      <GoogleMap
        ref={ref => ref && setMapRef(ref)}
        center={center}
        mapContainerStyle={{ ...mapContainerStyle, height }}
        zoom={15}
        onClick={onClick}
        options={mapOptions}
        onCenterChanged={() => map && onCenterChanged(map, mapRef)}
        onDragEnd={() => map && onDragEnd(map, mapRef)}
        onLoad={mapP => {
          setMap(mapP);
          onLoadProp(mapP, mapRef);
        }}
      >
        <Autocomplete
          onLoad={onLoadAutoComplete}
          onPlaceChanged={onPlaceChanged}
        >
          <SearchCenter
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Digite uma localização"
          />
        </Autocomplete>
        <>
          {markers &&
            markers.points &&
            markers.points.map(marker => (
              <Marker
                key={marker.id}
                title={marker.name}
                icon={{
                  url: marker.icon || makerIcon,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                animation={2}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={e => markers.onClick(e, marker)}
              />
            ))}
          {asAutocomplete && (
            <Marker
              title={autocomplete.getPlace().formatted_address}
              animation={2}
              position={{
                lat: autocomplete.getPlace().geometry.location.lat(),
                lng: autocomplete.getPlace().geometry.location.lng(),
              }}
            />
          )}
        </>
        <>
          {directions && directions.destination && directions.origin && (
            <>
              {!directionsResponse && (
                <DirectionsService
                  options={{
                    origin: directions.origin,
                    destination: directions.destination,
                    waypoints: directions.waypoints,
                    travelMode: 'DRIVING',
                  }}
                  callback={directionsCallback}
                />
              )}
              {directionsResponse && (
                <DirectionsRenderer
                  options={{
                    directions: directionsResponse,
                    preserveViewport: true,
                    suppressMarkers: true,
                  }}
                />
              )}
            </>
          )}
        </>
        <>
          {asAutocomplete && (
            <InfoWindow position={center}>
              <div>Opa</div>
            </InfoWindow>
          )}
        </>
      </GoogleMap>
    </LoadScript>
  );
}

Maps.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  markers: PropTypes.shape({
    points: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        icon: PropTypes.string,
        lat: PropTypes.number,
        lng: PropTypes.number,
      })
    ),
    onClick: PropTypes.func,
  }),
  height: PropTypes.string,
  directions: PropTypes.shape({
    destination: PropTypes.string,
    origin: PropTypes.string,
    waypoints: PropTypes.arrayOf(PropTypes.any),
    setEstimatedTime: PropTypes.func,
  }),
  onClick: PropTypes.func,
  onCenterChanged: PropTypes.func,
  onDragEnd: PropTypes.func,
  onLoad: PropTypes.func,
};

Maps.defaultProps = {
  markers: null,
  directions: { origin: null, destination: null, waypoints: null },
  height: '100%',
  onClick: () => {},
  onCenterChanged: () => {},
  onDragEnd: () => {},
  onLoad: () => {},
};

export default Maps;
