import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiCheckSquare, FiEdit3, FiSquare, FiUser } from 'react-icons/fi';

import { Form } from '@unform/web';
import { MdGroupAdd, MdPersonAdd } from 'react-icons/md';
import IListEventDTO from '../../dtos/IListEventDTO';

import AddEventGuestListWindow from '../AddEventGuestListWindow';

import {
  Container,
  AddGuestDrawer,
  GuestConfirmedDrawer,
  AddMultipleGuests,
  NotHostGuest,
  Guest,
  BooleanNavigationButton,
} from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import WindowContainer from '../WindowContainer';
import Input from '../Input';
import { useAuth } from '../../hooks/auth';
import BooleanQuestionWindow from '../BooleanQuestionWindow';
import FriendsListDrawer from '../FriendsListDrawer';
import IFriendDTO from '../../dtos/IFriendDTO';

interface IEventGuest {
  id: string;
  confirmed: boolean;
  host: string;
  first_name: string;
  last_name: string;
  weplanUser: boolean;
  description: string;
}
interface ICreateGuest {
  first_name: string;
  last_name: string;
  description: string;
  confirmed: boolean;
  weplanUser: boolean;
}
interface IProps {
  closeAllWindows: Function;
  handleGetEvent: Function;
  handleGetGuests: Function;
  pageEvent: IListEventDTO;
  myAvailableNumberOfGuests: number;
  eventGuests: IEventGuest[];
  confirmedGuests: number;
  myGuests: IEventGuest[];
  myGuestsConfirmed: number;
  friends: IFriendDTO[];
  selectedFriend: IFriendDTO;
}

