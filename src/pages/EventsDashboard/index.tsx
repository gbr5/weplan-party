import React, { useState, useCallback, useEffect } from 'react';

import 'react-day-picker/lib/style.css';

import { FiChevronDown } from 'react-icons/fi';
import { MdSearch } from 'react-icons/md';

import { useHistory } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import { Container, Content, MyEvents, FriendsEvents, Event } from './styles';

import PageHeader from '../../components/PageHeader';
import IListEventDTO from '../../dtos/IListEventDTO';
import api from '../../services/api';
import formatStringToDate from '../../utils/formatDateToString';
// import { useAuth } from '../../hooks/auth';
import EventCard from '../../components/EventCard';

const EventsDashboard: React.FC = () => {
  const history = useHistory();
  // const { user } = useAuth();

  const [myEventsSection, setMyEventsSection] = useState(true);
  const [friendsEventsSection, setFriendsEventsSection] = useState(false);
  const [ownerWindow, setOwnerWindow] = useState(true);
  // const [eventOwnerCount, setEventOwnerCount] = useState(0);
  // const [eventMemberCount, setEventMemberCount] = useState(0);
  // const [eventGuestCount, setEventGuestCount] = useState(0);

  // const [allEvents, setAllEvents] = useState<IListEventDTO[]>([]);
  // const [eventsAsMember, setEventsAsMember] = useState<IListEventDTO[]>([]);
  // const [eventsAsOwner, setEventsAsOwner] = useState<IListEventDTO[]>([]);
  // const [eventsAsGuest, setEventsAsGuest] = useState<IListEventDTO[]>([]);
  const allEvents = [] as IListEventDTO[];
  const eventsAsOwner = [] as IListEventDTO[];
  const eventsAsMember = [] as IListEventDTO[];
  const eventsAsGuest = [] as IListEventDTO[];

  const handleMyEventsSection = useCallback(() => {
    setMyEventsSection(true);
    setFriendsEventsSection(false);
  }, []);

  const handleFriendsEventsSection = useCallback(() => {
    setMyEventsSection(false);
    setFriendsEventsSection(true);
  }, []);

  const handleNavigateToMyEventDashboard = useCallback(() => {
    history.push('/dashboard/meu-event');
  }, [history]);

  const handleNavigateToFriendEventDashboard = useCallback(() => {
    history.push('/friends/event');
  }, [history]);

  const handleEventOwnerWindow = useCallback(props => {
    setOwnerWindow(props);
  }, []);

  const getAllEvents = useCallback(() => {
    try {
      api.get<IListEventDTO[]>('/events').then(response => {
        const events = response.data.filter(event => event.id !== undefined);
        events.map(aEvent => {
          aEvent.isOwner && eventsAsOwner.push(aEvent);
          !aEvent.isOwner && !aEvent.isGuest && eventsAsMember.push(aEvent);
          aEvent.isGuest && eventsAsGuest.push(aEvent);
          allEvents.push({
            id: aEvent.id,
            name: aEvent.name,
            trimmed_name: aEvent.trimmed_name,
            date: aEvent.date,
            isOwner: aEvent.isOwner,
            isGuest: aEvent.isGuest,
            owner_master: aEvent.owner_master,
            event_type: aEvent.event_type,
            daysTillDate: differenceInCalendarDays(
              new Date(aEvent.date),
              new Date(),
            ),
          });
          return '';
        });
        // setAllEvents(events);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [allEvents, eventsAsMember, eventsAsGuest, eventsAsOwner]);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  // const eventsAsOwners = useMemo(() => {
  //   const ventsAsOwner = allEvents.filter(event => event.isOwner === true);
  //   allEvents.map(event => {
  //     if (event.isOwner === true) {
  //       eventsAsOwner.push(event);
  //       return event;
  //     }
  //     return event;
  //   });
  //   return ventsAsOwner;
  // }, [allEvents, eventsAsOwner]);

  return (
    <Container>
      <PageHeader />
      <Content>
        <span>
          <button type="button" onClick={handleMyEventsSection}>
            <h1>MEUS</h1>
          </button>
          <button type="button" onClick={handleFriendsEventsSection}>
            <h1>AMIGOS</h1>
          </button>

          <span>
            <input type="text" />
            <button type="button">
              <MdSearch size={30} />
            </button>
          </span>

          <div>
            <h3>Tipo de evento:</h3>
            <p>Todos</p>
            <FiChevronDown size={24} />
          </div>
        </span>
        {!!myEventsSection && (
          <>
            <span>
              <button
                type="button"
                onClick={() => handleEventOwnerWindow(true)}
              >
                <h1>Anfitrião</h1>
              </button>
              <button
                type="button"
                onClick={() => handleEventOwnerWindow(false)}
              >
                <h1>Membro</h1>
              </button>
            </span>
            {ownerWindow ? (
              <MyEvents>
                {eventsAsOwner.map(eventAsOwner => (
                  <EventCard
                    event={eventAsOwner}
                    // refreshEvents={getAllEvents}
                  />
                  //   <img
                  //     src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  //     alt=""
                  //   />
                  //   <div>
                  //     <p>{formatStringToDate(String(eventAsOwner.date))}</p>
                  //   </div>
                  //   <h1>{eventAsOwner.name}</h1>
                  //   {eventAsOwner.owner_master === user.id && (
                  //     <>
                  //       <MdSettings size={30} />
                  //       <p>Anfitrião Master</p>
                  //     </>
                  //   )}
                  //   <span>
                  //     <span>
                  //       <p>cidade</p>
                  //       <p>endereço</p>
                  //     </span>
                  //     <span>
                  //       <p>Traje</p>
                  //       <p>Tipo de evento</p>
                  //     </span>
                  //   </span>
                  // </Event>
                ))}
              </MyEvents>
            ) : (
              <MyEvents>
                {eventsAsMember.map(eventAsMember => (
                  <Event
                    key={eventAsMember.id}
                    type="button"
                    onClick={handleNavigateToMyEventDashboard}
                  >
                    {/* <p>{eventMemberCount}°</p> */}
                    <img
                      src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                      alt=""
                    />
                    <div>
                      <p>{formatStringToDate(String(eventAsMember.date))}</p>
                    </div>
                    <h1>{eventAsMember.name}</h1>
                    <span>
                      <span>
                        <p>cidade</p>
                        <p>endereço</p>
                      </span>
                      <span>
                        <p>Traje</p>
                        <p>Tipo de evento</p>
                      </span>
                    </span>
                  </Event>
                ))}
              </MyEvents>
            )}
          </>
        )}
        {!!friendsEventsSection && (
          <FriendsEvents>
            {eventsAsGuest.map(eventAsGuest => (
              <Event
                key={eventAsGuest.id}
                type="button"
                onClick={handleNavigateToFriendEventDashboard}
              >
                {/* <p>{eventGuestCount}°</p> */}
                <img
                  src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <div>
                  <p>{formatStringToDate(String(eventAsGuest.date))}</p>
                </div>
                <h1>{eventAsGuest.name}</h1>
                <h3>Descrição</h3>
                <span>
                  <span>
                    <p>cidade</p>
                    <p>endereço</p>
                  </span>
                  <span>
                    <p>Traje</p>
                    <p>Tipo de evento</p>
                  </span>
                </span>
              </Event>
            ))}
          </FriendsEvents>
        )}
      </Content>
    </Container>
  );
};

export default EventsDashboard;
