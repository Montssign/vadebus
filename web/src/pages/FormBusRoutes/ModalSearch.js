import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import Panel from '~/components/Panel';
import Form from '~/components/Form';
import api from '~/services/api';
import modalContext from '../../components/Modal/modalContext';

import { ModalContent } from './styles';

function ModalSearch({ location }) {
  const modal = useContext(modalContext);

  async function handleSubmit(values) {
    await api.put(`/companies?city=${values.city}&state=${values.state}`);
    modal.setContent(() => <></>);
    modal.setActive(false);
  }

  return (
    <Panel weight={1}>
      <ModalContent>
        <h6>Digite a localização</h6>
        <Form
          onSubmit={handleSubmit}
          initialData={{
            city: location.lastSearchCity,
            state: location.lastSearchState,
          }}
        >
          <Input name="city" placeholder="Cidade" />
          <Input name="state" placeholder="Estado" />
          <button type="submit">Enviar</button>
        </Form>
      </ModalContent>
    </Panel>
  );
}

ModalSearch.propTypes = {
  location: PropTypes.shape({
    lastSearchCity: PropTypes.string,
    lastSearchState: PropTypes.string,
  }).isRequired,
};

export default ModalSearch;
