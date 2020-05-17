import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import jsonp from 'jsonp';
import logo from '~/assets/images/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

import { Container } from './styles';

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
  const [CNPJ, setCNPJ] = useState('');
  const [name, setName] = useState('');
  const [fantasy, setFantasy] = useState('');
  const [address, setAddress] = useState({
    cep: '',
    number: '',
    publicPlace: '',
    neighborhood: '',
    city: '',
    state: '',
    nation: '',
    complement: '',
  });

  function handleSubmit({ name: nameP, email: emailP, password: passwordP }) {
    dispatch(signUpRequest(nameP, emailP, passwordP));
  }

  function sanitizeCNPJ(cnpj) {
    const testMath = cnpj.match(/\d+/g) || [];

    return testMath.join('');
  }

  // useEffect(() => {
  //   const cnpj = sanitizeCNPJ(CNPJ);
  //   async function test() {
  //     jsonp(
  //       `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
  //       {},
  //       (err, value) => {
  //         if (!err && value) {
  //           setName(value.nome);
  //           setFantasy(value.fantasia);
  //           setAddress({
  //             cep: value.cep,
  //             number: value.numero,
  //             publicPlace: value.logradouro,
  //             neighborhood: value.bairro,
  //             city: value.municipio,
  //             state: value.uf,
  //             nation: 'BR',
  //             complement: value.complemento,
  //           });
  //         }
  //       }
  //     );
  //   }

  //   if (cnpj.length === 14) {
  //     test();
  //   }
  // }, [CNPJ]);

  function cnpjMask(value) {
    value = sanitizeCNPJ(value);
    value = value.replace(
      /(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/g,
      '$1.$2.$3/$4-$5'
    );

    return value;
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Container>
          <Input
            name="cnpj"
            value={CNPJ}
            type="text"
            onChange={e => setCNPJ(cnpjMask(e.target.value))}
            placeholder="CNPJ da empresa"
          />
          <Input
            name="name"
            value={name}
            type="text"
            onChange={e => setName(e.target.value)}
            placeholder="Nome da empresa"
          />
          <Input
            name="fantasy"
            value={fantasy}
            type="text"
            onChange={e => setFantasy(e.target.value)}
            placeholder="Nome fantasia"
          />

          <button type="submit">Próximo</button>
        </Container>

        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
