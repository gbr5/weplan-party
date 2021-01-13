import React from 'react';

import { Container, Section } from './styles';

const SecondSection: React.FC = () => {
  return (
    <Container>
      <Section>
        <h1>Arquivos</h1>
      </Section>
      <Section>
        <h1>Imagens</h1>
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
