import React, { useState } from 'react';

// import { MdClose } from 'react-icons/md';
import { MouseEventHandler } from 'react-select';
import { MdClose } from 'react-icons/md';
import { FriendsList, FriendButton } from './styles';

interface IFriendsDTO {
  id: string;
  name: string;
  avatar: string;
}

interface IPropsDTO {
  friends: IFriendsDTO[];
  onHandleCheckListFormWindow: MouseEventHandler;
  handleSelectedFriend(arg: IFriendsDTO): void;
}

const CheckListFormWindow: React.FC<IPropsDTO> = ({
  friends,
  onHandleCheckListFormWindow,
  handleSelectedFriend,
}: IPropsDTO) => {
  const [weplanUser, setWeplanUser] = useState<IFriendsDTO>({} as IFriendsDTO);

  return (
    <FriendsList onSubmit={() => handleSelectedFriend(weplanUser)}>
      <span>
        <button type="button" onClick={onHandleCheckListFormWindow}>
          <MdClose size={30} />
        </button>
      </span>
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
  );
};

export default CheckListFormWindow;
