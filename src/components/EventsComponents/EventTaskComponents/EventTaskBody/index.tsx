import React, { ReactElement, useMemo } from 'react';

import {
  FiFileText,
  FiCloud,
  FiZap,
  FiAward,
  FiFlag,
  FiTrash2,
} from 'react-icons/fi';

import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../hooks/eventVariables';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';

import {
  Container,
  Menu,
  MenuButton,
  IconContainer,
  MenuText,
  MenuTitle,
  DateContainer,
  DateHeader,
  MenuButtonContainer,
} from './styles';
import formatOnlyTime from '../../../../utils/formatOnlyTime';
import { TimePickerLine } from '../../../DatePickerLine';
import { DatePickerLine } from '../../../TimePickerLine';
import InlineFormField from '../../../InlineFormField';
import { SelectTaskStatus } from '../SelectTaskStatus';
import { SelectTaskPriority } from '../SelectTaskPriority';
import { NotificationNumber } from '../../../NotificationNumber';

export function EventTaskBody(): ReactElement {
  const iconSize = 40;
  const functionIconSize = 28;

  const { selectedEventTask } = useEventVariables();
  const {
    handleEditTaskPriorityWindow,
    handleEditTaskStatusWindow,
    handleEventTaskNotesWindow,
    handleDeleteTaskConfirmationWindow,
    updateTask,
    editTaskStatusWindow,
    editTaskPriorityWindow,
  } = useEventTasks();

  async function handleUpdateTaskDueDate(date: Date): Promise<void> {
    if (
      formatOnlyDateShort(String(date)) ===
      formatOnlyDateShort(String(selectedEventTask.task.due_date))
    )
      return;
    try {
      await updateTask({
        ...selectedEventTask.task,
        due_date: date,
      });
    } catch {
      throw new Error();
    }
  }

  async function handleUpdateTaskDueTime(date: Date): Promise<void> {
    if (
      formatOnlyTime(String(date)) ===
      formatOnlyTime(String(selectedEventTask.task.due_date))
    )
      return;
    try {
      await updateTask({
        ...selectedEventTask.task,
        due_date: date,
      });
    } catch {
      throw new Error();
    }
  }

  async function handleUpdateTaskTitle(title: string): Promise<void> {
    if (title === selectedEventTask.task.title || title === '') return;
    try {
      await updateTask({
        ...selectedEventTask.task,
        title,
      });
    } catch {
      throw new Error();
    }
  }

  const status = useMemo(() => {
    if (selectedEventTask.task.status === 'not started')
      return {
        title: 'Início',
        color: '#1f4fff',
      };
    if (selectedEventTask.task.status === 'running')
      return {
        title: 'Execução',
        color: '#ff3030',
      };
    return {
      title: 'Fim',
      color: '#007500',
    };
  }, [selectedEventTask]);

  const priority = useMemo(() => {
    if (selectedEventTask.task.priority === 'low')
      return {
        title: 'Baixa',
        color: '#007500',
      };
    if (selectedEventTask.task.priority === 'neutral')
      return {
        title: 'Neutra',
        color: '#1f4fff',
      };
    return {
      title: 'Alta',
      color: '#ff3030',
    };
  }, [selectedEventTask]);

  return (
    <Container>
      <InlineFormField
        defaultValue={selectedEventTask.task.title}
        handleOnSubmit={handleUpdateTaskTitle}
        placeholder={selectedEventTask.task.title}
      />
      <Menu>
        <MenuButtonContainer>
          {editTaskStatusWindow && <SelectTaskStatus />}
          <MenuButton onClick={handleEditTaskStatusWindow}>
            <MenuTitle>Status</MenuTitle>
            <IconContainer color={status.color}>
              {selectedEventTask.task.status === 'not started' && (
                <FiCloud size={functionIconSize} />
              )}
              {selectedEventTask.task.status === 'running' && (
                <FiZap size={functionIconSize} />
              )}
              {selectedEventTask.task.status === 'finnished' && (
                <FiAward size={functionIconSize} />
              )}
              <MenuText>{status.title}</MenuText>
            </IconContainer>
          </MenuButton>
        </MenuButtonContainer>
        <MenuButtonContainer>
          {editTaskPriorityWindow && <SelectTaskPriority />}
          <MenuButton onClick={handleEditTaskPriorityWindow}>
            <MenuTitle>Prioridade</MenuTitle>
            <IconContainer color={priority.color}>
              <FiFlag size={functionIconSize} name="flag" />
              <MenuText>{priority.title}</MenuText>
            </IconContainer>
          </MenuButton>
        </MenuButtonContainer>
        <MenuButton onClick={handleEventTaskNotesWindow}>
          <MenuTitle>Notas</MenuTitle>
          <IconContainer color="#99afff">
            <FiFileText size={iconSize} />
            {selectedEventTask.task.notes.length > 0 && (
              <NotificationNumber
                number={selectedEventTask.task.notes.length}
              />
            )}
          </IconContainer>
        </MenuButton>
        <MenuButton onClick={handleDeleteTaskConfirmationWindow}>
          <MenuTitle>Deletar</MenuTitle>
          <IconContainer color="#ff3030">
            <FiTrash2 size={iconSize} />
          </IconContainer>
        </MenuButton>
      </Menu>
      <DateContainer>
        <DateHeader>Data Prevista</DateHeader>
        <TimePickerLine
          handleSelectedDate={handleUpdateTaskDueTime}
          selectedDate={selectedEventTask.task.due_date}
        />
        <DatePickerLine
          handleSelectedDate={handleUpdateTaskDueDate}
          selectedDate={selectedEventTask.task.due_date}
        />
      </DateContainer>
    </Container>
  );
}
