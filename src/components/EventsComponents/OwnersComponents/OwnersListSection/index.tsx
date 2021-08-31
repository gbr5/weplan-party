import React from 'react';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { OwnerButton } from '../OwnerButton';

import { Container, Body, OwnersContainer } from './styles';

export function OwnersListSection(): JSX.Element {
  const { eventOwners } = useEventVariables();

  return (
    <Container>
      <Body>
        {eventOwners.length > 0 && (
          <OwnersContainer>
            {eventOwners.map(item => {
              const index = String(
                eventOwners.findIndex(owner => owner.id === item.id) + 1,
              );
              return <OwnerButton key={item.id} index={index} owner={item} />;
            })}
          </OwnersContainer>
        )}
      </Body>
    </Container>
  );
}
