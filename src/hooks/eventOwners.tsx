import React, { createContext, useContext, useState } from 'react';
import ICreateEventOwnerDTO from '../dtos/ICreateEventOwnerDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IFriendDTO from '../dtos/IFriendDTO';
import api from '../services/api';
import { useCurrentEvent } from './currentEvent';
import { useEventVariables } from './eventVariables';
import { useFriends } from './friends';
import { useToast } from './toast';

interface EventOwnersContextType {
  addOwnerWindow: boolean;
  deleteOwnerWindow: boolean;
  handleAddOwnerWindow: () => void;
  handleDeleteOwnerWindow: () => void;
  addMultipleOwners: (data: IFriendDTO[]) => Promise<void>;
  editEventOwner: (data: IEventOwnerDTO) => Promise<void>;
  createEventOwner: (data: ICreateEventOwnerDTO) => Promise<void>;
  deleteEventOwner: (id: string) => Promise<void>;
}

const EventOwnersContext = createContext({} as EventOwnersContextType);

const EventOwnersProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const { selectedEvent } = useEventVariables();
  const { getEventOwners } = useCurrentEvent();
  const { handleUnselectedFriends } = useFriends();

  const [addOwnerWindow, setAddOwnerWindow] = useState(false);
  const [deleteOwnerWindow, setDeleteOwnerWindow] = useState(false);

  function handleAddOwnerWindow(): void {
    addOwnerWindow === true && handleUnselectedFriends([]);
    setAddOwnerWindow(!addOwnerWindow);
  }

  function handleDeleteOwnerWindow(): void {
    setDeleteOwnerWindow(!deleteOwnerWindow);
  }

  async function addMultipleOwners(data: IFriendDTO[]): Promise<void> {
    try {
      const owners = data.map(owner => {
        return {
          owner_id: owner.friend.id,
        };
      });
      await api.post(`/create-multiple-event-owners/`, {
        event_id: selectedEvent.id,
        owners,
      });
      await getEventOwners(selectedEvent.id);
      addToast({
        type: 'success',
        title: 'Anfitrião excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir anfitrião',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
      throw new Error(err);
    }
  }
  async function createEventOwner(data: ICreateEventOwnerDTO): Promise<void> {
    try {
      await api.post(`/event-owners/${selectedEvent.id}`, data);
      await getEventOwners(selectedEvent.id);
      addToast({
        type: 'success',
        title: 'Anfitrião excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir anfitrião',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
      throw new Error(err);
    }
  }
  async function editEventOwner(data: IEventOwnerDTO): Promise<void> {
    try {
      await api.put(`/event-owners/${data.id}`, {
        number_of_guests: data.number_of_guests,
        description: data.description,
      });
      await getEventOwners(selectedEvent.id);
      addToast({
        type: 'success',
        title: 'Anfitrião excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir anfitrião',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
      throw new Error(err);
    }
  }
  async function deleteEventOwner(id: string): Promise<void> {
    try {
      await api.delete(`/event-owners/${id}`);
      await getEventOwners(selectedEvent.id);
      addToast({
        type: 'success',
        title: 'Anfitrião excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir anfitrião',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
      throw new Error(err);
    }
  }

  return (
    <EventOwnersContext.Provider
      value={{
        editEventOwner,
        createEventOwner,
        deleteEventOwner,
        addMultipleOwners,
        addOwnerWindow,
        handleAddOwnerWindow,
        deleteOwnerWindow,
        handleDeleteOwnerWindow,
      }}
    >
      {children}
    </EventOwnersContext.Provider>
  );
};

function useEventOwners(): EventOwnersContextType {
  const context = useContext(EventOwnersContext);

  if (!context)
    throw new Error('useEventOwners must be used within an AuthProvider!');
  return context;
}

export { EventOwnersProvider, useEventOwners };
