import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { MdDelete } from 'react-icons/md';
import produce from 'immer';
import { Container, Title } from './styles';

import Body from '~/components/Body';
import Form from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';
import Select from '~/components/Select';

function FormCars() {
  const [seats, setSeats] = useState(null);
  const [dropRoutes, setDropRoutes] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState('');

  async function submitForm(values) {
    values.seats = Number(values.seats);
    values.routes = routes;
    try {
      await api.post('/cars', values);
      toast.success('Carro cadastrado com sucesso');

      history.push('/frota');
    } catch (error) {
      toast.error('Erro ao cadastrar carro');
    }
  }

  function setMasks({ target }) {
    if (target.name === 'seats') {
      if (Number(target.value) > 999) target.value = '999';
      setSeats(target.value);
    }
  }

  function removeFromRoutes(id) {
    setRoutes(
      produce(routes, draft => {
        const index = draft.findIndex(item => item.id === id);
        if (index >= 0) {
          draft.splice(index, 1);
        }
      })
    );
  }

  useEffect(() => {
    async function getRoutes() {
      const { data } = await api.get('/routes');
      setDropRoutes(
        data.map(routeP => {
          routeP.name = `Rota ${routeP.name}`;
          return routeP;
        })
      );
    }

    getRoutes();
  }, []);

  useEffect(() => {
    if (route) {
      const routeIndex = dropRoutes.findIndex(item => item.id === route);
      setRoutes([...routes, dropRoutes[routeIndex]]);
      setRoute('');

      setDropRoutes(
        produce(dropRoutes, draft => {
          draft.splice(routeIndex, 1);
        })
      );
    }
  }, [route, dropRoutes, routes]);

  return (
    <Body>
      <Title>Adicionar Carro</Title>
      <Container seats={seats}>
        <Form onSubmit={submitForm} onChange={setMasks}>
          <Input name="number" placeholder="Número do carro" />
          <Input name="plate" placeholder="Placa do carro" />
          <Input name="brand" placeholder="Marca do carro" />
          <section className="seats-section">
            <Input
              name="seats"
              type="number"
              min={0}
              max={999}
              maxLength={3}
              placeholder="Quantidade de acentos vagos do carro"
            />
            {seats && <p>acentos</p>}
          </section>
          {routes.length > 0 && (
            <section className="routes-section">
              {routes.map(routeP => (
                <section className="routes-pills" key={routeP.id}>
                  {routeP.name}
                  <button
                    type="button"
                    onClick={() => removeFromRoutes(routeP.id)}
                    className="routes-pills-delete"
                  >
                    <MdDelete size={25} />
                  </button>
                </section>
              ))}
            </section>
          )}
          <Select
            options={dropRoutes}
            value={route}
            onChange={setRoute}
            placeholder="Escolha uma ou mais rotas"
          />
          <button type="submit">Cadastrar Carro</button>
        </Form>
      </Container>
    </Body>
  );
}

export default FormCars;
