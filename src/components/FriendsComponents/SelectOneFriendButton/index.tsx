import React, { useMemo } from 'react';

import profilePlaceholder from '../../../assets/avatar_placeholder.jpg';

import IFriendDTO from '../../../dtos/IFriendDTO';
import { useFriends } from '../../../hooks/friends';

import { Container, Avatar, Name } from './styles';

interface IProps {
  handleSelectFriend: (friend: IFriendDTO) => void;
  friend: IFriendDTO;
}

export function SelectOneFriendButton({
  friend,
  handleSelectFriend,
}: IProps): JSX.Element {
  const source = useMemo(
    () =>
      !friend.friend.avatar_url ? profilePlaceholder : friend.friend.avatar_url,
    [friend],
  );

  return (
    <Container onClick={() => handleSelectFriend(friend)} isSelected={false}>
      <Avatar alt="Avatar" src={source} />
      <Name>{friend.friend.name}</Name>
    </Container>
  );
}
