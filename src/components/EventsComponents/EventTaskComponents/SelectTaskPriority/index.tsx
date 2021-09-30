import React from 'react';
import { FiFlag } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { CloseButton } from '../../../CloseButton';

import { Container, PriorityButton, Title, Arrow } from './styles';

export function SelectTaskPriority(): JSX.Element {
  const { selectedEventTask } = useEventVariables();
  const theme = useTheme();
  const { updateTask, handleEditTaskPriorityWindow } = useEventTasks();

  async function updateTaskPriority(
    priority: 'low' | 'neutral' | 'high',
  ): Promise<void> {
    if (priority !== selectedEventTask.task.priority) {
      await updateTask({
        ...selectedEventTask.task,
        priority,
      });
    }
    return handleEditTaskPriorityWindow();
  }

  return (
    <>
      <Arrow />
      <Container>
        <CloseButton closeFunction={handleEditTaskPriorityWindow} />
        <PriorityButton
          onClick={() => updateTaskPriority('low')}
          isActive={selectedEventTask.task.priority === 'low'}
        >
          <FiFlag color={theme.colors.green} />
          <Title>Baixa</Title>
        </PriorityButton>
        <PriorityButton
          onClick={() => updateTaskPriority('neutral')}
          isActive={selectedEventTask.task.priority === 'neutral'}
        >
          <FiFlag color={theme.colors.toastInfoColor} />
          <Title>Neutra</Title>
        </PriorityButton>
        <PriorityButton
          onClick={() => updateTaskPriority('high')}
          isActive={selectedEventTask.task.priority === 'high'}
        >
          <FiFlag color={theme.colors.red} />
          <Title>Alta</Title>
        </PriorityButton>
      </Container>
    </>
  );
}
