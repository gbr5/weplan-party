import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { FiBell, FiBellOff } from 'react-icons/fi';

import IFriendDTO from '../../dtos/IFriendDTO';
import { useFriends } from '../../hooks/friends';

import { AddButton } from '../../components/AddButton';
import { NotificationNumber } from '../../components/NotificationNumber';
import BooleanQuestionWindow from '../../components/BooleanQuestionWindow';
import { SearchUserButton } from '../../components/UserComponents/SearchUserButton';
import { WindowHeader } from '../../components/WindowHeader';
import { FriendRequestsWindow } from '../../components/FriendsComponents/FriendRequestsWindow';
import { SearchFriends } from '../../components/FriendsComponents/SearchFriends';
import { SelectUserFriend } from '../../components/FriendsComponents/SelectUserFriend';

import {
  Container,
  FriendsContainer,
  SearchContainer,
  RequestsButton,
} from './styles';
import PageHeader from '../../components/PageHeader';

export function FriendsPage(): ReactElement {
  const {
    friends,
    selectUserWindow,
    handleSelectUserWindow,
    deleteFriendWindow,
    selectedFriend,
    handleDeleteFriendWindow,
    deleteFriend,
    friendRequests,
    friendRequestsWindow,
    handleFriendRequestsWindow,
  } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState<IFriendDTO[]>(friends);

  async function handleDeleteFriend(): Promise<void> {
    await deleteFriend(selectedFriend.id);
    handleDeleteFriendWindow();
  }

  function handleDeleteOption(data: boolean): void | Promise<void> {
    if (data) {
      return handleDeleteFriend();
    }
    return handleDeleteFriendWindow();
  }

  function handleFriends(data: IFriendDTO[]): void {
    setFilteredFriends(data);
  }

  useEffect(() => {
    setFilteredFriends(friends);
  }, [friends]);

  const requests = useMemo(() => {
    return {
      number: friendRequests.length,
      isActive: friendRequests.length > 0,
    };
  }, [friendRequests]);

  function handleFriendRequests(): void {
    requests.isActive && handleFriendRequestsWindow();
  }

  return (
    <>
      {selectUserWindow && <SelectUserFriend />}
      {friendRequestsWindow && <FriendRequestsWindow />}
      {deleteFriendWindow && (
        <BooleanQuestionWindow
          onHandleCloseWindow={handleDeleteFriendWindow}
          selectBooleanOption={handleDeleteOption}
          question={`Deseja deletar ${selectedFriend.friend.name}?`}
        />
      )}
      <Container>
        <PageHeader />
        <WindowHeader title="Meus Contatos" />
        <AddButton top="6.5%" right="4%" onClick={handleSelectUserWindow} />
        <SearchContainer>
          <RequestsButton onClick={handleFriendRequests}>
            {requests.isActive ? (
              <>
                <NotificationNumber
                  top="-25%"
                  left="-25%"
                  number={requests.number}
                />
                <FiBell size={24} />
              </>
            ) : (
              <>
                <FiBellOff size={24} />
              </>
            )}
          </RequestsButton>
          <SearchFriends handleFriends={handleFriends} />
        </SearchContainer>
        {friends.length > 0 && (
          <FriendsContainer>
            {filteredFriends.map(item => {
              return (
                <SearchUserButton key={item.id} user={item.friend} />
                // <FriendButton key={item.id} friend={item} />
              );
            })}
          </FriendsContainer>
        )}
      </Container>
    </>
  );
}
