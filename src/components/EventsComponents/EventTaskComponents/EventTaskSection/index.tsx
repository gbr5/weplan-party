import React, { ReactElement, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

import { useEventVariables } from '../../../../hooks/eventVariables';

import { Container, CheckListFunnel } from './styles';
import { EventTask } from '../EventTask';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { NewTaskForm } from '../NewTaskForm';
import { EventTaskFollowersWindow } from '../EventTaskFollowersWindow';
import { AddEventTaskFollowersWindow } from '../AddEventTaskFollowersWindow';
import { EventTaskFollowersDescriptionWindow } from '../EventTaskFollowersDescriptionWindow';
import DeleteConfirmationWindow from '../../../DeleteConfirmationWindow';

export function EventTaskSection(): ReactElement {
  const {
    eventTasks,
    isOwner,
    selectedEventTaskFollower,
  } = useEventVariables();
  const {
    createTaskWindow,
    handleCreateTaskWindow,
    eventTaskFollowersWindow,
    createEventTaskFollowersWindow,
    eventTaskFollowersDescriptionWindow,
    deleteTaskFollowerConfirmation,
    handleDeleteTaskFollowerConfirmation,
    deleteTaskFollower,
  } = useEventTasks();

  const notStartedCheckListTasks = useMemo(() => {
    return eventTasks.filter(({ task }) => task.status === 'not started');
  }, [eventTasks]);

  const inProgressCheckListTasks = useMemo(() => {
    return eventTasks.filter(({ task }) => task.status === 'running');
  }, [eventTasks]);

  const resolvedCheckListTasks = useMemo(() => {
    return eventTasks.filter(({ task }) => task.status === 'finnished');
  }, [eventTasks]);

  return (
    <>
      {eventTaskFollowersWindow && <EventTaskFollowersWindow />}
      {createEventTaskFollowersWindow && <AddEventTaskFollowersWindow />}
      {eventTaskFollowersDescriptionWindow && (
        <EventTaskFollowersDescriptionWindow />
      )}
      {selectedEventTaskFollower && deleteTaskFollowerConfirmation && (
        <DeleteConfirmationWindow
          handleDelete={deleteTaskFollower}
          onHandleCloseWindow={handleDeleteTaskFollowerConfirmation}
          title="Deseja mesmo deletar o seguidor?"
        />
      )}
      {!!createTaskWindow && <NewTaskForm />}
      <Container>
        <strong>Tarefas</strong>
        {isOwner && (
          <button type="button" onClick={handleCreateTaskWindow}>
            <MdAdd size={40} />
          </button>
        )}
        <CheckListFunnel>
          <div>
            <h1>Início</h1>
            <ul>
              {notStartedCheckListTasks.map(item => (
                <EventTask key={item.id} eventTask={item} />
              ))}
            </ul>
          </div>
          <div>
            <h1>Execução</h1>
            <ul>
              {inProgressCheckListTasks.map(item => (
                <EventTask key={item.id} eventTask={item} />
              ))}
            </ul>
          </div>
          <div>
            <h1>Fim</h1>
            <ul>
              {resolvedCheckListTasks.map(item => (
                <EventTask key={item.id} eventTask={item} />
              ))}
            </ul>
          </div>
        </CheckListFunnel>
      </Container>
    </>
  );
}
