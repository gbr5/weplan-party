import React, { MouseEventHandler, useMemo } from 'react';

import { FiEdit3 } from 'react-icons/fi';
import WindowContainer from '../WindowContainer';

import { Container, EventInfo } from './styles';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';
import { useEventVariables } from '../../hooks/eventVariables';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleEditEventInfo: Function;
  eventName: string;
  eventInfo: IEventInfoDTO;
}

const EventInfoWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventInfo,
  eventName,
  handleEditEventInfo,
}: IProps) => {
  const { isOwner } = useEventVariables();
  const eventDuration = useMemo(() => {
    if (eventInfo) {
      const durationSplitted = (eventInfo.duration / 60).toString().split('.');
      const hour = durationSplitted[0];
      const minutes = (Number(`0.${durationSplitted[1]}`) * 60)
        .toString()
        .split('.')[0];
      return `${hour.length === 1 ? `0${hour}` : hour}:${
        minutes.length === 1 ? `0${minutes}` : minutes
      }`;
    }
    return '00:00';
  }, [eventInfo]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 10,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <h1>Informações do evento</h1>
        <h2>{eventName}</h2>
        <EventInfo>
          <span>
            <div>
              <div>
                <p>Duração: </p>
                <h3>{eventDuration}</h3>
              </div>
              <div>
                <p>N° de convidados: </p>
                <h3>{eventInfo ? eventInfo.number_of_guests : ''}</h3>
              </div>
              <div>
                <p>Orçamento: </p>
                <h3>{eventInfo ? eventInfo.budget : ''}</h3>
              </div>
            </div>
            <div>
              <div>
                <p>País: </p>
                <h3>{eventInfo ? eventInfo.country : ''}</h3>
              </div>
              <div>
                <p>Estado: </p>
                <h3>{eventInfo ? eventInfo.local_state : ''}</h3>
              </div>
              <div>
                <p>Cidade: </p>
                <h3>{eventInfo ? eventInfo.city : ''}</h3>
              </div>
            </div>
          </span>

          <div>
            <p>Traje: </p>
            <h3>
              {eventInfo && eventInfo.dress_code ? eventInfo.dress_code : ''}
            </h3>
          </div>
          <div>
            <p>Endereço: </p>
            <h3>{eventInfo ? eventInfo.address : ''}</h3>
          </div>
        </EventInfo>
        {isOwner && (
          <button type="button" onClick={() => handleEditEventInfo()}>
            <h3>
              Editar <FiEdit3 size={24} />
            </h3>
          </button>
        )}
      </Container>
    </WindowContainer>
  );
};

export default EventInfoWindow;
