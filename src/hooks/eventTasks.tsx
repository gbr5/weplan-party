import React, { useContext, createContext, useState } from 'react';

import { addDays } from 'date-fns';

import api from '../services/api';

import IEventTaskDTO from '../dtos/IEventTaskDTO';
import ICreateEventTaskDTO from '../dtos/ICreateEventTaskDTO';
import { useCurrentEvent } from './currentEvent';
import ICreateEventTaskNoteDTO from '../dtos/ICreateEventTaskNoteDTO';
import IEventTaskNoteDTO from '../dtos/IEventTaskNoteDTO';
import { useEventVariables } from './eventVariables';

interface EventTasksContextType {
  loading: boolean;
  status: 'not started' | 'running' | 'finnished';
  editTaskTitleWindow: boolean;
  editTaskPriorityWindow: boolean;
  editTaskStatusWindow: boolean;
  editTaskDateWindow: boolean;
  editTaskTimeWindow: boolean;
  selectTaskDateWindow: boolean;
  selectTaskTimeWindow: boolean;
  eventTaskNotesWindow: boolean;
  deleteTaskConfirmationWindow: boolean;
  createTaskWindow: boolean;
  taskDate: Date;
  createTask: (data: ICreateEventTaskDTO) => Promise<void>;
  updateTask: (data: IEventTaskDTO) => Promise<void>;
  deleteTask: (data: IEventTaskDTO) => Promise<void>;
  createTaskNote: (data: ICreateEventTaskNoteDTO) => Promise<void>;
  deleteTaskNote: (data: IEventTaskNoteDTO) => Promise<void>;
  handleEditTaskTitleWindow: () => void;
  handleEditTaskPriorityWindow: () => void;
  handleEditTaskStatusWindow: () => void;
  handleEditTaskDateWindow: () => void;
  handleEditTaskTimeWindow: () => void;
  handleSelectTaskDateWindow: () => void;
  handleSelectTaskTimeWindow: () => void;
  handleEventTaskNotesWindow: () => void;
  handleCreateTaskWindow: () => void;
  handleDeleteTaskConfirmationWindow: () => void;
  selectStatus: (status: 'not started' | 'running' | 'finnished') => void;
  selectTaskDate: (data: Date) => void;
  unsetEventTasksVariables: () => void;
}

const EventTasksContext = createContext({} as EventTasksContextType);

