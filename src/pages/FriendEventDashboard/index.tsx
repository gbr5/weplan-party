import React, { useState, useCallback } from 'react';

import 'react-day-picker/lib/style.css';

import { Container, Content, FriendsEvents } from './styles';

import PageHeader from '../../components/PageHeader';
import MenuButton from '../../components/MenuButton';
// import UserProfile from '../../components/UserProfile';

const EventsDashboard: React.FC = () => {
  const [userProfileWindow, setUserProfileWindow] = useState(false);

  const handleUserProfileWindow = useCallback(() => {
    setUserProfileWindow(!userProfileWindow);
  }, [userProfileWindow]);

  return (
    <Container>
      <img
        src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <MenuButton />
      <PageHeader />
      {/* {!!userProfileWindow && <UserProfile />} */}
      <Content>
        <button type="button">CONFIRMAR PRESENÇA</button>
        <h1>Nome do Evento</h1>
        <FriendsEvents>
          <span>
            <h1>Donos da Festa</h1>
            <div>
              <button type="button" onClick={handleUserProfileWindow}>
                <p>Marcelo</p>
              </button>
              <button type="button" onClick={handleUserProfileWindow}>
                <p>Marcela</p>
              </button>
            </div>
          </span>
          <div>
            <span>
              <p>19/09/21</p>
              <p>16:00</p>
            </span>
            <span>
              <p>Festa Infantil</p>
              <p>Traje: A vontade</p>
            </span>
          </div>
          <span>
            <span>
              <p>Brasil</p>
              <p>MG</p>
              <p>Belo Horizonte</p>
            </span>
            <h3>Endereço</h3>
            <p>Rua kenedy, 47, Jardim Canadá</p>
          </span>
        </FriendsEvents>
      </Content>
    </Container>
  );
};

export default EventsDashboard;
