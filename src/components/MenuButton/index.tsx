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
} from './styles';

interface ICreateEvent {
  name: string;
  date: Date;
  event_type: string;
  start_hour: number;
  start_minute: number;
}

const MenuButton: React.FC = () => {
  const [buttonDrawer, setButtonDrawer] = useState(false);
  const [createEventDrawer, setCreateEventDrawer] = useState(false);
  const [eventTypeDrawer, setEventTypeDrawer] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventType, setEventType] = useState<string>();

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

  const handleCreateEvent = useCallback(
    async (data: ICreateEvent) => {
      console.log(data);
      try {
        const date = new Date(selectedDate);

        date.setHours(Number(data.start_hour));
        date.setMinutes(Number(data.start_minute));
        console.log(eventType);

        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do evento é obrigatório'),
          start_hour: Yup.number().required(),
          start_minute: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log('passou pelo Yup');

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
    [addToast, selectedDate, handleCreateEventDrawer, eventType],
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
    </>
  );
};

export default MenuButton;
