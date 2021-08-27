import React, { ReactElement, useMemo } from 'react';
import { FiCloud, FiZap, FiAward, FiFlag } from 'react-icons/fi';
import IEventTaskDTO from '../../../../dtos/IEventTaskDTO';
import { useEventTasks } from '../../../../hooks/eventTasks';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import formatOnlyTime from '../../../../utils/formatOnlyTime';

import { Container, DateTime, PriorityButton } from './styles';
import { useEventVariables } from '../../../../hooks/eventVariables';

interface IProps {
  eventTask: IEventTaskDTO;
}

export function EventTaskFooter({ eventTask }: IProps): ReactElement {
  const iconSize = 22;

  const { selectEventTask, selectedEventTask } = useEventVariables();
  const {
    handleEditTaskPriorityWindow,
    handleEditTaskStatusWindow,
  } = useEventTasks();

  function handleTaskPriority(): void {
    return !selectedEventTask.id || selectedEventTask.id !== eventTask.id
      ? (selectEventTask(eventTask), handleEditTaskPriorityWindow())
      : selectEventTask({} as IEventTaskDTO);
  }

  function handleTaskStatus(): void {
    return !selectedEventTask.id || selectedEventTask.id !== eventTask.id
      ? (selectEventTask(eventTask), handleEditTaskStatusWindow())
      : selectEventTask({} as IEventTaskDTO);
  }

  const priorityColor = useMemo(() => {
    if (eventTask.priority === 'low') return '#007500';
    if (eventTask.priority === 'neutral') return '#1f4fff';
    return '#ff3030';
  }, [eventTask.priority]);

  const statusColor = useMemo(() => {
    if (eventTask.status === 'not started') return '#1f4fff';
    if (eventTask.status === 'running') return '#ff3030';
    return '#007500';
  }, [eventTask.status]);

  return (
    <Container>
      <PriorityButton onClick={handleTaskPriority}>
        <FiFlag color={priorityColor} size={iconSize} />
      </PriorityButton>
      <PriorityButton onClick={handleTaskStatus}>
        {eventTask.status === 'not started' && (
          <FiCloud size={iconSize} color={statusColor} />
        )}
        {eventTask.status === 'running' && (
          <FiZap size={iconSize} color={statusColor} />
        )}
        {eventTask.status === 'finnished' && (
          <FiAward size={iconSize} color={statusColor} />
        )}
      </PriorityButton>
      <DateTime>{formatOnlyTime(String(eventTask.due_date))}</DateTime>
      <DateTime>|</DateTime>
      <DateTime>{formatOnlyDateShort(String(eventTask.due_date))}</DateTime>
    </Container>
  );
}
