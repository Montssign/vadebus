import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import jsonp from 'jsonp';
import logo from '~/assets/images/logo.svg';
import { sanitizeNumber, maskValues } from '~/utils';

import { signUpRequest } from '~/store/modules/auth/actions';

import { Container, Row } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  fantasy: Yup.string().required('O nome fantasia é obrigatório'),
  cnpj: Yup.string()
    .min(14, 'O CNPJ possui 14 números')
    .required('O CNPJ é obrigatório'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [page, setPage] = useState(1);
  const [cnpj, setCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fantasy, setFantasy] = useState('');
  const [cep, setCep] = useState('');
  const [number, setNumber] = useState('');
  const [publicPlace, setPublicPlace] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [nation, setNation] = useState('');
  const [complement, setComplement] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(
      signUpRequest({
        name,
        email,
        phone,
        password,
        company: {
          cnpj: sanitizeNumber(cnpj),
          name: companyName,
          fantasy,
          address: JSON.stringify({
            cep,
            number,
            publicPlace,
            neighborhood,
            city,
            state,
            nation,
            complement,
          }),
        },
      })
    );
  }

  useEffect(() => {
    const CNPJ = sanitizeNumber(cnpj);
    async function test() {
      jsonp(
        `https://www.receitaws.com.br/v1/cnpj/${CNPJ}`,
        {},
        (err, value) => {
          if (!err && value) {
            setCompanyName(value.nome);
            setFantasy(value.fantasia);
            setCep(value.cep);
            setNumber(value.numero);
            setPublicPlace(value.logradouro);
            setNeighborhood(value.bairro);
            setCity(value.municipio);
            setState(value.uf);
            setNation('BR');
            setComplement(value.complemento);
          }
        }
      );
    }

    if (CNPJ.length === 14) {
      test();
    }
  }, [cnpj]);

  function cnpjMask(value) {
    value = sanitizeNumber(value);
    if (value.length > 14) return cnpj;
    return maskValues(value, '99.999.999/9999-99');
  }

  function phoneMask(value) {
    value = sanitizeNumber(value);
    if (value.length <= 10) return maskValues(value, '(99) 9999-9999');
    return maskValues(value, '(99) 99999-9999');
  }

  function cepMask(value) {
    value = sanitizeNumber(value);
    return maskValues(value, '99999-999');
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Container className={page === 1 ? '' : 'hide'}>
          <Input
            name="cnpj"
            value={cnpj}
            type="text"
            autoComplete="off"
            onChange={e => setCnpj(cnpjMask(e.target.value))}
            placeholder="CNPJ da empresa"
          />
          <Input
            name="companyName"
            value={companyName}
            type="text"
            autoComplete="off"
            onChange={e => setCompanyName(e.target.value)}
            placeholder="Nome da empresa"
          />
          <Input
            name="fantasy"
            value={fantasy}
            type="text"
            autoComplete="off"
            onChange={e => setFantasy(e.target.value)}
            placeholder="Nome fantasia"
          />

          <button type="button" onClick={() => setPage(2)}>
            Próximo
          </button>
        </Container>

        <Container className={page === 2 ? '' : 'hide'}>
          <button className="back" type="button" onClick={() => setPage(1)}>
            <BsArrowLeft size={30} /> Voltar
          </button>
          <Row>
            <Input
              name="cep"
              value={cep}
              type="text"
              autoComplete="cep"
              onChange={e => setCep(cepMask(e.target.value))}
              placeholder="CEP"
            />
            <Input
              name="state"
              value={state}
              type="text"
              autoComplete="state"
              onChange={e => setState(e.target.value)}
              placeholder="Estado"
            />
          </Row>
          <Row>
            <Input
              name="publicPlace"
              value={publicPlace}
              type="text"
              autoComplete="public-place"
              onChange={e => setPublicPlace(e.target.value)}
              placeholder="Logradouro"
            />
            <Input
              name="number"
              value={number}
              type="text"
              autoComplete="number"
              onChange={e => setNumber(e.target.value)}
              placeholder="Número"
            />
          </Row>
          <Row>
            <Input
              name="complement"
              value={complement}
              type="text"
              autoComplete="complement"
              onChange={e => setComplement(e.target.value)}
              placeholder="Complemento"
            />
            <Input
              name="nation"
              value={nation}
              type="text"
              autoComplete="nation"
              onChange={e => setNation(e.target.value)}
              placeholder="País"
            />
          </Row>
          <Input
            name="city"
            value={city}
            type="text"
            autoComplete="city"
            onChange={e => setCity(e.target.value)}
            placeholder="Cidade"
          />
          <Input
            name="neighborhood"
            value={neighborhood}
            type="text"
            autoComplete="neighborhood"
            onChange={e => setNeighborhood(e.target.value)}
            placeholder="Bairro"
          />
          <button type="button" onClick={() => setPage(3)}>
            Próximo
          </button>
        </Container>
        <Container className={page === 3 ? '' : 'hide'}>
          <button className="back" type="button" onClick={() => setPage(2)}>
            <BsArrowLeft size={30} /> Voltar
          </button>
          <Input
            name="name"
            value={name}
            type="text"
            autoComplete="name"
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome"
          />
          <Input
            name="email"
            value={email}
            type="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Seu email"
          />
          <Input
            name="phone"
            value={phone}
            type="text"
            autoComplete="phone"
            onChange={e => setPhone(phoneMask(e.target.value))}
            placeholder="Seu telefone ou celular"
          />
          <Input
            name="password"
            value={password}
            type="password"
            autoComplete="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
          <button type="button" onClick={handleSubmit}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </Container>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
