import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { FiCheckSquare, FiLoader, FiSquare, FiUser } from 'react-icons/fi';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';
import { useAuth } from '../../../../hooks/auth';
import { useEventGuests } from '../../../../hooks/eventGuests';
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
  const { editGuest } = useEventGuests();

  const [loading, setLoading] = useState(false);

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

  async function handleEditGuestConfirmation(): Promise<void> {
    if (isMine) {
      try {
        setLoading(true);
        await editGuest({
          ...guest,
          confirmed: !guest.confirmed,
        });
      } catch {
        throw new Error();
      } finally {
        setLoading(false);
      }
    }
  }

  const weplanGuest = useMemo(() => {
    if (
      guest.weplanUser &&
      !!guest.weplanGuest &&
      !!guest.weplanGuest.weplanUserGuest
    ) {
      const { personInfo } = guest.weplanGuest.weplanUserGuest;
      return personInfo
        ? `${personInfo.first_name}  ${personInfo.last_name}`
        : guest.weplanGuest.weplanUserGuest.name;
    }
    return undefined;
  }, [guest]);

  const guestName = useMemo(
    () => weplanGuest || `${guest.first_name} ${guest.last_name}`,
    [weplanGuest, guest],
  );

  return (
    <OverContainer>
      <Container style={{ zIndex: isActive ? 3 : 1 }} isActive={isMine}>
        <GuestInfoButton onClick={handleSelectGuest}>
          <Index>{index}</Index>
          <Name>{guestName}</Name>
        </GuestInfoButton>

        {!!weplanGuest && (
          <ConfirmGuestButton>
            <FiUser size={24} />
          </ConfirmGuestButton>
        )}
        {loading ? (
          <ConfirmGuestButton>
            <FiLoader size={24} />
          </ConfirmGuestButton>
        ) : (
          <ConfirmGuestButton onClick={handleEditGuestConfirmation}>
            {guest.confirmed ? (
              <FiCheckSquare size={24} />
            ) : (
              <FiSquare size={24} />
            )}
          </ConfirmGuestButton>
        )}
      </Container>
      {isActive && <EventGuestButtonInfo />}
    </OverContainer>
  );
}
