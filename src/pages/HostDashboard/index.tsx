import 'react-day-picker/lib/style.css';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Container,
  Content,
  BottomPage,
  BottomSection,
  MiddlePage,
} from './styles';

import PageHeader from '../../components/PageHeader';

import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import { MyNextEventSection } from '../../components/EventComponents/MyNextEventSection';
import FriendsEventsSection from '../../components/MainDashboardBottomSection/FriendsEventsSection';
import GuestToUserMessageWindow from '../../components/GuestToUserMessageWindow';
import { useEvent } from '../../hooks/event';
import { useCurrentEvent } from '../../hooks/currentEvent';
import { CreateEvent } from '../../components/EventsComponents/CreateEvent';
import { MyEventsSection } from '../../components/EventHostComponents/MyEventsSection';
import DeleteConfirmationWindow from '../../components/DeleteConfirmationWindow';

const Dashboard: React.FC = () => {
  const {
    eventsAsGuest,
    getEventsAsOwner,
    getEventsAsMember,
    getEventsAsGuest,
    createEventWindow,
  } = useEvent();
  const {
    deleteEventConfirmationWindow,
    handleDeleteEventConfirmationWindow,
    handleDeleteEvent,
  } = useCurrentEvent();

  const [guestToUserMessageWindow, setGuestToUserMessageWindow] = useState(
    false,
  );
  const [selectedEventAsGuest, setSelectedEventAsGuest] = useState(
    {} as IEventGuestDTO,
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

  return (
    <>
      {createEventWindow && <CreateEvent />}

      <Container>
        <PageHeader />
        {guestToUserMessageWindow && (
          <GuestToUserMessageWindow
            getEventsAsGuest={getEventsAsGuest}
            eventGuest={selectedEventAsGuest}
            onHandleCloseWindow={() => setGuestToUserMessageWindow(false)}
          />
        )}
        {!!deleteEventConfirmationWindow && (
          <DeleteConfirmationWindow
            title="Deseja deletar o evento?"
            handleDelete={handleDeleteEvent}
            onHandleCloseWindow={handleDeleteEventConfirmationWindow}
          />
        )}
        <Content>
          <MiddlePage>
            <MyNextEventSection />
            <BottomPage>
              <MyEventsSection />
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
                        deleteEvent={handleDeleteEventConfirmationWindow}
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
    </>
  );
};

export default Dashboard;
