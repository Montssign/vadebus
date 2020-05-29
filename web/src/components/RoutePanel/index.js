import React, { useState, useMemo, useContext } from 'react';
import {
  MdEdit,
  MdDelete,
  MdKeyboardArrowDown,
  MdNaturePeople,
  MdDirectionsBus,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import produce from 'immer';

import modalContext from '../Modal/modalContext';

import Row from '../Row';
import Panel from '../Panel';

import {
  TitleContainer,
  NodeContainer,
  Circle,
  Line,
  NodeItem,
  Details,
} from './styles';
import ModalDeleteRoute from './ModalDeleteRoute';

function RoutePanel({ data }) {
  const modal = useContext(modalContext);
  const [showDetails, setShowDetails] = useState(false);

  function toggleShowDetails() {
    setShowDetails(!showDetails);
  }

  function extractBusColor(bus) {
    if (bus.details && bus.details.bus && bus.details.bus.length > 0) {
      return bus.details.bus[0].color;
    }

    return '';
  }

  const points = useMemo(
    () =>
      produce(data.points, draft => {
        draft.forEach(point => {
          point.color = extractBusColor(point);
        });
      }),
    [data]
  );

  function openModal() {
    modal.setContent(() => <ModalDeleteRoute route={data} />);
    modal.setActive(true);
  }

  return (
    <Row>
      <Panel weight={1}>
        <TitleContainer>
          <section>
            <h3 title={data.name}>Rota {data.name}</h3>
            <h4 title={points[0].name}>
              <strong>Início:</strong> {points[0].name}
            </h4>
            <h4 title={points[points.length - 1].name}>
              <strong>Final:</strong> {points[points.length - 1].name}
            </h4>
            <h4 title={`${Math.ceil(data.estimatedTime / 60)} Min.`}>
              <strong>Tempo total:</strong> {Math.ceil(data.estimatedTime / 60)}{' '}
              Min.
            </h4>
          </section>
          <section className="options-buttons">
            <button type="button">
              <MdEdit color="#048DDB" size={24} />
            </button>
            <button type="button" onClick={openModal}>
              <MdDelete color="#FF2020" size={24} />
            </button>
            <button
              type="button"
              className="toggle-show-details"
              onClick={toggleShowDetails}
            >
              <MdKeyboardArrowDown
                className={`toggle-show-icon ${
                  showDetails ? 'toggle-show-icon-up' : ''
                }`}
                size={25}
              />
            </button>
          </section>
        </TitleContainer>

        <NodeContainer active={showDetails}>
          {points.map((point, index) => (
            <NodeItem key={point.name}>
              <div className="node">
                <Circle
                  color={point.color}
                  title={point.name.replace(/Avenida/g, 'Av.')}
                >
                  {point.details && (
                    <Details>
                      {point.details.bus &&
                        point.details.bus.map(bus => (
                          <p key={bus.number}>
                            <strong>Onibus: </strong>
                            {`${bus.number}, ${bus.status}`}
                          </p>
                        ))}
                      {point.details.expectedRise && (
                        <p>
                          <strong>Subida esperada: </strong>
                          {point.details.expectedRise}
                        </p>
                      )}
                      {point.details.expectedDescent && (
                        <p>
                          <strong>Descida esperada: </strong>
                          {point.details.expectedDescent}
                        </p>
                      )}
                    </Details>
                  )}

                  {point.details &&
                    (point.details.expectedDescent ||
                      point.details.expectedRise) && (
                      <MdNaturePeople color="#f8f7fd" />
                    )}

                  {point.details &&
                    point.details.bus &&
                    point.details.bus.length > 0 && (
                      <MdDirectionsBus color="#f8f7fd" />
                    )}
                </Circle>
                {!(index === points.length - 1) && <Line />}
              </div>
              <h5 title={point.name.replace(/Avenida/g, 'Av.')}>
                {point.name.replace(/Avenida/g, 'Av.')}
              </h5>
            </NodeItem>
          ))}
        </NodeContainer>
      </Panel>
    </Row>
  );
}

RoutePanel.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    estimatedTime: PropTypes.number,
    points: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.shape({
          lat: PropTypes.number,
          lng: PropTypes.number,
        }),
        name: PropTypes.string,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
        details: PropTypes.shape({
          bus: PropTypes.arrayOf(
            PropTypes.shape({
              color: PropTypes.string,
              number: PropTypes.string,
              status: PropTypes.string,
            })
          ),
          expectedDescent: PropTypes.number,
          expectedRise: PropTypes.number,
        }),
      })
    ),
  }).isRequired,
};

export default RoutePanel;
