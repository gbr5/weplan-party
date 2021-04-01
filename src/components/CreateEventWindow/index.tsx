import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { useEvent } from '../../hooks/event';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import BooleanQuestionWindow from '../BooleanQuestionWindow';
import Input from '../Input';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import SetDateWindow from './SetDateWindow';

import {
  Container,
  PreviousButton,
  NextButton,
  ButtonContainer,
} from './styles';

interface IProps {
  setEventCreated: Function;
  handleEventTypeDrawer: Function;
  handleEventInfoDrawer: Function;
  onHandleCloseWindow: MouseEventHandler;
  eventType: string | undefined;
  tipoDeEvento: string;
}

const CreateEventWindow: React.FC<IProps> = ({
  setEventCreated,
  handleEventTypeDrawer,
  handleEventInfoDrawer,
  onHandleCloseWindow,
  eventType,
  tipoDeEvento,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { getEventsAsOwner } = useEvent();

  const newDate = new Date();

  const [eventName, setEventName] = useState('');
  const [isDateDefined, setIsDateDefined] = useState(false);
  const [selectedDate, setSelectedDate] = useState(`${newDate}`);
  const [xStep, setXStep] = useState('1');

  const handleIsDateDefined = useCallback((props: boolean) => {
    setIsDateDefined(props);
    if (props) {
      setXStep('2');
    } else {
      setXStep('0');
    }
  }, []);

  const handleCreateEvent = useCallback(async () => {
    try {
      if (isDateDefined) {
        const date = new Date(selectedDate);

        const event = await api.post('/events', {
          name: eventName,
          date,
          event_type: eventType,
          isDateDefined,
        });
        setEventName(event.data.name);
        setEventCreated(event.data.name);
      } else {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes() + 5;

        date.setHours(hour);
        date.setMinutes(minutes);

        const event = await api.post('/events', {
          name: eventName,
          date,
          event_type: eventType,
          isDateDefined,
        });

        setEventName(event.data.name);
        setEventCreated(event.data);
      }
      getEventsAsOwner();
      addToast({
        type: 'success',
        title: 'Evento Criado com Sucesso',
        description: 'Você já pode começar a planejar o seu evento.',
      });
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
    eventType,
    setEventCreated,
    handleEventInfoDrawer,
    getEventsAsOwner,
    selectedDate,
    isDateDefined,
  ]);

  const handleSetDefinedDate = useCallback((props: string) => {
    setSelectedDate(props);
    setXStep('0');
  }, []);

  return (
    <>
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

            <h2>Dê um nome único para o seu evento</h2>
            <Input
              type="text"
              placeholder="Nome do evento"
              name="name"
              onChange={e => setEventName(e.target.value)}
            />
            {xStep === '1' && (
              <BooleanQuestionWindow
                onHandleCloseWindow={() => handleIsDateDefined(false)}
                question="A data do evento já está definida?"
                selectBooleanOption={handleIsDateDefined}
              />
            )}
            {xStep === '2' && (
              <SetDateWindow
                closeWindow={() => setXStep('1')}
                thenFunction={handleSetDefinedDate}
              />
            )}
            <ButtonContainer>
              <PreviousButton type="button" onClick={() => setXStep('1')}>
                Anterior
              </PreviousButton>

              <NextButton type="submit">
                <h3>Criar</h3>
              </NextButton>
            </ButtonContainer>
          </Container>
        </Form>
      </WindowUnFormattedContainer>
    </>
  );
};

export default CreateEventWindow;
