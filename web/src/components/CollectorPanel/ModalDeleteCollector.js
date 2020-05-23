import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Panel from '~/components/Panel';
import modalContext from '../Modal/modalContext';

import { ModalContent } from './styles';
import api from '~/services/api';

function ModalDeleteCollector({ collector }) {
  const modal = useContext(modalContext);

  function closeModal() {
    modal.setContent(() => <></>);
    modal.setActive(false);
  }

  async function handleDelete() {
    try {
      api.delete(`/collectors/${collector.id}`);
      toast.success(`${collector.name} deletado da lista com sucesso`);
    } catch (error) {
      toast.error('Não foi possivel deletar, tente novamente mais tarde');
    }
    closeModal();
  }

  return (
    <Panel weight={1}>
      <ModalContent>
        <p>Deseja mesmo deletar o {collector.name} da lista?</p>
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

ModalDeleteCollector.propTypes = {
  collector: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ModalDeleteCollector;
