import React, { useState } from 'react';

import { SectionHeader } from '../../../SectionHeader';
import { MembersFinancialSection } from '../MembersFinancialSection';
import { MembersFooterMenu } from '../MembersFooterMenu';
import { MembersListSection } from '../MembersListSection';
import { MembersMainSection } from '../MembersMainSection';

import { Container, Body } from './styles';
import { useEventMembers } from '../../../../hooks/eventMembers';
import { useFriends } from '../../../../hooks/friends';

export function MembersSection(): JSX.Element {
  const { handleAddMemberWindow } = useEventMembers();
  const { getFriends } = useFriends();

  const [section, setSection] = useState('Members');

  function handleSection(data: string): void {
    setSection(data);
  }
  async function handleAddMemberForm(): Promise<void> {
    await getFriends();
    handleAddMemberWindow();
  }
  return (
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
  );
}
