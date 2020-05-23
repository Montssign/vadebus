import React, { useState, useEffect, useContext } from 'react';
import Body from '~/components/Body';
import Row from '~/components/Row';
import AddButton from '~/components/AddButton';
import CarPanel from '~/components/CarPanel';

import api from '~/services/api';
import modalContext from '../../components/Modal/modalContext';

import { Title, NoDataMessage } from './styles';

function Cars() {
  const modal = useContext(modalContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function getCollectors() {
      const response = await api.get('/cars');
      setCars(response.data);
    }

    getCollectors();
  }, [modal.active]);

  return (
    <Body>
      <>
        <Row>
          <Title>Frota</Title>
          <AddButton to="/frota/add">Adicionar carro</AddButton>
        </Row>
        {cars.map(car => (
          <CarPanel data={car} key={car.id} />
        ))}
        {cars.length === 0 && (
          <NoDataMessage>
            Não há nenhum carro cadastrado, tente adicionar um
          </NoDataMessage>
        )}
      </>
    </Body>
  );
}

export default Cars;
