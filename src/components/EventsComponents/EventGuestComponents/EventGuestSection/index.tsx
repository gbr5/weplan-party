import React, { useCallback, useMemo, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';

import { useAuth } from '../../../../hooks/auth';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useCurrentEvent } from '../../../../hooks/currentEvent';
import { useEventGuests } from '../../../../hooks/eventGuests';
import IWeplanGuestDTO from '../../../../dtos/IWeplanGuestDTO';

import EventInvitationWindow from '../../../EventInvitationWindow';
import { EventGuestButton } from '../EventGuestButton';
// import { AddEventGuestListWindow } from '../../../AddEventGuestListWindow';
import { SelectFromFriends } from '../../../FriendsComponents/SelectFromFriends';
import { SelectOneFromFriends } from '../../../FriendsComponents/SelectOneFromFriends';
import DeleteConfirmationWindow from '../../../DeleteConfirmationWindow';
import NewGuestForm from '../NewGuestForm';
import { NewGuestWindow } from '../NewGuestWindow';

import { Container, BooleanNavigationButton } from './styles';
import { AddEventGuestListWindow } from '../../../AddEventGuestListWindow';

export function EventGuestSection(): JSX.Element {
  const { user } = useAuth();
  const { getEventGuests } = useCurrentEvent();
  const { eventGuests, isOwner, selectedEventGuest } = useEventVariables();
  const {
    handleNewGuestWindow,
    addGuestListWindow,
    selectWePlanGuestsWindow,
    associateUserToEventGuest,
    selectWePlanGuestWindow,
    handleSelectWePlanGuestsWindow,
    handleSelectWePlanGuestWindow,
    createMultipleWePlanGuests,
    handleDissociateUserFromGuestConfirmation,
    dissociateUserFromGuestConfirmation,
    deleteWePlanGuest,
    newGuestForm,
    newGuestWindow,
  } = useEventGuests();

  const [wpGuestInvitationWindow, setWpGuestInvitationWindow] = useState(false);
  const [guestWindow, setGuestWindow] = useState(isOwner);

  const handleGuestWindow = useCallback(props => {
    setGuestWindow(props);
  }, []);

  const myGuests = useMemo(() => {
    return eventGuests.filter(guest => guest.host_id === user.id);
  }, [eventGuests, user]);

  const myGuestsConfirmed = useMemo(() => {
    return myGuests.length;
  }, [myGuests]);

  const confirmedGuests = useMemo(() => {
    return eventGuests.length;
  }, [eventGuests]);

  let guestCount = 0;
  let myGuestCount = 0;

  const wpGuests = useMemo(() => {
    const wpguests: IWeplanGuestDTO[] = [];
    if (isOwner) {
      eventGuests.map(guest => {
        guest.weplanGuest !== null && wpguests.push(guest.weplanGuest);
        return guest;
      });
      return wpguests;
    }
    myGuests.map(guest => {
      guest.weplanGuest !== null && wpguests.push(guest.weplanGuest);
      return guest;
    });
    return wpguests;
  }, [eventGuests, myGuests, isOwner]);

  const myGuestsInfo = useMemo(
    () => `${myGuestsConfirmed} / ${myGuests.length}`,
    [myGuestsConfirmed, myGuests],
  );
  const eventGuestsInfo = useMemo(
    () => `${confirmedGuests} / ${eventGuests.length}`,
    [confirmedGuests, eventGuests],
  );
  return (
    <>
      {newGuestForm && <NewGuestForm />}
      {newGuestWindow && <NewGuestWindow />}
      {wpGuestInvitationWindow && (
        <EventInvitationWindow
          handleCloseWindow={() => setWpGuestInvitationWindow(false)}
          handleGetGuests={getEventGuests}
          onHandleCloseWindow={() => setWpGuestInvitationWindow(false)}
          wpGuests={wpGuests}
        />
      )}
      {!!addGuestListWindow && <AddEventGuestListWindow />}
      {selectWePlanGuestsWindow && (
        <SelectFromFriends
          closeWindow={handleSelectWePlanGuestsWindow}
          handleAddFriends={createMultipleWePlanGuests}
        />
      )}
      {selectWePlanGuestWindow && selectedEventGuest && (
        <SelectOneFromFriends
          closeWindow={handleSelectWePlanGuestWindow}
          handleAddFriend={associateUserToEventGuest}
        />
      )}
      {dissociateUserFromGuestConfirmation && (
        <DeleteConfirmationWindow
          handleDelete={deleteWePlanGuest}
          onHandleCloseWindow={handleDissociateUserFromGuestConfirmation}
          title="Deseja mesmo dissociar o usuário do convidado?"
        />
      )}
      <Container>
        {/* {selectedEvent.event_type === 'Prom' && (
          <span>
            {isOwner && (
              <GuestAllocationButton
                type="button"
                onClick={handleGuestAllocationWindow}
              >
                Alocação de Convidados
              </GuestAllocationButton>
            )}
          </span>
        )} */}
        <span>
          {isOwner && (
            <>
              <BooleanNavigationButton
                booleanActiveButton={guestWindow}
                type="button"
                onClick={() => handleGuestWindow(true)}
              >
                Convidados da Festa
              </BooleanNavigationButton>
              <BooleanNavigationButton
                type="button"
                onClick={() => handleGuestWindow(false)}
                booleanActiveButton={!guestWindow}
              >
                Meus Convidados
              </BooleanNavigationButton>
            </>
          )}
          <span>
            {/* <button type="button" onClick={sendMassEmailInvitations}>
              Convite Virtual
              <MdMail size={30} />
            </button> */}
            <button type="button" onClick={handleNewGuestWindow}>
              Adicionar Convidado
              <MdPersonAdd size={30} />
            </button>
          </span>
        </span>

        {guestWindow ? <h3>{eventGuestsInfo}</h3> : <h3>{myGuestsInfo}</h3>}

        <div>
          {guestWindow &&
            eventGuests.map(eGuest => {
              guestCount += 1;
              return (
                <EventGuestButton
                  key={eGuest.id}
                  guest={eGuest}
                  index={guestCount}
                />
              );
            })}

          {!guestWindow &&
            myGuests.map(mGuest => {
              myGuestCount += 1;
              return (
                <EventGuestButton
                  key={mGuest.id}
                  guest={mGuest}
                  index={myGuestCount}
                />
              );
            })}
        </div>
      </Container>
    </>
  );
}
