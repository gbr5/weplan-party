import React, { useContext, createContext, useState } from 'react';

import api from '../services/api';

import INoteDTO from '../dtos/INoteDTO';
import { useCurrentEvent } from './currentEvent';
import ITransactionNoteDTO from '../dtos/ITransactionNoteDTO';
import { useEventVariables } from './eventVariables';

interface ICreateEventSupplierNoteDTO {
  note: string;
  supplier_id: string;
}

interface ICreateEventNoteDTO {
  note: string;
  event_id: string;
}

interface ICreateTransactionNoteDTO {
  note: string;
  transaction_id: string;
}

interface NoteContextType {
  loading: boolean;
  editNoteWindow: boolean;
  createEventNoteWindow: boolean;
  selectedNote: INoteDTO;
  selectedTransactionNotes: ITransactionNoteDTO[];
  createEventNote: (data: ICreateEventNoteDTO) => Promise<void>;
  createTransactionNote: (data: ICreateTransactionNoteDTO) => Promise<void>;
  createEventSupplierNote: (data: ICreateEventSupplierNoteDTO) => Promise<void>;
  createEventAndSupplierNote: (
    data: ICreateEventSupplierNoteDTO,
  ) => Promise<void>;
  createEventAndTransactionNote: (
    data: ICreateTransactionNoteDTO,
  ) => Promise<void>;
  createEventSupplierAndTransactionNote: (
    data: ICreateTransactionNoteDTO,
  ) => Promise<void>;
  deleteEventNote: (id: string) => Promise<void>;
  deleteTransactionNote: (id: string) => Promise<void>;
  getTransactionNotes: (transaction_id: string) => Promise<void>;
  deleteEventSupplierNote: (id: string) => Promise<void>;
  handleEditNoteWindow: () => void;
  handleCreateEventNoteWindow: () => void;
  editNote: (data: INoteDTO) => Promise<void>;
  updateNotes: () => Promise<void>;
  selectNote: (data: INoteDTO) => void;
  // getTaskNotes: () => Promise<void>;
}

const NoteContext = createContext({} as NoteContextType);

const NoteProvider: React.FC = ({ children }) => {
  const {
    selectedEvent,
    selectedEventSupplier,
    selectedEventTask,
  } = useEventVariables();
  const { getEvent, getEventSuppliers } = useCurrentEvent();

  const [editNoteWindow, setEditNoteWindow] = useState(false);
  const [createEventNoteWindow, setCreateEventNoteWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState({} as INoteDTO);
  const [selectedTransactionNotes, setSelectedTransactionNotes] = useState<
    ITransactionNoteDTO[]
  >([]);

  function selectNote(data: INoteDTO): void {
    setSelectedNote(data);
  }

  async function createEventNote({
    event_id,
    note,
  }: ICreateEventNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post('/event-notes', {
        event_id,
        note,
      });
      await getEvent(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEventNote(id: string): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/event-notes/${id}`);
      await getEvent(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createEventSupplierNote({
    supplier_id,
    note,
  }: ICreateEventSupplierNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post('/event-supplier-notes', {
        supplier_id,
        note,
      });
      await getEventSuppliers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createEventAndSupplierNote({
    supplier_id,
    note,
  }: ICreateEventSupplierNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post('/create-event-and-supplier-note', {
        supplier_id,
        note,
      });
      await getEventSuppliers(selectedEvent.id);
      await getEvent(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEventSupplierNote(id: string): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/event-supplier-notes/${id}`);
      await getEventSuppliers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function getTransactionNotes(transaction_id: string): Promise<void> {
    try {
      setLoading(true);
      const response = await api.get(`/transaction-notes/${transaction_id}`);
      setSelectedTransactionNotes(response.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createTransactionNote({
    transaction_id,
    note,
  }: ICreateTransactionNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post('/transaction-notes', {
        transaction_id,
        note,
      });
      await getTransactionNotes(transaction_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createEventAndTransactionNote({
    transaction_id,
    note,
  }: ICreateTransactionNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post('/create-event-and-transaction-note', {
        transaction_id,
        note,
        event_id: selectedEvent.id,
      });
      await getTransactionNotes(transaction_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createEventSupplierAndTransactionNote({
    transaction_id,
    note,
  }: ICreateTransactionNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post('/create-event-supplier-and-transaction-note', {
        transaction_id,
        note,
        supplier_id: selectedEventSupplier.id,
      });
      await getEventSuppliers(selectedEvent.id);
      await getTransactionNotes(transaction_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTransactionNote(id: string): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/transaction-notes/${id}`);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function editNote({ id, note }: INoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.put('/notes', {
        id,
        note,
      });
      await getEvent(selectedEvent.id);
      setSelectedNote({} as INoteDTO);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateNotes(): Promise<void> {
    Promise.all([
      selectedEventTask.task.notes
        .filter(({ note }) => note.isNew)
        .map(({ note }) => {
          return api.put('/notes', {
            id: note.id,
            note: note.note,
          });
        }),
    ]);
  }

  function handleEditNoteWindow(): void {
    setEditNoteWindow(!editNoteWindow);
  }

  function handleCreateEventNoteWindow(): void {
    setCreateEventNoteWindow(!createEventNoteWindow);
  }

  return (
    <NoteContext.Provider
      value={{
        createEventAndSupplierNote,
        createEventNote,
        createEventSupplierNote,
        deleteEventNote,
        deleteEventSupplierNote,
        loading,
        editNoteWindow,
        selectedNote,
        handleEditNoteWindow,
        editNote,
        updateNotes,
        selectNote,
        createEventNoteWindow,
        handleCreateEventNoteWindow,
        createEventAndTransactionNote,
        createTransactionNote,
        deleteTransactionNote,
        getTransactionNotes,
        createEventSupplierAndTransactionNote,
        selectedTransactionNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

function useNote(): NoteContextType {
  const context = useContext(NoteContext);

  if (!context) throw new Error('useNote must be used within an AuthProvider');
  return context;
}

export { NoteProvider, useNote };
