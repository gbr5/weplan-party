import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Input from '../Input';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container } from './styles';

interface IProps {
  handleGetMyEvents: Function;
  handleSetEventName: Function;
  handleEventTypeDrawer: Function;
  handleEventInfoDrawer: Function;
  onHandleCloseWindow: MouseEventHandler;
  eventType: string | undefined;
  tipoDeEvento: string;
}

const CreateEventWindow: React.FC<IProps> = ({
  handleGetMyEvents,
  handleSetEventName,
  handleEventTypeDrawer,
  handleEventInfoDrawer,
  onHandleCloseWindow,
  eventType,
  tipoDeEvento,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const newDate = new Date();

  const [eventName, setEventName] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(`${newDate}`);

  const handleCreateEvent = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      const eventHour = eventStartTime.split(':');

      date.setHours(Number(eventHour[0]));
      date.setMinutes(Number(eventHour[1]));

      const event = await api.post('/events', {
        name: eventName,
        date,
        event_type: eventType,
      });
      setEventName(event.data.name);
      handleSetEventName(event.data.name);
      addToast({
        type: 'success',
        title: 'Evento Criado com Sucesso',
        description: 'Você já pode começar a planejar o seu evento.',
      });
      handleGetMyEvents();
      handleEventInfoDrawer();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar evento',
        description: 'Erro  ao criar o evento, tente novamente.',
      });
    }
  }, [
    addToast,
    eventName,
    eventStartTime,
    eventType,
    handleSetEventName,
    handleEventInfoDrawer,
    handleGetMyEvents,
    selectedDate,
  ]);
  const inputHeight = { height: '40px', width: '100%' };

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 16,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      <Form ref={formRef} onSubmit={handleCreateEvent}>
        <Container>
          <h1>Crie seu evento</h1>

          <button type="button" onClick={() => handleEventTypeDrawer()}>
            {tipoDeEvento || 'Selecionar tipo de Evento'}
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

          <button type="submit">
            <h3>Criar</h3>
          </button>
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default CreateEventWindow;
