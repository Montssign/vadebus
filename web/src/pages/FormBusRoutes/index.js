import React from 'react';
import { Input } from '@rocketseat/unform';

import { Marker } from 'google-maps-react';
import Body from '~/components/Body';
import Form from '~/components/Form';
import Panel from '~/components/Panel';
import Row from '~/components/Row';
import Maps from '~/components/Maps';
import points from '~/services/points.json';
import { Container, Title } from './styles';

function FormBusRoutes() {
  // function markClick({ position }) {}

  return (
    <Body>
      <Title>Adicionar Rota</Title>
      <Container>
        <Form maxwidth="100%">
          <Input name="name" placeholder="Nome da rota" />
          <p>Clique nos pontos para definir a rota</p>
          <Row>
            <Panel weight={1}>
              <Maps height={350}>
                {points.results.map(point => (
                  <Marker
                    key={point.id}
                    position={{ lng: point.lng, lat: point.lat }}
                    icon={point.icon}
                    // onClick={markClick}
                  />
                ))}
              </Maps>
            </Panel>
          </Row>
        </Form>
      </Container>
    </Body>
  );
}

export default FormBusRoutes;
