import React from 'react';

import { MouseEventHandler } from 'react-select';
import { MdClose, MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { Container, DeleteOwnerButton } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';
import { useAuth } from '../../hooks/auth';

import WindowContainer from '../WindowContainer';

interface IEventOwnerDTO {
  id: string;
  name: string;
  avatar: string;
  number_of_guests: number;
  description: string;
}

interface IPropsDTO {
  owner: IEventOwnerDTO;
  onHandleOwnerDrawer: MouseEventHandler;
  onHandleNumberOfGuestDrawer: MouseEventHandler;
  onHandleDeleteOwnerDrawer: MouseEventHandler;
}

const OwnerProfileDrawer: React.FC<IPropsDTO> = ({
  owner,
  onHandleOwnerDrawer,
  onHandleNumberOfGuestDrawer,
  onHandleDeleteOwnerDrawer,
}: IPropsDTO) => {
  const avatar = owner.avatar === '' ? avatar_placeholder : owner.avatar;
  const { user } = useAuth();

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleOwnerDrawer}
      containerStyle={{ top: '20%', left: '25%', height: '60%', width: '50%' }}
    >
      <Container>
        <img src={avatar} alt={owner.name} />

        <button type="button" onClick={onHandleNumberOfGuestDrawer}>
          <FiEdit3 size={24} />

          <h1>
            username:
            <strong>{owner.name}</strong>
          </h1>
          <div>
            <h2>
              Descrição: <strong>{owner.description}</strong>
            </h2>
            <h2>
              Número de convidados: <strong>{owner.number_of_guests}</strong>
            </h2>
          </div>
        </button>

        {owner.id !== user.id && (
          <div>
            <DeleteOwnerButton
              type="button"
              onClick={onHandleDeleteOwnerDrawer}
            >
              Deletar
              <MdDelete size={24} />
            </DeleteOwnerButton>
          </div>
        )}
      </Container>
    </WindowContainer>
  );
};

export default OwnerProfileDrawer;
