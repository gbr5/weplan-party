import React, { useCallback, useState } from 'react';
import IEventDTO from '../../../../dtos/IEventDTO';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import EventFileSection from './EventFileSection';
import EventImage from './EventImage';

import { Container, Section } from './styles';

interface IProps {
  event: IEventDTO;
}

const SecondSection: React.FC<IProps> = ({ event }: IProps) => {
  const { addToast } = useToast();
  const [updatedEvent, setUpdatedEvent] = useState(event);

  const updateEvent = useCallback(() => {
    try {
      api.get(`events/${event.id}`).then(response => {
        setUpdatedEvent(response.data.event);
        addToast({
          type: 'success',
          title: 'Evento atualizado',
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [event, addToast]);

  return (
    <Container>
      <EventFileSection
        updateEvent={updateEvent}
        eventId={event.id}
        files={updatedEvent.eventFiles}
      />
      {/* <Section>
        <h1>Arquivos</h1>
        {event.eventFiles && <EventFile files={event.eventFiles} />}
      </Section> */}
      <Section>
        <h1>Imagens</h1>
        <EventImage images={updatedEvent.eventImages} />
      </Section>
      <Section>
        <h1>Compromissos</h1>
      </Section>
      <Section>
        <h1>A Pagar</h1>
      </Section>
      <Section>
        <h1>Notas</h1>
      </Section>
      <Section>
        <h1>Votações</h1>
      </Section>
      <Section>
        <h1>Inspirações</h1>
      </Section>
    </Container>
  );
};

export default SecondSection;
