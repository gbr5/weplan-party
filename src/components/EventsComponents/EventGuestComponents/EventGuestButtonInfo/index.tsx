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
  const [editGuestDescription, setEditGuestDescription] = useState(false);

  function handleEditGuestName(): void {
    setEditGuestName(!editGuestName);
  }

  function handleEditGuestDescription(): void {
    setEditGuestDescription(!editGuestDescription);
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
      <SectionBorder />
      <MenuButtonSection>
        <MenuButton>
          <MenuText>Tarefas</MenuText>
          <IconContainer color={theme.colors.red}>
            <NotificationNumber number={0} />
            <FiBell size={iconSize} />
          </IconContainer>
        </MenuButton>

        <MenuButton>
          <MenuText>Transações</MenuText>
          <IconContainer color={theme.colors.title}>
            <FiDollarSign size={iconSize} />
          </IconContainer>
        </MenuButton>
        <MenuButton>
          <MenuText>Notas</MenuText>
          <IconContainer color={theme.colors.toastInfoColor}>
            <FiFileText size={iconSize} />
          </IconContainer>
        </MenuButton>

        <MenuButton>
          <MenuText>Contratos</MenuText>
          <IconContainer color={theme.colors.green}>
            <FiLock size={iconSize} />
          </IconContainer>
        </MenuButton>

        <MenuButton>
          <MenuText>Votos</MenuText>
          <IconContainer color={theme.colors.title}>
            <FiStar size={iconSize} />
          </IconContainer>
        </MenuButton>

        <MenuButton>
          <MenuText>Mais</MenuText>
          <IconContainer color={theme.colors.primary}>
            <FiPlus size={iconSize} />
          </IconContainer>
        </MenuButton>
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
