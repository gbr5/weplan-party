import React from 'react';
import { FiAward, FiCloud, FiZap } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { CloseButton } from '../../../CloseButton';

import { Container, StatusButton, Title, Arrow } from './styles';

export function SelectTaskStatus(): JSX.Element {
  const { selectedEventTask } = useEventVariables();
  const theme = useTheme();
  const { updateTask, handleEditTaskStatusWindow } = useEventTasks();

  async function updateTaskStatus(
    status: 'not started' | 'running' | 'finnished',
  ): Promise<void> {
    if (status !== selectedEventTask.status) {
      await updateTask({
        ...selectedEventTask,
        status,
      });
    }
    return handleEditTaskStatusWindow();
  }

  return (
    <>
      <Arrow />
      <Container>
        <CloseButton closeFunction={handleEditTaskStatusWindow} />
        <StatusButton
          onClick={() => updateTaskStatus('not started')}
          isActive={selectedEventTask.status === 'not started'}
        >
          <FiCloud color={theme.colors.toastInfoColor} />
          <Title>Início</Title>
        </StatusButton>
        <StatusButton
          onClick={() => updateTaskStatus('running')}
          isActive={selectedEventTask.status === 'running'}
        >
          <FiZap color={theme.colors.toastErrorColor} />
          <Title>Execução</Title>
        </StatusButton>
        <StatusButton
          onClick={() => updateTaskStatus('finnished')}
          isActive={selectedEventTask.status === 'finnished'}
        >
          <FiAward color={theme.colors.green} />
          <Title>Fim</Title>
        </StatusButton>
      </Container>
    </>
  );
}
