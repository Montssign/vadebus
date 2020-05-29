import React, { useMemo, useContext } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';

import modalContext from '../Modal/modalContext';
import Row from '../Row';
import Panel from '../Panel';

import { TitleContainer } from './styles';
import ModalDeleteCollector from './ModalDeleteCollector';

function CollectorPanel({ data }) {
  const modal = useContext(modalContext);
  const roles = useMemo(() => {
    return data.roles
      .map(role => role.name)
      .join(', ')
      .replace(/driver/g, 'Motorista')
      .replace(/collector/g, 'Cobrador');
  }, [data]);

  function openModal() {
    modal.setContent(() => <ModalDeleteCollector collector={data} />);
    modal.setActive(true);
  }

  return (
    <Row>
      <Panel weight={1}>
        <TitleContainer>
          <section>
            <div className="collector-profile">
              <img
                src={
                  (data.avatar && data.avatar.url) ||
                  `https://api.adorable.io/avatars/50/${data.email}.png`
                }
                alt={data.name}
              />
              <h3>{data.name}</h3>
            </div>
            <h4>
              <strong>Cargo:</strong> {roles}
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

CollectorPanel.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};

export default CollectorPanel;
