import React, { createContext, useCallback, useState, useContext } from 'react';
import ICreateEventDTO from '../dtos/ICreateEventDTO';
import IEventDTO from '../dtos/IEventDTO';
import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IShowEventDTO from '../dtos/IShowEventDTO';
import api from '../services/api';

interface IEventContextData {
  eventBudgetWindow: boolean;
  createEventWindow: boolean;
  nextEvent: IEventDTO;
  eventsAsOwner: IEventOwnerDTO[];
  eventsAsMember: IEventMemberDTO[];
  eventsAsGuest: IEventGuestDTO[];
  handleEventBudgetWindow: () => void;
  handleCreateEventWindow: () => void;
  getEventsAsOwner(): void;
  getEventsAsMember(): void;
  getEventsAsGuest(): void;
  getNextEvent(): void;
  createEvent(data: ICreateEventDTO): Promise<IEventDTO>;
}

const EventContext = createContext({} as IEventContextData);

const EventProvider: React.FC = ({ children }) => {
  const [nextEvent, setNextEvent] = useState({} as IEventDTO);
  const [eventsAsOwner, setEventsAsOwner] = useState<IEventOwnerDTO[]>([]);
  const [eventsAsMember, setEventsAsMember] = useState<IEventMemberDTO[]>([]);
  const [eventsAsGuest, setEventsAsGuest] = useState<IEventGuestDTO[]>([]);
  const [eventBudgetWindow, setEventBudgetWindow] = useState(false);
  const [createEventWindow, setCreateEventWindow] = useState(false);

  function handleEventBudgetWindow(): void {
    setEventBudgetWindow(!eventBudgetWindow);
  }

  function handleCreateEventWindow(): void {
    setCreateEventWindow(!createEventWindow);
  }

  const getEventsAsOwner = useCallback(async () => {
    try {
      const response = await api.get<IEventOwnerDTO[]>(
        '/list/events/user-as-owner/',
      );
      response && response.data && setEventsAsOwner(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getEventsAsMember = useCallback(async () => {
    try {
      const response = await api.get<IEventMemberDTO[]>(
        '/list/events/user-as-member/',
      );
      response && response.data && setEventsAsMember(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const getEventsAsGuest = useCallback(async () => {
    try {
      const response = await api.get<IEventGuestDTO[]>(
        `/event/weplan-guests/list/user`,
      );
      response && response.data && setEventsAsGuest(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getNextEvent = useCallback(async () => {
    try {
      const response = await api.get<IEventDTO>('/my-next-event/');
      response && response.data && setNextEvent(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const createEvent = useCallback(
    async ({ name, date, event_type, isDateDefined }: ICreateEventDTO) => {
      try {
        const event = await api.post('/events', {
          name,
          date,
          event_type,
          isDateDefined,
        });
        await api.post(`/event-budget`, {
          event_id: event.data.id,
          budget: 0,
        });
        event && event.data && getNextEvent();
        event && event.data && getEventsAsOwner();
        return event.data;
      } catch (err) {
        throw new Error(err);
      }
    },
    [getEventsAsOwner, getNextEvent],
  );

  return (
    <EventContext.Provider
      value={{
        eventBudgetWindow,
        handleEventBudgetWindow,
        nextEvent,
        eventsAsOwner,
        eventsAsGuest,
        eventsAsMember,
        getEventsAsOwner,
        getEventsAsMember,
        getEventsAsGuest,
        getNextEvent,
        createEvent,
        createEventWindow,
        handleCreateEventWindow,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

function useEvent(): IEventContextData {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEvent must bu used within an AuthProvider');
  }

  return context;
}

export { EventProvider, useEvent };
