import React, { useMemo } from 'react';

import placeholder from '../../../../assets/WePlanLogo.svg';
import IEventDTO from '../../../../dtos/IEventDTO';
import IUserDTO from '../../../../dtos/IUserDTO';
import formatDateToString from '../../../../utils/formatDateToString';
import { numberFormat } from '../../../../utils/numberFormat';

import { Container } from './styles';

interface IProps {
  event: IEventDTO;
  master: IUserDTO;
}

const FirstSection: React.FC<IProps> = ({ event, master }: IProps) => {
  const eventDate = useMemo(() => {
    const date = formatDateToString(String(event.date)).split(' - ')[1];
    const hour = formatDateToString(String(event.date)).split(' - ')[0];

    return {
      date,
      hour,
    }
  }, [event.date]);
  return (
    <Container>
      <img src={placeholder} alt="WePlan"/>
      <div>
        <h1>{event.name}</h1>
        <span>
          <p>Anfitrião Master</p>
          <p>{master.name}</p>
        </span>
        <span>
          <p>{event.event_type}</p>
          <p>{event.isPublished ? 'Publicado' : 'Não Publicado'}</p>
        </span>
        <span>
          <p>{eventDate.date}</p>
          <p>{eventDate.hour}</p>
        </span>
        <p>Possíveis datas</p>
      </div>
      <div>
        <span>
          <p>Duração</p>
          <p>{event.eventInfo.duration} horas</p>
        </span>
        <span>
          <p>N° de Convidados</p>
          <p>{event.eventInfo.number_of_guests}</p>
        </span>
        <span>
          <p>Orçamento</p>
          <p>R$ {numberFormat(event.eventInfo.budget)}</p>
        </span>
        <span>
          <p>Descrição</p>
          <p>{event.eventInfo.description}</p>
        </span>
        <span>
          <p>País</p>
          <p>{event.eventInfo.country}</p>
        </span>
        <span>
          <p>Estado</p>
          <p>{event.eventInfo.local_state}</p>
        </span>
        <span>
          <p>Cidade</p>
          <p>{event.eventInfo.city}</p>
        </span>
        <span>
          <p>Endereço</p>
          <p>{event.eventInfo.address}</p>
        </span>
        <span>
          <p>Traje</p>
          <p>{event.eventInfo.dress_code || ''}</p>
        </span>
      </div>
    </Container>
  );
};

export default FirstSection;
