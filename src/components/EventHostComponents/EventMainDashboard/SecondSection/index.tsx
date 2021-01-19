import React from 'react';
import IEventDTO from '../../../../dtos/IEventDTO';
import EventFile from './EventFile';
import EventImage from './EventImage';

import { Container, Section } from './styles';

interface IProps {
  event: IEventDTO;
}

const SecondSection: React.FC<IProps> = ({ event }: IProps) => {
  return (
    <Container>
      <Section>
        <h1>Arquivos</h1>
        {event.eventFiles && <EventFile files={event.eventFiles} />}
      </Section>
      <Section>
        <h1>Imagens</h1>
        <EventImage images={event.eventImages} />
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
