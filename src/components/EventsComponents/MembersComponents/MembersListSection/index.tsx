import React from 'react';
import { useState } from 'react';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { MemberButton } from '../MemberButton';

import { Container, Body, MembersContainer } from './styles';

export function MembersListSection(): JSX.Element {
  const { eventMembers } = useEventVariables();
  const [section, setSection] = useState('Main');

  function handleSection(data: string): void {
    setSection(data);
  }
  return (
    <Container>
      <Body>
        {eventMembers.length > 0 && (
          <MembersContainer>
            {eventMembers.map(item => {
              const index = String(
                eventMembers.findIndex(member => member.id === item.id) + 1,
              );
              return <MemberButton index={index} member={item} />;
            })}
          </MembersContainer>
        )}
      </Body>
    </Container>
  );
}
