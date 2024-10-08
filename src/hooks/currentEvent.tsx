import React, { useContext, createContext, useState, useCallback } from 'react';

import api from '../services/api';

import { useAuth } from './auth';

import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventDTO from '../dtos/IEventDTO';
import IEventTaskDTO from '../dtos/IEventTaskDTO';
import IEventBudgetDTO from '../dtos/IEventBudgetDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import IEventNoteDTO from '../dtos/IEventNoteDTO';
import IEventTransactionDTO from '../dtos/IEventTransactionDTO';
import { useEventVariables } from './eventVariables';
import { useToast } from './toast';
import IFriendDTO from '../dtos/IFriendDTO';
import { useFriends } from './friends';

interface CurrentEventContextType {
  eventFinancialSubSection: string;
  budgetWindow: boolean;
  backdropSearch: boolean;
  loading: boolean;
  numberOfGuests: number;
  myGuestsConfirmed: number;
  confirmedGuests: number;
  myNumberOfGuests: number;
  availableNumberOfGuests: number;
  totalEventCost: number;
  isOwner: boolean;
  deleteEventConfirmationWindow: boolean;
  currentSection: string;
  sectionDescriptionWindow: boolean;
  handleEventFinancialSubSection: (data: string) => void;
  handleBudgetWindow: () => void;
  handleDeleteEventConfirmationWindow: () => void;
  handleSectionDescriptionWindow: () => void;
  handleBackdropSearch: () => void;
  getEventGuests: (eventId: string) => Promise<void>;
  getEventOwners: (event_id: string) => Promise<void>;
  getEventMembers: (event_id: string) => Promise<void>;
  getEventSuppliers: (event_id: string) => Promise<void>;
  calculateTotalEventCost: () => void;
  selectEventSection: (e: string) => void;
  getEvent: (eventId: string) => Promise<void>;
  getEventNotes: (eventId: string) => Promise<void>;
  getEventTasks: (eventId: string) => Promise<void>;
  getEventBudget: (eventId: string) => Promise<void>;
  getEventTransactions: (eventId: string) => Promise<void>;
  createEventBudget: (budget: number) => Promise<void>;
  updateEventBudget: (data: IEventBudgetDTO) => Promise<void>;
  handleSelectedEvent: (data: IEventDTO) => void;
  filterEventFriends: () => IFriendDTO[];
  handleDeleteEvent: () => Promise<void>;
}

const CurrentEventContext = createContext({} as CurrentEventContextType);

const CurrentEventProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { friends } = useFriends();
  const { addToast } = useToast();
  const {
    handleEventBudget,
    handleEventTransactions,
    handleEventTasks,
    handleEventSuppliers,
    handleEventOwners,
    handleEventNotes,
    handleEventMembers,
    handleEventGuests,
    handleEventSupplierTransactionAgreements,
    selectEventSupplier,
    eventSuppliers,
    selectedEventSupplier,
    selectedEventGuest,
    selectEventGuest,
    selectedEventTask,
    selectEventTask,
    selectedEvent,
    selectEvent,
    eventOwners,
    eventMembers,
    eventGuests,
  } = useEventVariables();
  const [eventFinancialSubSection, setEventFinancialSubSection] = useState(
    'Main',
  );
  const [loading, setLoading] = useState(false);
  const [backdropSearch, setBackdropSearch] = useState(false);
  const [budgetWindow, setBudgetWindow] = useState(false);
  const [sectionDescriptionWindow, setSectionDescriptionWindow] = useState(
    false,
  );
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myNumberOfGuests, setMyNumberOfGuests] = useState(0);
  const [availableNumberOfGuests, setAvailableNumberOfGuests] = useState(0);
  const [totalEventCost, setTotalEventCost] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [
    deleteEventConfirmationWindow,
    setDeleteEventConfirmationWindow,
  ] = useState(false);
  const [currentSection, setCurrentSection] = useState('Notes');

  const calculateTotalEventCost = useCallback(() => {
    const hiredSuppliers = eventSuppliers.filter(
      supplier => !supplier.isDischarged && supplier.isHired,
    );
    if (hiredSuppliers.length <= 0) return;
    const totalCost: number = hiredSuppliers
      .map(supplier => {
        let cost = 0;
        if (supplier.transactionAgreements) {
          cost = supplier.transactionAgreements
            .filter(agreement => !agreement.isCancelled)
            .map(agreement => Number(agreement.amount))
            .reduce((a, b) => a + b, 0);
        }
        return cost;
      })
      .reduce((a, b) => a + b, 0);
    setTotalEventCost(totalCost);
  }, [eventSuppliers]);

  function handleEventFinancialSubSection(data: string): void {
    setEventFinancialSubSection(data);
  }

  function unsetEventVariables(): void {
    setNumberOfGuests(0);
    setMyNumberOfGuests(0);
    setMyGuestsConfirmed(0);
    setConfirmedGuests(0);
    setIsOwner(false);
    setTotalEventCost(0);
    setAvailableNumberOfGuests(0);
  }

  function handleBudgetWindow(): void {
    setBudgetWindow(!budgetWindow);
  }

  function handleDeleteEventConfirmationWindow(): void {
    setDeleteEventConfirmationWindow(!deleteEventConfirmationWindow);
  }

  function handleSectionDescriptionWindow(): void {
    setSectionDescriptionWindow(!sectionDescriptionWindow);
  }

  function handleBackdropSearch(): void {
    setBackdropSearch(!backdropSearch);
  }

  function selectEventSection(e: string): void {
    setCurrentSection(e);
  }

  async function getEventTransactions(eventId: string): Promise<void> {
    try {
      const transactions = await api.get<IEventTransactionDTO[]>(
        `/list-event-transactions/${eventId}`,
      );

      handleEventTransactions(
        transactions.data.sort((a, b) => {
          if (
            new Date(a.transaction.due_date) > new Date(b.transaction.due_date)
          )
            return 1;
          if (
            new Date(a.transaction.due_date) < new Date(b.transaction.due_date)
          )
            return -1;
          return 0;
        }),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventSuppliers(event_id: string): Promise<void> {
    try {
      const response = await api.get<IEventSupplierDTO[]>(
        `/event-suppliers/${event_id}`,
      );
      if (selectedEventSupplier && selectedEventSupplier.id) {
        const findSupplier = response.data.find(
          supplier => supplier.id === selectedEventSupplier.id,
        );
        findSupplier && selectEventSupplier(findSupplier);
      }
      handleEventSuppliers(response.data);
      const agreements: IEventSupplierTransactionAgreementDTO[] = [];
      response.data.map(supplier => {
        supplier.transactionAgreements.map(
          agreement => !agreement.isCancelled && agreements.push(agreement),
        );
        return supplier;
      });
      handleEventSupplierTransactionAgreements(agreements);
    } catch (err) {
      throw new Error(err);
    } finally {
      calculateTotalEventCost();
    }
  }
  async function getEventBudget(eventId: string): Promise<void> {
    try {
      if (eventId !== '') {
        const response = await api.get<IEventBudgetDTO>(
          `/event-budget/${eventId}`,
        );
        response.data && response.data.id && handleEventBudget(response.data);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventNotes(eventId: string): Promise<void> {
    try {
      const response = await api.get<IEventNoteDTO[]>(
        `/event-notes/${eventId}`,
      );
      handleEventNotes(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventTasks(eventId: string): Promise<void> {
    try {
      const response = await api.get<IEventTaskDTO[]>(
        `/event-tasks/${eventId}`,
      );
      handleEventTasks(
        response.data.sort((a, b) => {
          if (new Date(a.task.due_date) > new Date(b.task.due_date)) return 1;
          if (new Date(a.task.due_date) < new Date(b.task.due_date)) return -1;
          return 0;
        }),
      );
      if (selectedEventTask && selectedEventTask.id) {
        const updatedTask = response.data.find(
          item => item.id === selectedEventTask.id,
        );
        updatedTask && selectEventTask(updatedTask);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventGuests(eventId: string): Promise<void> {
    try {
      const response = await api.get<IEventGuestDTO[]>(
        `/event-guests/list/${eventId}`,
      );
      if (response.data && response.data.length > 0) {
        handleEventGuests(response.data);
        const oldSelectedGuest = response.data.find(
          thisGuest => thisGuest.id === selectedEventGuest.id,
        );
        oldSelectedGuest !== undefined && selectEventGuest(oldSelectedGuest);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventMembers(eventId: string): Promise<void> {
    try {
      const response = await api.get<IEventMemberDTO[]>(
        `event-members/${eventId}`,
      );
      handleEventMembers(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventOwners(eventId: string): Promise<void> {
    try {
      const response = await api.get<IEventOwnerDTO[]>(
        `/event-owners/${eventId}`,
      );
      handleEventOwners(response.data);
      response.data.map(xOwner => {
        xOwner.userEventOwner.id === user.id && setIsOwner(true);
        return xOwner;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  function handleSelectedEvent(data: IEventDTO): void {
    if (data.id !== selectedEvent.id) {
      unsetEventVariables();
    }
    try {
      Promise.all([
        getEventGuests(data.id),
        getEventOwners(data.id),
        getEventMembers(data.id),
        getEventSuppliers(data.id),
        getEventNotes(data.id),
        getEventTasks(data.id),
        getEventBudget(data.id),
        getEventTransactions(data.id),
      ]);
      setCurrentSection('Notes');
      selectEvent(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEvent(eventId: string): Promise<void> {
    try {
      const response = await api.get<IEventDTO>(`/events/${eventId}`);
      selectEvent(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function createEventBudget(budget: number): Promise<void> {
    try {
      setLoading(true);
      await api.post('/event-budget', {
        event_id: selectedEvent.id,
        budget,
      });

      await getEventBudget(selectedEvent.id);
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
      await api.put(`/event-budget/${id}`, {
        budget,
      });
      await getEventBudget(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteEvent(): Promise<void> {
    try {
      if (selectedEvent.user_id === user.id) {
        await api.delete(`/events/${selectedEvent.id}`);
        // await getEventsAsOwner();
        return;
      }
      const findOwner = eventOwners.find(
        owner => owner.userEventOwner.id === user.id,
      );
      if (findOwner) {
        await api.delete(`/event-owners/${findOwner.id}`);
        // getEventsAsGuest();
        return;
      }
      const findMember = eventMembers.find(
        member => member.userEventMember.id === user.id,
      );
      if (findMember) {
        await api.delete(`/event-members/${findMember.id}`);
        // getEventsAsGuest();
        return;
      }
      const findGuest = eventGuests.find(
        guest => guest.weplanGuest.weplanUserGuest.id === user.id,
      );
      if (findGuest) {
        await api.delete(`/event-guests/${findGuest.id}`);
        // getEventsAsGuest();
        return;
      }

      setDeleteEventConfirmationWindow(false);
      addToast({
        type: 'success',
        title: 'Evento Deletado com sucesso',
        description: 'Você já pode visualizar as alterações no seu dashboard.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Não foi possível deletar seu evento',
        description: 'Tente novamente.',
      });
      throw new Error(err);
    }
  }

  function filterEventFriends(): IFriendDTO[] {
    const sortedFriends: IFriendDTO[] = [];
    friends.map(friend => {
      if (!friend.isConfirmed) return [];
      const findFriendOwner = eventOwners.find(
        owner => owner.userEventOwner.id === friend.friend.id,
      );
      const findFriendMember = eventMembers.find(
        owner => owner.userEventMember.id === friend.friend.id,
      );
      const findFriendGuest = eventGuests
        .filter(
          guest =>
            guest.weplanUser && guest.weplanGuest && guest.weplanGuest.id,
        )
        .find(
          owner => owner.weplanGuest.weplanUserGuest.id === friend.friend.id,
        );
      if (!findFriendMember && !findFriendOwner && !findFriendGuest)
        sortedFriends.push(friend);

      return [];
    });
    return sortedFriends;
  }

  return (
    <CurrentEventContext.Provider
      value={{
        loading,
        eventFinancialSubSection,
        budgetWindow,
        backdropSearch,
        getEvent,
        createEventBudget,
        updateEventBudget,
        getEventSuppliers,
        getEventGuests,
        handleBackdropSearch,
        getEventOwners,
        getEventMembers,
        myGuestsConfirmed,
        numberOfGuests,
        confirmedGuests,
        myNumberOfGuests,
        availableNumberOfGuests,
        totalEventCost,
        isOwner,
        currentSection,
        handleEventFinancialSubSection,
        handleBudgetWindow,
        calculateTotalEventCost,
        selectEventSection,
        handleSectionDescriptionWindow,
        sectionDescriptionWindow,
        getEventNotes,
        getEventTasks,
        getEventBudget,
        getEventTransactions,
        handleSelectedEvent,
        deleteEventConfirmationWindow,
        handleDeleteEvent,
        handleDeleteEventConfirmationWindow,
        filterEventFriends,
      }}
    >
      {children}
    </CurrentEventContext.Provider>
  );
};

function useCurrentEvent(): CurrentEventContextType {
  const context = useContext(CurrentEventContext);

  if (!context)
    throw new Error('useCurrentEvent must be used within an AuthProvider');
  return context;
}

export { CurrentEventProvider, useCurrentEvent };
