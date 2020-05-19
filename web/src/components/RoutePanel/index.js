import React, { useState, useMemo } from 'react';
import {
  MdEdit,
  MdDelete,
  MdKeyboardArrowDown,
  MdNaturePeople,
  MdDirectionsBus,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import produce from 'immer';

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

function RoutePanel({ data }) {
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

  const stops = useMemo(
    () =>
      produce(data.stops, draft => {
        draft.forEach(stop => {
          stop.color = extractBusColor(stop);
        });
      }),
    [data]
  );

  return (
    <Row>
      <Panel weight={1}>
        <TitleContainer>
          <h3>Rota {data.name}</h3>
          <h4>
            <strong>Início:</strong> {stops[0].name}
          </h4>
          <h4>
            <strong>Final:</strong> {stops[stops.length - 1].name}
          </h4>
          <h4>Tempo total: {data.estimatedTime}</h4>
          <section className="options-buttons">
            <button type="button">
              <MdEdit color="#048DDB" size={24} />
            </button>
            <button type="button">
              <MdDelete color="#FF2020" size={24} />
            </button>
          </section>
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
        </TitleContainer>

        <NodeContainer active={showDetails}>
          {stops.map(stop => (
            <NodeItem key={stop.name}>
              <div className="node">
                <Circle color={stop.color}>
                  {stop.details && (
                    <Details>
                      {stop.details.bus &&
                        stop.details.bus.map(bus => (
                          <p key={bus.number}>
                            <strong>Onibus: </strong>
                            {`${bus.number}, ${bus.status}`}
                          </p>
                        ))}
                      {stop.details.expectedRise && (
                        <p>
                          <strong>Subida esperada: </strong>
                          {stop.details.expectedRise}
                        </p>
                      )}
                      {stop.details.expectedDescent && (
                        <p>
                          <strong>Descida esperada: </strong>
                          {stop.details.expectedDescent}
                        </p>
                      )}
                    </Details>
                  )}

                  {stop.details &&
                    (stop.details.expectedDescent ||
                      stop.details.expectedRise) && (
                      <MdNaturePeople color="#f8f7fd" />
                    )}

                  {stop.details &&
                    stop.details.bus &&
                    stop.details.bus.length > 0 && (
                      <MdDirectionsBus color="#f8f7fd" />
                    )}
                </Circle>
                {!stop.isLast && <Line />}
              </div>
              <h5>{stop.name}</h5>
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
    stops: PropTypes.arrayOf(
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
