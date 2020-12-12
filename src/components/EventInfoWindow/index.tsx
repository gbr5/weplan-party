import React, { MouseEventHandler } from 'react';

import { FiEdit3 } from 'react-icons/fi';
import WindowContainer from '../WindowContainer';

import { Container, EventInfo } from './styles';
import IEventDTO from '../../dtos/IEventDTO';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleEditEventInfo: Function;
  pageEvent: IEventDTO;
  eventInfo: IEventInfoDTO;
  isOwner: boolean;
}

const EventInfoWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventInfo,
  pageEvent,
  handleEditEventInfo,
  isOwner,
}: IProps) => {
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
        <h2>{pageEvent.name}</h2>
        <EventInfo>
          <span>
            <div>
              <div>
                <p>Duração: </p>
                <h3>{eventInfo ? eventInfo.duration : ''}</h3>
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
