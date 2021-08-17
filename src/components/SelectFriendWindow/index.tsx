import React, { useCallback, useEffect, useState } from 'react';

// import { MdClose } from 'react-icons/md';
import { MouseEventHandler } from 'react-select';
import {
  FriendsList,
  SaveButton,
  FriendButton,
  FriendsContainer,
} from './styles';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import IFriendDTO from '../../dtos/IFriendDTO';
import api from '../../services/api';
import IUserDTO from '../../dtos/IUserDTO';

interface IPropsDTO {
  onHandleCloseWindow: MouseEventHandler;
  handleSelectedFriend: Function;
  // eslint-disable-next-line react/require-default-props
  alreadySelected?: IUserDTO[];
}

const SelectFriendWindow: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  alreadySelected,
  handleSelectedFriend,
}: IPropsDTO) => {
  const [friends, setFriends] = useState<IFriendDTO[]>([]);
  const [selectedFriend, setSelectedFriend] = useState({} as IFriendDTO);

  const getFriends = useCallback(() => {
    try {
      api.get<IFriendDTO[]>('user-friends').then(response => {
        const xfriends: IFriendDTO[] = [];
        if (alreadySelected && alreadySelected.length > 0) {
          response.data.map(xF => {
            const findSelected = alreadySelected.find(
              xS => xS.id === xF.friend_id,
            );
            if (!findSelected) {
              xfriends.push(xF);
            }
            return '';
          });
          setFriends(xfriends);
        } else {
          setFriends(response.data);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [alreadySelected]);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  const handleAddFriend = useCallback(() => {
    handleSelectedFriend(selectedFriend);
  }, [handleSelectedFriend, selectedFriend]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 40,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
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
    </WindowUnFormattedContainer>
  );
};

export default SelectFriendWindow;
