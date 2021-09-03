import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import {
  FiBell,
  FiDollarSign,
  FiFileText,
  FiLock,
  FiPlus,
  FiStar,
} from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useEventGuests } from '../../../../hooks/eventGuests';

import { useEventVariables } from '../../../../hooks/eventVariables';

import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import InlineFormField from '../../../InlineFormField';
import { NotificationNumber } from '../../../NotificationNumber';

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
} from './styles';

export function EventGuestButtonInfo(): JSX.Element {
  const iconSize = 30;
  const { selectedEventGuest } = useEventVariables();
  const theme = useTheme();
  const { editGuest } = useEventGuests();

  const [editGuestName, setEditGuestName] = useState(false);
  const [
    editGuestDescriptionComponent,
    setEditGuestDescriptionComponent,
  ] = useState(false);

  function handleEditGuestName(): void {
    setEditGuestName(!editGuestName);
  }

  function handleEditGuestDescriptionComponent(): void {
    setEditGuestDescriptionComponent(!editGuestDescriptionComponent);
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

  return (
    <Container>
      {editGuestName ? (
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
      )}
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
      {/*
      <SectionBorder /> */}

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {formatOnlyDateShort(String(selectedEventGuest.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
