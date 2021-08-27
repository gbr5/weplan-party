import React, { ReactElement } from 'react';
import { useFriends } from '../../../hooks/friends';
import { UserContactButton } from '../UserContactButton';

import { Container, ContactsMenu, Name, NameContainer, Label } from './styles';

export function UserButtonInfo(): ReactElement {
  const { selectedFriend } = useFriends();
  return (
    <Container>
      {selectedFriend.friend.personInfo && (
        <NameContainer>
          <Label>Nome</Label>
          <Name>{selectedFriend.friend.personInfo.first_name} </Name>
          <Name> {selectedFriend.friend.personInfo.last_name}</Name>
        </NameContainer>
      )}
      {selectedFriend.friend.userContacts.length > 0 && (
        <ContactsMenu>
          {selectedFriend.friend.userContacts.map(contact => {
            if (contact)
              return <UserContactButton key={contact.id} contact={contact} />;
            return '';
          })}
        </ContactsMenu>
      )}
    </Container>
  );
}
