import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import IEventDTO from '../../../../../dtos/IEventDTO';
import { numberFormat } from '../../../../../utils/numberFormat';

import { Container, EditButton } from './styles';

interface IProps {
  event: IEventDTO;
  openEditEventInfo: Function;
}

const EventInfoSection: React.FC<IProps> = ({
  event,
  openEditEventInfo,
}: IProps) => {
  const [eventDuration, setEventDuration] = useState('00:00');
  useEffect(() => {
    if (event.eventInfo) {
      const durationSplitted = (event.eventInfo.duration / 60)
        .toString()
        .split('.');
      const hour = durationSplitted[0];

      const minutes = durationSplitted[1]
        ? (Number(`0.${durationSplitted[1]}`) * 60).toString().split('.')[0]
        : '00';
      setEventDuration(
        `${hour.length === 1 ? `0${hour}` : hour}:${
          minutes.length === 1 ? `0${minutes}` : minutes
        }`,
      );
    }
  }, [event.eventInfo]);

  return (
    <Container>
      <EditButton type="button" onClick={() => openEditEventInfo()}>
        <MdEdit size={32} color="red" />
      </EditButton>
      <span>
        <p>Duração</p>
        <p>{event.eventInfo && eventDuration}</p>
      </span>
      <span>
        <p>N° de Convidados</p>
        <p>{event.eventInfo && event.eventInfo.number_of_guests}</p>
      </span>
      <span>
        <p>Orçamento</p>
        <p>{numberFormat(event.eventInfo && event.eventInfo.budget)}</p>
      </span>
      <span>
        <p>Descrição</p>
        <p>{event.eventInfo && event.eventInfo.description}</p>
      </span>
      <span>
        <p>País</p>
        <p>{event.eventInfo && event.eventInfo.country}</p>
      </span>
      <span>
        <p>Estado</p>
        <p>{event.eventInfo && event.eventInfo.local_state}</p>
      </span>
      <span>
        <p>Cidade</p>
        <p>{event.eventInfo && event.eventInfo.city}</p>
      </span>
      <span>
        <p>Endereço</p>
        <p>{event.eventInfo && event.eventInfo.address}</p>
      </span>
      <span>
        <p>Traje</p>
        <p>{event.eventInfo ? event.eventInfo.dress_code : ''}</p>
      </span>
    </Container>
  );
};

export default EventInfoSection;
