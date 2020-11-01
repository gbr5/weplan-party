import React, { useState, useEffect, useCallback } from 'react';
import 'react-day-picker/lib/style.css';

import {
  FiCheckSquare,
  FiChevronRight,
  FiSettings,
  FiSquare,
  FiStar,
} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { isAfter } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns/esm';
import {
  Container,
  Content,
  BottomPage,
  BottomSection,
  MyNextEvent,
  MyNextEventTitle,
  Section,
  Fields,
  MiddlePage,
  BooleanNavigationButton,
} from './styles';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';
import IListEventDTO from '../../dtos/IListEventDTO';
import formatStringToDate from '../../utils/formatDateToString';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import WindowContainer from '../../components/WindowContainer';

interface IFriendsEvents {
  id: string;
  guest_id: string;
  event_name: string;
  host: string;
  date: Date;
  confirmed: boolean;
}

interface INextFriendsEvent {
  guest_id: string;
  event_name: string;
  host: string;
  date: string;
  daysTillDate: number;
  confirmed: boolean;
}

interface IEventCheckList {
  id: string;
  checked: boolean;
}

interface IEventGuest {
  id: string;
  confirmed: boolean;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const [eventsAsOwner, setEventsAsOwner] = useState<IListEventDTO[]>([]);
  const [eventsAsMember, setEventsAsMember] = useState<IListEventDTO[]>([]);
  const [eventsAsGuest, setEventsAsGuest] = useState<IListEventDTO[]>([]);
  eventsAsGuest === [] && console.log(eventsAsGuest);
  const [myFriendsEvents, setMyFriendsEvents] = useState<IFriendsEvents[]>([]);
  // const [myFriendEvent, setMyFriendEvent] = useState<IFriendsEvents>(
  //   {} as IFriendsEvents,
  // );

  const [myNextEvent, setMyNextEvent] = useState<IListEventDTO>(
    {} as IListEventDTO,
  );
  const [eventToDelete, setEventToDelete] = useState('');
  const [userEventToDelete, setUserEventToDelete] = useState('');
  const [thisEvent, setThisEvent] = useState('');
  const [myNextEventCheckList, setMyNextEventCheckList] = useState(0);
  const [resolvedCheckList, setResolvedCheckList] = useState(0);
  const [myNextEventGuests, setMyNextEventGuests] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [eventOwner, setEventOwner] = useState(true);
  const [deleteEventWindow, setDeleteEventWindow] = useState(false);

  const handleDeleteMasterEventWindow = useCallback((props: string) => {
    setEventToDelete(props);
    setThisEvent('master');
    setDeleteEventWindow(true);
  }, []);
  const handleDeleteOwnerEventWindow = useCallback((props: IListEventDTO) => {
    setEventToDelete(props.id);
    setUserEventToDelete(props.userEvent_id ? props.userEvent_id : '');
    setThisEvent('owner');
    setDeleteEventWindow(true);
  }, []);
  const handleDeleteMemberEventWindow = useCallback((props: IListEventDTO) => {
    setEventToDelete(props.id);
    setUserEventToDelete(props.userEvent_id ? props.userEvent_id : '');
    setThisEvent('member');
    setDeleteEventWindow(true);
  }, []);
  const handleDeleteGuestEventWindow = useCallback((props: string) => {
    setEventToDelete(props);
    setThisEvent('guest');
    setDeleteEventWindow(true);
  }, []);

  const handleMyEventDashboard = useCallback(
    (event: IListEventDTO) => {
      history.push(`/dashboard/my-event/${event.trimmed_name}`, {
        params: event,
      });
    },
    [history],
  );

  const getMyNextEventCheckList = useCallback(() => {
    try {
      api
        .get<IEventCheckList[]>(`/events/${myNextEvent.id}/check-list`)
        .then(response => {
          setMyNextEventCheckList(response.data.length);
          setResolvedCheckList(
            response.data.filter(checkList => checkList.checked === true)
              .length,
          );
        });
    } catch (err) {
      throw new Error('host dashboard, rota checklist para o backend');
    }
  }, [myNextEvent]);

  const getMyNextEventGuests = useCallback(() => {
    try {
      api
        .get<IEventGuest[]>(`/events/${myNextEvent.id}/guests`)
        .then(response => {
          setMyNextEventGuests(response.data.length);
          setConfirmedGuests(
            response.data.filter(guest => guest.confirmed === true).length,
          );
        });
    } catch (err) {
      throw new Error('host dashboard, rota guests para o backend');
    }
  }, [myNextEvent]);

