import React from 'react';
import { useState } from 'react';
import { useEvent } from '../../../hooks/event';
import { EventButton } from '../EventButton';

import { Container, BooleanNavigationButton } from './styles';

export function MyEventsSection(): JSX.Element {
  const { eventsAsOwner, eventsAsMember } = useEvent();
  const [eventOwnerSection, setEventOwnerSection] = useState(true);
  function handleEventOwnerSection(data: boolean): void {
    setEventOwnerSection(data);
  }
  return (
    <Container>
      <div>
        <strong>Minhas Festas</strong>
        <div>
          <BooleanNavigationButton
            booleanActiveButton={eventOwnerSection}
            type="button"
            onClick={() => handleEventOwnerSection(true)}
          >
            Anfitrião
          </BooleanNavigationButton>
          <BooleanNavigationButton
            booleanActiveButton={!eventOwnerSection}
            type="button"
            onClick={() => handleEventOwnerSection(false)}
          >
            Membro
          </BooleanNavigationButton>
        </div>
      </div>

      <ul>
        {eventOwnerSection
          ? eventsAsOwner.map(event => {
              return <EventButton key={event.id} event={event.event} />;
            })
          : eventsAsMember.map(event => {
              return <EventButton key={event.id} event={event.event} />;
            })}
      </ul>
    </Container>
  );
}
