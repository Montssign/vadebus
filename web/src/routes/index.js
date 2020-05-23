import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import BusRoutes from '~/pages/BusRoutes';
import FormBusRoutes from '~/pages/FormBusRoutes';
import Cars from '~/pages/Cars';
import Collectors from '~/pages/Collectors';
import FormCollectors from '~/pages/FormCollectors';
import Profile from '~/pages/Profile';
import FormCars from '~/pages/FormCars';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/rotas" exact component={BusRoutes} isPrivate />
      <Route path="/rotas/add" component={FormBusRoutes} isPrivate />

      <Route path="/frota" exact component={Cars} isPrivate />
      <Route path="/frota/add" component={FormCars} isPrivate />

      <Route
        path="/cobradores-e-motoristas"
        exact
        component={Collectors}
        isPrivate
      />
      <Route
        path="/cobradores-e-motoristas/add"
        component={FormCollectors}
        isPrivate
      />
    </Switch>
  );
}
