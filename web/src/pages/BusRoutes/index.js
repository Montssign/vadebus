import React, { useState, useEffect, useContext } from 'react';
import Body from '~/components/Body';

import { Title, NoDataMessage } from './styles';
import RoutePanel from '~/components/RoutePanel';
import AddButton from '~/components/AddButton';
import Row from '~/components/Row';
import api from '~/services/api';
import modalContext from '../../components/Modal/modalContext';

function BusRoutes() {
  const modal = useContext(modalContext);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    async function getRoutes() {
      const { data } = await api.get('/routes');

      setRoutes(data);
    }

    getRoutes();
  }, []);

  useEffect(() => {
    async function getRoutes() {
      const response = await api.get('/routes');
      setRoutes(response.data);
    }

    getRoutes();
  }, [modal.active]);

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
            Não há nenhuma rota cadastrada, tente adicionar uma
          </NoDataMessage>
        )}
      </>
    </Body>
  );
}

export default BusRoutes;
