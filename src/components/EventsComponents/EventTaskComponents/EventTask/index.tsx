import React from 'react';

import { ReactElement } from 'react';
import { useEventVariables } from '../../../../hooks/eventVariables';

import IEventTaskDTO from '../../../../dtos/IEventTaskDTO';

import { EventTaskFooter } from '../EventTaskFooter';
import { EventTaskBody } from '../EventTaskBody';

// CloseButton,
// CloseButtonTitle,
import { Container, Title, Underline } from './styles';
import { CloseButton } from '../../../CloseButton';

interface IProps {
  eventTask: IEventTaskDTO;
}

export function EventTask({ eventTask }: IProps): ReactElement {
  const { selectEventTask, selectedEventTask } = useEventVariables();

  function handleTaskBody(): void {
    !selectedEventTask ||
    !selectedEventTask.id ||
    selectedEventTask.id !== eventTask.id
      ? selectEventTask(eventTask)
      : selectEventTask({} as IEventTaskDTO);
  }

  return (
    <>
      <Container onClick={handleTaskBody}>
        {selectedEventTask.id !== eventTask.id ? (
          <>
            <Title>{eventTask.task.title}</Title>
            <Underline />
            <EventTaskFooter eventTask={eventTask} />
          </>
        ) : (
          <>
            <CloseButton closeFunction={handleTaskBody} />
            <Title
              style={{
                marginRight: '34px',
              }}
            >
              {eventTask.task.title}
            </Title>
            <Underline />
          </>
        )}
      </Container>
      {selectedEventTask.id === eventTask.id && <EventTaskBody />}
    </>
  );
}
