import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import BusRoutes from '~/pages/BusRoutes';
import FormBusRoutes from '~/pages/FormBusRoutes';
import Fleet from '~/pages/Fleet';
import Collectors from '~/pages/Collectors';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/rotas" exact component={BusRoutes} isPrivate />
      <Route path="/rotas/add" component={FormBusRoutes} isPrivate />
      <Route path="/frota" component={Fleet} isPrivate />
      <Route
        path="/crobradores-e-motoristas"
        component={Collectors}
        isPrivate
      />
    </Switch>
  );
}
