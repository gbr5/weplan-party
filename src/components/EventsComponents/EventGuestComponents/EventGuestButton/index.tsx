import React from 'react';
import { useMemo } from 'react';
import { FiCheckSquare, FiSquare, FiUser } from 'react-icons/fi';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';
import { useAuth } from '../../../../hooks/auth';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { EventGuestButtonInfo } from '../EventGuestButtonInfo';

import {
  OverContainer,
  Container,
  Name,
  ConfirmGuestButton,
  GuestInfoButton,
  Index,
} from './styles';

interface IProps {
  guest: IEventGuestDTO;
  index: number;
}

export function EventGuestButton({ guest, index }: IProps): JSX.Element {
  const { user } = useAuth();
  const { selectedEventGuest, selectEventGuest } = useEventVariables();

  const isMine = useMemo(() => guest.host_id === user.id, [guest, user]);
  const isActive = useMemo(() => guest.id === selectedEventGuest.id, [
    guest,
    selectedEventGuest,
  ]);

  function handleSelectGuest(): void {
    if (
      (selectedEventGuest && !selectedEventGuest.id) ||
      selectedEventGuest.id !== guest.id
    )
      return selectEventGuest(guest);
    return selectEventGuest({} as IEventGuestDTO);
  }

  console.log(isActive);

  return (
    <OverContainer>
      <Container style={{ zIndex: isActive ? 3 : 1 }} isActive={isMine}>
        <GuestInfoButton onClick={handleSelectGuest}>
          <Index>{index}</Index>
          <Name>
            {guest.first_name} {guest.last_name}
          </Name>
        </GuestInfoButton>

        {guest.weplanUser && (
          <ConfirmGuestButton>
            <FiUser size={24} />
          </ConfirmGuestButton>
        )}
        <ConfirmGuestButton>
          {guest.confirmed ? (
            <FiCheckSquare size={24} />
          ) : (
            <FiSquare size={24} />
          )}
        </ConfirmGuestButton>
      </Container>
      {isActive && <EventGuestButtonInfo />}
    </OverContainer>
  );
}
