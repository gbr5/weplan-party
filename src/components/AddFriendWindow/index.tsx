import React, { MouseEventHandler, useCallback, useState } from 'react';
import IFriendGroupDTO from '../../dtos/IFriendGroupDTO';
import IUserDTO from '../../dtos/IUserDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowContainer from '../WindowContainer';

import { Container, FriendGroupWindow } from './styles';

interface IPropsDTO {
  onHandleCloseWindow: MouseEventHandler;
  getFriends: Function;
  friendGroups: IFriendGroupDTO[];
}

const AddFriendWindow: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  getFriends,
  friendGroups,
}: IPropsDTO) => {
  const { addToast } = useToast();

  const [users, setUsers] = useState<IUserDTO[]>([]);
  const [friendId, setFriendId] = useState('');
  const [friendGroupId, setFriendGroupId] = useState('');
  const [friendGroupWindow, setFriendGroupWindow] = useState(false);

  const handleGetUsers = useCallback((props: string) => {
    try {
      api.get<IUserDTO[]>(`/users?name=${props}`).then(response => {
        setUsers(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const handleSelectUser = useCallback((props: string) => {
    setFriendId(props);
    setFriendGroupWindow(true);
  }, []);

  const handleSelectGroup = useCallback((props: string) => {
    setFriendGroupId(props);
    setFriendGroupWindow(false);
  }, []);

  const handleAddFriend = useCallback(() => {
    try {
      api.post('/users/friends', {
        friend_id: friendId,
        friend_group: friendGroupId,
      });

      addToast({
        type: 'success',
        title: 'Amigo adicionado com sucesso',
        description: 'As informações do evento já foram atualizadas.',
      });

      getFriends();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar amigo',
        description: 'Erro ao adicionar amigo, tente novamente.',
      });
      throw new Error(err);
    }
  }, [friendGroupId, friendId, addToast, getFriends]);

  return (
    <>
      {!!friendGroupWindow && (
        <FriendGroupWindow>
          {friendGroups.map(group => (
            <button
              key={group.id}
              type="button"
              onClick={() => handleSelectGroup(group.id)}
            >
              {group.name}
            </button>
          ))}
        </FriendGroupWindow>
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          top: '10%',
          left: '25%',
          height: '80%',
          width: '50%',
          zIndex: '1000',
        }}
      >
        <Container>
          <input onChange={e => handleGetUsers(e.target.value)} />
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <h2>{user.name}</h2>
                <button type="button" onClick={() => handleSelectUser(user.id)}>
                  Selecionar
                </button>
              </li>
            ))}
          </ul>
          {friendGroupId !== '' && (
            <button type="button" onClick={handleAddFriend}>
              Adicionar
            </button>
          )}
        </Container>
      </WindowContainer>
    </>
  );
};

export default AddFriendWindow;
