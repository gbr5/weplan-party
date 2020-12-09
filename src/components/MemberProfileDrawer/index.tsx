import React from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { MemberDrawer, EditMemberButton, DeleteMemberButton } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';
import WindowContainer from '../WindowContainer';

interface IEventMemberDTO {
  id: string;
  name: string;
  avatar: string;
  number_of_guests: number;
}

interface IPropsDTO {
  isOwner: boolean;
  isGuest: boolean;
  member: IEventMemberDTO;
  onHandleMemberDrawer: MouseEventHandler;
  onHandleNumberOfGuestDrawer: MouseEventHandler;
  onHandleDeleteMemberDrawer: MouseEventHandler;
}

const MemberProfileDrawer: React.FC<IPropsDTO> = ({
  isOwner,
  isGuest,
  member,
  onHandleMemberDrawer,
  onHandleNumberOfGuestDrawer,
  onHandleDeleteMemberDrawer,
}: IPropsDTO) => {
  const avatar = member.avatar === '' ? avatar_placeholder : member.avatar;

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleMemberDrawer}
      containerStyle={{
        zIndex: 10,
        top: '20%',
        left: '20%',
        height: '60%',
        width: '60%',
      }}
    >
      <MemberDrawer>
        <img src={avatar} alt={member.name} />

        <h1>{member.name}</h1>

        <div>
          {isOwner && !isGuest ? (
            <>
              <EditMemberButton
                type="button"
                onClick={onHandleNumberOfGuestDrawer}
              >
                Número de convidados:
                <strong>{member.number_of_guests}</strong>
                <FiEdit size={24} />
              </EditMemberButton>
              <DeleteMemberButton
                type="button"
                onClick={onHandleDeleteMemberDrawer}
              >
                Deletar
                <MdDelete size={24} />
              </DeleteMemberButton>
            </>
          ) : (
            <>
              <EditMemberButton type="button">
                Número de convidados:
                <strong>{member.number_of_guests}</strong>
              </EditMemberButton>
            </>
          )}
        </div>
      </MemberDrawer>
    </WindowContainer>
  );
};

export default MemberProfileDrawer;
