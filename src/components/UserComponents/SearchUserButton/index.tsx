import React, { ReactElement, useMemo, useState } from 'react';
import { FiLoader, FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { useCallback } from 'react';
import IUserDTO from '../../../dtos/IUserDTO';
import { useFriends } from '../../../hooks/friends';
import profilePlaceholder from '../../../assets/avatar_placeholder.jpg';

import {
  Container,
  Name,
  Avatar,
  FriendButton,
  FriendButtonText,
  InfoButton,
} from './styles';
import IFriendDTO from '../../../dtos/IFriendDTO';
import { UserButtonInfo } from '../UserButtonInfo';

interface IProps {
  user: IUserDTO;
}

export function SearchUserButton({ user }: IProps): ReactElement {
  const {
    friends,
    requestFriendship,
    deleteFriend,
    handleDeleteFriendWindow,
    handleSelectedFriend,
    selectedFriend,
  } = useFriends();

  const [loading, setLoading] = useState(false);

  const friend = useMemo(() => {
    const thisfriend = friends.find(item => item.friend_id === user.id);
    return thisfriend;
  }, [friends, user]);

  const isFriend = useMemo(() => {
    return friend ? friend.isConfirmed : false;
  }, [friend]);

  const friendshipRequested = useMemo(() => {
    return friend ? !friend.isConfirmed : false;
  }, [friend]);

  const friendText = useMemo(() => {
    if (isFriend) return 'Amigo';
    return friendshipRequested ? 'Solicitado' : 'Solicitar';
  }, [isFriend, friendshipRequested]);

  const handleRequest = useCallback(async () => {
    if (friend) {
      if (isFriend) {
        handleSelectedFriend(friend);
        handleDeleteFriendWindow();
        return;
      }
      try {
        setLoading(true);
        await deleteFriend(friend.id);
      } catch {
        throw new Error();
      } finally {
        setLoading(false);
      }
    }
    try {
      setLoading(true);
      await requestFriendship(user.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }, [
    deleteFriend,
    friend,
    requestFriendship,
    isFriend,
    user,
    handleDeleteFriendWindow,
    handleSelectedFriend,
  ]);

  function handleUserInfo(): void {
    if (!friend) return;
    if (selectedFriend.id === friend.id) {
      handleSelectedFriend({} as IFriendDTO);
      return;
    }
    handleSelectedFriend(friend);
  }

  const isActive = useMemo(() => {
    return selectedFriend && selectedFriend.id
      ? selectedFriend.id === user.id
      : false;
  }, [selectedFriend, user.id]);

  const iconSize = 24;

  return (
    <>
      <Container friendshipRequested={friendshipRequested} isFriend={isFriend}>
        <Avatar
          alt="Avatar"
          src={!user.avatar_url ? profilePlaceholder : user.avatar_url}
        />
        <Name>{user.name}</Name>
        {loading ? (
          <FiLoader size={20} />
        ) : (
          <FriendButton
            onClick={handleRequest}
            friendshipRequested={friendshipRequested}
            isFriend={isFriend}
          >
            <FriendButtonText>{friendText}</FriendButtonText>
          </FriendButton>
        )}
        {isFriend && (
          <InfoButton onClick={handleUserInfo}>
            {isActive ? (
              <FiChevronUp size={iconSize} />
            ) : (
              <FiChevronDown size={iconSize} />
            )}
          </InfoButton>
        )}
      </Container>
      {friend && friend.isConfirmed && selectedFriend.id === friend.id && (
        <UserButtonInfo />
      )}
    </>
  );
}
