import React from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { Container, Title } from './styles';

import Body from '~/components/Body';
import Form from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';
import { sanitizeNumber, maskValues } from '~/utils';

function FormCars() {
  function plateMas(plateP) {
    const value = sanitizeNumber(plateP);
    if (value.length <= 10) return maskValues(value, '9999999');
    return maskValues(value, '(99) 99999-9999');
  }

  async function submitForm(values) {
    values.seats = Number(values.seats);
    try {
      await api.post('/cars', values);
      toast.success('Carro cadastrado com sucesso');
      history.push('/frota');
    } catch (error) {
      toast.error('Erro ao cadastrar carro');
    }
  }

  function setMasks({ target }) {
    if (target.name === 'plate') {
      target.value = plateMas(target.value);
    }
  }

  return (
    <Body>
      <Title>Adicionar Carro</Title>
      <Container>
        <Form onSubmit={submitForm} onChange={setMasks}>
          <Input name="number" placeholder="Número do carro" />
          <Input name="plate" placeholder="Placa do carro" />
          <Input name="brand" placeholder="Marca do carro" />
          <Input
            name="seats"
            type="number"
            placeholder="Quantidade de acentos vagos do carro"
          />
          <button type="submit">Cadastrar Carro</button>
        </Form>
      </Container>
    </Body>
  );
}

export default FormCars;
