import React, { useMemo } from 'react';

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useEventVariables } from '../../../../hooks/eventVariables';

import IEventMemberDTO from '../../../../dtos/IEventMemberDTO';

import { MemberButtonInfo } from '../MemberButtonInfo';

import { Container, Index, Name } from './styles';

interface IProps {
  member: IEventMemberDTO;
  index: string;
}

export function MemberButton({ member, index }: IProps): JSX.Element {
  const iconSize = 30;
  const { selectedEventMember, selectEventMember } = useEventVariables();

  const isActive = useMemo(
    () => selectedEventMember.id === member.id ?? false,
    [selectedEventMember, member],
  );

  function handleMemberBody(): void {
    isActive
      ? selectEventMember({} as IEventMemberDTO)
      : selectEventMember(member);
  }

  return (
    <>
      <Container
        style={{
          zIndex: isActive ? 3 : 1,
        }}
        isActive={selectedEventMember.id === member.id}
        onClick={handleMemberBody}
      >
        <Index>{index}</Index>
        <Name>{member.userEventMember.name}</Name>
        {isActive ? (
          <FiChevronUp size={iconSize} />
        ) : (
          <FiChevronDown size={iconSize} />
        )}
      </Container>
      {isActive && <MemberButtonInfo />}
    </>
  );
}
