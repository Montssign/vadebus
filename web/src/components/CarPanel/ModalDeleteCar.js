import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Panel from '~/components/Panel';
import modalContext from '../Modal/modalContext';

import { ModalContent } from './styles';
import api from '~/services/api';

function ModalDeleteCar({ car }) {
  const modal = useContext(modalContext);

  function closeModal() {
    modal.setContent(() => <></>);
    modal.setActive(false);
  }

  async function handleDelete() {
    try {
      api.delete(`/cars/${car.id}`);
      toast.success('Carro deletado com sucesso');
    } catch (error) {
      toast.error(
        'Não foi possivel deletar este carro, tente novamente mais tarde'
      );
    }
    closeModal();
  }

  return (
    <Panel weight={1}>
      <ModalContent>
        <p>Deseja mesmo deletar o carro {car.number}</p>
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

ModalDeleteCar.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,
};

export default ModalDeleteCar;
