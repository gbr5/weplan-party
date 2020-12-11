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
import {
  Container,
  Content,
  BottomPage,
  BottomSection,
  MiddlePage,
  BooleanNavigationButton,
} from './styles';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';
import IEventDTO from '../../dtos/IEventDTO';
import formatStringToDate from '../../utils/formatDateToString';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import WindowContainer from '../../components/WindowContainer';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';
import IEventMemberDTO from '../../dtos/IEventMemberDTO';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import IShowEventDTO from '../../dtos/IShowEventDTO';
import MyNextEventSection from '../../components/EventComponents/MyNextEventSection';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const [eventsAsOwner, setEventsAsOwner] = useState<IEventOwnerDTO[]>([]);
  const [eventsAsMember, setEventsAsMember] = useState<IEventMemberDTO[]>([]);
  const [eventsAsGuest, setEventsAsGuest] = useState<IEventGuestDTO[]>([]);

  const [myNextEvent, setMyNextEvent] = useState<IShowEventDTO>(
    {} as IShowEventDTO,
  );
  const [eventToDelete, setEventToDelete] = useState('');
  const [thisEvent, setThisEvent] = useState('');
  const [eventOwner, setEventOwner] = useState(true);
  const [deleteEventWindow, setDeleteEventWindow] = useState(false);

  const getMyNextEvent = useCallback(() => {
    try {
      api.get<IShowEventDTO>('/my-next-event').then(response => {
        setMyNextEvent(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getMyNextEvent();
  }, [getMyNextEvent]);

  const handleDeleteMasterEventWindow = useCallback((props: string) => {
    setEventToDelete(props);
    setThisEvent('master');
    setDeleteEventWindow(true);
  }, []);

  const handleDeleteOwnerEventWindow = useCallback((props: IEventOwnerDTO) => {
    setEventToDelete(props.event.id);
    setThisEvent('owner');
    setDeleteEventWindow(true);
  }, []);
  const handleDeleteMemberEventWindow = useCallback(
    (props: IEventMemberDTO) => {
      setEventToDelete(props.event.id);
      setThisEvent('member');
      setDeleteEventWindow(true);
    },
    [],
  );
  const handleDeleteGuestEventWindow = useCallback((props: string) => {
    setEventToDelete(props);
    setThisEvent('guest');
    setDeleteEventWindow(true);
  }, []);

  const handleMyEventDashboard = useCallback(
    (event: IEventDTO) => {
      history.push(`/dashboard/my-event/${event.trimmed_name}`, {
        params: event,
      });
    },
    [history],
  );

  const getEventsAsOwner = useCallback(() => {
    try {
      api.get<IEventOwnerDTO[]>('list/events/user-as-owner/').then(response => {
        setEventsAsOwner(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const getEventsAsMember = useCallback(() => {
    try {
      api
        .get<IEventMemberDTO[]>('list/events/user-as-member/')
        .then(response => {
          setEventsAsMember(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const getEventsAsGuest = useCallback(() => {
    try {
      api
        .get<IEventGuestDTO[]>(`/event/weplan-guests/user/${user.id}`)
        .then(response => {
          setEventsAsGuest(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

  const getMyEvents = useCallback(() => {
    getMyNextEvent();
    getEventsAsMember();
    getEventsAsOwner();
    getEventsAsGuest();
  }, [getEventsAsMember, getMyNextEvent, getEventsAsOwner, getEventsAsGuest]);

  useEffect(() => {
    getMyEvents();
  }, [getMyEvents]);

  const handleDeleteEvent = useCallback(
    async props => {
      try {
        if (thisEvent === 'master') {
          await api.delete(`/events/${props}`);
        }
        if (thisEvent === 'owner') {
          await api.delete(`/events/${props}/event-owners/${user.id}`);
        }
        if (thisEvent === 'member') {
          await api.delete(`/events/${props}/event-members/${user.id}`);
        }
        if (thisEvent === 'guest') {
          await api.delete(`/events/guests/${props}`);
        }

        getMyEvents();
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
    [addToast, getMyEvents, thisEvent, user],
  );

  const handleEventOwnerOrMember = useCallback(props => {
    setEventOwner(props);
  }, []);

  const handleEditConfirmedGuest = useCallback(
    async (props: IEventGuestDTO) => {
      try {
        await api.put(`events/weplan-user-guest/${props.id}`);

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
        getEventsAsGuest();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, getEventsAsGuest],
  );

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
            zIndex: 40,
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
          <MyNextEventSection
            nextEvent={myNextEvent}
            handleMyEventDashboard={handleMyEventDashboard}
          />

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
                            onClick={() => handleMyEventDashboard(event.event)}
                          >
                            <h3>{event.event.name}</h3>
                          </button>
                          {event.event.user_id === user.id && (
                            <FiStar size={16} />
                          )}

                          <div>
                            <span>
                              {formatStringToDate(String(event.event.date))}
                            </span>
                            <span>
                              {event.event.user_id === user.id ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteMasterEventWindow(
                                      event.event.id,
                                    )
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
                              onClick={() =>
                                handleMyEventDashboard(event.event)
                              }
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
                            onClick={() => handleMyEventDashboard(event.event)}
                          >
                            <h3>{event.userEventMember.name}</h3>
                          </button>
                          <div>
                            <span>
                              {formatStringToDate(String(event.event.date))}
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
                              onClick={() =>
                                handleMyEventDashboard(event.event)
                              }
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
                {eventsAsGuest.map(event => (
                  <li key={event.id}>
                    <button type="button">
                      <h3>{event.weplanGuest.event.name}</h3>
                    </button>
                    <div>
                      <span>
                        {formatStringToDate(
                          String(event.weplanGuest.event.date),
                        )}
                      </span>
                      <span>
                        <button
                          type="button"
                          onClick={() => handleDeleteGuestEventWindow(event.id)}
                        >
                          <FiSettings size={20} />
                        </button>
                      </span>
                      <p>Confirmado: </p>
                      <button
                        type="button"
                        onClick={() => handleEditConfirmedGuest(event)}
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
