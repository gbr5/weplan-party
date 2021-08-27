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
  NumberOfNotesContainer,
  NumberOfNotes,
} from './styles';
import formatOnlyTime from '../../../../utils/formatOnlyTime';
import { TimePickerLine } from '../../../DatePickerLine';
import { DatePickerLine } from '../../../TimePickerLine';

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
  } = useEventTasks();

  async function handleUpdateTaskDueDate(date: Date): Promise<void> {
    if (
      formatOnlyDateShort(String(date)) ===
      formatOnlyDateShort(String(selectedEventTask.due_date))
    )
      return;
    try {
      await updateTask({
        ...selectedEventTask,
        due_date: date,
      });
    } catch {
      throw new Error();
    }
  }

  async function handleUpdateTaskDueTime(date: Date): Promise<void> {
    if (
      formatOnlyTime(String(date)) ===
      formatOnlyTime(String(selectedEventTask.due_date))
    )
      return;
    try {
      await updateTask({
        ...selectedEventTask,
        due_date: date,
      });
    } catch {
      throw new Error();
    }
  }

  const status = useMemo(() => {
    if (selectedEventTask.status === 'not started')
      return {
        title: 'Início',
        color: '#1f4fff',
      };
    if (selectedEventTask.status === 'running')
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
    if (selectedEventTask.priority === 'low')
      return {
        title: 'Baixa',
        color: '#007500',
      };
    if (selectedEventTask.priority === 'neutral')
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
      <Menu>
        <MenuButton onClick={handleEditTaskStatusWindow}>
          <MenuTitle>Status</MenuTitle>
          <IconContainer color={status.color}>
            {selectedEventTask.status === 'not started' && (
              <FiCloud size={functionIconSize} />
            )}
            {selectedEventTask.status === 'running' && (
              <FiZap size={functionIconSize} />
            )}
            {selectedEventTask.status === 'finnished' && (
              <FiAward size={functionIconSize} />
            )}
            <MenuText>{status.title}</MenuText>
          </IconContainer>
        </MenuButton>
        <MenuButton onClick={handleEditTaskPriorityWindow}>
          <MenuTitle>Prioridade</MenuTitle>
          <IconContainer color={priority.color}>
            <FiFlag size={functionIconSize} name="flag" />
            <MenuText>{priority.title}</MenuText>
          </IconContainer>
        </MenuButton>
        <MenuButton onClick={handleEventTaskNotesWindow}>
          <MenuTitle>Notas</MenuTitle>
          <IconContainer color="#99afff">
            <FiFileText size={iconSize} />
            {selectedEventTask.notes.length > 0 && (
              <NumberOfNotesContainer>
                <NumberOfNotes>{selectedEventTask.notes.length}</NumberOfNotes>
              </NumberOfNotesContainer>
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
          selectedDate={selectedEventTask.due_date}
        />
        <DatePickerLine
          handleSelectedDate={handleUpdateTaskDueDate}
          selectedDate={selectedEventTask.due_date}
        />
      </DateContainer>
    </Container>
  );
}
