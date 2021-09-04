import React, { useContext, createContext, useState, useCallback } from 'react';

import { useEffect } from 'react';
import api from '../services/api';

import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IAddNewEventGuestDTO from '../dtos/IAddNewEventGuestDTO';
import { useCurrentEvent } from './currentEvent';
import ICreateGuestContactDTO from '../dtos/ICreateGuestContactDTO';
import IGuestContactDTO from '../dtos/IGuestContactDTO';
import IFriendDTO from '../dtos/IFriendDTO';
import { useToast } from './toast';
import { useEventVariables } from './eventVariables';
import { useFriends } from './friends';
import { useAuth } from './auth';
import IUserDTO from '../dtos/IUserDTO';

interface EventGuestsContextType {
  allGuestsFilter: boolean;
  addGuestListWindow: boolean;
  confirmedGuestsFilter: boolean;
  guestFilterWindow: boolean;
  dissociateUserFromGuestConfirmation: boolean;
  loading: boolean;
  newGuestForm: boolean;
  newGuestWindow: boolean;
  selectWePlanGuestsWindow: boolean;
  selectWePlanGuestWindow: boolean;
  notConfirmedGuestsFilter: boolean;
  onlyMyGuestsFilter: boolean;
  selectedGuestContact: IGuestContactDTO;
  addNewGuest: (data: IAddNewEventGuestDTO) => Promise<void>;
  associateUserToEventGuest: (data: IFriendDTO) => Promise<void>;
  createMultipleWePlanGuests: (data: IFriendDTO[]) => Promise<void>;
  createGuestContact: (data: ICreateGuestContactDTO) => Promise<void>;
  deleteGuestContact: (data: IGuestContactDTO) => Promise<void>;
  deleteGuest: (data: IEventGuestDTO) => Promise<void>;
  deleteWePlanGuest: () => Promise<void>;
  editGuest: (data: IEventGuestDTO) => Promise<IEventGuestDTO>;
  handleAddGuestListWindow: () => void;
  handleAllGuestsFilter: () => void;
  handleConfirmedGuestsFilter: () => void;
  handleGuestFilterWindow: () => void;
  handleNewGuestForm: () => void;
  handleNewGuestWindow: () => void;
  handleNotConfirmedGuestsFilter: () => void;
  handleSelectWePlanGuestsWindow: () => void;
  handleSelectWePlanGuestWindow: () => void;
  handleDissociateUserFromGuestConfirmation: () => void;
  handleOnlyMyGuestsFilter: () => void;
  selectGuestContact: (data: IGuestContactDTO) => void;
  updateGuestContact: (data: IGuestContactDTO) => Promise<void>;
  sendMassEmailInvitations: () => Promise<void>;
  unsetEventGuestVariables: () => void;
}

const EventGuestsContext = createContext({} as EventGuestsContextType);

const EventGuestsProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const {
    selectedEvent,
    selectEventGuest,
    selectedEventGuest,
    eventGuests,
    eventOwners,
    eventMembers,
  } = useEventVariables();
  const { getEventGuests } = useCurrentEvent();
  const { handleUnselectedFriends } = useFriends();

  const [loading, setLoading] = useState(false);
  const [guestFilterWindow, setGuestFilterWindow] = useState(false);
  const [selectedGuestContact, setSelectedGuestContact] = useState(
    {} as IGuestContactDTO,
  );
  const [confirmedGuestsFilter, setConfirmedGuestsFilter] = useState(false);
  const [notConfirmedGuestsFilter, setNotConfirmedGuestsFilter] = useState(
    false,
  );
  const [addGuestListWindow, setAddGuestListWindow] = useState(false);
  const [
    dissociateUserFromGuestConfirmation,
    setDissociateUserFromGuestConfirmation,
  ] = useState(false);
  const [allGuestsFilter, setAllGuestsFilter] = useState(true);
  const [onlyMyGuestsFilter, setOnlyMyGuestsFilter] = useState(false);
  const [newGuestForm, setNewGuestForm] = useState(false);
  const [newGuestWindow, setNewGuestWindow] = useState(false);
  const [selectWePlanGuestsWindow, setSelectWePlanGuestsWindow] = useState(
    false,
  );
  const [selectWePlanGuestWindow, setSelectWePlanGuestWindow] = useState(false);

  function handleAddGuestListWindow(): void {
    setAddGuestListWindow(!addGuestListWindow);
  }

  function handleDissociateUserFromGuestConfirmation(): void {
    setDissociateUserFromGuestConfirmation(
      !dissociateUserFromGuestConfirmation,
    );
  }

  function handleAllGuestsFilter(): void {
    setAllGuestsFilter(!allGuestsFilter);
  }

  function handleSelectWePlanGuestsWindow(): void {
    selectWePlanGuestsWindow === true && handleUnselectedFriends([]);
    setSelectWePlanGuestsWindow(!selectWePlanGuestsWindow);
  }

  function handleSelectWePlanGuestWindow(): void {
    selectWePlanGuestWindow === true && handleUnselectedFriends([]);
    setSelectWePlanGuestWindow(!selectWePlanGuestWindow);
  }

  function handleNewGuestForm(): void {
    setNewGuestWindow(false);
    setNewGuestForm(!newGuestForm);
  }

  function handleNewGuestWindow(): void {
    setNewGuestWindow(!newGuestWindow);
  }

  function handleConfirmedGuestsFilter(): void {
    allGuestsFilter && setAllGuestsFilter(false);
    setConfirmedGuestsFilter(!confirmedGuestsFilter);
  }

  function handleNotConfirmedGuestsFilter(): void {
    allGuestsFilter && setAllGuestsFilter(false);
    setNotConfirmedGuestsFilter(!notConfirmedGuestsFilter);
  }

  function handleOnlyMyGuestsFilter(): void {
    allGuestsFilter && setAllGuestsFilter(false);
    setOnlyMyGuestsFilter(!onlyMyGuestsFilter);
  }

  function unsetEventGuestVariables(): void {
    setSelectedGuestContact({} as IGuestContactDTO);
  }

  function handleGuestFilterWindow(): void {
    setGuestFilterWindow(!guestFilterWindow);
  }

  async function addNewGuest({
    first_name,
    last_name,
  }: IAddNewEventGuestDTO): Promise<void> {
    try {
      setLoading(true);
      const findGuest = eventGuests.find(
        guest =>
          guest.last_name === last_name && guest.first_name === first_name,
      );
      if (findGuest)
        return addToast({
          title: `Convidado Duplicado`,
          description: `Já existe um convidado com este nome - ${first_name} ${last_name}!`,
          type: 'error',
        });
      await api.post(`event-guests/${selectedEvent.id}`, {
        first_name,
        last_name: last_name || '',
        description: ' ',
        weplanUser: false,
        confirmed: false,
        user_id: '0',
      });
      await getEventGuests(selectedEvent.id);
      return addToast({
        title: `Convidado Adicionado`,
        type: 'success',
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createMultipleWePlanGuests(data: IFriendDTO[]): Promise<void> {
    data.map(item => {
      const { personInfo } = item.friend;
      if (personInfo) {
        const findGuest = eventGuests.find(
          guest =>
            guest.first_name === personInfo.first_name &&
            guest.last_name === personInfo.last_name,
        );

        if (findGuest) {
          return addToast({
            title: `Convidado duplicado!`,
            description: `Já existe um convidado ${personInfo.first_name} ${personInfo.last_name}.`,
            type: 'error',
          });
        }
      }
      return item;
    });
    try {
      setLoading(true);
      const users = data.map(({ friend }) => friend);
      await api.post(`/create-multiple-weplan-guests/${selectedEvent.id}`, {
        users,
      });
      await getEventGuests(selectedEvent.id);
      handleNewGuestWindow();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function editGuest(data: IEventGuestDTO): Promise<IEventGuestDTO> {
    try {
      setLoading(true);
      const response = await api.put(`event-guests/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        confirmed: data.confirmed,
      });
      selectedEventGuest &&
        selectedEventGuest.id &&
        selectEventGuest(response.data);
      await getEventGuests(data.event_id);
      return response.data;
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createGuestContact(
    data: ICreateGuestContactDTO,
  ): Promise<void> {
    try {
      setLoading(true);
      await api.post('/guest-contacts', data);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateGuestContact(data: IGuestContactDTO): Promise<void> {
    try {
      setLoading(true);
      await api.put(`/guest-contacts/${data.id}`, data);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteGuestContact(data: IGuestContactDTO): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/guest-contacts/${data.id}`);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteGuest(data: IEventGuestDTO): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/event-guests/${data.id}`);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteWePlanGuest(): Promise<void> {
    try {
      setLoading(true);
      await api.delete(
        `/event/weplan-guests/${selectedEventGuest.weplanGuest.id}`,
      );
      await getEventGuests(selectedEvent.id);
      setDissociateUserFromGuestConfirmation(false);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function associateUserToEventGuest(data: IFriendDTO): Promise<void> {
    try {
      setLoading(true);
      const { personInfo } = data.friend;
      if (personInfo) {
        const findGuest = eventGuests.find(
          guest =>
            guest.first_name === personInfo.first_name &&
            guest.last_name === personInfo.last_name,
        );

        if (findGuest && findGuest.weplanUser) {
          return addToast({
            title: `Convidado duplicado!`,
            description: `Já existe um convidado ${personInfo.first_name} ${personInfo.last_name}.`,
            type: 'error',
          });
        }
      }
      await api.post(`/associate-user-to-event-guest/`, {
        guest_id: selectedEventGuest.id,
        user_id: data.friend_id,
      });

      return await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function sendMassEmailInvitations(): Promise<void> {
    try {
      const guests = eventGuests
        .map(guest => {
          const email =
            (!!guest.contacts &&
              guest.contacts.length > 0 &&
              guest.contacts.find(contact => contact.contact_type === 'Email')
                ?.contact_info) ||
            '';
          let host = user;
          const findOwner = eventOwners.find(
            owner => owner.userEventOwner.id === guest.host_id,
          );
          if (findOwner) host = findOwner.userEventOwner;
          const findMember = eventMembers.find(
            member => member.userEventMember.id === guest.host_id,
          );
          if (findMember) host = findMember.userEventMember;
          return {
            id: guest.id,
            email,
            first_name: guest.first_name,
            host_name:
              (!!host.personInfo && host.personInfo.first_name) || host.name,
          };
        })
        .filter(e => e.email !== '');

      await api.post('/mass-invitation', {
        name: selectedEvent.name,
        eventTrimmedName: selectedEvent.trimmed_name,
        guests,
      });
      addToast({
        type: 'success',
        title: 'Convites enviados com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro, tente novamente!',
      });
      throw new Error(err);
    }
  }

  function selectGuestContact(data: IGuestContactDTO): void {
    setSelectedGuestContact(data);
  }

  useEffect(() => {
    (() => {
      if (
        !allGuestsFilter &&
        !confirmedGuestsFilter &&
        !notConfirmedGuestsFilter &&
        !onlyMyGuestsFilter
      )
        return setAllGuestsFilter(true);
      return '';
    })();
  }, [
    allGuestsFilter,
    confirmedGuestsFilter,
    notConfirmedGuestsFilter,
    onlyMyGuestsFilter,
  ]);

  return (
    <EventGuestsContext.Provider
      value={{
        addNewGuest,
        addGuestListWindow,
        associateUserToEventGuest,
        dissociateUserFromGuestConfirmation,
        createGuestContact,
        deleteGuest,
        deleteGuestContact,
        editGuest,
        guestFilterWindow,
        handleGuestFilterWindow,
        loading,
        selectGuestContact,
        selectedGuestContact,
        updateGuestContact,
        unsetEventGuestVariables,
        allGuestsFilter,
        confirmedGuestsFilter,
        deleteWePlanGuest,
        handleAllGuestsFilter,
        handleConfirmedGuestsFilter,
        handleNewGuestForm,
        handleNewGuestWindow,
        handleNotConfirmedGuestsFilter,
        handleOnlyMyGuestsFilter,
        newGuestForm,
        newGuestWindow,
        notConfirmedGuestsFilter,
        onlyMyGuestsFilter,
        createMultipleWePlanGuests,
        handleSelectWePlanGuestsWindow,
        handleSelectWePlanGuestWindow,
        selectWePlanGuestWindow,
        selectWePlanGuestsWindow,
        handleAddGuestListWindow,
        handleDissociateUserFromGuestConfirmation,
        sendMassEmailInvitations,
      }}
    >
      {children}
    </EventGuestsContext.Provider>
  );
};

function useEventGuests(): EventGuestsContextType {
  const context = useContext(EventGuestsContext);

  if (!context)
    throw new Error('useEventGuests must be used within an AuthProvider');
  return context;
}

export { EventGuestsProvider, useEventGuests };
