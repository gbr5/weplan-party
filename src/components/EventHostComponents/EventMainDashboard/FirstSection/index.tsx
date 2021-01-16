import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FiCamera, FiEdit } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';

import placeholder from '../../../../assets/WePlanLogo.svg';
import IEventDTO from '../../../../dtos/IEventDTO';
import IShowEventDTO from '../../../../dtos/IShowEventDTO';
import IUserDTO from '../../../../dtos/IUserDTO';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import formatDateToString from '../../../../utils/formatDateToString';
import { getEventType } from '../../../../utils/getEventType';
import { numberFormat } from '../../../../utils/numberFormat';
import SelectMultipleDates from '../../../SelectMultipleDates';
import SetEventDate from '../SetEventDate';
import PossibleDates from './PossibleDatesSection';

import {
  Container,
  AvatarInput,
  EventSection,
  InsideSection,
  EventInfoSection,
  PublishedButton,
  EditButton,
  PossibleDatesHeader,
} from './styles';

interface IProps {
  getEvents: Function;
  event: IEventDTO;
  master: IUserDTO;
}

const FirstSection: React.FC<IProps> = ({
  event,
  master,
  getEvents,
}: IProps) => {
  const { addToast } = useToast();

  const [eventDateWindow, setEventDateWindow] = useState(false);
  const [avatar, setAvatar] = useState(placeholder);
  const [updatedEvent, setUpdatedEvent] = useState({} as IEventDTO);
  const [alreadySelectedDates, setAlreadySelectedDates] = useState<Date[]>([]);
  const [createEventDatesWindow, setCreateEventDatesWindow] = useState(false);

  const openEventDateWindow = useCallback(() => {
    setEventDateWindow(true);
  }, []);

  const getEvent = useCallback(() => {
    try {
      api.get<IShowEventDTO>(`events/${event.id}`).then(response => {
        setUpdatedEvent(response.data.event);
        if (response.data.event.avatar_url) {
          setAvatar(response.data.event.avatar_url);
          const dates = response.data.event.eventDates.map(date => date.date);
          setAlreadySelectedDates(dates);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [event]);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        const response = await api.patch(`/events/avatar/${event.id}`, data);
        setAvatar(response.data);
        getEvents();
        getEvent();

        addToast({
          type: 'success',
          title: 'Avatar atualizado com sucesso.',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, event, getEvents, getEvent],
  );

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const eventDate = useMemo(() => {
    const date = formatDateToString(String(updatedEvent.date)).split(' - ')[1];
    const hour = formatDateToString(String(updatedEvent.date)).split(' - ')[0];

    return {
      date,
      hour,
    };
  }, [updatedEvent.date]);

  const handleEventIsPublished = useCallback(async () => {
    try {
      await api.put(`event/is-published/${event.id}`);
      getEvent();

      addToast({
        type: 'success',
        title: 'Evento atualizado com sucesso.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar o evento, tente novamente.',
      });
      throw new Error(err);
    }
  }, [event, getEvent, addToast]);

  const handleCreateEventDates = useCallback(
    (props: Date[]) => {
      try {
        api.post('event/dates', {
          event_id: event.id,
          dates: props,
        });
        getEvent();
      } catch (err) {
        throw new Error(err);
      }
    },
    [event, getEvent],
  );

  return (
    <Container>
      {eventDateWindow && (
        <SetEventDate
          closeWindow={() => setEventDateWindow(false)}
          event={updatedEvent}
          getEvent={getEvent}
        />
      )}
      {createEventDatesWindow && (
        <SelectMultipleDates
          alreadySelectedDates={alreadySelectedDates}
          closeWindow={() => setCreateEventDatesWindow(false)}
          selectDates={(e: Date[]) => handleCreateEventDates(e)}
        />
      )}

      <AvatarInput>
        <img src={avatar} alt="WePlan" />
        <label htmlFor="avatar">
          <FiCamera />
          <input type="file" id="avatar" onChange={handleAvatarChange} />
        </label>
      </AvatarInput>
      <EventSection>
        <h1>{updatedEvent.name}</h1>
        <InsideSection>
          <span>
            <p>Anfitrião Master</p>
            <p>{master.name}</p>
          </span>
          <span>
            <p>Tipo de evento: {getEventType(event.event_type)}</p>
            <PublishedButton type="button" onClick={handleEventIsPublished}>
              {updatedEvent.isPublished ? 'Publicado' : 'Publicar'}
            </PublishedButton>
          </span>
          <span>
            {updatedEvent.isDateDefined ? (
              <>
                <p>{eventDate.date}</p>
                <p>{eventDate.hour}</p>
                <EditButton type="button" onClick={openEventDateWindow}>
                  <FiEdit />
                </EditButton>
              </>
            ) : (
              <PublishedButton type="button" onClick={openEventDateWindow}>
                Definir a data do evento
              </PublishedButton>
            )}
          </span>
        </InsideSection>

        <PossibleDatesHeader>
          <p>Possíveis datas</p>

          <PublishedButton
            type="button"
            onClick={() => setCreateEventDatesWindow(true)}
          >
            <MdAdd />
          </PublishedButton>
        </PossibleDatesHeader>
        <PossibleDates dates={event.eventDates} />
      </EventSection>
      <EventInfoSection>
        <span>
          <p>Duração</p>
          <p>{event.eventInfo && event.eventInfo.duration} horas</p>
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
      </EventInfoSection>
    </Container>
  );
};

export default FirstSection;
