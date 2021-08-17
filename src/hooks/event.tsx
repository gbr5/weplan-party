import React, { createContext, useCallback, useState, useContext } from 'react';
import IEventBudgetDTO from '../dtos/IEventBudgetDTO';
import IEventDTO from '../dtos/IEventDTO';
import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IShowEventDTO from '../dtos/IShowEventDTO';
import api from '../services/api';

interface IEventContextData {
  loading: boolean;
  eventBudgetWindow: boolean;
  selectedEvent: IEventDTO;
  nextEvent: IShowEventDTO;
  eventBudget: IEventBudgetDTO;
  eventsAsOwner: IEventOwnerDTO[];
  eventsAsMember: IEventMemberDTO[];
  eventsAsGuest: IEventGuestDTO[];
  handleEventBudgetWindow: () => void;
  selectEvent(data: IEventDTO): void;
  getEventsAsOwner(): void;
  getEventsAsMember(): void;
  getEventsAsGuest(): void;
  getEventBudget(): Promise<void>;
  createEventBudget: (budget: number) => Promise<void>;
  updateEventBudget: (data: IEventBudgetDTO) => Promise<void>;
  deleteEventBudget: (id: string) => Promise<void>;
  getNextEvent(): void;
}

const EventContext = createContext({} as IEventContextData);

const EventProvider: React.FC = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [nextEvent, setNextEvent] = useState({} as IShowEventDTO);
  const [eventBudget, setEventBudget] = useState({} as IEventBudgetDTO);
  const [eventsAsOwner, setEventsAsOwner] = useState<IEventOwnerDTO[]>([]);
  const [eventsAsMember, setEventsAsMember] = useState<IEventMemberDTO[]>([]);
  const [eventsAsGuest, setEventsAsGuest] = useState<IEventGuestDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [eventBudgetWindow, setEventBudgetWindow] = useState(false);

  function handleEventBudgetWindow(): void {
    setEventBudgetWindow(!eventBudgetWindow);
  }

  const getEventsAsOwner = useCallback(async () => {
    try {
      const response = await api.get<IEventOwnerDTO[]>(
        '/list/events/user-as-owner/',
      );
      setEventsAsOwner(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getEventsAsMember = useCallback(async () => {
    try {
      const response = await api.get<IEventMemberDTO[]>(
        '/list/events/user-as-member/',
      );
      setEventsAsMember(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  async function getEventBudget(): Promise<void> {
    try {
      const response = await api.get(`/event-budget/${selectedEvent.id}`);
      response.data && setEventBudget(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function createEventBudget(budget: number): Promise<void> {
    try {
      setLoading(true);
      const response = await api.post('/event-budget', {
        event_id: selectedEvent.id,
        budget,
      });
      response.data && setEventBudget(response.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateEventBudget({
    id,
    budget,
  }: IEventBudgetDTO): Promise<void> {
    try {
      setLoading(true);
      const response = await api.put(`/event-budget/${id}`, {
        budget,
      });
      response.data && setEventBudget(response.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEventBudget(id: string): Promise<void> {
    try {
      setLoading(true);
      const response = await api.delete(`/event-budget/${id}`);
      response.data && setEventBudget({} as IEventBudgetDTO);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  const getEventsAsGuest = useCallback(async () => {
    try {
      const response = await api.get<IEventGuestDTO[]>(
        `/event/weplan-guests/list/user`,
      );
      setEventsAsGuest(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getNextEvent = useCallback(async () => {
    try {
      const response = await api.get<IShowEventDTO>('/my-next-event/');
      setNextEvent(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const selectEvent = useCallback((data: IEventDTO) => {
    setSelectedEvent(data);
  }, []);

  return (
    <EventContext.Provider
      value={{
        loading,
        eventBudgetWindow,
        handleEventBudgetWindow,
        eventBudget,
        selectedEvent,
        nextEvent,
        eventsAsOwner,
        eventsAsGuest,
        eventsAsMember,
        selectEvent,
        getEventsAsOwner,
        getEventsAsMember,
        getEventsAsGuest,
        getNextEvent,
        getEventBudget,
        updateEventBudget,
        createEventBudget,
        deleteEventBudget,
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
