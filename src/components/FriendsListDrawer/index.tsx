import React from 'react';

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

interface IPropsDTO {
  selectedFriend: IFriendDTO;
  friends: IFriendDTO[];
  onHandleCloseWindow: MouseEventHandler;
  handleSelectedFriend: Function;
}

const FriendsListDrawer: React.FC<IPropsDTO> = ({
  selectedFriend,
  friends,
  onHandleCloseWindow,
  handleSelectedFriend,
}: IPropsDTO) => {
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
              onClick={() => handleSelectedFriend(friend)}
              key={friend.id}
            >
              {friend.friend.name}
            </FriendButton>
          ))}
        </FriendsList>
        <SaveButton>
          {selectedFriend.id !== undefined && (
            <button type="button" onClick={onHandleCloseWindow}>
              Salvar
            </button>
          )}
        </SaveButton>
      </FriendsContainer>
    </WindowContainer>
  );
};

export default FriendsListDrawer;
