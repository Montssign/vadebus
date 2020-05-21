import React, { useState, useContext } from 'react';
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

function FormBusRoutes() {
  const modal = useContext(modalContext);
  const [points] = useState({ results: [] });
  function searchButton() {
    modal.setContent(<ModalSearch />);
    modal.setActive(true);
  }

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
        <Row>
          <Panel weight={1}>
            <OpenSearchButton type="button" onClick={searchButton}>
              Mostrar pontos de ônibus
            </OpenSearchButton>
            <Maps height={350}>
              {points.results.map(point => (
                <Marker
                  key={point.id}
                  position={{ lng: point.lng, lat: point.lat }}
                  icon={point.icon}
                />
              ))}
            </Maps>
          </Panel>
        </Row>
      </Container>
    </Body>
  );
}

export default FormBusRoutes;
