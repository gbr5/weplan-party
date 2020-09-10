import React from 'react';

import { MouseEventHandler } from 'react-select';
import { MdClose, MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { OwnerDrawer, EditOwnerButton, DeleteOwnerButton } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';

interface IEventOwnerDTO {
  id: string;
  name: string;
  avatar: string;
  number_of_guests: number;
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

  return (
    <OwnerDrawer>
      <span>
        <button type="button" onClick={onHandleOwnerDrawer}>
          <MdClose size={30} />
        </button>
      </span>
      <button type="button">
        <img src={avatar} alt={owner.name} />
        <h1>{owner.name}</h1>
      </button>
      <div>
        <EditOwnerButton type="button" onClick={onHandleNumberOfGuestDrawer}>
          Número de convidados:
          {owner.number_of_guests}
          <FiEdit size={24} />
        </EditOwnerButton>
        <DeleteOwnerButton type="button" onClick={onHandleDeleteOwnerDrawer}>
          Deletar
          <MdDelete size={24} />
        </DeleteOwnerButton>
      </div>
    </OwnerDrawer>
  );
};

export default OwnerProfileDrawer;
