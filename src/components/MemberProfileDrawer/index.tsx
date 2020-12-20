import React from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { MemberDrawer, EditMemberButton, DeleteMemberButton } from './styles';
import avatar_placeholder from '../../assets/WePlanLogo.svg';
import WindowContainer from '../WindowContainer';
import IEventMemberDTO from '../../dtos/IEventMemberDTO';

interface IPropsDTO {
  isOwner: boolean;
  member: IEventMemberDTO;
  onHandleMemberDrawer: MouseEventHandler;
  onHandleNumberOfGuestDrawer: MouseEventHandler;
  onHandleDeleteMemberDrawer: MouseEventHandler;
}

const MemberProfileDrawer: React.FC<IPropsDTO> = ({
  isOwner,
  member,
  onHandleMemberDrawer,
  onHandleNumberOfGuestDrawer,
  onHandleDeleteMemberDrawer,
}: IPropsDTO) => {
  const avatar =
    member.userEventMember.avatar_url === ''
      ? avatar_placeholder
      : member.userEventMember.avatar_url;

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
        <img src={avatar} alt={member.userEventMember.name} />

        <h1>{member.userEventMember.name}</h1>

        <div>
          {isOwner ? (
            <>
              <EditMemberButton
                type="button"
                onClick={onHandleNumberOfGuestDrawer}
              >
                Número de convidados:
                <strong>{member ? member.number_of_guests : 0}</strong>
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
                <strong>{member ? member.number_of_guests : 0}</strong>
              </EditMemberButton>
            </>
          )}
        </div>
      </MemberDrawer>
    </WindowContainer>
  );
};

export default MemberProfileDrawer;
