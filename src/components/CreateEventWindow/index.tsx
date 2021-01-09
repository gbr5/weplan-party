import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { getDaysInMonth } from 'date-fns';
import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import BooleanQuestionWindow from '../BooleanQuestionWindow';
import Input from '../Input';
import SetTimeWindow from '../SetTimeWindow';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import SelectEventDatesWindow from './SelectEventDatesWindow';
import SelectMonthWindow from './SelectMonthWindow';
import SelectWeekDayWindow from './SelectWeekDayWindow';
import SelectYearWindow from './SelectYearWindow';

import {
  Container,
  PreviousButton,
  NextButton,
  ButtonContainer,
} from './styles';

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

  const [createButton, setCreateButton] = useState(false);
  const [eventName, setEventName] = useState('');
  const [isDateDefined, setIsDateDefined] = useState(false);
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventStartTimeWindow, setEventStartTimeWindow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(`${newDate}`);
  const [xStep, setXStep] = useState('1');
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
  const [selectedEventDates, setSelectedEventDates] = useState<Date[]>([]);
  const handleSelectedWeekDays = useCallback(
    (props: string) => {
      const findDay = selectedWeekDays.find(day => day === props);
      let days = selectedWeekDays;

      if (!findDay) {
        days.push(props);
      } else {
        days = selectedWeekDays.filter(day => day !== props);
      }
      setSelectedWeekDays(days);
    },
    [selectedWeekDays],
  );

  const handleSelectedMonths = useCallback(
    (props: string) => {
      const findMonth = selectedMonths.find(month => month === props);
      let months = selectedMonths;

      if (!findMonth) {
        months.push(props);
      } else {
        months = selectedMonths.filter(month => month !== props);
      }
      setSelectedMonths(months);
    },
    [selectedMonths],
  );

  const setTime = useCallback(
    (props: string) => {
      if (isDateDefined) {
        setEventStartTime(props);
        setEventStartTimeWindow(false);
        setXStep('6');
      } else {
        setEventStartTime(props);
        setEventStartTimeWindow(false);
        setXStep('7');
      }
    },
    [isDateDefined],
  );

  const createEventWithDefinedDate = useCallback(() => {
    setXStep('6');
    setCreateButton(true);
  }, []);

  const createEventWithoutDefinedDate = useCallback(() => {
    setXStep('10');
    setCreateButton(true);
  }, []);

  const handleIsDateDefined = useCallback(
    (props: boolean) => {
      setIsDateDefined(props);
      if (props) {
        setEventStartTimeWindow(true);
        createEventWithDefinedDate();
      } else {
        setXStep('2');
      }
    },
    [createEventWithDefinedDate],
  );

  const handleCreateEvent = useCallback(async () => {
    try {
      if (isDateDefined) {
        const date = new Date(selectedDate);
        const eventHour = eventStartTime.split(':');

        date.setHours(Number(eventHour[0]));
        date.setMinutes(Number(eventHour[1]));

        const event = await api.post('/events', {
          name: eventName,
          date,
          event_type: eventType,
          isDateDefined,
        });
        setEventName(event.data.name);
        handleSetEventName(event.data.name);
      } else if (selectedYear === 0) {
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
        handleSetEventName(event.data.name);
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
        const eventDates = await api.post('event/dates', {
          event_id: event.data.id,
          dates: selectedEventDates,
        });
        console.log(eventDates.data);
        setEventName(event.data.name);
        handleSetEventName(event.data.name);
      }
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
    selectedYear,
    eventStartTime,
    eventType,
    handleSetEventName,
    handleEventInfoDrawer,
    handleGetMyEvents,
    selectedDate,
    isDateDefined,
    selectedEventDates,
  ]);

  const selectDefinedEventDates = useCallback(
    (dates: Date[]) => {
      setSelectedEventDates(dates);
      createEventWithoutDefinedDate();
    },
    [createEventWithoutDefinedDate],
  );

  const handleSelectedDates = useCallback(() => {
    const transformedDates: Date[] = [];

    selectedMonths.map(month => {
      const allDatesFromMonth: Date[] = [];
      const numberOfDaysInMonth = getDaysInMonth(Number(month));
      for (let i = 1; i < numberOfDaysInMonth; i += 1) {
        const thisDate = new Date(`${month}/${i}/${selectedYear}`);
        allDatesFromMonth.push(thisDate);
      }
      selectedWeekDays.map(weekDay => {
        let thisDay = weekDay;
        if (weekDay === '7') {
          thisDay = '0';
        }
        const xDates = allDatesFromMonth.filter(
          date => date.getDay() === Number(thisDay),
        );
        xDates.map(date => {
          transformedDates.push(date);
          setSelectedEventDates(transformedDates);
          return date;
        });
        return '';
      });

      return month;
    });
    setEventStartTimeWindow(true);
  }, [selectedYear, selectedMonths, selectedWeekDays]);

  const closeStartTimeWindow = useCallback(() => {
    if (isDateDefined) {
      createEventWithDefinedDate();
    } else {
      createEventWithoutDefinedDate();
    }
    setEventStartTimeWindow(false);
  }, [
    createEventWithoutDefinedDate,
    createEventWithDefinedDate,
    isDateDefined,
  ]);

  const definePossibleDates = useCallback(
    (props: boolean) => {
      if (props) {
        setXStep('3');
      } else {
        createEventWithoutDefinedDate();
      }
    },
    [createEventWithoutDefinedDate],
  );

  return (
    <>
      {eventStartTimeWindow && (
        <SetTimeWindow
          closeWindow={() => closeStartTimeWindow()}
          setTime={setTime}
          message="Defina o horário de início do seu evento. (Você pode alterar posteriormente)"
        />
      )}
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
              <BooleanQuestionWindow
                onHandleCloseWindow={() => definePossibleDates(false)}
                question="Deseja definir algumas possíveis datas?"
                selectBooleanOption={definePossibleDates}
              />
            )}
            {xStep === '3' && (
              <SelectWeekDayWindow
                changeWindow={(e: string) => setXStep(e)}
                closeWindow={() => createEventWithoutDefinedDate()}
                selectWeekDay={handleSelectedWeekDays}
              />
            )}
            {xStep === '4' && (
              <SelectYearWindow
                changeWindow={(e: string) => setXStep(e)}
                closeWindow={() => createEventWithoutDefinedDate()}
                selectYear={(e: number) => setSelectedYear(e)}
              />
            )}
            {xStep === '5' && (
              <SelectMonthWindow
                changeWindow={(e: string) => setXStep(e)}
                closeWindow={() => createEventWithoutDefinedDate()}
                selectMonth={(e: string) => handleSelectedMonths(e)}
                openEventStartTimeWindow={() => handleSelectedDates()}
              />
            )}
            {xStep === '6' && (
              <>
                <h3>Selecione a data</h3>
                <Input
                  type="date"
                  name="date"
                  onChange={e => setSelectedDate(e.target.value)}
                />
              </>
            )}
            {xStep === '7' && (
              <SelectEventDatesWindow
                changeWindow={(e: string) => setXStep(e)}
                closeWindow={() => createEventWithoutDefinedDate()}
                selectEventDates={(e: Date[]) => selectDefinedEventDates(e)}
                selectedPossibleEventDates={selectedEventDates}
              />
            )}

            {createButton && (
              <ButtonContainer>
                <PreviousButton type="button" onClick={() => setXStep('1')}>
                  Anterior
                </PreviousButton>

                <NextButton type="submit">
                  <h3>Criar</h3>
                </NextButton>
              </ButtonContainer>
            )}
          </Container>
        </Form>
      </WindowUnFormattedContainer>
    </>
  );
};

export default CreateEventWindow;
