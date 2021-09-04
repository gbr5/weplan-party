import React, { createContext, useContext, useState } from 'react';
import ICreateEventMemberDTO from '../dtos/ICreateEventMember';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IFriendDTO from '../dtos/IFriendDTO';
import api from '../services/api';
import { useCurrentEvent } from './currentEvent';
import { useEventVariables } from './eventVariables';
import { useFriends } from './friends';

interface EventMembersContextType {
  addMemberWindow: boolean;
  deleteMemberWindow: boolean;
  handleAddMemberWindow: () => void;
  handleDeleteMemberWindow: () => void;
  addMultipleMembers: (data: IFriendDTO[]) => Promise<void>;
  editEventMember: (data: IEventMemberDTO) => void;
  createEventMember: (data: ICreateEventMemberDTO) => void;
  deleteEventMember: (id: string) => void;
}

const EventMembersContext = createContext({} as EventMembersContextType);

const EventMembersProvider: React.FC = ({ children }) => {
  const { selectedEvent } = useEventVariables();
  const { getEventMembers } = useCurrentEvent();
  const { handleUnselectedFriends } = useFriends();

  const [addMemberWindow, setAddMemberWindow] = useState(false);
  const [deleteMemberWindow, setDeleteMemberWindow] = useState(false);

  function handleAddMemberWindow(): void {
    addMemberWindow === true && handleUnselectedFriends([]);
    setAddMemberWindow(!addMemberWindow);
  }

  function handleDeleteMemberWindow(): void {
    setDeleteMemberWindow(!deleteMemberWindow);
  }

  async function addMultipleMembers(data: IFriendDTO[]): Promise<void> {
    try {
      Promise.all([
        data.map(({ friend }) => {
          return api.post(`/event-members/${selectedEvent.id}`, {
            member_id: friend.id,
            number_of_guests: 0,
          });
        }),
      ]);
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function createEventMember(data: ICreateEventMemberDTO): Promise<void> {
    try {
      await api.post(`/event-members/${selectedEvent.id}`, data);
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function editEventMember(data: IEventMemberDTO): Promise<void> {
    try {
      await api.put(`/event-members/${data.id}`, {
        number_of_guests: data.number_of_guests,
      });
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function deleteEventMember(id: string): Promise<void> {
    try {
      await api.delete(`/event-members/${id}`);
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <EventMembersContext.Provider
      value={{
        editEventMember,
        createEventMember,
        deleteEventMember,
        addMemberWindow,
        addMultipleMembers,
        handleAddMemberWindow,
        deleteMemberWindow,
        handleDeleteMemberWindow,
      }}
    >
      {children}
    </EventMembersContext.Provider>
  );
};

function useEventMembers(): EventMembersContextType {
  const context = useContext(EventMembersContext);

  if (!context)
    throw new Error('useEventMembers must be used within an AuthProvider!');
  return context;
}

export { EventMembersProvider, useEventMembers };
