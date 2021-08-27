import React, { useState, useEffect, useCallback } from 'react';
import 'react-day-picker/lib/style.css';

import { FiSettings, FiStar } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Content,
  BottomPage,
  BottomSection,
  MiddlePage,
  BooleanNavigationButton,
  DateSection,
} from './styles';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';
import IEventDTO from '../../dtos/IEventDTO';
import formatStringToDate from '../../utils/formatDateToString';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import MyNextEventSection from '../../components/EventComponents/MyNextEventSection';
import IPersonInfoDTO from '../../dtos/IPersonInfoDTO';
import CreatePersonInfoWindowForm from '../../components/CreatePersonInfoWindowForm';
import FriendsEventsSection from '../../components/MainDashboardBottomSection/FriendsEventsSection';
import GuestToUserMessageWindow from '../../components/GuestToUserMessageWindow';
import DeleteEventQuestionWindow from './DeleteEventQuestionWindow';
import { useEvent } from '../../hooks/event';
import { useCurrentEvent } from '../../hooks/currentEvent';

const Dashboard: React.FC = () => {
  const { user, handleSignOut } = useAuth();
  const {
    eventsAsGuest,
    eventsAsMember,
    eventsAsOwner,
    getEventsAsOwner,
    getEventsAsMember,
    getEventsAsGuest,
  } = useEvent();
  const { handleSelectedEvent } = useCurrentEvent();
  const { addToast } = useToast();
  const history = useHistory();

  const [createPersonInfoWindow, setCreatePersonInfoWindow] = useState(false);
  const [guestToUserMessageWindow, setGuestToUserMessageWindow] = useState(
    false,
  );
  const [selectedEventAsGuest, setSelectedEventAsGuest] = useState(
    {} as IEventGuestDTO,
  );
  const [personInfo, setPersonInfo] = useState<IPersonInfoDTO>(
    {} as IPersonInfoDTO,
  );

  const [eventToDelete, setEventToDelete] = useState('');
  const [thisEvent, setThisEvent] = useState('');
  const [eventOwner, setEventOwner] = useState(true);
  const [deleteEventWindow, setDeleteEventWindow] = useState(false);

  const closeCreatePersonInfoWindow = useCallback(() => {
    setCreatePersonInfoWindow(false);
    handleSignOut();
  }, [handleSignOut]);

  const getPersonInfo = useCallback(() => {
    try {
      api.get<IPersonInfoDTO>(`person-info/${user.id}`).then(response => {
        setPersonInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);
  useEffect(() => {
    getPersonInfo();
  }, [getPersonInfo]);

  useEffect(() => {
    if (personInfo.first_name) {
      setCreatePersonInfoWindow(false);
    } else {
      setCreatePersonInfoWindow(true);
    }
  }, [personInfo]);

  const handleDeleteMasterEventWindow = useCallback((props: string) => {
    setEventToDelete(props);
    setThisEvent('master');
    setDeleteEventWindow(true);
  }, []);

  const handleDeleteOwnerEventWindow = useCallback((props: string) => {
    setEventToDelete(props);
    setThisEvent('owner');
    setDeleteEventWindow(true);
  }, []);
  const handleDeleteMemberEventWindow = useCallback((props: string) => {
    setEventToDelete(props);
    setThisEvent('member');
    setDeleteEventWindow(true);
  }, []);
  const handleDeleteGuestEventWindow = useCallback((props: string) => {
    setEventToDelete(props);
    setThisEvent('guest');
    setDeleteEventWindow(true);
  }, []);

  const handleMyEventDashboard = useCallback(
    (event: IEventDTO) => {
      handleSelectedEvent(event);
      history.push(`/dashboard/my-event/${event.trimmed_name}`, {
        params: event,
      });
    },
    [history, handleSelectedEvent],
  );

  const handleSelectedEventAsGuest = useCallback((props: IEventGuestDTO) => {
    setSelectedEventAsGuest(props);
    setGuestToUserMessageWindow(true);
  }, []);

  useEffect(() => {
    getEventsAsMember();
  }, [getEventsAsMember]);
  useEffect(() => {
    getEventsAsOwner();
  }, [getEventsAsOwner]);
  useEffect(() => {
    getEventsAsGuest();
  }, [getEventsAsGuest]);

  const handleDeleteEvent = useCallback(
    async props => {
      try {
        if (thisEvent === 'master') {
          await api.delete(`/events/${props}`);
          getEventsAsOwner();
        }
        if (thisEvent === 'guest') {
          await api.delete(`/events/guests/${props}`);
          getEventsAsGuest();
        }

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
    [addToast, getEventsAsGuest, getEventsAsOwner, thisEvent],
  );

  const handleEventOwnerOrMember = useCallback(props => {
    setEventOwner(props);
  }, []);

  const handleDeleteEventQuestion = useCallback(
    (e: string) => {
      if (e === 'false') {
        setDeleteEventWindow(false);
      } else {
        handleDeleteEvent(e);
      }
    },
    [handleDeleteEvent],
  );

  return (
    <Container>
      <PageHeader />
      {!!createPersonInfoWindow && (
        <CreatePersonInfoWindowForm
          getPersonInfo={getPersonInfo}
          handleCloseWindow={closeCreatePersonInfoWindow}
        />
      )}
      {guestToUserMessageWindow && (
        <GuestToUserMessageWindow
          getEventsAsGuest={getEventsAsGuest}
          eventGuest={selectedEventAsGuest}
          onHandleCloseWindow={() => setGuestToUserMessageWindow(false)}
        />
      )}
      {!!deleteEventWindow && (
        <DeleteEventQuestionWindow
          closeWindow={() => setDeleteEventWindow(false)}
          question="Tem certeza de que deseja deletar o evento?"
          deleteEvent={() => handleDeleteEventQuestion(eventToDelete)}
        />
      )}
      <Content>
        <MiddlePage>
          <MyNextEventSection handleMyEventDashboard={handleMyEventDashboard} />
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
                            <DateSection>
                              {formatStringToDate(String(event.event.date))}
                            </DateSection>
                            <span>
                              {event.event.user_id === user.id ? (
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
                                    handleDeleteOwnerEventWindow(event.event.id)
                                  }
                                >
                                  <FiSettings size={20} />
                                </button>
                              )}
                            </span>
                            {/* <button
                              type="button"
                              onClick={() =>
                                handleMyEventDashboard(event.event)
                              }
                            >
                              <FiChevronRight size={24} />
                            </button> */}
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
                            <h3>{event.event.name}</h3>
                          </button>
                          <div>
                            <DateSection>
                              {formatStringToDate(String(event.event.date))}
                            </DateSection>
                            <span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteMemberEventWindow(event.event.id)
                                }
                              >
                                <FiSettings size={20} />
                              </button>
                            </span>
                            {/* <button
                              type="button"
                              onClick={() =>
                                handleMyEventDashboard(event.event)
                              }
                            >
                              <FiChevronRight size={24} />
                            </button> */}
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
                    <FriendsEventsSection
                      selectEventGuest={(e: IEventGuestDTO) =>
                        handleSelectedEventAsGuest(e)
                      }
                      deleteEvent={handleDeleteGuestEventWindow}
                      eventAsGuest={event}
                    />
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
