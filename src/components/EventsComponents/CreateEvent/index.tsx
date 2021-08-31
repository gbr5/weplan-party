import React, { useCallback, useState, useRef, useMemo } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { addMonths } from 'date-fns';

import { useHistory } from 'react-router-dom';
import { useEvent } from '../../../hooks/event';
import { useEventVariables } from '../../../hooks/eventVariables';

import IEventDTO from '../../../dtos/IEventDTO';

import Button from '../../Button';
import Input from '../../Input';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { SelectEventType } from '../SelectEventType';

import { Container, Title, Underline, QuestionText } from './styles';
import { DatePickerLine } from '../../TimePickerLine';
import { useCurrentEvent } from '../../../hooks/currentEvent';

interface IFormProps {
  name: string;
}

export function CreateEvent(): JSX.Element {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { createEvent, handleCreateEventWindow } = useEvent();
  const { unsetVariables } = useEventVariables();
  const { handleSelectedEvent } = useCurrentEvent();

  const [selectEventTypeWindow, setSelectEventTypeWindow] = useState(true);
  const [event_type, setEventType] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(addMonths(new Date(), 3));

  function handleSelectedDate(date: Date): void {
    setSelectedDate(date);
  }

  function handleEventType(type: string): void {
    setEventType(type);
    setSelectEventTypeWindow(false);
  }

  function openEventTypeWindow(): void {
    setSelectEventTypeWindow(true);
  }

  async function handleCreateEvent({ name }: IFormProps): Promise<void> {
    unsetVariables();
    try {
      setLoading(true);
      const event = await createEvent({
        date: selectedDate,
        event_type,
        isDateDefined: false,
        name,
      });
      handleSelectedEvent(event);
      history.push(`/dashboard/my-event/${event.trimmed_name}`, {
        params: event,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      handleCreateEventWindow();
    }
  }

  const eventType = useMemo(() => {
    if (event_type === 'Wedding') return 'Casamento';
    if (event_type === 'Prom') return 'Formatura';
    return 'Outros';
  }, [event_type]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleCreateEventWindow}
      containerStyle={{
        height: '80%',
        width: '96%',
        left: '2%',
        top: '10%',
        zIndex: 15,
      }}
      zIndex={14}
    >
      <Container>
        <Title>Novo Evento</Title>
        <Underline />

        {selectEventTypeWindow ? (
          <SelectEventType
            eventType={event_type}
            selectEventType={(e: string) => handleEventType(e)}
          />
        ) : (
          <>
            <Button onClick={openEventTypeWindow}>{eventType}</Button>
            <Form ref={formRef} onSubmit={handleCreateEvent}>
              <QuestionText>Defina o nome do evento</QuestionText>
              <Input name="name" placeholder="Nome do Evento" />
              <DatePickerLine
                handleSelectedDate={handleSelectedDate}
                selectedDate={selectedDate}
              />
              <Button loading={loading} type="submit">
                Criar evento
              </Button>
            </Form>
          </>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
