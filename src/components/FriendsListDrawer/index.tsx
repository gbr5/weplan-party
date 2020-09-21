import React, { useState } from 'react';

// import { MdClose } from 'react-icons/md';
import { MouseEventHandler } from 'react-select';
import { MdClose } from 'react-icons/md';
import { FriendsList, FriendButton } from './styles';
import WindowContainer from '../WindowContainer';

interface IFriendsDTO {
  id: string;
  name: string;
  avatar: string;
}

interface IPropsDTO {
  friends: IFriendsDTO[];
  onHandleFriendsListDrawer: MouseEventHandler;
  handleSelectedFriend(arg: IFriendsDTO): void;
}

const FriendsListDrawer: React.FC<IPropsDTO> = ({
  friends,
  onHandleFriendsListDrawer,
  handleSelectedFriend,
}: IPropsDTO) => {
  const [weplanUser, setWeplanUser] = useState<IFriendsDTO>({} as IFriendsDTO);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleFriendsListDrawer}
      containerStyle={{
        zIndex: 10000,
        top: '20%',
        left: '30%',
        height: '60%',
        width: '40%',
      }}
    >
      <FriendsList onSubmit={() => handleSelectedFriend(weplanUser)}>
        {friends.map(friend => (
          <FriendButton
            selectedFriend={friend.id === weplanUser.id}
            type="button"
            onClick={() => setWeplanUser(friend)}
            key={friend.id}
          >
            {friend.name}
          </FriendButton>
        ))}
        <div>{weplanUser && <button type="submit">Salvar</button>}</div>
      </FriendsList>
    </WindowContainer>
  );
};

export default FriendsListDrawer;
