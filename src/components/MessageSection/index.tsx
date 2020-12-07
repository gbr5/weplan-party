import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import {
  Container,
  UsersChat,
  UserChat,
  ChatMessages,
  Messages,
} from './styles';

const MessageSection: React.FC = () => {
  return (
    <Container>
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
          <span>
            <button type="button">
              <h1>Rullus</h1>
            </button>
          </span>
          <Messages>
            <span>Rullus: </span>
            <p>
              Então, posso ver o que pode ser feito, o Felipe vai te ligar. Mas
              de toda forma, segue agendado para segunda as 8am. ;)
            </p>
            <p>14:20</p>
          </Messages>

          <Messages>
            <span>Você: </span>
            <p>
              Tudo bem. Fico aguardando o seu retorno. Muito obrigado Alice! ;D
            </p>
            <p>14:22</p>
          </Messages>
          <Messages>
            <span>Rullus: </span>
            <p>
              Imagina, é um prazer. Precisando só falar! Um excelente fim de
              semana.
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
              Imagina, é um prazer. Precisando só falar! Um excelente fim de
              semana.
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
    </Container>
  );
};

export default MessageSection;
