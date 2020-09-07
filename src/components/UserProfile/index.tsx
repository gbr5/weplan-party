import React, { useCallback } from 'react';

// import { MdClose } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { MouseEventHandler } from 'react-select';
import { MdClose } from 'react-icons/md';
import { UserProfileWindow } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';

interface IUser {
  id: string;
  name: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

interface IPropsDTO {
  user: IUser;
  onChildClick: MouseEventHandler;
}

const UserProfile: React.FC<IPropsDTO> = ({
  user,
  onChildClick,
}: IPropsDTO) => {
  const history = useHistory();

  const handleNavigateToEvents = useCallback(() => {
    history.push('/events');
  }, [history]);

  const avatar = user.avatar === '' ? avatar_placeholder : user.avatar;

  return (
    <UserProfileWindow>
      <span>
        <button type="button" onClick={onChildClick}>
          <MdClose size={30} />
        </button>
      </span>
      <img src={avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <span>
        {user.first_name} {user.last_name}
      </span>
      <div>
        <button type="button" onClick={handleNavigateToEvents}>
          Perfil
        </button>
      </div>
    </UserProfileWindow>
  );
};

export default UserProfile;
