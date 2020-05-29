import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Input } from '@rocketseat/unform';
import produce from 'immer';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import modalContext from '~/components/Modal/modalContext';
import Body from '~/components/Body';
import Panel from '~/components/Panel';
import Row from '~/components/Row';
import Maps from '~/components/Maps';
import ModalSearch from './ModalSearch';
import api from '~/services/api';

import { Container, Title, OpenSearchButton, Form, Button } from './styles';

import makerGreen from '~/assets/images/marker-green.svg';
import { sanitizeNumber } from '~/utils';
import history from '~/services/history';

function FormBusRoutes() {
  const modal = useContext(modalContext);
  const [name, setName] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [displayTime, setDisplayTime] = useState('0 min');
  const [routePoints, setRoutePoints] = useState([]);
  const [points, setPoints] = useState([]);
  const [newPoints, setNewPoints] = useState(null);
  const [location, setLocation] = useState({});

  function searchButton() {
    modal.setContent(<ModalSearch location={location} />);
    modal.setActive(true);
  }

  function setMarker(a, point) {
    setPoints(
      produce(points, draft => {
        const pointIndex = draft.findIndex(item => item.id === point.id);
        if (pointIndex >= 0) {
          if (!draft[pointIndex].selected) {
            draft[pointIndex].icon = makerGreen;
            draft[pointIndex].selected = true;

            setRoutePoints(
              produce(routePoints, draftP => {
                draftP.push({
                  ...point,
                  locationString: `${point.lat},${point.lng}`,
                });
              })
            );
          } else {
            draft[pointIndex].icon = null;
            draft[pointIndex].selected = false;
            setRoutePoints(
              produce(routePoints, draftP => {
                const removePointIndex = draftP.findIndex(
                  item => item.id === point.id
                );
                draftP.splice(removePointIndex, 1);
              })
            );
          }
        }
      })
    );
  }

  function dragCallback(results, status, pagination) {
    if (status === 'OK') {
      const allNewPoints = results
        .map(result => {
          if (result.geometry) {
            return {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
              id: result.id,
              name: result.name,
            };
          }
          return null;
        })
        .filter(result => result);

      setNewPoints(allNewPoints);

      if (pagination.hasNextPage) pagination.nextPage();
    }
  }

  function getNearBusStations({ lat, lng }, mapRef) {
    const { google } = window;
    if (google && google.maps) {
      const locationCenter = { lat, lng };
      const PlacesService = new google.maps.places.PlacesService(
        mapRef.mapRef.querySelector('iframe')
      );

      PlacesService.nearbySearch(
        {
          location: locationCenter,
          radius: 500,
          type: ['transit_station'],
        },
        dragCallback
      );
    }
  }

  function handleDragNStart(map, mapRef) {
    if (mapRef.mapRef.querySelector('iframe')) {
      getNearBusStations(
        { lat: map.center.lat(), lng: map.center.lng() },
        mapRef
      );
    } else {
      setTimeout(() => handleDragNStart(map, mapRef), 200);
    }
  }

  async function createRoute() {
    try {
      await api.post('/routes', {
        name,
        estimatedTime,
        points: routePoints,
      });

      toast.success('A rota foi adicionada com sucesso');

      history.push('/rotas');
    } catch (error) {
      toast.error('Ocorreu algum erro ao tentar salvar a rota');
    }
  }

  useEffect(() => {
    async function getCompany() {
      const { data } = await api.get('/companies');

      const {
        lastSearchCity,
        lastSearchState,
        locationLat,
        locationLng,
      } = data;

      setLocation({
        lastSearchCity,
        lastSearchState,
        lat: locationLat,
        lng: locationLng,
      });
    }

    getCompany();
  }, [modal.active]);

  useEffect(() => {
    setDisplayTime(`${Math.ceil(estimatedTime / 60)} min`);
  }, [estimatedTime]);

  useEffect(() => {
    if (newPoints && newPoints.length > 0) {
      const otherPoints = newPoints.filter(item => {
        return !(points.findIndex(point => point.id === item.id) >= 0);
      });
      setPoints([...points, ...otherPoints]);
      setNewPoints(null);
    }
  }, [newPoints, points]);

  // Get company location
  const directions = useMemo(() => {
    if (routePoints.length < 2) {
      return null;
    }
    const origin = routePoints[0].locationString;
    const destination = routePoints[routePoints.length - 1].locationString;
    const waypoints = routePoints
      .map((routePoint, index) => {
        if (index > 0 && index < routePoints.length - 1) {
          return { location: routePoint.locationString };
        }
        return null;
      })
      .filter(item => item !== null);
    return {
      origin,
      destination,
      waypoints,
    };
  }, [routePoints]);

  return (
    <Body>
      <Title>Adicionar Rota</Title>
      <Container>
        <Form>
          <Input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome/Número da rota"
            className="bus-route-form-input"
          />
          <Input
            name="estimatedTime"
            value={displayTime}
            readOnly
            placeholder="Tempo estimado"
            className="bus-route-form-input"
            onChange={e =>
              setDisplayTime(`${sanitizeNumber(e.target.value)} min`)
            }
          />
        </Form>
        <p>Clique nos pontos para definir a rota</p>
        {location.lastSearchCity && (
          <Row>
            <Panel weight={1}>
              <OpenSearchButton type="button" onClick={searchButton}>
                Trocar localidade
              </OpenSearchButton>
              <Maps
                height="350px"
                location={location}
                onDragEnd={handleDragNStart}
                onLoad={handleDragNStart}
                directions={{ ...directions, setEstimatedTime }}
                markers={{
                  points,
                  onClick: setMarker,
                }}
              />
            </Panel>
          </Row>
        )}

        {!location.lastSearchCity && (
          <Row>
            <Panel weight={1}>
              <OpenSearchButton type="button" onClick={searchButton}>
                Trocar localidade
              </OpenSearchButton>
              <h3>
                Para mostrar o mapa, por favor, clique em &quot;Trocar
                localidade&quot; e cadastre a cidade e o estado de atuação da
                rota
              </h3>
            </Panel>
          </Row>
        )}
      </Container>
      <Row>
        <Link to="/rotas">Voltar</Link>
        <Button type="button" onClick={createRoute}>
          Concluir
        </Button>
      </Row>
    </Body>
  );
}

export default FormBusRoutes;
