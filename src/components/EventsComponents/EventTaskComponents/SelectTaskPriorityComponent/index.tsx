import React, { ReactElement } from 'react';
import { FiFlag } from 'react-icons/fi';

import IPriorityButton from '../../../../dtos/IPriorityButtonDTO';

import { Container, Title, IconContainer, IconButton } from './styles';

interface IProps {
  handleTaskPriority: (priority: 'low' | 'neutral' | 'high') => void;
  selectedPriority: 'low' | 'neutral' | 'high';
}

export function SelectTaskPriorityComponent({
  handleTaskPriority,
  selectedPriority,
}: IProps): ReactElement {
  const iconSize = 40;
  function selectTaskPriority({ priority }: IPriorityButton): void {
    handleTaskPriority(priority);
  }
  return (
    <Container>
      <Title>Defina a prioridade da tarefa</Title>
      <IconContainer>
        <IconButton
          isActive={selectedPriority === 'low'}
          onClick={() =>
            selectTaskPriority({
              priority: 'low',
            })
          }
        >
          <FiFlag size={iconSize} color="#007500" />
        </IconButton>
        <IconButton
          isActive={selectedPriority === 'neutral'}
          onClick={() =>
            selectTaskPriority({
              priority: 'neutral',
            })
          }
        >
          <FiFlag size={iconSize} color="#1f4fff" />
        </IconButton>
        <IconButton
          isActive={selectedPriority === 'high'}
          onClick={() =>
            selectTaskPriority({
              priority: 'high',
            })
          }
        >
          <FiFlag size={iconSize} color="#ff3030" />
        </IconButton>
      </IconContainer>
    </Container>
  );
}
