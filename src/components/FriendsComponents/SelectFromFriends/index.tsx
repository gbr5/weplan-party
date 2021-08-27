import React, { ReactElement, useState } from 'react';

import { useFriends } from '../../../hooks/friends';

import WindowContainer from '../../WindowContainer';
import { WindowHeader } from '../../WindowHeader';
import profilePlaceholder from '../../../assets/avatar_placeholder.jpg';
import { SearchFriends } from '../SearchFriends';
import IFriendDTO from '../../../dtos/IFriendDTO';
import Button from '../../Button';

import {
  Container,
  FriendsContainer,
  Avatar,
  FriendButton,
  Name,
} from './styles';

interface IProps {
  handleAddFriends: (data: IFriendDTO[]) => Promise<void>;
  closeWindow: () => void;
}

export function SelectFromFriends({
  handleAddFriends,
  closeWindow,
}: IProps): ReactElement {
  const { friends, selectedFriends, handleSelectedFriends } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState<IFriendDTO[]>(friends);

  function handleFilteredFriends(data: IFriendDTO[]): void {
    setFilteredFriends(data);
  }

  function handleSelectFriend(data: IFriendDTO): void {
    const findFriend = selectedFriends.find(friend => friend.id === data.id);
    if (findFriend) {
      const filtered = selectedFriends.filter(friend => friend.id !== data.id);
      return handleSelectedFriends(filtered);
    }
    return handleSelectedFriends([...selectedFriends, data]);
  }

  async function handleSelectFriends(): Promise<void> {
    await handleAddFriends(selectedFriends);
    closeWindow();
  }

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '10%',
        height: '90%',
        width: '80%',
      }}
    >
      <Container>
        <WindowHeader overTitle="Selecionar" title="Amigos" />
        <SearchFriends handleFriends={handleFilteredFriends} />
        {filteredFriends.length > 0 && (
          <FriendsContainer>
            {filteredFriends.map(item => {
              const isSelected = !!selectedFriends.find(
                friend => friend.id === item.id,
              );
              return (
                <FriendButton
                  key={item.id}
                  onClick={() => handleSelectFriend(item)}
                  isSelected={isSelected}
                >
                  <Avatar
                    alt="Avatar"
                    src={
                      !item.friend.avatar_url
                        ? profilePlaceholder
                        : item.friend.avatar_url
                    }
                  />
                  <Name>{item.friend.name}</Name>
                </FriendButton>
              );
            })}
          </FriendsContainer>
        )}
        {selectedFriends.length > 0 && (
          <Button onClick={handleSelectFriends}>Avançar</Button>
        )}
      </Container>
    </WindowContainer>
  );
}
