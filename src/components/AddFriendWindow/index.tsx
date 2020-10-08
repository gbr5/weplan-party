import React, { MouseEventHandler, useCallback, useState } from 'react';
import IFriendGroupDTO from '../../dtos/IFriendGroupDTO';
import IUserDTO from '../../dtos/IUserDTO';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowContainer from '../WindowContainer';

import { Container, FriendGroupWindow } from './styles';

interface IPropsDTO {
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
  getFriends: Function;
  friendGroups: IFriendGroupDTO[];
  getFriendGroups: Function;
}

const AddFriendWindow: React.FC<IPropsDTO> = ({
  handleCloseWindow,
  onHandleCloseWindow,
  getFriends,
  friendGroups,
  getFriendGroups,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [users, setUsers] = useState<IUserDTO[]>([]);
  const [friendId, setFriendId] = useState('');
  const [friendGroupId, setFriendGroupId] = useState('');
  const [friendGroupWindow, setFriendGroupWindow] = useState(false);

  const handleGetUsers = useCallback(
    (props: string) => {
      try {
        api.get<IUserDTO[]>(`/users?name=${props}`).then(response => {
          const allUsers = response.data.filter(
            thisUser => thisUser.id !== user.id,
          );
          setUsers(allUsers);
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [user],
  );

  const handleSelectUser = useCallback(
    (props: string) => {
      if (friendId === props) {
        setFriendId('');
      } else {
        setFriendId(props);
        setFriendGroupWindow(true);
      }
    },
    [friendId],
  );

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

      getFriends();
      getFriendGroups();
      setFriendGroupWindow(false);
      handleCloseWindow();

      addToast({
        type: 'success',
        title: 'Amigo adicionado com sucesso',
        description: 'As informações do evento já foram atualizadas.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar amigo',
        description: 'Erro ao adicionar amigo, tente novamente.',
      });
      throw new Error(err);
    }
  }, [
    friendGroupId,
    friendId,
    addToast,
    getFriends,
    getFriendGroups,
    handleCloseWindow,
  ]);

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
          <h1>Adicionar contato</h1>
          <input onChange={e => handleGetUsers(e.target.value)} />
          <ul>
            {users.map(thisUser => (
              <li key={thisUser.id}>
                <h2>{thisUser.name}</h2>
                {friendId !== thisUser.id ? (
                  <button
                    type="button"
                    onClick={() => handleSelectUser(thisUser.id)}
                  >
                    Selecionar
                  </button>
                ) : (
                  <span>
                    <button
                      type="button"
                      onClick={() => handleSelectUser(thisUser.id)}
                    >
                      Selecionado
                    </button>
                  </span>
                )}
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
