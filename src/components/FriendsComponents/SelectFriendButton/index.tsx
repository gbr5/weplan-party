import React, { useMemo } from 'react';

import profilePlaceholder from '../../../assets/avatar_placeholder.jpg';

import IFriendDTO from '../../../dtos/IFriendDTO';
import { useFriends } from '../../../hooks/friends';

import { Container, Avatar, Name } from './styles';

interface IProps {
  friend: IFriendDTO;
}

export function SelectFriendButton({ friend }: IProps): JSX.Element {
  const { selectedFriends, handleSelectedFriends } = useFriends();

  const isSelected = useMemo(() => {
    return !!selectedFriends.find(item => item.id === friend.id);
  }, [selectedFriends, friend]);

  const source = useMemo(
    () =>
      !friend.friend.avatar_url ? profilePlaceholder : friend.friend.avatar_url,
    [friend],
  );

  function handleSelectFriend(): void {
    const findFriend = selectedFriends.find(item => item.id === friend.id);
    if (findFriend) {
      const filtered = selectedFriends.filter(item => item.id !== friend.id);
      return handleSelectedFriends(filtered);
    }
    return handleSelectedFriends([...selectedFriends, friend]);
  }

  return (
    <Container onClick={handleSelectFriend} isSelected={isSelected}>
      <Avatar alt="Avatar" src={source} />
      <Name>{friend.friend.name}</Name>
    </Container>
  );
}
