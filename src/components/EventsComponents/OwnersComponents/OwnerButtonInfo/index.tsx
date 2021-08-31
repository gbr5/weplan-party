import React, { useState } from 'react';
import { FiDollarSign, FiLock, FiPlus } from 'react-icons/fi';
import { useTheme } from 'styled-components';

import { useEventVariables } from '../../../../hooks/eventVariables';

import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';

import {
  Container,
  Name,
  DateText,
  IconContainer,
  MenuButtonSection,
  MenuButton,
  MenuText,
  FooterContainer,
  SectionBorder,
} from './styles';

export function OwnerButtonInfo(): JSX.Element {
  const iconSize = 30;
  const theme = useTheme();
  const { selectedEventOwner, selectedEvent } = useEventVariables();

  return (
    <Container>
      {selectedEventOwner.description !== '' && (
        <Name>{selectedEventOwner.description}</Name>
      )}

      <SectionBorder />

      <MenuButtonSection>
        {selectedEvent.event_type === 'Prom' && (
          <MenuButton>
            <MenuText>Transações</MenuText>
            <IconContainer color={theme.colors.title}>
              <FiDollarSign size={iconSize} />
            </IconContainer>
          </MenuButton>
        )}
        {/* <MenuButton>
          <MenuText>Notas</MenuText>
          <IconContainer
            color={theme.colors.info_light}
          >
            <Icon name="file-text" />
          </IconContainer>
        </MenuButton> */}
        {selectedEvent.event_type === 'Prom' && (
          <MenuButton>
            <MenuText>Contratos</MenuText>
            <IconContainer color={theme.colors.green}>
              <FiLock size={iconSize} />
            </IconContainer>
          </MenuButton>
        )}

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
          {formatOnlyDateShort(String(selectedEventOwner.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
