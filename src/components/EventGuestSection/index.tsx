import React, {
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiCheckSquare, FiEdit3, FiSquare, FiUser } from 'react-icons/fi';

import { MdMail, MdPersonAdd } from 'react-icons/md';
import AddEventGuestListWindow from '../AddEventGuestListWindow';

import {
  Container,
  GuestAllocationButton,
  NotHostGuest,
  Guest,
  BooleanNavigationButton,
} from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';
import BooleanQuestionWindow from '../BooleanQuestionWindow';
import FriendsListWindow from '../FriendsListWindow';
import IFriendDTO from '../../dtos/IFriendDTO';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import AddGuestWindow from '../AddGuestWindow ';
import EditGuestWindow from '../EditGuestWindow';
import EventInvitationWindow from '../EventInvitationWindow';
import IWeplanGuestDTO from '../../dtos/IWeplanGuestDTO';

interface ICreateGuest {
  first_name: string;
  last_name: string;
  description: string;
  confirmed: boolean;
  weplanUser: boolean;
}
interface IProps {
  closeAllWindows: Function;
  handleGetGuests: Function;
  handleGuestAllocationWindow: MouseEventHandler;
  eventId: string;
  eventTrimmedName: string;
  eventName: string;
  isOwner: boolean;
  myAvailableNumberOfGuests: number;
  eventGuests: IEventGuestDTO[];
  confirmedGuests: number;
  myGuests: IEventGuestDTO[];
  myGuestsConfirmed: number;
  friends: IFriendDTO[];
}

