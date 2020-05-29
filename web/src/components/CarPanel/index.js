import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDelete } from 'react-icons/md';

import Panel from '../Panel';
import Row from '../Row';
import modalContext from '../Modal/modalContext';
import ModalDeleteCar from './ModalDeleteCar';

import { TitleContainer } from './styles';

function CarPanel({ data }) {
  const modal = useContext(modalContext);

  function openModal() {
    modal.setContent(() => <ModalDeleteCar car={data} />);
    modal.setActive(true);
  }

  return (
    <Row>
      <Panel weight={1}>
        <TitleContainer>
          <section>
            <div className="collector-profile">
              <h3>Carro {data.number}</h3>
            </div>
            <h4>
              <strong>Placa: </strong>
              {data.plate}
            </h4>
            <h4>
              <strong>Acentos: </strong>
              {data.seats}
            </h4>
            <h4>
              <strong>Marca: </strong>
              {data.brand}
            </h4>
          </section>
          <section className="options-buttons">
            <button type="button">
              <MdEdit color="#048DDB" size={24} />
            </button>
            <button type="button" onClick={openModal}>
              <MdDelete color="#FF2020" size={24} />
            </button>
          </section>
        </TitleContainer>
      </Panel>
    </Row>
  );
}

CarPanel.propTypes = {
  data: PropTypes.shape({
    number: PropTypes.string,
    plate: PropTypes.string,
    brand: PropTypes.string,
    seats: PropTypes.number,
  }).isRequired,
};

export default CarPanel;
