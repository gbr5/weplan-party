import React, { ReactElement } from 'react';

import WindowContainer from '../../WindowContainer';
import { WindowHeader } from '../../WindowHeader';
import { useFriends } from '../../../hooks/friends';

import { Container, UsersContainer } from './styles';
import { FriendRequestButton } from '../FriendRequestButton';

export function FriendRequestsWindow(): ReactElement {
  const { handleFriendRequestsWindow, friendRequests } = useFriends();

  return (
    <WindowContainer
      onHandleCloseWindow={handleFriendRequestsWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader title="Pedidos de amizade" />
        {friendRequests.length > 0 && (
          <UsersContainer>
            {friendRequests.map(item => {
              return <FriendRequestButton key={item.id} friend={item} />;
            })}
          </UsersContainer>
        )}
      </Container>
    </WindowContainer>
  );
}
