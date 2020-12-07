import React, { useState } from 'react';

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
  friends: IFriendDTO[];
  onHandleCloseWindow: MouseEventHandler;
  handleSelectedFriend(arg: IFriendDTO): void;
}

const FriendsListDrawer: React.FC<IPropsDTO> = ({
  friends,
  onHandleCloseWindow,
  handleSelectedFriend,
}: IPropsDTO) => {
  const [weplanUser, setWeplanUser] = useState<IFriendDTO>({} as IFriendDTO);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 10000,
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
              selectedFriend={friend.id === weplanUser.id}
              type="button"
              onClick={() => setWeplanUser(friend)}
              key={friend.id}
            >
              {friend.friend.name}
            </FriendButton>
          ))}
        </FriendsList>
        <SaveButton>
          {weplanUser && (
            <button
              type="button"
              onClick={() => handleSelectedFriend(weplanUser)}
            >
              Salvar
            </button>
          )}
        </SaveButton>
      </FriendsContainer>
    </WindowContainer>
  );
};

export default FriendsListDrawer;
