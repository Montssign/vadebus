import React, { useState, useContext, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { Marker } from 'google-maps-react';

import modalContext from '~/components/Modal/modalContext';
import Body from '~/components/Body';
import Form from '~/components/Form';
import Panel from '~/components/Panel';
import Row from '~/components/Row';
import Maps from '~/components/Maps';
import ModalSearch from './ModalSearch';
import { Container, Title, OpenSearchButton } from './styles';
import api from '~/services/api';

function FormBusRoutes() {
  const modal = useContext(modalContext);
  const [points, setPoints] = useState([]);
  const [location, setLocation] = useState({
    lastSearchCity: null,
    lastSearchState: null,
    lng: null,
    lat: null,
  });

  function searchButton() {
    modal.setContent(<ModalSearch location={location} />);
    modal.setActive(true);
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
    async function getPoints() {
      if (location.lastSearchCity && location.lastSearchState) {
        const { data } = await api.get(
          `/bus-stations?city=${location.lastSearchCity}&state=${location.lastSearchState}`
        );

        setPoints(data.busStations);
      }
    }

    getPoints();
  }, [location]);

  return (
    <Body>
      <Title>Adicionar Rota</Title>
      <Container>
        <Form maxwidth="100%">
          <Input
            name="name"
            placeholder="Nome da rota"
            className="bus-route-form-input"
          />
        </Form>
        <p>Clique nos pontos para definir a rota</p>
        {location.lastSearchCity && (
          <Row>
            <Panel weight={1}>
              <OpenSearchButton type="button" onClick={searchButton}>
                Trocar localidade
              </OpenSearchButton>
              <Maps height={350} location={location}>
                {points.map(point => (
                  <Marker
                    key={point.id}
                    label={point.name}
                    position={{ lng: point.lng, lat: point.lat }}
                    icon={point.icon}
                  />
                ))}
              </Maps>
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
    </Body>
  );
}

export default FormBusRoutes;
