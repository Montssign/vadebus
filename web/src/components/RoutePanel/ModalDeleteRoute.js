import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Panel from '~/components/Panel';
import modalContext from '../Modal/modalContext';

import { ModalContent } from './styles';
import api from '~/services/api';

function ModalDeleteRoute({ route }) {
  const modal = useContext(modalContext);

  function closeModal() {
    modal.setContent(() => <></>);
    modal.setActive(false);
  }

  async function handleDelete() {
    try {
      api.delete(`/routes/${route.id}`);
      toast.success('Rota deletado com sucesso');
    } catch (error) {
      toast.error(
        'Não foi possivel deletar esta rota, tente novamente mais tarde'
      );
    }
    closeModal();
  }

  return (
    <Panel weight={1}>
      <ModalContent>
        <p>Deseja mesmo deletar a rota {route.name}</p>
        <div>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
          <button onClick={handleDelete} type="button">
            Deletar
          </button>
        </div>
      </ModalContent>
    </Panel>
  );
}

ModalDeleteRoute.propTypes = {
  route: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ModalDeleteRoute;
