import React, { useContext, createContext, useState } from 'react';

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

interface EventGuestsContextType {
  allGuestsFilter: boolean;
  confirmedGuestsFilter: boolean;
  guestFilterWindow: boolean;
  loading: boolean;
  newGuestForm: boolean;
  newGuestWindow: boolean;
  selectWePlanGuestsWindow: boolean;
  notConfirmedGuestsFilter: boolean;
  onlyMyGuestsFilter: boolean;
  selectedGuestContact: IGuestContactDTO;
  addNewGuest: (data: IAddNewEventGuestDTO) => Promise<void>;
  createMultipleWePlanGuests: (data: IFriendDTO[]) => Promise<void>;
  // createMultipleMobileGuests: (data: Contact[]) => Promise<void>;
  createGuestContact: (data: ICreateGuestContactDTO) => Promise<void>;
  deleteGuestContact: (data: IGuestContactDTO) => Promise<void>;
  deleteGuest: (data: IEventGuestDTO) => Promise<void>;
  editGuest: (data: IEventGuestDTO) => Promise<IEventGuestDTO>;
  handleAllGuestsFilter: () => void;
  handleConfirmedGuestsFilter: () => void;
  handleGuestFilterWindow: () => void;
  handleNewGuestForm: () => void;
  handleNewGuestWindow: () => void;
  handleNotConfirmedGuestsFilter: () => void;
  handleSelectWePlanGuestsWindow: () => void;
  handleOnlyMyGuestsFilter: () => void;
  selectGuestContact: (data: IGuestContactDTO) => void;
  updateGuestContact: (data: IGuestContactDTO) => Promise<void>;
  unsetEventGuestVariables: () => void;
}

const EventGuestsContext = createContext({} as EventGuestsContextType);

const EventGuestsProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const {
    selectedEvent,
    selectEventGuest,
    selectedEventGuest,
    eventGuests,
  } = useEventVariables();
  const { getEventGuests } = useCurrentEvent();

  const [loading, setLoading] = useState(false);
  const [guestFilterWindow, setGuestFilterWindow] = useState(false);
  const [selectedGuestContact, setSelectedGuestContact] = useState(
    {} as IGuestContactDTO,
  );
  const [confirmedGuestsFilter, setConfirmedGuestsFilter] = useState(false);
  const [notConfirmedGuestsFilter, setNotConfirmedGuestsFilter] = useState(
    false,
  );
  const [allGuestsFilter, setAllGuestsFilter] = useState(true);
  const [onlyMyGuestsFilter, setOnlyMyGuestsFilter] = useState(false);
  const [newGuestForm, setNewGuestForm] = useState(false);
  const [newGuestWindow, setNewGuestWindow] = useState(false);
  const [selectWePlanGuestsWindow, setSelectWePlanGuestsWindow] = useState(
    false,
  );

  function handleAllGuestsFilter(): void {
    setAllGuestsFilter(!allGuestsFilter);
  }

  function handleSelectWePlanGuestsWindow(): void {
    setSelectWePlanGuestsWindow(!selectWePlanGuestsWindow);
  }

  function handleNewGuestForm(): void {
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

  // async function createMultipleMobileGuests(data: Contact[]): Promise<void> {
  //   try {
  //     setLoading(true);
  //     const contacts = data.map(
  //       ({ givenName, familyName, phoneNumbers, emailAddresses }) => {
  //         const findGuest = guests.find(
  //           guest =>
  //             guest.last_name === familyName && guest.first_name === givenName,
  //         );
  //         if (findGuest)
  //           return Alert.alert(
  //             `Convidado Duplicado`,
  //             `Já existe um convidado com este nome - ${givenName} ${familyName}!`,
  //           );
  //         return {
  //           givenName,
  //           familyName,
  //           phoneNumbers: phoneNumbers.map(({ number }) => {
  //             return {
  //               number,
  //             };
  //           }),
  //           emailAddresses: emailAddresses.map(({ email }) => {
  //             return {
  //               email,
  //             };
  //           }),
  //         };
  //       },
  //     );
  //     await api.post(`/create-multiple-mobile-guests/${selectedEvent.id}`, {
  //       contacts,
  //     });
  //     await getEventGuests(selectedEvent.id);
  //   } catch (err) {
  //     throw new Error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
        createGuestContact,
        deleteGuest,
        // createMultipleMobileGuests,
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
        selectWePlanGuestsWindow,
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
