import React, { useState } from 'react';
import Body from '~/components/Body';

import { Title } from './styles';
import RoutePanel from '~/components/RoutePanel';
import AddButton from '~/components/AddButton';
import Row from '~/components/Row';

function BusRoutes() {
  const [routes] = useState([
    {
      name: '100',
      estimatedTime: 2400,
      stops: [
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Terminal XPTB',
          isFirst: true,
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 1' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 2',
          details: {
            bus: [
              {
                color: '#FAD304',
                number: '11111',
                status: 'chegando no ponto',
              },
            ],
          },
        },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 3',
          details: {
            expectedRise: 2,
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 4' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 5',
          details: {
            bus: [{ color: '#27DB7E', number: '11112', status: 'no ponto' }],
            expectedDescent: 2,
          },
        },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 6',
          details: {
            expectedDescent: 2,
            expectedRise: 3,
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 7' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 8',
          details: {
            bus: [{ color: '#6C8BF5', number: '11113', status: 'Chegando' }],
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 9' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Rua XPTA',
          isLast: true,
        },
      ],
    },
    {
      name: '101',
      estimatedTime: 2800,
      stops: [
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Terminal XPTO',
          isFirst: true,
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 1' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 2',
          details: {
            bus: [
              {
                color: '#FAD304',
                number: '11111',
                status: 'chegando no ponto',
              },
            ],
          },
        },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 3',
          details: {
            expectedRise: 2,
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 4' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 5',
          details: {
            bus: [{ color: '#27DB7E', number: '11112', status: 'no ponto' }],
            expectedDescent: 2,
          },
        },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 6',
          details: {
            expectedDescent: 2,
            expectedRise: 3,
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 7' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 8',
          details: {
            bus: [{ color: '#6C8BF5', number: '11113', status: 'Chegando' }],
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 9' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Rua XPTO',
          isLast: true,
        },
      ],
    },
    {
      name: '102',
      estimatedTime: 2000,
      stops: [
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Terminal XPTO',
          isFirst: true,
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 1' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 2',
          details: {
            bus: [
              {
                color: '#FAD304',
                number: '11111',
                status: 'chegando no ponto',
              },
            ],
          },
        },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 3',
          details: {
            expectedRise: 2,
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 4' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 5',
          details: {
            bus: [{ color: '#27DB7E', number: '11112', status: 'no ponto' }],
            expectedDescent: 2,
          },
        },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 6',
          details: {
            expectedDescent: 2,
            expectedRise: 3,
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 7' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 8',
          details: {
            bus: [{ color: '#6C8BF5', number: '11113', status: 'Chegando' }],
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 9' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Rua XPTO',
          isLast: true,
        },
      ],
    },
    {
      name: '103',
      estimatedTime: 1500,
      stops: [
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Terminal XPTO',
          isFirst: true,
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 1' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 2',
          details: {
            bus: [
              {
                color: '#FAD304',
                number: '11111',
                status: 'chegando no ponto',
              },
            ],
          },
        },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 3',
          details: {
            expectedRise: 2,
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 4' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 5',
          details: {
            bus: [{ color: '#27DB7E', number: '11112', status: 'no ponto' }],
            expectedDescent: 2,
          },
        },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 6',
          details: {
            expectedDescent: 2,
            expectedRise: 3,
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 7' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Parada 8',
          details: {
            bus: [{ color: '#6C8BF5', number: '11113', status: 'Chegando' }],
          },
        },
        { location: { lat: -23.7122329, lng: -46.4157822 }, name: 'Parada 9' },
        {
          location: { lat: -23.7122329, lng: -46.4157822 },
          name: 'Rua XPTO',
          isLast: true,
        },
      ],
    },
  ]);

  return (
    <Body>
      <>
        <Row>
          <Title>Rotas</Title>
          <AddButton to="/rotas/add">Adicionar rota</AddButton>
        </Row>
        {routes.map(route => (
          <RoutePanel data={route} key={route.name} />
        ))}
      </>
    </Body>
  );
}

export default BusRoutes;
