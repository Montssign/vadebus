import React, { useMemo } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

import Body from '~/components/Body';
import Row from '~/components/Row';
import Panel from '~/components/Panel';

import { Title, Container, Display } from './styles';
import Maps from '~/components/Maps';

function Dashboard() {
  const passengersData = useMemo(
    () => ({
      datasets: [
        {
          data: [350, 212, 30],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderColor: '#f8f7fd',
        },
      ],

      labels: ['Passageiros', 'Novos passageiros', 'Passageiros Anônimos'],
    }),
    []
  );

  const paymentData = useMemo(
    () => ({
      datasets: [
        {
          data: [112, 100, 30, 350],
          backgroundColor: [
            'rgba(255, 159, 64,1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderColor: '#f8f7fd',
        },
      ],

      labels: ['Bilhete Único', 'BOM', 'Dinheiro', 'Online'],
    }),
    []
  );

  const newPassengersData = useMemo(
    () => ({
      datasets: [
        {
          data: [14, 20, 30, 22],
          label: 'Bilhete Único',
          backgroundColor: ['rgba(255, 159, 64,0)'],
          borderColor: ['rgba(255, 159, 64,1)'],
        },
        {
          data: [20, 13, 16, 25],
          label: 'BOM',
          backgroundColor: ['rgba(75, 192, 192, 0)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
        },
        {
          data: [70, 40, 35, 8],
          label: 'Dinheiro',

          backgroundColor: ['rgba(255, 99, 132, 0)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
        },
        {
          data: [22, 50, 90, 150],
          label: 'Online',

          backgroundColor: ['rgba(54, 162, 235, 0)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
        },
      ],
      labels: ['Junho', 'Julho', 'Agosto', 'Setembro'],
      borderColor: '#f8f7fd',
    }),
    []
  );

  const passengersPerLineData = useMemo(
    () => ({
      datasets: [
        {
          label: 'Usuários',
          data: [112, 100, 30, 120],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64,1)',
          ],
          borderColor: '#f8f7fd',
        },
      ],

      labels: ['100', '101', '102', '103'],
    }),
    []
  );

  return (
    <Body>
      <Title>Dashboard</Title>
      <Row>
        <Panel weight={1}>
          <Container>
            <h3>Passageiros</h3>
            <div>
              <Doughnut
                height={250}
                options={{ maintainAspectRatio: false }}
                data={passengersData}
              />
            </div>
          </Container>
        </Panel>
        <Panel weight={1}>
          <Container>
            <h3>Método de pagamento</h3>
            <div>
              <Doughnut
                height={250}
                options={{ maintainAspectRatio: false }}
                data={paymentData}
              />
            </div>
          </Container>
        </Panel>
        <Panel weight={1}>
          <Container>
            <h3>Novos Passageiros</h3>
            <div>
              <Line
                height={250}
                options={{ maintainAspectRatio: false }}
                data={newPassengersData}
              />
            </div>
          </Container>
        </Panel>
      </Row>
      <Row>
        <Panel weight={2}>
          <Container>
            <h3>Passageiros por Região</h3>
            <Display>
              <Maps />
            </Display>
          </Container>
        </Panel>
        <Panel weight={1}>
          <Container>
            <h3>Passageiros por linha</h3>
            <div>
              <Bar
                height={250}
                options={{
                  maintainAspectRatio: false,
                  scales: { yAxes: [{ ticks: { min: 0 } }] },
                }}
                data={passengersPerLineData}
              />
            </div>
          </Container>
        </Panel>
      </Row>
    </Body>
  );
}

export default Dashboard;
