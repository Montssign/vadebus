import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Container } from './styles';

function Menu() {
  const history = useHistory();
  const [location, setLocation] = useState({});

  useEffect(() => {
    const loc = {};
    loc[history.location.pathname.split('/')[1]] = true;
    setLocation(loc);
  }, [history.location.pathname]);

  return (
    <Container>
      <Link active={String(location.dashboard)} to="/dashboard">
        Dashboard
      </Link>
      <Link active={String(location.rotas)} to="/rotas">
        Rotas
      </Link>
      <Link active={String(location.frota)} to="/frota">
        Frota
      </Link>
      <Link
        active={String(location['cobradores-e-motoristas'])}
        to="/cobradores-e-motoristas"
      >
        Cobradores e Motoristas
      </Link>
    </Container>
  );
}

export default Menu;