  const getMyEvents = useCallback(() => {
    try {
      api.get<IListEventDTO[]>('/events').then(response => {
        setEventsAsOwner(response.data.filter(event => event.isOwner === true));
        setEventsAsMember(
          response.data.filter(
            event => event.isOwner === false && event.isGuest === false,
          ),
        );
        setEventsAsGuest(response.data.filter(event => event.isGuest === true));
        const nextEvent = response.data.find(myEvent => {
          const nEvent = myEvent.isOwner
            ? isAfter(new Date(myEvent.date), new Date())
            : '';
          return nEvent;
        });

        if (nextEvent) {
          const date = new Date(nextEvent.date);
          const year = date.getFullYear();
          const month =
            date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
          const day =
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
          const hour =
            date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
          const minute =
            date.getMinutes() < 10
              ? `0${date.getMinutes()}`
              : date.getMinutes();

          setMyNextEvent({
            id: nextEvent.id,
            name: nextEvent.name,
            trimmed_name: nextEvent.trimmed_name,
            date: `${hour}:${minute} - ${day}/${month}/${year}`,
            daysTillDate: differenceInCalendarDays(date, new Date()),
            number_of_guests: nextEvent.number_of_guests,
            userEvent_id: nextEvent.userEvent_id,
            event_type: nextEvent.event_type,
            isGuest: nextEvent.isGuest,
            isOwner: nextEvent.isOwner,
            owner_master: nextEvent.owner_master,
          });
        }
      });
    } catch (err) {
      throw Error(err);
    }
  }, []);

  const handleGetMyFriendsEvents = useCallback(() => {
    try {
      api.get<IFriendsEvents[]>('/friends-events').then(response => {
        setMyFriendsEvents(response.data);
      });
    } catch (err) {
      throw Error(err);
    }
  }, []);

