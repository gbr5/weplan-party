import { addDays } from 'date-fns';
import React, { createContext, useContext, useState } from 'react';
import { useMemo } from 'react';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IEventBudgetDTO from '../dtos/IEventBudgetDTO';
import IEventDTO from '../dtos/IEventDTO';
import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventNoteDTO from '../dtos/IEventNoteDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import IEventTaskDTO from '../dtos/IEventTaskDTO';
import IEventTransactionDTO from '../dtos/IEventTransactionDTO';
import ITransactionDTO from '../dtos/ITransactionDTO';
import IUserDTO from '../dtos/IUserDTO';
import { useAuth } from './auth';

interface EventVariablesContextType {
  eventBudget: IEventBudgetDTO; // 1
  eventGuests: IEventGuestDTO[]; // 2
  eventSuppliers: IEventSupplierDTO[]; // 3
  hiredSuppliers: IEventSupplierDTO[]; // 4
  dischargedSuppliers: IEventSupplierDTO[]; // 5
  notHiredSuppliers: IEventSupplierDTO[]; // 6
  eventOwners: IEventOwnerDTO[]; // 7
  eventMembers: IEventMemberDTO[]; // 8
  eventTasks: IEventTaskDTO[]; // 9
  eventNotes: IEventNoteDTO[]; // 10
  eventSupplierTransactionAgreements: IEventSupplierTransactionAgreementDTO[]; // 11
  eventTransactions: IEventTransactionDTO[]; // 12
  filteredEventTransactions: IEventTransactionDTO[]; // 13
  newTransactions: ICreateTransactionDTO[]; // 14
  selectedDate: Date; // 15
  selectedDateWindow: boolean; // 16
  selectedEvent: IEventDTO; // 17
  selectedEventGuest: IEventGuestDTO; // 18
  selectedEventMember: IEventMemberDTO; // 19
  selectedEventNote: IEventNoteDTO; // 20
  selectedEventOwner: IEventOwnerDTO; // 21
  selectedEventSupplier: IEventSupplierDTO; // 22
  selectedEventTask: IEventTaskDTO; // 23
  selectedEventTransaction: IEventTransactionDTO; // 24
  selectedEventSupplierTransactionAgreement: IEventSupplierTransactionAgreementDTO; // 25
  selectedNewTransaction: ICreateTransactionDTO; // 26
  isOwner: boolean;
  master: IUserDTO;
  currentSection: string;
  handleEventGuests: (data: IEventGuestDTO[]) => void;
  handleEventSuppliers: (data: IEventSupplierDTO[]) => void;
  handleEventOwners: (data: IEventOwnerDTO[]) => void;
  handleEventMembers: (data: IEventMemberDTO[]) => void;
  handleEventTasks: (data: IEventTaskDTO[]) => void;
  handleEventNotes: (data: IEventNoteDTO[]) => void;
  handleEventTransactions: (data: IEventTransactionDTO[]) => void;
  transformEventTransactions: (
    data: ITransactionDTO[],
  ) => IEventTransactionDTO[];
  handleEventSupplierTransactionAgreements: (
    data: IEventSupplierTransactionAgreementDTO[],
  ) => void;
  selectEvent: (data: IEventDTO) => void;
  selectEventGuest: (data: IEventGuestDTO) => void;
  selectEventSupplier: (data: IEventSupplierDTO) => void;
  selectEventOwner: (data: IEventOwnerDTO) => void;
  selectEventMember: (data: IEventMemberDTO) => void;
  selectEventTask: (data: IEventTaskDTO) => void;
  selectEventNote: (data: IEventNoteDTO) => void;
  selectEventTransaction: (data: IEventTransactionDTO) => void;
  selectEventSupplierTransactionAgreement: (
    data: IEventSupplierTransactionAgreementDTO,
  ) => void;
  handleEventBudget: (data: IEventBudgetDTO) => void;
  handleFilteredEventTransactions: (data: IEventTransactionDTO[]) => void;
  unsetVariables: () => void;
  handleSelectedDate: (data: Date) => void;
  handleSelectedDateWindow: () => void;
  handleSelectedNewTransaction: (data: ICreateTransactionDTO) => void;
  selectNewTransactions: (data: ICreateTransactionDTO[]) => void;
  handleCurrentSection: (date: string) => void;
}

const EventVariablesContext = createContext({} as EventVariablesContextType);

const EventVariablesProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [eventBudget, setEventBudget] = useState({} as IEventBudgetDTO);
  const [eventGuests, setEventGuests] = useState<IEventGuestDTO[]>([]);
  const [notHiredSuppliers, setNotHiredSuppliers] = useState<
    IEventSupplierDTO[]
  >([]);
  const [dischargedSuppliers, setDischargedSuppliers] = useState<
    IEventSupplierDTO[]
  >([]);
  const [hiredSuppliers, setHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [eventSuppliers, setEventSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [eventOwners, setEventOwners] = useState<IEventOwnerDTO[]>([]);
  const [eventMembers, setEventMembers] = useState<IEventMemberDTO[]>([]);
  const [eventTasks, setEventTasks] = useState<IEventTaskDTO[]>([]);
  const [eventNotes, setEventNotes] = useState<IEventNoteDTO[]>([]);
  const [
    eventSupplierTransactionAgreements,
    setEventSupplierTransactionAgreements,
  ] = useState<IEventSupplierTransactionAgreementDTO[]>([]);
  const [
    selectedEventSupplierTransactionAgreement,
    setSelectedEventSupplierTransactionAgreement,
  ] = useState({} as IEventSupplierTransactionAgreementDTO);
  const [eventTransactions, setEventTransactions] = useState<
    IEventTransactionDTO[]
  >([]);
  const [filteredEventTransactions, setFilteredEventTransactions] = useState<
    IEventTransactionDTO[]
  >([]);
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [selectedEventGuest, setSelectedEventGuest] = useState(
    {} as IEventGuestDTO,
  );
  const [selectedEventSupplier, setSelectedEventSupplier] = useState(
    {} as IEventSupplierDTO,
  );
  const [selectedEventOwner, setSelectedEventOwner] = useState(
    {} as IEventOwnerDTO,
  );
  const [selectedEventMember, setSelectedEventMember] = useState(
    {} as IEventMemberDTO,
  );
  const [selectedEventTask, setSelectedEventTask] = useState(
    {} as IEventTaskDTO,
  );
  const [selectedEventNote, setSelectedEventNote] = useState(
    {} as IEventNoteDTO,
  );
  const [selectedEventTransaction, setSelectedEventTransaction] = useState(
    {} as IEventTransactionDTO,
  );
  const [newTransactions, setNewTransactions] = useState<
    ICreateTransactionDTO[]
  >([]);
  const [selectedNewTransaction, setSelectedNewTransaction] = useState(
    {} as ICreateTransactionDTO,
  );
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 3));
  const [selectedDateWindow, setSelectedDateWindow] = useState(false);
  const [currentSection, setCurrentSection] = useState('notes');

  function unsetVariables(): void {
    setEventBudget({} as IEventBudgetDTO); // 1
    setEventGuests([]); // 2
    setEventSuppliers([]); // 3
    setHiredSuppliers([]); // 4
    setNotHiredSuppliers([]); // 5
    setDischargedSuppliers([]); // 6
    setNewTransactions([]); // 7
    setEventOwners([]); // 8
    setEventMembers([]); // 9
    setEventTasks([]); // 10
    setEventNotes([]); // 11
    setEventSupplierTransactionAgreements([]); // 12
    setEventTransactions([]); // 13
    setFilteredEventTransactions([]); // 14
    setSelectedDate(addDays(new Date(), 3)); // 15
    setSelectedDateWindow(false); // 16
    setSelectedEvent({} as IEventDTO); // 17
    setSelectedEventGuest({} as IEventGuestDTO); // 18
    setSelectedEventSupplier({} as IEventSupplierDTO); // 19
    setSelectedEventOwner({} as IEventOwnerDTO); // 20
    setSelectedEventMember({} as IEventMemberDTO); // 21
    setSelectedEventTask({} as IEventTaskDTO); // 22
    setSelectedEventNote({} as IEventNoteDTO); // 23
    setSelectedEventTransaction({} as IEventTransactionDTO); // 24
    setSelectedEventSupplierTransactionAgreement(
      {} as IEventSupplierTransactionAgreementDTO,
    ); // 25
    setSelectedNewTransaction({} as ICreateTransactionDTO); // 26
    setCurrentSection('notes');
  }

  function handleSelectedDate(data: Date): void {
    setSelectedDate(data);
    setSelectedDateWindow(false);
  }
  function handleSelectedNewTransaction(data: ICreateTransactionDTO): void {
    setSelectedNewTransaction(data);
  }
  function handleCurrentSection(data: string): void {
    setCurrentSection(data);
  }
  function selectNewTransactions(data: ICreateTransactionDTO[]): void {
    setNewTransactions(data);
  }
  function handleSelectedDateWindow(): void {
    setSelectedDateWindow(!selectedDateWindow);
  }
  function selectEvent(data: IEventDTO): void {
    setSelectedEvent(data);
  }

  function selectEventGuest(data: IEventGuestDTO): void {
    setSelectedEventGuest(data);
  }

  function selectEventSupplier(data: IEventSupplierDTO): void {
    setSelectedEventSupplier(data);
  }

  function selectEventOwner(data: IEventOwnerDTO): void {
    setSelectedEventOwner(data);
  }

  function selectEventMember(data: IEventMemberDTO): void {
    setSelectedEventMember(data);
  }

  function selectEventTask(data: IEventTaskDTO): void {
    setSelectedEventTask(data);
  }
  function selectEventNote(data: IEventNoteDTO): void {
    setSelectedEventNote(data);
  }
  function selectEventTransaction(data: IEventTransactionDTO): void {
    setSelectedEventTransaction(data);
  }
  function selectEventSupplierTransactionAgreement(
    data: IEventSupplierTransactionAgreementDTO,
  ): void {
    setSelectedEventSupplierTransactionAgreement(data);
  }
  function handleEventGuests(data: IEventGuestDTO[]): void {
    setEventGuests(data);
  }
  function handleEventSuppliers(data: IEventSupplierDTO[]): void {
    setEventSuppliers(data);
    const hired = data.filter(supplier => supplier.isHired);
    setHiredSuppliers(hired);
  }
  function handleEventOwners(data: IEventOwnerDTO[]): void {
    setEventOwners(data);
  }
  function handleEventMembers(data: IEventMemberDTO[]): void {
    setEventMembers(data);
  }
  function handleEventTasks(data: IEventTaskDTO[]): void {
    setEventTasks(data);
  }
  function handleEventNotes(data: IEventNoteDTO[]): void {
    setEventNotes(data);
  }
  function handleEventTransactions(data: IEventTransactionDTO[]): void {
    setEventTransactions(data);
  }
  function transformEventTransactions(
    data: ITransactionDTO[],
  ): IEventTransactionDTO[] {
    const updatedTransactions = data
      .map(transaction => {
        const supplierAgreements: IEventSupplierTransactionAgreementDTO[] = [];
        eventSuppliers.map(supplier => {
          const agreement = supplier.transactionAgreements.find(
            thisAgreement => {
              const findTransaction = !!thisAgreement.transactions.find(
                item => item.transaction.id === transaction.id,
              );
              return findTransaction
                ? supplierAgreements.push(thisAgreement)
                : undefined;
            },
          );
          return agreement;
        });
        const agreement_type =
          supplierAgreements.length > 0 ? 'supplier' : 'none';
        return {
          event_id: selectedEvent.id,
          transaction,
          agreement_type,
          agreement_id:
            agreement_type === 'supplier' ? supplierAgreements[0].id : 'none',
        };
      })
      .sort((a, b) => {
        if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date))
          return 1;
        if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date))
          return -1;
        return 0;
      });
    return updatedTransactions;
  }
  function handleFilteredEventTransactions(data: IEventTransactionDTO[]): void {
    setFilteredEventTransactions(data);
  }
  function handleEventSupplierTransactionAgreements(
    data: IEventSupplierTransactionAgreementDTO[],
  ): void {
    setEventSupplierTransactionAgreements(data);
  }
  function handleEventBudget(data: IEventBudgetDTO): void {
    setEventBudget(data);
  }
  const isOwner = useMemo(() => {
    if (eventOwners.length <= 0) return false;
    return !!eventOwners.find(owner => owner.userEventOwner.id === user.id);
  }, [eventOwners, user]);

  const master = useMemo(() => {
    const thisowner = eventOwners.filter(
      owner => owner.userEventOwner.id === selectedEvent.user_id,
    )[0];
    return thisowner ? thisowner.userEventOwner : ({} as IUserDTO);
  }, [eventOwners, selectedEvent]);

  return (
    <EventVariablesContext.Provider
      value={{
        isOwner,
        master,
        dischargedSuppliers,
        eventBudget,
        eventGuests,
        eventMembers,
        eventNotes,
        eventOwners,
        eventSuppliers,
        eventSupplierTransactionAgreements,
        eventTasks,
        eventTransactions,
        filteredEventTransactions,
        handleEventBudget,
        handleEventGuests,
        handleEventMembers,
        handleEventNotes,
        handleEventOwners,
        handleEventSuppliers,
        handleEventTasks,
        handleEventTransactions,
        handleEventSupplierTransactionAgreements,
        handleFilteredEventTransactions,
        hiredSuppliers,
        notHiredSuppliers,
        selectedEvent,
        selectedEventGuest,
        selectedEventMember,
        selectedEventNote,
        selectedEventOwner,
        selectedEventSupplier,
        selectedEventTask,
        selectedEventTransaction,
        selectEvent,
        selectEventGuest,
        selectEventMember,
        selectEventNote,
        selectEventOwner,
        selectEventSupplier,
        selectEventTask,
        selectEventTransaction,
        selectEventSupplierTransactionAgreement,
        selectedEventSupplierTransactionAgreement,
        unsetVariables,
        newTransactions,
        selectedDate,
        selectedDateWindow,
        selectedNewTransaction,
        handleSelectedDate,
        handleSelectedDateWindow,
        handleSelectedNewTransaction,
        selectNewTransactions,
        transformEventTransactions,
        currentSection,
        handleCurrentSection,
      }}
    >
      {children}
    </EventVariablesContext.Provider>
  );
};

function useEventVariables(): EventVariablesContextType {
  const context = useContext(EventVariablesContext);

  if (!context)
    throw new Error('useEventVariables must be used within an AuthProvider!');
  return context;
}

export { EventVariablesProvider, useEventVariables };
