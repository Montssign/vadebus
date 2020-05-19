import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logoPurple from '~/assets/images/logo-purple.svg';

import Notifications from '~/components/Notifications';

import { Container, Content, Profile } from './styles';
import Menu from '../Menu';
import Body from '../Body';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Body>
        <Content>
          <nav>
            <Link to="/dashboard">
              <img src={logoPurple} alt="GoBarber" /> VádeBus
            </Link>
          </nav>

          <aside>
            <Menu />
            <Profile>
              <div>
                <strong>{profile.name}</strong>
                <Link to="/profile">Meu Perfil</Link>
              </div>
              <img
                src={
                  (profile.avatar && profile.avatar.url) ||
                  'https://api.adorable.io/avatars/50/abott@adorable.png'
                }
                alt={profile.name}
              />
            </Profile>
            <Notifications />
          </aside>
        </Content>
      </Body>
    </Container>
  );
}