  const handleDeleteEvent = useCallback(
    async props => {
      try {
        if (thisEvent === 'master') {
          await api.delete(`/events/${props}`);
        }
        if (thisEvent === 'owner') {
          await api.delete(
            `/events/${props}/event-owners/${userEventToDelete}`,
          );
        }
        if (thisEvent === 'member') {
          await api.delete(
            `/events/${props}/event-members/${userEventToDelete}`,
          );
        }
        if (thisEvent === 'guest') {
          await api.delete(`/events/guests/${props}`);
        }

        getMyEvents();
        handleGetMyFriendsEvents();
        setDeleteEventWindow(false);
        addToast({
          type: 'success',
          title: 'Evento Deletado com sucesso',
          description:
            'Você já pode visualizar as alterações no seu dashboard.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível deletar seu evento',
          description: 'Tente novamente.',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      getMyEvents,
      thisEvent,
      userEventToDelete,
      handleGetMyFriendsEvents,
    ],
  );

  const handleEventOwnerOrMember = useCallback(props => {
    setEventOwner(props);
  }, []);

  const handleEditConfirmedGuest = useCallback(
    async (props: IEventGuest) => {
      try {
        await api.put(`events/weplan-user-guest/${props.id}`, {
          confirmed: !props.confirmed,
        });

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
        handleGetMyFriendsEvents();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, handleGetMyFriendsEvents],
  );

  useEffect(() => {
    getMyEvents();
  }, [getMyEvents]);

  useEffect(() => {
    getMyNextEventGuests();
  }, [getMyNextEventGuests]);

  useEffect(() => {
    getMyNextEventCheckList();
  }, [getMyNextEventCheckList]);

  useEffect(() => {
    handleGetMyFriendsEvents();
  }, [handleGetMyFriendsEvents]);

  return (
    <Container>
      <PageHeader />
      {!!deleteEventWindow && (
        <WindowContainer
          containerStyle={{
            top: '25%',
            left: '35%',
            height: '25%',
            width: '30%',
            zIndex: 1000000,
          }}
          onHandleCloseWindow={() => setDeleteEventWindow(false)}
        >
          <h1>Tem certeza de que deseja deletar o evento?</h1>
          <div>
            <button type="button" onClick={() => setDeleteEventWindow(false)}>
              Não
            </button>
            <button
              type="button"
              onClick={() => handleDeleteEvent(eventToDelete)}
            >
              Sim
            </button>
          </div>
        </WindowContainer>
      )}
      <Content>
        <MiddlePage>
          <MyNextEvent>
            {myNextEvent ? (
              <button
                type="button"
                onClick={() => handleMyEventDashboard(myNextEvent)}
              >
                <MyNextEventTitle>
                  <strong>Meu próximo evento:</strong>
                  <h2>{myNextEvent.name}</h2>
                  <span>{myNextEvent.date}</span>
                </MyNextEventTitle>

                <Section>
                  <Fields>
                    <img
                      src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt=""
                    />
                  </Fields>

                  <Fields>
                    <p>Convidados:</p>
                    <h2>
                      {confirmedGuests}/{myNextEventGuests}
                    </h2>
                  </Fields>

                  <Fields>
                    <p>Check-list:</p>
                    <h2>
                      {resolvedCheckList}/{myNextEventCheckList}
                    </h2>
                  </Fields>

                  <Fields>
                    <p>Orçamento:</p>
                    <h2>63%</h2>
                  </Fields>
                  <Fields>
                    <p>Faltam</p>
                    <h2>{myNextEvent.daysTillDate} dias</h2>
                  </Fields>
                </Section>
              </button>
            ) : (
              <>
                <strong>Meu próximo evento:</strong>
                <h2>Você não tem nenhum evento futuro.</h2>
                <span>-</span>
              </>
            )}
          </MyNextEvent>

          <BottomPage>
            <BottomSection>
              <div>
                <strong>Minhas Festas</strong>
                <div>
                  <BooleanNavigationButton
                    booleanActiveButton={eventOwner}
                    type="button"
                    onClick={() => handleEventOwnerOrMember(true)}
                  >
                    Anfitrião
                  </BooleanNavigationButton>
                  <BooleanNavigationButton
                    booleanActiveButton={!eventOwner}
                    type="button"
                    onClick={() => handleEventOwnerOrMember(false)}
                  >
                    Membro
                  </BooleanNavigationButton>
                </div>
              </div>

              <ul>
                {eventOwner
                  ? eventsAsOwner.map(event => {
                      return (
                        <li key={event.id}>
                          <button
                            type="button"
                            onClick={() => handleMyEventDashboard(event)}
                          >
                            <h3>{event.name}</h3>
                          </button>
                          {event.owner_master === user.id && (
                            <FiStar size={16} />
                          )}

                          <div>
                            <span>
                              {formatStringToDate(String(event.date))}
                            </span>
                            <span>
                              {event.owner_master === user.id ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteMasterEventWindow(event.id)
                                  }
                                >
                                  <FiSettings size={20} />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteOwnerEventWindow(event)
                                  }
                                >
                                  <FiSettings size={20} />
                                </button>
                              )}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleMyEventDashboard(event)}
                            >
                              <FiChevronRight size={24} />
                            </button>
                          </div>
                        </li>
                      );
                    })
                  : eventsAsMember.map(event => {
                      return (
                        <li key={event.id}>
                          <button
                            type="button"
                            onClick={() => handleMyEventDashboard(event)}
                          >
                            <h3>{event.name}</h3>
                          </button>
                          <div>
                            <span>
                              {formatStringToDate(String(event.date))}
                            </span>
                            <span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteMemberEventWindow(event)
                                }
                              >
                                <FiSettings size={20} />
                              </button>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleMyEventDashboard(event)}
                            >
                              <FiChevronRight size={24} />
                            </button>
                          </div>
                        </li>
                      );
                    })}
              </ul>
            </BottomSection>

            <BottomSection>
              <div>
                <strong>Festas de Amigos</strong>
              </div>
              <ul>
                {myFriendsEvents.map(event => (
                  <li key={event.event_name}>
                    <button type="button">
                      <h3>{event.event_name}</h3>
                    </button>
                    <div>
                      <span>{formatStringToDate(String(event.date))}</span>
                      <span>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteGuestEventWindow(event.guest_id)
                          }
                        >
                          <FiSettings size={20} />
                        </button>
                      </span>
                      <p>Confirmado: </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleEditConfirmedGuest({
                            id: event.guest_id,
                            confirmed: event.confirmed,
                          })
                        }
                      >
                        {event.confirmed ? (
                          <FiCheckSquare size={24} />
                        ) : (
                          <FiSquare size={24} />
                        )}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </BottomSection>
          </BottomPage>
        </MiddlePage>
      </Content>
    </Container>
  );
};

export default Dashboard;
