import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FiCheckSquare, FiPlus, FiSquare } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useAuth } from '../../../../hooks/auth';
import { useEventGuests } from '../../../../hooks/eventGuests';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useFriends } from '../../../../hooks/friends';

import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import InlineFormField from '../../../InlineFormField';

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
} from './styles';

export function EventGuestButtonInfo(): JSX.Element {
  const { user } = useAuth();
  const { selectedEventGuest, eventGuests } = useEventVariables();
  const { getFriends, handleUnselectedFriends } = useFriends();
  const theme = useTheme();
  const {
    editGuest,
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

  async function handleWePlanGuest(): Promise<void> {
    if (!weplanGuest) {
      const findWePlanGuests = eventGuests
        .filter(
          guest =>
            guest.weplanUser &&
            guest.weplanGuest &&
            guest.weplanGuest.weplanUserGuest,
        )
        .map(guest => guest.weplanGuest.weplanUserGuest);
      findWePlanGuests.length > 0 && handleUnselectedFriends(findWePlanGuests);
      await getFriends();
      handleSelectWePlanGuestWindow();
    } else {
      handleDissociateUserFromGuestConfirmation();
    }
  }

  return (
    <Container>
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
          <FieldLabel>Nome: </FieldLabel>
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
      <MenuButtonSection>
        <MenuButton>
          <MenuText>Adicionar Contato</MenuText>
          <IconContainer color={theme.colors.primary}>
            <FiPlus size={24} />
          </IconContainer>
        </MenuButton>
        {selectedEventGuest.contacts.map(contact => {
          let contactType = contact.contact_type;
          if (contact.contact_type === 'Address') contactType = 'Endereço';
          if (contact.contact_type === 'Phone') {
            contactType = 'Telefone';

            return (
              <MenuButton key={contact.id}>
                <MenuText>{contactType}</MenuText>
                <IconContainer color={theme.colors.primary}>
                  <MenuText>
                    <a target="blank" href={`tel:${contact.contact_info}`}>
                      {contact.contact_info}
                    </a>
                  </MenuText>
                </IconContainer>
              </MenuButton>
            );
          }
          if (contact.contact_type === 'Whatsapp') {
            return (
              <MenuButton key={contact.id}>
                <MenuText>{contactType}</MenuText>
                <IconContainer color={theme.colors.primary}>
                  <MenuText>
                    <a
                      target="blank"
                      href={`https://wa.me/${contact.contact_info}`}
                    >
                      {contact.contact_info}
                    </a>
                  </MenuText>
                </IconContainer>
              </MenuButton>
            );
          }
          if (contact.contact_type === 'Email') {
            return (
              <MenuButton key={contact.id}>
                <MenuText>{contactType}</MenuText>
                <IconContainer color={theme.colors.primary}>
                  <MenuText>
                    <a target="blank" href={`mailto:${contact.contact_info}`}>
                      {contact.contact_info}
                    </a>
                  </MenuText>
                </IconContainer>
              </MenuButton>
            );
          }
          if (
            contact.contact_type === 'Instagram' ||
            contact.contact_type === 'Facebook' ||
            contact.contact_type === 'Linkedin' ||
            contact.contact_type === 'WebSite'
          ) {
            return (
              <MenuButton key={contact.id}>
                <MenuText>{contactType}</MenuText>
                <IconContainer color={theme.colors.primary}>
                  <MenuText>
                    <a target="blank" href={contact.contact_info}>
                      {contact.contact_info}
                    </a>
                  </MenuText>
                </IconContainer>
              </MenuButton>
            );
          }
          return (
            <MenuButton key={contact.id}>
              <MenuText>{contactType}</MenuText>
              <IconContainer color={theme.colors.primary}>
                <MenuText>{contact.contact_info}</MenuText>
              </IconContainer>
            </MenuButton>
          );
        })}
      </MenuButtonSection>

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