const EventTasksProvider: React.FC = ({ children }) => {
  const {
    selectedEvent,
    selectedEventTask,
    selectEventTask,
  } = useEventVariables();
  const { getEvent, getEventNotes, getEventTasks } = useCurrentEvent();
  const [editTaskTitleWindow, setEditTaskTitleWindow] = useState(false);
  const [editTaskPriorityWindow, setEditTaskPriorityWindow] = useState(false);
  const [editTaskStatusWindow, setEditTaskStatusWindow] = useState(false);
  const [editTaskDateWindow, setEditTaskDateWindow] = useState(false);
  const [editTaskTimeWindow, setEditTaskTimeWindow] = useState(false);
  const [selectTaskDateWindow, setSelectTaskDateWindow] = useState(false);
  const [selectTaskTimeWindow, setSelectTaskTimeWindow] = useState(false);
  const [eventTaskNotesWindow, setEventTaskNotesWindow] = useState(false);
  const [
    deleteTaskConfirmationWindow,
    setDeleteTaskConfirmationWindow,
  ] = useState(false);
  const [status, setStatus] = useState<'not started' | 'running' | 'finnished'>(
    'not started',
  );
  const [createTaskWindow, setCreateTaskWindow] = useState(false);
  const [taskDate, setTaskDate] = useState(addDays(new Date(), 3));
  const [loading, setLoading] = useState(false);

  function unsetEventTasksVariables(): void {
    setEditTaskTitleWindow(false);
    setEditTaskPriorityWindow(false);
    setEditTaskStatusWindow(false);
    setEditTaskDateWindow(false);
    setEditTaskTimeWindow(false);
    setSelectTaskDateWindow(false);
    setSelectTaskTimeWindow(false);
    setEventTaskNotesWindow(false);
    setDeleteTaskConfirmationWindow(false);
    setStatus('not started');
    setCreateTaskWindow(false);
    setTaskDate(addDays(new Date(), 3));
    setLoading(false);
  }

  function handleEditTaskTitleWindow(): void {
    setEditTaskTitleWindow(!editTaskTitleWindow);
  }

  function handleEditTaskPriorityWindow(): void {
    setEditTaskStatusWindow(false);
    setEditTaskPriorityWindow(!editTaskPriorityWindow);
  }

  function handleEditTaskStatusWindow(): void {
    setEditTaskPriorityWindow(false);
    setEditTaskStatusWindow(!editTaskStatusWindow);
  }

  function handleEditTaskDateWindow(): void {
    setEditTaskDateWindow(!editTaskDateWindow);
  }

  function handleEditTaskTimeWindow(): void {
    setEditTaskTimeWindow(!editTaskTimeWindow);
  }

  function handleSelectTaskDateWindow(): void {
    setSelectTaskDateWindow(!selectTaskDateWindow);
  }

  function handleSelectTaskTimeWindow(): void {
    setSelectTaskTimeWindow(!selectTaskTimeWindow);
  }

  function handleEventTaskNotesWindow(): void {
    setEventTaskNotesWindow(!eventTaskNotesWindow);
  }

  function handleCreateTaskWindow(): void {
    setCreateTaskWindow(!createTaskWindow);
  }

  function handleDeleteTaskConfirmationWindow(): void {
    setDeleteTaskConfirmationWindow(!deleteTaskConfirmationWindow);
  }

  function selectStatus(data: 'not started' | 'running' | 'finnished'): void {
    setStatus(data);
  }

  function selectTaskDate(data: Date): void {
    setTaskDate(data);
  }

  async function createTask(data: ICreateEventTaskDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post(`/event-tasks`, {
        due_date: data.due_date,
        event_id: data.event_id,
        priority: data.priority,
        status: data.status,
        title: data.title,
      });
      await getEventTasks(data.event_id);
      await getEventNotes(data.event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(data: IEventTaskDTO): Promise<void> {
    try {
      setLoading(true);
      const response = await api.put(`/event-tasks/${data.id}`, data);
      selectedEventTask &&
        selectedEventTask.id &&
        selectEventTask(response.data);
      await getEventTasks(data.event_id);
      await getEventNotes(data.event_id);
      selectStatus(data.status);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(data: IEventTaskDTO): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/event-tasks/${data.id}`);
      await getEventTasks(data.event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createTaskNote(data: ICreateEventTaskNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post(`/event-task-notes`, data);
      await getEvent(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTaskNote(data: IEventTaskNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/event-task-notes/${data.id}`);
      await getEvent(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <EventTasksContext.Provider
      value={{
        loading,
        status,
        editTaskTitleWindow,
        editTaskPriorityWindow,
        editTaskStatusWindow,
        editTaskDateWindow,
        editTaskTimeWindow,
        selectTaskDateWindow,
        selectTaskTimeWindow,
        eventTaskNotesWindow,
        deleteTaskConfirmationWindow,
        taskDate,
        createTaskWindow,
        createTask,
        updateTask,
        deleteTask,
        createTaskNote,
        deleteTaskNote,
        handleEditTaskTitleWindow,
        handleEditTaskPriorityWindow,
        handleEditTaskStatusWindow,
        handleEditTaskDateWindow,
        handleEditTaskTimeWindow,
        handleSelectTaskDateWindow,
        handleSelectTaskTimeWindow,
        handleEventTaskNotesWindow,
        handleCreateTaskWindow,
        handleDeleteTaskConfirmationWindow,
        selectStatus,
        selectTaskDate,
        unsetEventTasksVariables,
      }}
    >
      {children}
    </EventTasksContext.Provider>
  );
};

function useEventTasks(): EventTasksContextType {
  const context = useContext(EventTasksContext);

  if (!context)
    throw new Error('useEventTasks must be used within an AuthProvider');
  return context;
}

export { EventTasksProvider, useEventTasks };
