import React, { useState, useEffect } from 'react';
import Body from '~/components/Body';
import Row from '~/components/Row';

import { Title } from './styles';
import AddButton from '~/components/AddButton';
import CollectorPanel from '~/components/CollectorPanel';
import api from '~/services/api';

function Collectors() {
  const [collectors, setCollectors] = useState([]);

  useEffect(() => {
    async function getCollectors() {
      const response = await api.get('/collectors');
      setCollectors(response.data);
    }

    getCollectors();
  });

  return (
    <Body>
      <>
        <Row>
          <Title>Motoristas e Cobradores</Title>
          <AddButton to="/cobradores-e-motoristas/add">
            Adicionar motorista / cobrador
          </AddButton>
        </Row>
        {collectors.map(collecor => (
          <CollectorPanel data={collecor} key={collecor.id} />
        ))}
      </>
    </Body>
  );
}

export default Collectors;
