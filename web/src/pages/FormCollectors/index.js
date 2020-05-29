import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import produce from 'immer';
import { MdDelete } from 'react-icons/md';
import { Container, Title } from './styles';

import Body from '~/components/Body';
import Form from '~/components/Form';
import Select from '~/components/Select';
import api from '~/services/api';
import history from '~/services/history';
import { sanitizeNumber, maskValues } from '~/utils';

function FormCollectors() {
  const [role, setRole] = useState('driver');
  const [dropRoutes, setDropRoutes] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState('');

  const roleOptions = useMemo(
    () => [
      { id: 'driver', name: 'Motorista' },
      { id: 'collector', name: 'Cobrador' },
    ],
    []
  );

  function cpfOrCnpjMask(cpfOrCnpjP) {
    const value = sanitizeNumber(cpfOrCnpjP);
    if (value.length <= 11) return maskValues(value, '999.999.999-99');
    return maskValues(value, '99.999.999/9999-99');
  }
  function phoneMask(phoneP) {
    const value = sanitizeNumber(phoneP);
    if (value.length <= 10) return maskValues(value, '(99) 9999-9999');
    return maskValues(value, '(99) 99999-9999');
  }

  async function submitForm(values) {
    values.role = role;
    values.routes = routes;

    try {
      await api.post('/collectors', values);
      toast.success('Usuário criado com sucesso');
      history.push('/cobradores-e-motoristas');
    } catch (error) {
      toast.error('Erro ao criar usuário');
    }
  }

  function setMasks({ target }) {
    if (target.name === 'cpfOrCnpj') {
      target.value = cpfOrCnpjMask(target.value);
    }
    if (target.name === 'phone') {
      target.value = phoneMask(target.value);
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
      <Title>Adicionar {role === 'driver' ? 'Motorista' : 'Cobrador'}</Title>
      <Container>
        <Select
          options={roleOptions}
          value={role}
          onChange={value => setRole(value)}
          defaultValue="driver"
        />
        <Form onSubmit={submitForm} onChange={setMasks}>
          <Input
            name="name"
            placeholder={`Nome do ${
              role === 'driver' ? 'Motorista' : 'Cobrador'
            }`}
            autoCapitalize="true"
            autoFocus
          />
          <Input
            name="cpfOrCnpj"
            placeholder={`CPF ou CNPJ do ${
              role === 'driver' ? 'Motorista' : 'Cobrador'
            }`}
          />
          <Input
            name="email"
            type="email"
            placeholder={`E-mail do ${
              role === 'driver' ? 'Motorista' : 'Cobrador'
            }`}
          />
          <Input
            name="phone"
            placeholder={`Telefone do ${
              role === 'driver' ? 'Motorista' : 'Cobrador'
            }`}
          />
          <Input
            name="login"
            placeholder={`Login do ${
              role === 'driver' ? 'Motorista' : 'Cobrador'
            }`}
          />
          <Input
            name="password"
            placeholder={`Uma senha para o ${
              role === 'driver' ? 'Motorista' : 'Cobrador'
            }`}
          />
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
          <button type="submit">Criar conta</button>
        </Form>
      </Container>
    </Body>
  );
}

export default FormCollectors;
