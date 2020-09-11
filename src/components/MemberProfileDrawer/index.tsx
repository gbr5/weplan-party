import React from 'react';

// import { MdClose } from 'react-icons/md';
import { MouseEventHandler } from 'react-select';
import { MdClose, MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { MemberDrawer, EditMemberButton, DeleteMemberButton } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';

interface IEventMemberDTO {
  id: string;
  name: string;
  avatar: string;
  number_of_guests: number;
}

interface IPropsDTO {
  member: IEventMemberDTO;
  onHandleMemberDrawer: MouseEventHandler;
  onHandleNumberOfGuestDrawer: MouseEventHandler;
  onHandleDeleteMemberDrawer: MouseEventHandler;
}

const MemberProfileDrawer: React.FC<IPropsDTO> = ({
  member,
  onHandleMemberDrawer,
  onHandleNumberOfGuestDrawer,
  onHandleDeleteMemberDrawer,
}: IPropsDTO) => {
  const avatar = member.avatar === '' ? avatar_placeholder : member.avatar;

  return (
    <MemberDrawer>
      <span>
        <button type="button" onClick={onHandleMemberDrawer}>
          <MdClose size={30} />
        </button>
      </span>
      <img src={avatar} alt={member.name} />

      <h1>{member.name}</h1>

      <div>
        <EditMemberButton type="button" onClick={onHandleNumberOfGuestDrawer}>
          Número de convidados:
          <strong>{member.number_of_guests}</strong>
          <FiEdit size={24} />
        </EditMemberButton>
        <DeleteMemberButton type="button" onClick={onHandleDeleteMemberDrawer}>
          Deletar
          <MdDelete size={24} />
        </DeleteMemberButton>
      </div>
    </MemberDrawer>
  );
};

export default MemberProfileDrawer;
