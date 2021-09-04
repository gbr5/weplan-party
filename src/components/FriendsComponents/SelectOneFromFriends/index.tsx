import React, { ReactElement, useMemo, useState } from 'react';

import { useFriends } from '../../../hooks/friends';

import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';
import { SearchFriends } from '../SearchFriends';
import { SelectOneFriendButton } from '../SelectOneFriendButton';
import IFriendDTO from '../../../dtos/IFriendDTO';

import { Container, FriendsContainer } from './styles';

interface IProps {
  handleAddFriend: (data: IFriendDTO) => Promise<void>;
  closeWindow: () => void;
}

export function SelectOneFromFriends({
  handleAddFriend,
  closeWindow,
}: IProps): ReactElement {
  const { friends, unselectedFriends } = useFriends();

  const sortedFriends = useMemo(() => {
    const response: IFriendDTO[] = [];
    friends.map(friend => {
      const findUnselected = unselectedFriends.find(
        item => item.id === friend.id,
      );
      !findUnselected && response.push(friend);
      return friend;
    });
    return response;
  }, [friends, unselectedFriends]);

  const [filteredFriends, setFilteredFriends] = useState<IFriendDTO[]>(
    sortedFriends,
  );

  function handleFilteredFriends(data: IFriendDTO[]): void {
    setFilteredFriends(data);
  }

  async function handleSelectFriend(data: IFriendDTO): Promise<void> {
    await handleAddFriend(data);
    closeWindow();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
      zIndex={14}
    >
      <Container>
        <WindowHeader overTitle="Selecionar" title="Amigo" />
        <SearchFriends handleFriends={handleFilteredFriends} />
        {filteredFriends.length > 0 && (
          <FriendsContainer>
            {filteredFriends.map(item => (
              <SelectOneFriendButton
                key={item.id}
                handleSelectFriend={handleSelectFriend}
                friend={item}
              />
            ))}
          </FriendsContainer>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
