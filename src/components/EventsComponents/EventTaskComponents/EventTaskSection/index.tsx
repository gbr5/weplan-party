import React, { ReactElement, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

import { useEventVariables } from '../../../../hooks/eventVariables';

import { Container, CheckListFunnel } from './styles';
import { EventTask } from '../EventTask';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { NewTaskForm } from '../NewTaskForm';

export function EventTaskSection(): ReactElement {
  const { eventTasks, isOwner } = useEventVariables();
  const { createTaskWindow, handleCreateTaskWindow } = useEventTasks();

  const notStartedCheckListTasks = useMemo(() => {
    return eventTasks.filter(task => task.status === 'not started');
  }, [eventTasks]);

  const inProgressCheckListTasks = useMemo(() => {
    return eventTasks.filter(task => task.status === 'running');
  }, [eventTasks]);

  const resolvedCheckListTasks = useMemo(() => {
    return eventTasks.filter(task => task.status === 'finnished');
  }, [eventTasks]);

  return (
    <>
      {!!createTaskWindow && <NewTaskForm />}
      <Container>
        <strong>Check List</strong>
        {isOwner && (
          <button type="button" onClick={handleCreateTaskWindow}>
            <MdAdd size={40} />
          </button>
        )}
        <CheckListFunnel>
          <div>
            <h1>Não iniciada</h1>
            <ul>
              {notStartedCheckListTasks.map(item => (
                <EventTask key={item.id} eventTask={item} />
              ))}
            </ul>
          </div>
          <div>
            <h1>Em progresso</h1>
            <ul>
              {inProgressCheckListTasks.map(item => (
                <EventTask key={item.id} eventTask={item} />
              ))}
            </ul>
          </div>
          <div>
            <h1>Concluída</h1>
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