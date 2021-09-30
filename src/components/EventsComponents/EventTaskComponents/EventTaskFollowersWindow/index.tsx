import React from 'react';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { SectionHeader } from '../../../SectionHeader';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { EventTaskFollower } from '../EventTaskFollower';

import { Container } from './styles';

export function EventTaskFollowersWindow(): JSX.Element {
  const { selectedEventTask } = useEventVariables();
  const {
    handleCreateEventTaskFollowersWindow,
    handleEventTaskFollowersWindow,
    handleEventTaskFollowersDescriptionWindow,
  } = useEventTasks();

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEventTaskFollowersWindow}
      zIndex={8}
      containerStyle={{
        zIndex: 9,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <SectionHeader
          title="Seguidores"
          handleAddButton={handleCreateEventTaskFollowersWindow}
          handleInfoButton={handleEventTaskFollowersDescriptionWindow}
        />
        {selectedEventTask.task.followers.map(follower => {
          return <EventTaskFollower key={follower.id} user={follower} />;
        })}
      </Container>
    </WindowUnFormattedContainer>
  );
}
