import React, { useState } from 'react';

import { SectionHeader } from '../../../SectionHeader';
import { MembersFinancialSection } from '../MembersFinancialSection';
import { MembersFooterMenu } from '../MembersFooterMenu';
import { MembersListSection } from '../MembersListSection';
import { MembersMainSection } from '../MembersMainSection';

import { Container, Body } from './styles';
import { useEventMembers } from '../../../../hooks/eventMembers';
import { useFriends } from '../../../../hooks/friends';
import { SelectFromFriends } from '../../../FriendsComponents/SelectFromFriends';
import { useEventVariables } from '../../../../hooks/eventVariables';
import DeleteConfirmationWindow from '../../../DeleteConfirmationWindow';

export function MembersSection(): JSX.Element {
  const { selectedEventMember, eventMembers } = useEventVariables();
  const {
    handleAddMemberWindow,
    addMemberWindow,
    addMultipleMembers,
    deleteMemberWindow,
    deleteEventMember,
    handleDeleteMemberWindow,
  } = useEventMembers();
  const { getFriends, handleUnselectedFriends } = useFriends();

  const [section, setSection] = useState('Members');

  function handleSection(data: string): void {
    setSection(data);
  }
  async function handleAddMemberForm(): Promise<void> {
    if (eventMembers.length > 1) {
      const findMembers = eventMembers.map(owner => owner.userEventMember);
      handleUnselectedFriends(findMembers);
    }
    await getFriends();
    handleAddMemberWindow();
  }

  return (
    <>
      {addMemberWindow && (
        <SelectFromFriends
          closeWindow={handleAddMemberWindow}
          handleAddFriends={addMultipleMembers}
        />
      )}

      {!!deleteMemberWindow &&
        selectedEventMember &&
        selectedEventMember.id && (
          <DeleteConfirmationWindow
            title="Deseja deletar este membro?"
            handleDelete={() => deleteEventMember(selectedEventMember.id)}
            onHandleCloseWindow={handleDeleteMemberWindow}
          />
        )}
      <Container>
        <SectionHeader
          handleAddButton={handleAddMemberForm}
          handleInfoButton={handleAddMemberForm}
          title="Membros"
        />
        <Body>
          {section === 'Members' && <MembersListSection />}
          {section === 'Main' && <MembersMainSection />}
          {section === 'Financial' && <MembersFinancialSection />}
        </Body>
        <MembersFooterMenu
          handleSection={(data: string) => handleSection(data)}
          section={section}
        />
      </Container>
    </>
  );
}
