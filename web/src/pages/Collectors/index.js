import React, { useState, useEffect, useContext } from 'react';
import Body from '~/components/Body';
import Row from '~/components/Row';

import { Title, NoDataMessage } from './styles';
import AddButton from '~/components/AddButton';
import CollectorPanel from '~/components/CollectorPanel';
import api from '~/services/api';
import modalContext from '../../components/Modal/modalContext';

function Collectors() {
  const modal = useContext(modalContext);
  const [collectors, setCollectors] = useState([]);

  useEffect(() => {
    async function getCollectors() {
      const response = await api.get('/collectors');
      setCollectors(response.data);
    }

    getCollectors();
  }, [modal.active]);

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
        {collectors.length === 0 && (
          <NoDataMessage>
            Não há nenhum motorista ou cobrador cadastrado, tente adicionar um
          </NoDataMessage>
        )}
      </>
    </Body>
  );
}

export default Collectors;
