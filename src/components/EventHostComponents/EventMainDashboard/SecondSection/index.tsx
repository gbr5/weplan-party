import React, { ReactElement, useCallback, useState } from 'react';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import EventAppointmentSection from './EventAppointmentSection';
import EventFileSection from './EventFileSection';
import EventImageSection from './EventImageSection';
import { EventInspirationImageSection } from './EventInspirationImageSection';

import { Container, Section } from './styles';

export function SecondSection(): ReactElement {
  const { addToast } = useToast();
  const { selectedEvent } = useEventVariables();

  const [updatedEvent, setUpdatedEvent] = useState(selectedEvent);

  const updateEvent = useCallback(() => {
    try {
      api.get(`events/${selectedEvent.id}`).then(response => {
        setUpdatedEvent(response.data.event);
        addToast({
          type: 'success',
          title: 'Evento atualizado',
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedEvent, addToast]);

  return (
    <Container>
      <EventFileSection updateEvent={updateEvent} files={[]} />
      {/* <EventImageSection
        images={updatedEvent.eventImages}
        updateEvent={updateEvent}
      /> */}
      <EventInspirationImageSection />
      <EventAppointmentSection />
      <Section>
        <h1>A Pagar</h1>
      </Section>
      <Section>
        <h1>Notas</h1>
      </Section>
      <Section>
        <h1>Votações</h1>
      </Section>
    </Container>
  );
}
