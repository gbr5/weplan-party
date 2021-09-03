import React, { useState, useEffect } from 'react';

import { useMemo } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useEventVariables } from '../../../../hooks/eventVariables';

import IEventOwnerDTO from '../../../../dtos/IEventOwnerDTO';

import { OwnerButtonInfo } from '../OwnerButtonInfo';

import { Container, Index, Name } from './styles';

interface IProps {
  owner: IEventOwnerDTO;
  index: string;
}

export function OwnerButton({ owner, index }: IProps): JSX.Element {
  const iconSize = 30;
  const { selectedEventOwner, selectEventOwner } = useEventVariables();

  const isActive = useMemo(() => selectedEventOwner.id === owner.id ?? false, [
    selectedEventOwner,
    owner,
  ]);

  function handleOwnerBody(): void {
    isActive ? selectEventOwner({} as IEventOwnerDTO) : selectEventOwner(owner);
  }

  return (
    <>
      <Container
        style={{
          zIndex: isActive ? 3 : 1,
        }}
        onClick={handleOwnerBody}
        isActive={isActive}
      >
        <Index>{index}</Index>
        <Name>{owner.userEventOwner.name}</Name>
        {isActive ? (
          <FiChevronUp size={iconSize} />
        ) : (
          <FiChevronDown size={iconSize} />
        )}
      </Container>
      {isActive && <OwnerButtonInfo />}
    </>
  );
}
