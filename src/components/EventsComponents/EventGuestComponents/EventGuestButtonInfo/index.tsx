import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FiCheckSquare, FiPlus, FiSquare } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import IGuestContactDTO from '../../../../dtos/IGuestContactDTO';
import { useAuth } from '../../../../hooks/auth';
import { useEventGuests } from '../../../../hooks/eventGuests';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useFriends } from '../../../../hooks/friends';

import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import InlineFormField from '../../../InlineFormField';
import { GuestContact } from '../GuestContact';

import {
  Container, // 1
  DateText, // 2
  FooterContainer, // 3
  IconContainer, // 4
  MenuButtonSection, // 5
  MenuButton, // 6
  MenuText, // 7
  SectionBorder, // 8
  FieldButton,
  FieldContainer,
  FieldLabel,
  ConfirmGuestButton,
  Contact,
} from './styles';

export function EventGuestButtonInfo(): JSX.Element {
  const { user } = useAuth();
  const {
    selectedEventGuest,
    eventGuests,
    eventOwners,
    eventMembers,
    isOwner,
  } = useEventVariables();
  const { getFriends, handleUnselectedFriends } = useFriends();
  const theme = useTheme();
  const {
    editGuest,
    handleCreateGuestContactWindow,
    handleGuestContactWindow,
    selectGuestContact,
    handleSelectWePlanGuestWindow,
    handleDissociateUserFromGuestConfirmation,
  } = useEventGuests();

  const [editGuestName, setEditGuestName] = useState(false);
  const [
    editGuestDescriptionComponent,
    setEditGuestDescriptionComponent,
  ] = useState(false);

  const isMine = useMemo(() => selectedEventGuest.host_id === user.id, [
    selectedEventGuest,
    user,
  ]);
  const guestName = useMemo(
    () => `${selectedEventGuest.first_name}  ${selectedEventGuest.last_name}`,
    [selectedEventGuest],
  );
  const weplanGuest = useMemo(
    () =>
      selectedEventGuest.weplanUser &&
      !!selectedEventGuest.weplanGuest &&
      !!selectedEventGuest.weplanGuest.weplanUserGuest,
    [selectedEventGuest],
  );
  const weplanGuestName = useMemo(() => {
    if (weplanGuest) {
      const { personInfo } = selectedEventGuest.weplanGuest.weplanUserGuest;
      return personInfo
        ? `${personInfo.first_name}  ${personInfo.last_name}`
        : selectedEventGuest.weplanGuest.weplanUserGuest.name;
    }
    return undefined;
  }, [selectedEventGuest, weplanGuest]);
  const host = useMemo(() => {
    if (selectedEventGuest.host_id === user.id) return user;
    const findOwner = eventOwners.find(
      owner => owner.userEventOwner.id === selectedEventGuest.host_id,
    );
    if (findOwner) return findOwner.userEventOwner;
    const findMember = eventMembers.find(
      member => member.userEventMember.id === selectedEventGuest.host_id,
    );
    if (findMember) return findMember.userEventMember;
    return undefined;
  }, [user, eventOwners, eventMembers, selectedEventGuest]);

  function handleEditGuestName(): void {
    isMine && setEditGuestName(!editGuestName);
  }
  function handleEditGuestDescriptionComponent(): void {
    isMine && setEditGuestDescriptionComponent(!editGuestDescriptionComponent);
  }

  async function handleEditGuestFirstName(first_name: string): Promise<void> {
    await editGuest({
      ...selectedEventGuest,
      first_name,
    });
  }
  async function handleEditGuestLastName(last_name: string): Promise<void> {
    await editGuest({
      ...selectedEventGuest,
      last_name,
    });
  }
  async function handleEditGuestDescription(
    description: string,
  ): Promise<void> {
    await editGuest({
      ...selectedEventGuest,
      description,
    });
  }

  async function handleWePlanGuest(): Promise<void> {
    if (isMine) {
      if (!weplanGuest) {
        const findWePlanGuests = eventGuests
          .filter(
            guest =>
              guest.weplanUser &&
              guest.weplanGuest &&
              guest.weplanGuest.weplanUserGuest,
          )
          .map(guest => guest.weplanGuest.weplanUserGuest);
        findWePlanGuests.length > 0 &&
          handleUnselectedFriends(findWePlanGuests);
        await getFriends();
        handleSelectWePlanGuestWindow();
      } else {
        handleDissociateUserFromGuestConfirmation();
      }
    }
  }

  function handleEditGuestContactWindow(data: IGuestContactDTO): void {
    selectGuestContact(data);
    handleGuestContactWindow();
  }

  return (
    <Container>
      <SectionBorder />
      {!isMine && (
        <FieldButton>
          <FieldLabel>Anfitrião: </FieldLabel>
          <DateText>{host && host.name}</DateText>
        </FieldButton>
      )}
      {weplanGuest && (
        <FieldButton>
          <FieldLabel>Nome e sobrenome: </FieldLabel>
          <MenuText>{weplanGuestName}</MenuText>
        </FieldButton>
      )}
      {!weplanGuest &&
        (editGuestName ? (
          <>
            <FieldContainer>
              <FieldLabel>Nome: </FieldLabel>
              <InlineFormField
                defaultValue={selectedEventGuest.first_name}
                handleOnSubmit={handleEditGuestFirstName}
                placeholder={selectedEventGuest.first_name}
                closeComponent={handleEditGuestName}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Sobrenome: </FieldLabel>
              <InlineFormField
                defaultValue={selectedEventGuest.last_name}
                handleOnSubmit={handleEditGuestLastName}
                placeholder={selectedEventGuest.last_name}
                closeComponent={handleEditGuestName}
              />
            </FieldContainer>
          </>
        ) : (
          <FieldButton onClick={handleEditGuestName}>
            <FieldLabel>Nome e sobrenome</FieldLabel>
            <MenuText>{guestName}</MenuText>
          </FieldButton>
        ))}
      {editGuestDescriptionComponent ? (
        <FieldContainer>
          <FieldLabel>Descrição: </FieldLabel>
          <InlineFormField
            defaultValue={selectedEventGuest.description}
            handleOnSubmit={handleEditGuestDescription}
            placeholder={selectedEventGuest.description}
            closeComponent={handleEditGuestDescriptionComponent}
          />
        </FieldContainer>
      ) : (
        <FieldButton onClick={handleEditGuestDescriptionComponent}>
          <FieldLabel>Descrição</FieldLabel>
          <MenuText>{selectedEventGuest.description}</MenuText>
        </FieldButton>
      )}
      <SectionBorder />
      {isOwner && (
        <MenuButtonSection>
          {isMine && (
            <MenuButton onClick={handleCreateGuestContactWindow}>
              <MenuText>Adicionar Contato</MenuText>
              <IconContainer color={theme.colors.primary}>
                <FiPlus size={24} />
              </IconContainer>
            </MenuButton>
          )}
          {selectedEventGuest.contacts.map(contact => {
            return <GuestContact guestContact={contact} key={contact.id} />;
          })}
        </MenuButtonSection>
      )}

      <SectionBorder />

      <FieldButton onClick={handleWePlanGuest}>
        <MenuText>Usuário WePlan</MenuText>
        <ConfirmGuestButton>
          {weplanGuest ? <FiCheckSquare /> : <FiSquare />}
        </ConfirmGuestButton>
      </FieldButton>

      <SectionBorder />

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {formatOnlyDateShort(String(selectedEventGuest.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
