import React, { useState } from 'react';
import { useMemo } from 'react';
import { FiDollarSign, FiLock, FiPlus } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useEventOwners } from '../../../../hooks/eventOwners';

import { useEventVariables } from '../../../../hooks/eventVariables';

import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import { CloseButton } from '../../../CloseButton';
import InlineFormField from '../../../InlineFormField';

import {
  Container,
  Name,
  DateText,
  IconContainer,
  MenuButtonSection,
  DescriptionButton,
  MenuButton,
  MenuText,
  FooterContainer,
  SectionBorder,
  DescriptionContainer,
} from './styles';

export function OwnerButtonInfo(): JSX.Element {
  const iconSize = 30;
  const theme = useTheme();
  const { selectedEventOwner, selectedEvent } = useEventVariables();
  const { editEventOwner } = useEventOwners();

  const [editDescription, setEditDescription] = useState(false);

  function handleEditDescription(): void {
    setEditDescription(!editDescription);
  }

  async function handleEditOwnerDescription(
    description: string,
  ): Promise<void> {
    await editEventOwner({
      ...selectedEventOwner,
      description,
    });
    handleEditDescription();
  }

  const description = useMemo(() => selectedEventOwner.description, [
    selectedEventOwner,
  ]);

  const ownerName = useMemo(() => {
    const { personInfo } = selectedEventOwner.userEventOwner;
    return personInfo
      ? `${personInfo.first_name}  ${personInfo.last_name}`
      : selectedEventOwner.userEventOwner.name;
  }, [selectedEventOwner]);

  return (
    <Container>
      <DescriptionContainer>
        <MenuText>{ownerName}</MenuText>
      </DescriptionContainer>
      {editDescription ? (
        <DescriptionContainer>
          <CloseButton closeFunction={handleEditDescription} />
          <InlineFormField
            defaultValue={description}
            placeholder={description}
            handleOnSubmit={handleEditOwnerDescription}
          />
        </DescriptionContainer>
      ) : (
        <DescriptionButton onClick={handleEditDescription}>
          <Name>
            {description === '' || description === ' '
              ? 'Descrição'
              : description}
          </Name>
        </DescriptionButton>
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
