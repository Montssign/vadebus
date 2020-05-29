import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Panel from '~/components/Panel';
import modalContext from '../../components/Modal/modalContext';

import { ModalContent } from './styles';
import Select from '~/components/Select';
import api from '~/services/api';

function ModalSearch({ location }) {
  const modal = useContext(modalContext);
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    setLoading(true);
    async function getStates() {
      const { data } = await api.get('/addresses');
      setStates(data.results.map(item => ({ id: item.uf, name: item.uf })));
      if (location.lastSearchState) {
        setState(location.lastSearchState);
      }
      setLoading(false);
    }
    getStates();
  }, [location.lastSearchState]);

  useEffect(() => {
    setLoading(true);
    async function getCities() {
      if (state) {
        const { data } = await api.get(`/addresses?uf=${state}`);
        setCities(
          data.results.map(item => ({ id: item.city, name: item.city }))
        );
        if (location.lastSearchCity) {
          setCity(location.lastSearchCity);
        }
        setLoading(false);
      }
    }

    getCities();
  }, [state, location.lastSearchCity]);

  async function handleSubmit() {
    await api.put(`/companies?city=${city}&state=${state}`);
    modal.setContent(() => <></>);
    modal.setActive(false);
  }

  return (
    <Panel weight={1}>
      <ModalContent>
        <h6>Digite a localização</h6>
        <Select
          options={states}
          white
          name="state"
          placeholder="Selecione o Estado"
          value={state}
          onChange={setState}
        />
        <Select
          options={cities}
          white
          name="city"
          placeholder="Selecione a cidade"
          value={city}
          onChange={setCity}
        />
        {loading && 'loading'}
        <button type="button" onClick={handleSubmit}>
          Enviar
        </button>
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
