import React from 'react';
import { MdPersonAdd } from 'react-icons/md';

import { useFriends } from '../../hooks/friends';

import { Container, ListSection } from './styles';

const MainFriendsWindow: React.FC = () => {
  const { friends, handleSelectUserWindow } = useFriends();

  return (
    <Container>
      <span>
        <h1>Contatos</h1>
        <button type="button" onClick={() => handleSelectUserWindow()}>
          <MdPersonAdd size={40} />
        </button>
      </span>
      <div>
        <ListSection>
          <ul>
            {friends.map(friend => {
              return (
                <li key={friend.id}>
                  <strong>{friend.friend.name}</strong>
                </li>
              );
            })}
          </ul>
        </ListSection>
      </div>
    </Container>
  );
};

export default MainFriendsWindow;
