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
  event: IEventDTO;
  master: IUserDTO;
}

const FirstSection: React.FC<IProps> = ({ event, master }: IProps) => {
  const { addToast } = useToast();

  const [eventDateWindow, setEventDateWindow] = useState(false);
  const [avatar, setAvatar] = useState(placeholder);
  const [alreadySelectedDates, setAlreadySelectedDates] = useState<Date[]>([]);
  const [createEventDatesWindow, setCreateEventDatesWindow] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState(event);

  const updateEvent = useCallback(() => {
    try {
      api.get(`events/${event.id}`).then(response => {
        setUpdatedEvent(response.data.event);
        addToast({
          type: 'success',
          title: 'Evento atualizado',
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [event, addToast]);

  useEffect(() => {
    updateEvent();
  }, [updateEvent]);

  useEffect(() => {
    const dates =
      !!updatedEvent.eventDates &&
      updatedEvent.eventDates.map(date => date.date);
    !!dates && setAlreadySelectedDates(dates);
  }, [updatedEvent]);

  const openEventDateWindow = useCallback(() => {
    setEventDateWindow(true);
  }, []);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        const response = await api.patch(
          `/events/avatar/${updatedEvent.id}`,
          data,
        );
        setAvatar(response.data);
        updateEvent();
        addToast({
          type: 'success',
          title: 'Atualização enviada.',
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
    [addToast, updateEvent, updatedEvent],
  );
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
      await api.put(`event/is-published/${updatedEvent.id}`);

      updateEvent();
      addToast({
        type: 'info',
        title: 'Atualização enviada!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar o evento, tente novamente.',
      });
      throw new Error(err);
    }
  }, [updatedEvent, updateEvent, addToast]);

  const handleCreateEventDates = useCallback(
    (props: Date[]) => {
      try {
        api.post('event/dates', {
          event_id: updatedEvent.id,
          dates: props,
        });
        updateEvent();

        addToast({
          type: 'info',
          title: 'Atualização enviada!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar possíveis datas',
        });
        throw new Error(err);
      }
    },
    [updatedEvent, updateEvent, addToast],
  );

  return (
    <Container>
      {eventDateWindow && (
        <SetEventDate
          closeWindow={() => setEventDateWindow(false)}
          event={event}
          getEvent={() => updateEvent()}
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
            <p>Tipo de evento: {getEventType(updatedEvent.event_type)}</p>
            <PublishedButton
              isPublished={updatedEvent.isPublished}
              type="button"
              onClick={handleEventIsPublished}
            >
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
              <PublishedButton
                isPublished
                type="button"
                onClick={openEventDateWindow}
              >
                Definir a data do evento
              </PublishedButton>
            )}
          </span>
        </InsideSection>
        <PossibleDatesHeader>
          <p>Possíveis datas</p>

          <PublishedButton
            isPublished
            type="button"
            onClick={() => setCreateEventDatesWindow(true)}
          >
            <MdAdd />
          </PublishedButton>
        </PossibleDatesHeader>
        <PossibleDates dates={updatedEvent.eventDates} />
      </EventSection>
      <EventInfoSection>
        <span>
          <p>Duração</p>
          <p>
            {updatedEvent.eventInfo && updatedEvent.eventInfo.duration} horas
          </p>
        </span>
        <span>
          <p>N° de Convidados</p>
          <p>
            {updatedEvent.eventInfo && updatedEvent.eventInfo.number_of_guests}
          </p>
        </span>
        <span>
          <p>Orçamento</p>
          <p>
            {numberFormat(
              updatedEvent.eventInfo && updatedEvent.eventInfo.budget,
            )}
          </p>
        </span>
        <span>
          <p>Descrição</p>
          <p>{updatedEvent.eventInfo && updatedEvent.eventInfo.description}</p>
        </span>
        <span>
          <p>País</p>
          <p>{updatedEvent.eventInfo && updatedEvent.eventInfo.country}</p>
        </span>
        <span>
          <p>Estado</p>
          <p>{updatedEvent.eventInfo && updatedEvent.eventInfo.local_state}</p>
        </span>
        <span>
          <p>Cidade</p>
          <p>{updatedEvent.eventInfo && updatedEvent.eventInfo.city}</p>
        </span>
        <span>
          <p>Endereço</p>
          <p>{updatedEvent.eventInfo && updatedEvent.eventInfo.address}</p>
        </span>
        <span>
          <p>Traje</p>
          <p>
            {updatedEvent.eventInfo ? updatedEvent.eventInfo.dress_code : ''}
          </p>
        </span>
      </EventInfoSection>
    </Container>
  );
};

export default FirstSection;
