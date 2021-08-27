import React, { ReactElement, useState } from 'react';
import { FiLoader } from 'react-icons/fi';

import { useCallback } from 'react';
import IFriendDTO from '../../../dtos/IFriendDTO';
import { useFriends } from '../../../hooks/friends';
import profilePlaceholder from '../../../assets/avatar_placeholder.jpg';

import {
  Container,
  Name,
  Avatar,
  FriendButton,
  FriendButtonText,
} from './styles';

interface IProps {
  friend: IFriendDTO;
}

export function FriendRequestButton({ friend }: IProps): ReactElement {
  const {
    updateFriend,
    deleteFriend,
    handleFriendRequestsWindow,
  } = useFriends();

  const [loading, setLoading] = useState(false);

  async function acceptRequest(): Promise<void> {
    try {
      setLoading(true);
      await updateFriend(friend.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  const declineRequest = useCallback(async () => {
    try {
      setLoading(true);
      await deleteFriend(friend.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
      handleFriendRequestsWindow();
    }
  }, [handleFriendRequestsWindow, deleteFriend, friend]);

  return (
    <Container
      friendshipRequested={false}
      isFriend={false}
      onClick={acceptRequest}
    >
      <Avatar
        alt="Avatar"
        src={
          !friend.friend.avatar_url
            ? profilePlaceholder
            : friend.friend.avatar_url
        }
      />
      <Name>{friend.friend.name}</Name>
      {loading ? (
        <FiLoader size={20} />
      ) : (
        <>
          <FriendButton
            onClick={acceptRequest}
            friendshipRequested={false}
            isFriend={false}
          >
            <FriendButtonText>Aceitar</FriendButtonText>
          </FriendButton>
          <FriendButton
            onClick={declineRequest}
            friendshipRequested={false}
            isFriend={false}
          >
            <FriendButtonText>Recusar</FriendButtonText>
          </FriendButton>
        </>
      )}
    </Container>
  );
}
