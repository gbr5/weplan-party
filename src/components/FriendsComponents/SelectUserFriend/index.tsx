import React, { useState, ReactElement } from 'react';

import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';
import IUserDTO from '../../../dtos/IUserDTO';
import { useFriends } from '../../../hooks/friends';
import { SearchUsers } from '../../UserComponents/SearchUsers';

import { Container, UsersContainer } from './styles';
import { SearchUserButton } from '../../UserComponents/SearchUserButton';

export function SelectUserFriend(): ReactElement {
  const { handleSelectUserWindow } = useFriends();
  const [users, setUsers] = useState<IUserDTO[]>([]);

  function handleUsers(data: IUserDTO[]): void {
    setUsers(data);
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleSelectUserWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader title="Selecionar amigo" />
        <SearchUsers handleUsers={handleUsers} />
        {users.length > 0 && (
          <UsersContainer>
            {users.map(item => {
              return <SearchUserButton key={item.id} user={item} />;
            })}
          </UsersContainer>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
