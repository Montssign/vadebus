import React, { useState } from 'react';
import Body from '~/components/Body';

import { Title, NoDataMessage } from './styles';
import RoutePanel from '~/components/RoutePanel';
import AddButton from '~/components/AddButton';
import Row from '~/components/Row';

function BusRoutes() {
  const [routes] = useState([]);

  return (
    <Body>
      <>
        <Row>
          <Title>Rotas</Title>
          <AddButton to="/rotas/add">Adicionar rota</AddButton>
        </Row>
        {routes.map(route => (
          <RoutePanel data={route} key={route.name} />
        ))}
        {routes.length === 0 && (
          <NoDataMessage>
            Não há nenhum motorista ou cobrador cadastrado, tente adicionar um
          </NoDataMessage>
        )}
      </>
    </Body>
  );
}

export default BusRoutes;