const EventGuestSection: React.FC<IProps> = ({
  handleGetGuests,
  handleGuestAllocationWindow,
  closeAllWindows,
  eventId,
  eventName,
  eventTrimmedName,
  isOwner,
  myAvailableNumberOfGuests,
  eventGuests,
  confirmedGuests,
  myGuests,
  myGuestsConfirmed,
  friends,
}: IProps) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [selectedGuest, setSelectedGuest] = useState<IEventGuestDTO>(
    {} as IEventGuestDTO,
  );

  const [selectedFriend, setSelectedFriend] = useState<IFriendDTO>(
    {} as IFriendDTO,
  );
  const [wpGuestInvitationWindow, setWpGuestInvitationWindow] = useState(false);
  const [wpGuestQuestionWindow, setWpGuestQuestionWindow] = useState(false);
  const [editGuestWindow, setEditGuestWindow] = useState(false);
  const [guestWindow, setGuestWindow] = useState(true);
  const [addGuestWindow, setAddGuestWindow] = useState(false);
  const [guestConfirmationWindow, setGuestConfirmationWindow] = useState(false);
  const [weplanUser, setWeplanUser] = useState(false);
  const [addGuestListWindow, setAddGuestListWindow] = useState(false);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [guestConfirmed, setGuestConfirmed] = useState(false);

  const handleIsGuestConfirmed = useCallback((props: boolean) => {
    setGuestConfirmed(props);
    setGuestConfirmationWindow(false);
  }, []);
  const handleGuestWindow = useCallback(props => {
    setGuestWindow(props);
  }, []);
  const handleEditGuestWindow = useCallback(
    (props: IEventGuestDTO) => {
      closeAllWindows();
      setSelectedGuest(props);
      if (props.weplanUser === true) {
        setWeplanUser(true);
      } else {
        setWeplanUser(false);
      }

      return setEditGuestWindow(!editGuestWindow);
    },
    [editGuestWindow, closeAllWindows],
  );
  const handleWeplanGuestWindow = useCallback(props => {
    setWpGuestQuestionWindow(props);
  }, []);
  const handleCloseAddGuestListWindow = useCallback(() => {
    closeAllWindows();
    handleGetGuests();
  }, [closeAllWindows, handleGetGuests]);

  const handleAddGuestWindow = useCallback(() => {
    closeAllWindows();
    setAddGuestWindow(true);
    setWpGuestQuestionWindow(true);
    setGuestConfirmationWindow(true);
  }, [closeAllWindows]);

  const closeAddGuestWindow = useCallback(() => {
    setSelectedFriend({} as IFriendDTO);
    closeAllWindows();
    setAddGuestWindow(false);
  }, [closeAllWindows]);
  const handleGuestConfirmationWindow = useCallback(() => {
    setGuestConfirmationWindow(!guestConfirmationWindow);
  }, [guestConfirmationWindow]);

  const handleSelectFriend = useCallback((props: IFriendDTO) => {
    setSelectedFriend(props);
    setFriendsWindow(false);
  }, []);

  const handleAddGuestListWindow = useCallback(() => {
    closeAllWindows();
    setAddGuestListWindow(true);
  }, [closeAllWindows]);

  const handleEditConfirmedGuest = useCallback(
    async (props: IEventGuestDTO) => {
      try {
        await api.put(`events/${eventId}/guests/${props.id}`, {
          first_name: props.first_name,
          last_name: props.last_name,
          description: props.description,
          confirmed: !props.confirmed,
        });

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
        handleGetGuests();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
      }
    },
    [addToast, eventId, handleGetGuests],
  );
  const handleWeplanUserQuestion = useCallback(
    (weplan_user: boolean) => {
      if (weplan_user === true) {
        setWeplanUser(true);
        setWpGuestQuestionWindow(false);
        setFriendsWindow(true);
      } else {
        setWeplanUser(false);
        setWpGuestQuestionWindow(false);
      }
      return handleWeplanGuestWindow(false);
    },
    [handleWeplanGuestWindow],
  );

  let guestCount = 0;
  let myGuestCount = 0;
  const notHostMessage = 'Você não é o anfitrião deste convidado!';

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

  const sendMassEmailInvitations = useCallback(async () => {
    try {
      const guests = eventGuests
        .map(guest => {
          const email =
            (!!guest.guestContactInfos &&
              guest.guestContactInfos.length > 0 &&
              guest.guestContactInfos.find(
                contact => contact.contactType.name === 'Email',
              )?.contact_info) ||
            '';
          return {
            id: guest.id,
            email,
            first_name: guest.first_name,
            host_name:
              (!!guest.host.personInfo && guest.host.personInfo.first_name) ||
              guest.host.name,
          };
        })
        .filter(e => e.email !== '');

      await api.post('/mass-invitation', {
        eventName,
        eventTrimmedName,
        guests,
      });
      addToast({
        type: 'success',
        title: 'Convites enviados com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro, tente novamente!',
      });
      throw new Error(err);
    }
  }, [eventGuests, eventTrimmedName, eventName, addToast]);

  return (
    <>
      {wpGuestInvitationWindow && (
        <EventInvitationWindow
          handleCloseWindow={() => setWpGuestInvitationWindow(false)}
          handleGetGuests={handleGetGuests}
          onHandleCloseWindow={() => setWpGuestInvitationWindow(false)}
          wpGuests={wpGuests}
        />
      )}
      {!!friendsWindow && (
        <FriendsListWindow
          selectedFriend={selectedFriend}
          friends={friends}
          onHandleCloseWindow={() => setFriendsWindow(false)}
          handleSelectedFriend={(friend: IFriendDTO) =>
            handleSelectFriend(friend)
          }
        />
      )}
      {!!wpGuestQuestionWindow && (
        <BooleanQuestionWindow
          selectBooleanOption={handleWeplanUserQuestion}
          onHandleCloseWindow={() => setWpGuestQuestionWindow(false)}
          question="É usuário WePlan?"
        />
      )}
      {!!addGuestWindow && (
        <AddGuestWindow
          weplanUser={weplanUser}
          guestConfirmed={guestConfirmed}
          openWPGuestQuestionWindow={() => setWpGuestQuestionWindow(true)}
          handleAddGuestListWindow={handleAddGuestListWindow}
          handleGuestConfirmedWindow={handleGuestConfirmationWindow}
          eventId={eventId}
          handleCloseWindow={closeAddGuestWindow}
          handleGetGuests={handleGetGuests}
          handleGuestAllocationWindow={handleGuestAllocationWindow}
          isOwner={isOwner}
          myAvailableNumberOfGuests={myAvailableNumberOfGuests}
          selectedFriend={selectedFriend}
        />
      )}
      {!!addGuestListWindow && (
        <AddEventGuestListWindow
          handleCloseWindow={handleCloseAddGuestListWindow}
          eventId={eventId}
          myAvailableNumberOfGuests={myAvailableNumberOfGuests}
          onHandleCloseWindow={() => setAddGuestListWindow(false)}
        />
      )}
      {editGuestWindow && (
        <EditGuestWindow
          eventId={eventId}
          eventName={eventName}
          eventTrimmedName={eventTrimmedName}
          eventGuest={selectedGuest}
          handleCloseWindow={handleEditGuestWindow}
          handleGetGuests={handleGetGuests}
          onHandleCloseWindow={() => setEditGuestWindow(false)}
        />
      )}
      {!!guestConfirmationWindow && (
        <BooleanQuestionWindow
          selectBooleanOption={handleIsGuestConfirmed}
          onHandleCloseWindow={() => setGuestConfirmationWindow(false)}
          question="O convidado está confirmado?"
        />
      )}
      <Container>
        <span>
          <GuestAllocationButton
            onClick={() => setWpGuestInvitationWindow(true)}
            type="button"
          >
            Convidar WP Users
          </GuestAllocationButton>
          {isOwner && (
            <GuestAllocationButton
              type="button"
              onClick={handleGuestAllocationWindow}
            >
              Alocação de Convidados
            </GuestAllocationButton>
          )}
        </span>
        <span>
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

          <span>
            <button type="button" onClick={sendMassEmailInvitations}>
              Convite Virtual
              <MdMail size={30} />
            </button>
            <button type="button" onClick={handleAddGuestWindow}>
              Adicionar Convidado
              <MdPersonAdd size={30} />
            </button>
          </span>
        </span>

        {!guestWindow && (
          <h3>
            {myGuestsConfirmed}/{myGuests.length}
          </h3>
        )}

        {guestWindow && (
          <h3>
            {confirmedGuests}/{eventGuests.length}
          </h3>
        )}

        <div>
          {guestWindow &&
            eventGuests.map(eGuest => {
              guestCount += 1;

              return (
                <Guest key={eGuest.id}>
                  <span>
                    <p>{guestCount}</p>
                    {eGuest.host.name === user.name ? (
                      <button
                        type="button"
                        onClick={() => handleEditGuestWindow(eGuest)}
                      >
                        <strong>{eGuest.first_name}</strong> {eGuest.last_name}
                        <FiEdit3 size={16} />
                      </button>
                    ) : (
                      <NotHostGuest title={notHostMessage}>
                        <strong>{eGuest.first_name}</strong> {eGuest.last_name}
                      </NotHostGuest>
                    )}
                  </span>

                  {eGuest.weplanUser && (
                    <button type="button">
                      <FiUser size={24} />
                    </button>
                  )}

                  {eGuest.host.name === user.name ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => handleEditConfirmedGuest(eGuest)}
                      >
                        {eGuest.confirmed ? (
                          <FiCheckSquare size={24} />
                        ) : (
                          <FiSquare size={24} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <NotHostGuest title={notHostMessage}>
                        {eGuest.confirmed ? (
                          <FiCheckSquare size={24} />
                        ) : (
                          <FiSquare size={24} />
                        )}
                      </NotHostGuest>
                    </div>
                  )}
                </Guest>
              );
            })}

          {!guestWindow &&
            myGuests.map(mGuest => {
              myGuestCount += 1;
              return (
                <Guest key={mGuest.id}>
                  <span>
                    <p>{myGuestCount}</p>
                    <button
                      type="button"
                      onClick={() => handleEditGuestWindow(mGuest)}
                    >
                      <strong>{mGuest.first_name}</strong> {mGuest.last_name}
                      <FiEdit3 size={16} />
                    </button>
                  </span>
                  {mGuest.weplanUser && (
                    <button type="button">
                      <FiUser size={24} />
                    </button>
                  )}
                  <div>
                    <button
                      key={mGuest.id}
                      type="button"
                      onClick={() => handleEditConfirmedGuest(mGuest)}
                    >
                      {mGuest.confirmed ? (
                        <FiCheckSquare size={24} />
                      ) : (
                        <FiSquare size={24} />
                      )}
                    </button>
                  </div>
                </Guest>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default EventGuestSection;
