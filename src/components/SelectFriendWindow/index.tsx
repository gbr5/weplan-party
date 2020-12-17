import React, { useCallback, useEffect, useState } from 'react';

// import { MdClose } from 'react-icons/md';
import { MouseEventHandler } from 'react-select';
import {
  FriendsList,
  SaveButton,
  FriendButton,
  FriendsContainer,
} from './styles';
import WindowContainer from '../WindowContainer';
import IFriendDTO from '../../dtos/IFriendDTO';
import api from '../../services/api';

interface IPropsDTO {
  onHandleCloseWindow: MouseEventHandler;
  handleSelectedFriend: Function;
}

const SelectFriendWindow: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleSelectedFriend,
}: IPropsDTO) => {
  const [friends, setFriends] = useState<IFriendDTO[]>([]);
  const [selectedFriend, setSelectedFriend] = useState({} as IFriendDTO);

  const getFriends = useCallback(() => {
    try {
      api.get('users/friends/list').then(response => {
        setFriends(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  const handleAddFriend = useCallback(() => {
    handleSelectedFriend(selectedFriend);
  }, [handleSelectedFriend, selectedFriend]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 40,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <FriendsContainer>
        <h1>Contatos</h1>
        <FriendsList>
          {friends.map(friend => (
            <FriendButton
              selectedFriend={friend.id === selectedFriend.id}
              type="button"
              onClick={() => setSelectedFriend(friend)}
              key={friend.id}
            >
              {friend.friend.name}
            </FriendButton>
          ))}
        </FriendsList>
        <SaveButton>
          {selectedFriend.id !== undefined && (
            <button type="button" onClick={handleAddFriend}>
              Selecionar
            </button>
          )}
        </SaveButton>
      </FriendsContainer>
    </WindowContainer>
  );
};

export default SelectFriendWindow;
