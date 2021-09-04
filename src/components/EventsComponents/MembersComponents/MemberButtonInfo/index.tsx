import React, { useMemo } from 'react';
import {
  FiBell,
  FiDollarSign,
  FiFileText,
  FiLock,
  FiPlus,
  FiStar,
} from 'react-icons/fi';
import { useTheme } from 'styled-components';

import { useEventVariables } from '../../../../hooks/eventVariables';

import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
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
} from './styles';

export function MemberButtonInfo(): JSX.Element {
  const iconSize = 30;
  const { selectedEventMember } = useEventVariables();
  const theme = useTheme();

  const memberName = useMemo(() => {
    const { personInfo } = selectedEventMember.userEventMember;
    return personInfo
      ? `${personInfo.first_name}  ${personInfo.last_name}`
      : selectedEventMember.userEventMember.name;
  }, [selectedEventMember]);

  return (
    <Container>
      <MenuButton>
        <MenuText>{memberName}</MenuText>
      </MenuButton>
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
          {formatOnlyDateShort(String(selectedEventMember.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
