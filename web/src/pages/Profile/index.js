import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import AvatarInput from './AvatarInput';

import { Container } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';
import api from '~/services/api';
import { sanitizeNumber, maskValues } from '~/utils';

export default function Profile() {
  const dispatch = useDispatch();
  const [cpfOrCnpj, setCpfOrCnpj] = useState('');
  const [profileData, setProfileData] = useState({});
  const profile = useSelector(state => state.user.profile);

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

  useEffect(() => {
    async function getCpfOrCnpj() {
      const { data } = await api.put('/users', {});
      setCpfOrCnpj(data.cpfOrCnpj);
    }
    getCpfOrCnpj();
  }, []);

  useEffect(() => {
    const phone = phoneMask(profile.phone);
    setProfileData({ ...profile, cpfOrCnpj: cpfOrCnpjMask(cpfOrCnpj), phone });
  }, [profile, cpfOrCnpj]);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  function setMasks({ target }) {
    if (target.name === 'cpfOrCnpj') {
      target.value = cpfOrCnpjMask(target.value);
    }
    if (target.name === 'phone') {
      target.value = phoneMask(target.value);
    }
  }

  return (
    <Container>
      <Form
        onChange={setMasks}
        initialData={profileData}
        onSubmit={handleSubmit}
      >
        <AvatarInput name="avatarId" email={profile.email} />
        <Input name="name" type="text" placeholder="Seu nome" />
        <Input name="phone" type="text" placeholder="Seu telefone" />
        <Input name="cpfOrCnpj" type="text" placeholder="Seu CPF ou CNPJ" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Sua nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme a nova senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair do Vadebus
      </button>
    </Container>
  );
}
