import React, { useState, useCallback } from 'react';

import 'react-day-picker/lib/style.css';

import { FiChevronDown } from 'react-icons/fi';
import { MdSearch } from 'react-icons/md';

import { useHistory } from 'react-router-dom';
import { Container, Content, MyEvents, FriendsEvents, Event } from './styles';

import PageHeader from '../../components/PageHeader';
import MenuButton from '../../components/MenuButton';

const EventsDashboard: React.FC = () => {
  const history = useHistory();

  const [myEventsSection, setMyEventsSection] = useState(true);
  const [friendsEventsSection, setFriendsEventsSection] = useState(false);

  const handleMyEventsSection = useCallback(() => {
    setMyEventsSection(true);
    setFriendsEventsSection(false);
  }, []);

  const handleFriendsEventsSection = useCallback(() => {
    setMyEventsSection(false);
    setFriendsEventsSection(true);
  }, []);

  const handleNavigateToMyEventDashboard = useCallback(() => {
    history.push('/dashboard/my-event');
  }, [history]);

  const handleNavigateToFriendEventDashboard = useCallback(() => {
    history.push('/friends/event');
  }, [history]);

  return (
    <Container>
      <MenuButton />

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
          <MyEvents>
            <Event type="button" onClick={handleNavigateToMyEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToMyEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToMyEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToMyEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToMyEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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
          </MyEvents>
        )}
        {!!friendsEventsSection && (
          <FriendsEvents>
            <Event type="button" onClick={handleNavigateToFriendEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToFriendEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToFriendEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToFriendEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToFriendEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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

            <Event type="button" onClick={handleNavigateToFriendEventDashboard}>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div>
                <p>data</p>
                <p>horário</p>
              </div>
              <h1>Nome do evento</h1>
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
          </FriendsEvents>
        )}
      </Content>
    </Container>
  );
};

export default EventsDashboard;
