import React from 'react';

import 'react-day-picker/lib/style.css';

import { FiPower, FiChevronRight, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MdHelp } from 'react-icons/md';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Menu,
  Logo,
  Main,
  MessagesSection,
  UsersChat,
  UserChat,
  ChatMessages,
  Messages,
} from './styles';

import profileImg from '../../assets/guy.jpg';

import { useAuth } from '../../hooks/auth';

const EventHostDashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo>WePlan</Logo>

          <Profile>
            <img src={profileImg} alt="oi" />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <Menu>
            <button type="button">FOTOS</button>
            <button type="button">AMIGOS</button>
            <button type="button">EVENTOS</button>
            <button type="button">FORNECEDORES</button>
            <button type="button" onClick={signOut}>
              <MdHelp size={30} />
            </button>
            <button type="button" onClick={signOut}>
              <FiSettings size={30} />
            </button>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Menu>
        </HeaderContent>
      </Header>
      <Content>
        <Main>
          <MessagesSection>
            <UsersChat>
              <div>
                <h1>Contatos</h1>

                <UserChat>
                  <h1>Rullus</h1>
                  <FiChevronRight />
                </UserChat>
                <UserChat>
                  <h1>ZCM</h1>
                  <FiChevronRight />
                </UserChat>
                <UserChat>
                  <h1>Company</h1>
                  <FiChevronRight />
                </UserChat>
                <UserChat>
                  <h1>Vagalumens</h1>
                  <FiChevronRight />
                </UserChat>
                <UserChat>
                  <h1>ZCM</h1>
                  <FiChevronRight />
                </UserChat>
                <UserChat>
                  <h1>Company</h1>
                  <FiChevronRight />
                </UserChat>
                <UserChat>
                  <h1>ZCM</h1>
                  <FiChevronRight />
                </UserChat>
                <UserChat>
                  <h1>Company</h1>
                  <FiChevronRight />
                </UserChat>
              </div>
            </UsersChat>
            <ChatMessages>
              <div>
                <h1>Rullus</h1>

                <Messages>
                  <span>Rullus: </span>
                  <p>
                    Então, posso ver o que pode ser feito, o Felipe vai te
                    ligar. Mas de toda forma, segue agendado para segunda as
                    8am. ;)
                  </p>
                  <p>14:20</p>
                </Messages>
                <Messages>
                  <span>Você: </span>
                  <p>
                    Tudo bem. Fico aguardando o seu retorno. Muito obrigado
                    Alice! ;D
                  </p>
                  <p>14:22</p>
                </Messages>
                <Messages>
                  <span>Rullus: </span>
                  <p>
                    Imagina, é um prazer. Precisando só falar! Um excelente fim
                    de semana.
                  </p>
                  <p>14:27</p>
                </Messages>
                <Messages>
                  <span>Você: </span>
                  <p>Um beijo, bom fim de semana.</p>
                  <p>14:29</p>
                </Messages>
                <Messages>
                  <span>Rullus: </span>
                  <p>
                    Imagina, é um prazer. Precisando só falar! Um excelente fim
                    de semana.
                  </p>
                  <p>14:30</p>
                </Messages>
                <Messages>
                  <span>Você: </span>
                  <p>Um beijo, bom fim de semana.</p>
                  <p>14:32</p>
                </Messages>

                <input type="text" />
                <button type="button">Enviar</button>
              </div>
            </ChatMessages>
          </MessagesSection>
        </Main>
      </Content>
    </Container>
  );
};

export default EventHostDashboard;
