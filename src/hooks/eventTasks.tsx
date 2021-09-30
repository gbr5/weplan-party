import React, { useContext, createContext, useState } from 'react';

import { addDays } from 'date-fns';

import api from '../services/api';

import IEventTaskDTO from '../dtos/IEventTaskDTO';
import ICreateEventTaskDTO from '../dtos/ICreateEventTaskDTO';
import { useCurrentEvent } from './currentEvent';
import ICreateTaskNoteDTO from '../dtos/ICreateTaskNoteDTO';
import ITaskNoteDTO from '../dtos/ITaskNoteDTO';
import { useEventVariables } from './eventVariables';
import ITaskDTO from '../dtos/ITaskDTO';
import IUserFollowerDTO from '../dtos/IUserFollowerDTO';

interface EventTasksContextType {
  loading: boolean;
  status: 'not started' | 'running' | 'finnished';
  editTaskTitleWindow: boolean;
  editTaskPriorityWindow: boolean;
  eventTaskFollowersDescriptionWindow: boolean;
  editTaskStatusWindow: boolean;
  eventTaskNotesWindow: boolean;
  eventTaskFollowersWindow: boolean;
  createEventTaskFollowersWindow: boolean;
  deleteTaskFollowerConfirmation: boolean;
  deleteTaskConfirmationWindow: boolean;
  createTaskWindow: boolean;
  taskDate: Date;
  createEventTask: (data: ICreateEventTaskDTO) => Promise<void>;
  createMultipleEventTaskFollowers: (data: IUserFollowerDTO[]) => Promise<void>;
  updateTask: (data: ITaskDTO) => Promise<void>;
  deleteEventTask: (data: IEventTaskDTO) => Promise<void>;
  createTaskNote: (data: ICreateTaskNoteDTO) => Promise<void>;
  deleteTaskNote: (data: ITaskNoteDTO) => Promise<void>;
  handleEditTaskTitleWindow: () => void;
  handleEditTaskPriorityWindow: () => void;
  handleEventTaskFollowersWindow: () => void;
  deleteTaskFollower: () => Promise<void>;
  handleEditTaskStatusWindow: () => void;
  handleEventTaskNotesWindow: () => void;
  handleCreateTaskWindow: () => void;
  handleDeleteTaskConfirmationWindow: () => void;
  selectStatus: (status: 'not started' | 'running' | 'finnished') => void;
  selectTaskDate: (data: Date) => void;
  unsetEventTasksVariables: () => void;
  handleCreateEventTaskFollowersWindow: () => void;
  handleDeleteTaskFollowerConfirmation: () => void;
  handleEventTaskFollowersDescriptionWindow: () => void;
}

const EventTasksContext = createContext({} as EventTasksContextType);

const EventTasksProvider: React.FC = ({ children }) => {
  const {
    selectedEvent,
    selectedEventTask,
    selectEventTask,
    selectedEventTaskFollower,
  } = useEventVariables();
  const { getEventNotes, getEventTasks } = useCurrentEvent();
  const [editTaskTitleWindow, setEditTaskTitleWindow] = useState(false);
  const [editTaskPriorityWindow, setEditTaskPriorityWindow] = useState(false);
  const [editTaskStatusWindow, setEditTaskStatusWindow] = useState(false);
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
  const [eventTaskFollowersWindow, setEventTaskFollowersWindow] = useState(
    false,
  );
  const [
    deleteTaskFollowerConfirmation,
    setDeleteTaskFollowerConfirmation,
  ] = useState(false);
  const [
    eventTaskFollowersDescriptionWindow,
    setEventTaskFollowersDescriptionWindow,
  ] = useState(false);
  const [
    createEventTaskFollowersWindow,
    setCreateEventTaskFollowersWindow,
  ] = useState(false);

  function unsetEventTasksVariables(): void {
    setEditTaskTitleWindow(false);
    setEditTaskPriorityWindow(false);
    setEditTaskStatusWindow(false);
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

  function handleEventTaskFollowersWindow(): void {
    setEventTaskFollowersWindow(!eventTaskFollowersWindow);
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

  function handleEventTaskFollowersDescriptionWindow(): void {
    setEventTaskFollowersDescriptionWindow(
      !eventTaskFollowersDescriptionWindow,
    );
  }

  function handleCreateEventTaskFollowersWindow(): void {
    setCreateEventTaskFollowersWindow(!createEventTaskFollowersWindow);
  }

  function handleDeleteTaskFollowerConfirmation(): void {
    setDeleteTaskFollowerConfirmation(!deleteTaskFollowerConfirmation);
  }
  function selectTaskDate(data: Date): void {
    setTaskDate(data);
  }

  async function createEventTask(data: ICreateEventTaskDTO): Promise<void> {
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

  async function createMultipleEventTaskFollowers(
    data: IUserFollowerDTO[],
  ): Promise<void> {
    try {
      setLoading(true);
      const followers = data.map(follower => {
        return {
          user_id: follower.follower.id,
          type: follower.type,
        };
      });
      await api.post(`/create-multiple-task-followers`, {
        task_id: selectedEventTask.task.id,
        followers,
      });
      await getEventTasks(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(data: ITaskDTO): Promise<void> {
    try {
      setLoading(true);
      const { id, title, priority, due_date } = data;
      const response = await api.put(`/tasks`, {
        id,
        title,
        priority,
        status: data.status,
        due_date,
      });
      selectedEventTask &&
        selectedEventTask.id &&
        selectEventTask({
          ...selectedEventTask,
          task: response.data,
        });
      await getEventTasks(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      selectStatus(data.status);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEventTask(data: IEventTaskDTO): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/event-tasks/${data.id}`);
      await getEventTasks(data.event_id);
      setDeleteTaskConfirmationWindow(false);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTaskFollower(): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/task-followers/${selectedEventTaskFollower.id}`);
      handleDeleteTaskFollowerConfirmation();
      await getEventTasks(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createTaskNote(data: ICreateTaskNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.post(`/task-notes`, data);
      await getEventTasks(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTaskNote(data: ITaskNoteDTO): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/task-notes/${data.id}`);
      await getEventTasks(selectedEvent.id);
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
        deleteTaskFollower,
        editTaskStatusWindow,
        eventTaskNotesWindow,
        deleteTaskConfirmationWindow,
        taskDate,
        createTaskWindow,
        createEventTask,
        updateTask,
        deleteEventTask,
        createTaskNote,
        deleteTaskNote,
        handleEditTaskTitleWindow,
        handleEditTaskPriorityWindow,
        handleEditTaskStatusWindow,
        handleEventTaskNotesWindow,
        handleCreateTaskWindow,
        handleDeleteTaskConfirmationWindow,
        selectStatus,
        selectTaskDate,
        unsetEventTasksVariables,
        createMultipleEventTaskFollowers,
        eventTaskFollowersWindow,
        handleEventTaskFollowersWindow,
        createEventTaskFollowersWindow,
        deleteTaskFollowerConfirmation,
        handleDeleteTaskFollowerConfirmation,
        handleEventTaskFollowersDescriptionWindow,
        handleCreateEventTaskFollowersWindow,
        eventTaskFollowersDescriptionWindow,
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