const EventGuestSection: React.FC<IProps> = ({
  handleGetEvent,
  handleGetGuests,
  closeAllWindows,
  pageEvent,
  myAvailableNumberOfGuests,
  eventGuests,
  confirmedGuests,
  myGuests,
  myGuestsConfirmed,
  friends,
  selectedFriend,
}: IProps) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [updated_guest, setUpdated_guest] = useState<IEventGuest>(
    {} as IEventGuest,
  );
  const [wpUserName, setWpUserName] = useState('');
  const [wpUserId, setWpUserId] = useState(''); // wpUser é para usuários dos sistema que não seja o próprio usuário
  const [wpUserQuestionDrawer, setWpUserQuestionDrawer] = useState(false);
  const [editGuestDrawer, setEditGuestDrawer] = useState(false);
  const [guestWindow, setGuestWindow] = useState(true);
  const [addGuestDrawer, setAddGuestDrawer] = useState(false);
  const [guestConfirmedDrawer, setGuestConfirmedDrawer] = useState(false);
  const [guestConfirmedMessage, setGuestConfirmedMessage] = useState('');
  const [guestConfirmed, setGuestConfirmed] = useState(false);
  const [weplanUser, setWeplanUser] = useState(false);
  const [addGuestListWindow, setAddGuestListWindow] = useState(false);
  const [friendsWindow, setFriendsWindow] = useState(false);

  const handleGuestWindow = useCallback(props => {
    setGuestWindow(props);
  }, []);
  const handleEditGuestDrawer = useCallback(
    (props: IEventGuest) => {
      closeAllWindows();
      setUpdated_guest(props);
      if (props.weplanUser === true) {
        setWeplanUser(true);
      } else {
        setWeplanUser(false);
      }

      return setEditGuestDrawer(!editGuestDrawer);
    },
    [editGuestDrawer, closeAllWindows],
  );
  const handleWeplanGuestDrawer = useCallback(props => {
    setWpUserQuestionDrawer(props);
  }, []);
  const handleCloseAddGuestListWindow = useCallback(() => {
    closeAllWindows();
    handleGetGuests();
    handleGetEvent();
  }, [closeAllWindows, handleGetEvent, handleGetGuests]);

  const handleAddGuestDrawer = useCallback(() => {
    closeAllWindows();
    setAddGuestDrawer(!addGuestDrawer);
  }, [addGuestDrawer, closeAllWindows]);
  const handleGuestConfirmedDrawer = useCallback(() => {
    setGuestConfirmedDrawer(!guestConfirmedDrawer);
  }, [guestConfirmedDrawer]);
  const handleGuestConfirmedQuestion = useCallback(
    (guest_confirmed: boolean) => {
      if (guest_confirmed === true) {
        setGuestConfirmedMessage('Convidado confirmado!');
        setGuestConfirmed(true);
      } else {
        setGuestConfirmedMessage('');
        setGuestConfirmed(false);
      }
      return handleGuestConfirmedDrawer();
    },
    [handleGuestConfirmedDrawer],
  );
  const handleAddGuest = useCallback(
    async (data: ICreateGuest) => {
      try {
        formRef.current?.setErrors([]);

        if (myAvailableNumberOfGuests <= 0) {
          addToast({
            type: 'error',
            title: 'Erro ao adicionar anfitrião',
            description:
              'Número de convidados excede o limite, tente novamente.',
          });
          throw new Error('Number of guests is higher than allowed!');
        }

        if (weplanUser) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });
          const thisDate = new Date();

          await api.post(`events/${pageEvent.id}/guests`, {
            first_name: `${thisDate}`,
            last_name: `${thisDate}`,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: wpUserId,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post(`events/${pageEvent.id}/guests`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: '0',
          });
        }

        setWpUserId('');
        setGuestConfirmedMessage('');
        setWeplanUser(false);
        setGuestConfirmed(false);
        setWpUserName('');

        handleAddGuestDrawer();
        handleGetGuests();
        handleGetEvent();
        return addToast({
          type: 'success',
          title: 'Convidado criado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        setWpUserId('');
        setGuestConfirmedMessage('');
        setWeplanUser(false);
        setGuestConfirmed(false);
        setWpUserName('');
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
        return addToast({
          type: 'error',
          title: 'Erro ao criar convidado',
          description: 'Erro ao criar o convidado, tente novamente.',
        });
      }
    },
    [
      addToast,
      pageEvent.id,
      handleAddGuestDrawer,
      weplanUser,
      guestConfirmed,
      wpUserId,
      handleGetGuests,
      myAvailableNumberOfGuests,
      handleGetEvent,
    ],
  );
  const handleEditGuest = useCallback(
    async (data: IEventGuest) => {
      try {
        formRef.current?.setErrors([]);

        if (weplanUser) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${pageEvent.id}/guests/${updated_guest.id}`, {
            first_name: updated_guest.first_name,
            last_name: updated_guest.last_name,
            description: data.description,
            confirmed: updated_guest.confirmed,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${pageEvent.id}/guests/${updated_guest.id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            confirmed: updated_guest.confirmed,
          });
        }

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditGuestDrawer(false);
        setWeplanUser(false);
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
    [addToast, pageEvent.id, weplanUser, updated_guest, handleGetGuests],
  );

  const handleDeleteGuest = useCallback(async () => {
    try {
      await api.delete(`/events/guests/${updated_guest.id}`);

      addToast({
        type: 'success',
        title: 'Convidado excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setEditGuestDrawer(false);
      handleGetGuests();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir convidado',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [updated_guest, addToast, handleGetGuests]);
  const handleAddGuestListWindow = useCallback(() => {
    closeAllWindows();
    setAddGuestListWindow(true);
  }, [closeAllWindows]);

  const handleEditConfirmedGuest = useCallback(
    async (props: IEventGuest) => {
      try {
        await api.put(`events/${pageEvent.id}/guests/${props.id}`, {
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
    [addToast, pageEvent.id, handleGetGuests],
  );
  const handleWeplanUserQuestion = useCallback(
    (weplan_user: boolean) => {
      if (weplan_user === true) {
        setWeplanUser(true);
        setWpUserQuestionDrawer(false);
        setFriendsWindow(true);
      } else {
        setWeplanUser(false);
        setWpUserQuestionDrawer(false);
        setWpUserName('');
        setWpUserId('');
      }
      return handleWeplanGuestDrawer(false);
    },
    [handleWeplanGuestDrawer],
  );

  const handleSelectedWeplanUser = useCallback((WPUser: IFriendDTO) => {
    setWpUserName(WPUser.friend.name);
    setWpUserId(WPUser.friend_id);
    setFriendsWindow(false);
  }, []);

  let guestCount = 0;
  let myGuestCount = 0;
  const notHostMessage = 'Você não é o anfitrião deste convidado!';

  return (
    <>
      {!!friendsWindow && (
        <FriendsListDrawer
          selectedFriend={selectedFriend}
          friends={friends}
          onHandleCloseWindow={() => setFriendsWindow(false)}
          handleSelectedFriend={(friend: IFriendDTO) =>
            handleSelectedWeplanUser(friend)
          }
        />
      )}
      {!!wpUserQuestionDrawer && (
        <BooleanQuestionWindow
          handleWeplanUserQuestion={handleWeplanUserQuestion}
          onHandleCloseWindow={() => setWpUserQuestionDrawer(false)}
          question="É usuário WePlan?"
        />
      )}
      {!!addGuestDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddGuestDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '5%',
            left: '20%',
            height: '90%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddGuest}>
            <AddGuestDrawer>
              <h1>Adicionar Convidado</h1>
              <p>
                Você pode adicionar até {myAvailableNumberOfGuests} convidados
              </p>
              <AddMultipleGuests>
                <button type="button" onClick={handleAddGuestListWindow}>
                  Adicionar lista de convidados
                  <MdGroupAdd size={24} />
                </button>
              </AddMultipleGuests>

              {!weplanUser && (
                <>
                  <Input name="first_name" type="text" placeholder="Nome" />
                  <Input name="last_name" type="text" placeholder="Sobrenome" />
                </>
              )}

              <Input name="description" type="text" defaultValue="Descrição" />

              <div>
                {guestConfirmedMessage === '' ? (
                  <button type="button" onClick={handleGuestConfirmedDrawer}>
                    Confirmado?
                  </button>
                ) : (
                  <h1>
                    <button type="button" onClick={handleGuestConfirmedDrawer}>
                      {guestConfirmedMessage}
                    </button>
                  </h1>
                )}
                {wpUserName === '' ? (
                  <button
                    type="button"
                    onClick={() => setWpUserQuestionDrawer(true)}
                  >
                    Convidado Weplan ?
                  </button>
                ) : (
                  <h1>
                    <button
                      type="button"
                      onClick={() => setWpUserQuestionDrawer(true)}
                    >
                      {wpUserName}
                    </button>
                  </h1>
                )}
              </div>

              <button type="submit">
                <h3>Salvar</h3>
              </button>
            </AddGuestDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!addGuestListWindow && (
        <AddEventGuestListWindow
          handleCloseWindow={handleCloseAddGuestListWindow}
          eventId={pageEvent.id}
          myAvailableNumberOfGuests={myAvailableNumberOfGuests}
          onHandleCloseWindow={() => setAddGuestListWindow(false)}
        />
      )}
      {editGuestDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setEditGuestDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '5%',
            left: '20%',
            height: '90%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditGuest}>
            <AddGuestDrawer>
              <h1>Editar Convidado</h1>

              {!updated_guest.weplanUser && (
                <>
                  <Input
                    defaultValue={updated_guest.first_name}
                    name="first_name"
                    type="text"
                    placeholder="Nome"
                  />
                  <Input
                    defaultValue={updated_guest.last_name}
                    name="last_name"
                    type="text"
                    placeholder="Sobrenome"
                  />
                </>
              )}
              <Input
                defaultValue={updated_guest.description}
                name="description"
                type="text"
                placeholder="Alguma descrição necessária?"
              />

              <button type="submit">
                <h3>Salvar</h3>
              </button>

              <button type="button" onClick={handleDeleteGuest}>
                <h3>Deletar</h3>
              </button>
            </AddGuestDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!guestConfirmedDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setGuestConfirmedDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '5%',
            left: '20%',
            height: '90%',
            width: '60%',
          }}
        >
          <GuestConfirmedDrawer>
            <h1>Convidado confirmado?</h1>
            <div>
              <button
                type="button"
                onClick={() => handleGuestConfirmedQuestion(true)}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => handleGuestConfirmedQuestion(false)}
              >
                Não
              </button>
            </div>
          </GuestConfirmedDrawer>
        </WindowContainer>
      )}
      <Container>
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
            <button type="button" onClick={handleAddGuestDrawer}>
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
                    {eGuest.host === user.name ? (
                      <button
                        type="button"
                        onClick={() => handleEditGuestDrawer(eGuest)}
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

                  {eGuest.host === user.name ? (
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
                      onClick={() => handleEditGuestDrawer(mGuest)}
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
