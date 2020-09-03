import React, { useCallback, useState, useRef } from 'react';

import { MdClose } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import DayPicker from 'react-day-picker';
import { Form } from '@unform/web';

import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../Input';

import {
  Button,
  ButtonContent,
  Menu,
  Logo,
  CreateEventForm,
  Calendar,
  EventTypeDrawer,
  EventInfoDrawer,
} from './styles';

interface ICreateEvent {
  name: string;
  date: Date;
  event_type: string;
  start_hour: number;
  start_minute: number;
}

interface ICreateEventInfo {
  number_of_guests: number;
  duration: number;
  budget: number;
  description: boolean;
  country: string;
  local_state: string;
  city: string;
  address: string;
}

interface IEvent {
  id: string;
  name: string;
}

const MenuButton: React.FC = () => {
  const [buttonDrawer, setButtonDrawer] = useState(false);
  const [createEventDrawer, setCreateEventDrawer] = useState(false);
  const [eventTypeDrawer, setEventTypeDrawer] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventType, setEventType] = useState<string>();
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [myEvents, setMyEvents] = useState<IEvent[]>([]);
  const [eventName, setEventName] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleButtonDrawer = useCallback(() => {
    setButtonDrawer(!buttonDrawer);
  }, [buttonDrawer]);

  const handleCreateEventDrawer = useCallback(() => {
    setCreateEventDrawer(!createEventDrawer);
    setButtonDrawer(false);
  }, [createEventDrawer]);

  const handleEventTypeDrawer = useCallback(() => {
    setEventTypeDrawer(!eventTypeDrawer);
  }, [eventTypeDrawer]);

  const handleNavigateToFriends = useCallback(() => {
    history.push('/friends');
  }, [history]);

  const handleNavigateToEvents = useCallback(() => {
    history.push('/events');
  }, [history]);

  const handleMyEventDashboard = useCallback(
    (event_id: string) => {
      history.push('/dashboard/my-event', { params: event_id });
    },
    [history],
  );

  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleEventTypeChange = useCallback(
    (option: string) => {
      setEventType(option);
      handleEventTypeDrawer();
    },
    [handleEventTypeDrawer, setEventType],
  );

  const handleEventInfoDrawer = useCallback(() => {
    setEventInfoDrawer(!eventInfoDrawer);
  }, [eventInfoDrawer]);

  const handlePostEventInfo = useCallback(
    async (data: ICreateEventInfo) => {
      console.log(data);
      try {
        const formattedName = eventName
          .toLowerCase()
          .split(' ')
          .map(word => {
            return word[0].toUpperCase() + word.slice(1);
          })
          .join(' ');
        console.log(eventName, myEvents);
        const new_event = myEvents.find(event => event.name === formattedName);
        console.log(new_event);

        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.string().required('Nome é obrigatório'),
          duration: Yup.number().required('Sobrenome é obrigatório'),
          budget: Yup.number().required(''),
          description: Yup.string().required(),
          country: Yup.string().required(),
          local_state: Yup.string().required(),
          city: Yup.string().required(),
          address: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${new_event?.id}/event-info`, {
          number_of_guests: data.number_of_guests,
          duration: data.duration,
          budget: data.budget,
          description: data.description,
          country: data.country,
          local_state: data.local_state,
          city: data.city,
          address: data.address,
        });

        addToast({
          type: 'success',
          title: 'Item criado com Sucesso',
          description: 'O item foi adicionado à sua check-list.',
        });
        if (new_event) {
          console.log('chegou aqui, 156');
          handleMyEventDashboard(new_event?.id);
        }
        handleEventInfoDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar item da check-list',
          description: 'Erro  ao criar o item, tente novamente.',
        });
      }
    },
    [
      addToast,
      handleEventInfoDrawer,
      myEvents,
      eventName,
      handleMyEventDashboard,
    ],
  );

  const handleGetMyEvents = useCallback(async () => {
    const response = await api.get('events');
    setMyEvents(response.data);
    handleEventInfoDrawer();
  }, [handleEventInfoDrawer]);

  const handleCreateEvent = useCallback(
    async (data: ICreateEvent) => {
      try {
        const date = new Date(selectedDate);

        date.setHours(Number(data.start_hour));
        date.setMinutes(Number(data.start_minute));

        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do evento é obrigatório'),
          start_hour: Yup.number().required(),
          start_minute: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setEventName(data.name);
        console.log(data.name);
        await api.post('/events', {
          name: data.name,
          date,
          event_type: eventType,
        });

        addToast({
          type: 'success',
          title: 'Evento Criado com Sucesso',
          description: 'Você já pode começar a planejar o seu evento.',
        });
        handleGetMyEvents();
        handleCreateEventDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar evento',
          description: 'Erro  ao criar o evento, tente novamente.',
        });
      }
    },
    [
      addToast,
      selectedDate,
      handleCreateEventDrawer,
      eventType,
      handleGetMyEvents,
    ],
  );

  return (
    <>
      <Button type="button" onClick={handleButtonDrawer}>
        <Logo>WP</Logo>
      </Button>
      {!!buttonDrawer && (
        <ButtonContent>
          <Menu>
            <button type="button" onClick={handleCreateEventDrawer}>
              Criar Evento
            </button>
            <button type="button" onClick={handleNavigateToFriends}>
              Fotos
            </button>
            <button type="button" onClick={handleNavigateToFriends}>
              Amigos
            </button>
            <button type="button" onClick={handleNavigateToEvents}>
              Eventos
            </button>
            <button type="button" onClick={handleNavigateToEvents}>
              Fornecedores
            </button>
          </Menu>
        </ButtonContent>
      )}
      {!!createEventDrawer && (
        <Form ref={formRef} onSubmit={handleCreateEvent}>
          <CreateEventForm>
            <h1>Crie seu evento</h1>

            <div>
              <div>
                <span>
                  <button type="button" onClick={handleCreateEventDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>

                <button type="button" onClick={handleEventTypeDrawer}>
                  {eventType || 'Tipo de Evento'}
                </button>

                <Input type="text" placeholder="Nome do evento" name="name" />

                <Input type="text" placeholder="Hora" name="start_hour" />
                <Input type="text" placeholder="Minuto" name="start_minute" />
              </div>
              <Calendar>
                <DayPicker
                  weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                  fromMonth={new Date()}
                  onMonthChange={handleMonthChange}
                  selectedDays={selectedDate}
                  onDayClick={handleDateChange}
                  months={[
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro',
                  ]}
                />
              </Calendar>
            </div>
            <button type="submit">
              <h3>Criar</h3>
            </button>
          </CreateEventForm>
        </Form>
      )}
      {!!eventTypeDrawer && (
        <EventTypeDrawer>
          <Menu>
            <button
              type="button"
              onClick={() => handleEventTypeChange('Wedding')}
            >
              Casamento
            </button>
            <button
              type="button"
              onClick={() => handleEventTypeChange('Sweet_15')}
            >
              15 Anos
            </button>
            <button
              type="button"
              onClick={() => handleEventTypeChange('Sweet_16')}
            >
              Sweet 16
            </button>
            <button
              type="button"
              onClick={() => handleEventTypeChange('Wedding_Anniversary')}
            >
              Bodas
            </button>
            <button
              type="button"
              onClick={() => handleEventTypeChange('Corporate')}
            >
              Corporativo
            </button>
          </Menu>
        </EventTypeDrawer>
      )}
      {!!eventInfoDrawer && (
        <Form ref={formRef} onSubmit={handlePostEventInfo}>
          <EventInfoDrawer>
            <span>
              <button type="button" onClick={handleEventInfoDrawer}>
                <MdClose size={30} />
              </button>
            </span>
            <h1>Informações do evento</h1>
            <div>
              <div>
                <Input
                  name="duration"
                  type="number"
                  placeholder="Duração (em horas)"
                />
                <Input
                  name="number_of_guests"
                  type="number"
                  placeholder="Número de convidados"
                />
                <Input name="budget" type="number" placeholder="Orçamento" />
                <Input name="description" type="text" placeholder="Descrição" />
              </div>
              <div>
                <Input name="country" type="text" placeholder="País" />
                <Input name="local_state" type="text" placeholder="Estado" />
                <Input name="city" type="text" placeholder="Cidade" />
                <Input name="address" type="text" placeholder="Endereço" />
              </div>
            </div>

            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </EventInfoDrawer>
        </Form>
      )}
    </>
  );
};

export default MenuButton;
