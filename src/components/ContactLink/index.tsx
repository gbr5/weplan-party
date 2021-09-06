import React, { useMemo } from 'react';

import { Container, Title } from './styles';

interface IProps {
  contact: string;
  type: string;
}

export function ContactLink({ contact, type }: IProps): JSX.Element {
  function makeCall(): void {
    // if (type === 'Phone') return Linking.openURL(`tel:${contact}`);
    // if (type === 'Whatsapp')
    //   return Linking.openURL(`whatsapp://send?phone=${contact}`);
    // if (type === 'Email') return Linking.openURL(`mailto:${contact}`);
    // if (type === 'Address')
    //   return Linking.openURL(`https://maps.google.com/?q=${contact}`);
    // return Linking.openURL(`${contact}`)
  }

  const variables = useMemo(() => {
    if (type === 'Phone')
      return {
        color: 'rgba(10, 150, 250, 0.2)',
        title: 'Ligar',
        link: `tel:${contact}`,
      };
    if (type === 'Whatsapp')
      return {
        color: 'rgba(10, 150, 50, 0.3)',
        title: 'Acessar',
        link: `https://wa.me/${contact}`,
      };
    if (type === 'Email')
      return {
        color: 'rgba(150, 50, 50, 0.3)',
        title: 'Acessar',
        link: `mailto:${contact}`,
      };
    return {
      color: 'rgba(50, 50, 50, 0.3)',
      title: 'Acessar',
      link: `${contact}`,
    };
  }, [type, contact]);

  return (
    <Container
      style={{
        backgroundColor: variables.color,
      }}
    >
      <Title target="blank" href={variables.link}>
        {variables.title}
      </Title>
    </Container>
  );
}
