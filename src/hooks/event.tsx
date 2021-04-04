import React, { createContext, useCallback, useState, useContext } from 'react';
import IEventDTO from '../dtos/IEventDTO';
import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IShowEventDTO from '../dtos/IShowEventDTO';
import api from '../services/api';

interface IEventContextData {
  selectedEvent: IEventDTO;
  nextEvent: IShowEventDTO;
  eventsAsOwner: IEventOwnerDTO[];
  eventsAsMember: IEventMemberDTO[];
  eventsAsGuest: IEventGuestDTO[];
  selectEvent(data: IEventDTO): void;
  getEventsAsOwner(): void;
  getEventsAsMember(): void;
  getEventsAsGuest(): void;
  getNextEvent(): void;
}

const EventContext = createContext({} as IEventContextData);

const EventProvider: React.FC = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [nextEvent, setNextEvent] = useState({} as IShowEventDTO);
  const [eventsAsOwner, setEventsAsOwner] = useState<IEventOwnerDTO[]>([]);
  const [eventsAsMember, setEventsAsMember] = useState<IEventMemberDTO[]>([]);
  const [eventsAsGuest, setEventsAsGuest] = useState<IEventGuestDTO[]>([]);

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
