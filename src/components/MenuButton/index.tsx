import React, { useCallback, useState, useRef } from 'react';

import { MdClose, MdMenu } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
// import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
// import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../Input';

import {
  Button,
  ButtonContent,
  Menu,
  CreateEventForm,
  EventTypeDrawer,
  EventInfoDrawer,
} from './styles';
import WindowContainer from '../WindowContainer';
import MainFriendsWindow from '../MainFriendsWindow';

interface ICreateEventDTO {
  name: string;
  date: string;
  event_type: string;
  start_time: string;
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
  trimmed_name: string;
}

const MenuButton: React.FC = () => {
  const [buttonDrawer, setButtonDrawer] = useState(false);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [createEventDrawer, setCreateEventDrawer] = useState(false);
  const [eventTypeDrawer, setEventTypeDrawer] = useState(false);
  const newDate = new Date();
  const [selectedDate, setSelectedDate] = useState(`${newDate}`);
  const [eventType, setEventType] = useState<string>();
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [myEvents, setMyEvents] = useState<IEvent[]>([]);
  const [eventName, setEventName] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  // const history = useHistory();

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
    setButtonDrawer(false);
    setFriendsWindow(true);
  }, []);

  // const handleNavigateToSupplierDashboard = useCallback(() => {
  //   history.push('/supplier-dashboard');
  // }, [history]);

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
      try {
        const new_event = myEvents.find(event => event.name === eventName);
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
    [addToast, handleEventInfoDrawer, myEvents, eventName],
  );

  const handleGetMyEvents = useCallback(async () => {
    const response = await api.get('events');
    setMyEvents(response.data);
    handleEventInfoDrawer();
  }, [handleEventInfoDrawer]);

  const handleCreateEvent = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      const eventHour = eventStartTime.split(':');

      date.setHours(Number(eventHour[0]));
      date.setMinutes(Number(eventHour[1]));

      const event = await api.post<IEvent>('/events', {
        name: eventName,
        date,
        event_type: eventType,
      });
      setEventName(event.data.name);
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
  }, [
    addToast,
    selectedDate,
    handleCreateEventDrawer,
    eventType,
    eventStartTime,
    eventName,
    handleGetMyEvents,
  ]);

  const inputHeight = { height: '40px' };

  return (
    <>
      <Button type="button" onClick={handleButtonDrawer}>
        <MdMenu size={24} />
      </Button>
      {!!buttonDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setButtonDrawer(false)}
          containerStyle={{
            top: '100px',
            left: '8px',
            height: '350px',
            width: '248px',
          }}
        >
          <ButtonContent>
            <Menu>
              <button type="button" onClick={handleCreateEventDrawer}>
                Criar Evento
              </button>
              {/* <button type="button" onClick={handleNavigateToFriends}>
                Fotos
              </button> */}
              <button type="button" onClick={handleNavigateToFriends}>
                Contatos
              </button>
              {/* {user.isSupplier && (
                <button
                  type="button"
                  onClick={handleNavigateToSupplierDashboard}
                >
                  Página de fornecedor
                </button>
              )} */}
            </Menu>
          </ButtonContent>
        </WindowContainer>
      )}
      {!!friendsWindow && (
        <MainFriendsWindow
          onHandleCloseWindow={() => setFriendsWindow(false)}
        />
      )}
      {!!createEventDrawer && (
        <Form ref={formRef} onSubmit={handleCreateEvent}>
          <CreateEventForm>
            <h1>Crie seu evento</h1>

            <div>
              <span>
                <button type="button" onClick={handleCreateEventDrawer}>
                  <MdClose size={30} />
                </button>
              </span>

              <button type="button" onClick={handleEventTypeDrawer}>
                {eventType || 'Tipo de Evento'}
              </button>

              <Input
                containerStyle={inputHeight}
                type="text"
                placeholder="Nome do evento"
                name="name"
                onChange={e => setEventName(e.target.value)}
              />

              <Input
                containerStyle={inputHeight}
                type="time"
                name="event_time"
                onChange={e => setEventStartTime(e.target.value)}
              />

              <Input
                containerStyle={inputHeight}
                type="date"
                name="date"
                onChange={e => setSelectedDate(e.target.value)}
              />
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
