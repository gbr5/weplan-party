import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import 'react-day-picker/lib/style.css';
import { FiChevronRight, FiTrash } from 'react-icons/fi';
import { MdGroupAdd, MdPersonAdd } from 'react-icons/md';
import { useToast } from '../../hooks/toast';

import { Container, ListSection, GroupMenu, FriendGroupWindow } from './styles';

import WindowContainer from '../WindowContainer';
import api from '../../services/api';
import AddFriendWindow from '../AddFriendWindow';
import IFriendGroupDTO from '../../dtos/IFriendGroupDTO';
import IFriendDTO from '../../dtos/IFriendDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
}

const MainFriendsWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();

  const [addFriendWindow, setAddFriendWindow] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [allFriendGroupId, setAllFriendGroupId] = useState<IFriendGroupDTO>(
    {} as IFriendGroupDTO,
  );
  const [friendId, setFriendId] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<IFriendGroupDTO>(
    {} as IFriendGroupDTO,
  );
  const [allFriends, setAllFriends] = useState<IFriendDTO[]>([]);
  const [allFriendsWindow, setAllFriendsWindow] = useState(true);
  const [addFriendGroupWindow, setAddFriendGroupWindow] = useState(false);
  const [friendGroups, setFriendGroups] = useState<IFriendGroupDTO[]>([]);
  const [friends, setFriends] = useState<IFriendDTO[]>([]);
  const [friendsByGroup, setFriendsByGroup] = useState<IFriendDTO[]>([]);
  const [friendGroupWindow, setFriendGroupWindow] = useState(false);

  const handleAddFriendWindow = useCallback(props => {
    setAddFriendWindow(props);
  }, []);

  const handleAddFriendGroupWindow = useCallback(props => {
    setAddFriendGroupWindow(props);
  }, []);

  const handleAddAllFriendGroup = useCallback(async () => {
    try {
      const newAllGroupFriend = await api.post('users/friend-groups', {
        name: 'All',
      });

      setAllFriendGroupId(newAllGroupFriend.data.id);
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const getFriendGroups = useCallback(() => {
    try {
      api.get<IFriendGroupDTO[]>('/users/friend-groups/list').then(response => {
        setFriendGroups(response.data.filter(group => group.name !== 'All'));
        const allGroupId = response.data.filter(group => group.name === 'All');
        if (allGroupId.length <= 0) {
          return handleAddAllFriendGroup();
        }
        return setAllFriendGroupId(allGroupId[0]);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [handleAddAllFriendGroup]);

  const handleAllFriends = useCallback(() => {
    setFriendsByGroup([]);
    setAllFriendsWindow(true);
  }, []);

  const handleFriendLists = useCallback(
    (props: IFriendGroupDTO) => {
      setFriendsByGroup(
        friends.filter(
          thisFriend => thisFriend.friendGroup.name === props.name,
        ),
      );
      setSelectedGroupId(props);
      setAllFriendsWindow(false);
    },
    [friends],
  );

  const handleAddFriendToGroupWindow = useCallback((props: string) => {
    setFriendId(props);
    setFriendGroupWindow(true);
  }, []);

  const getFriends = useCallback(() => {
    try {
      api.get<IFriendDTO[]>('/users/friends/list').then(response => {
        setFriends(response.data);
        setAllFriends(
          response.data.filter(friend => friend.friendGroup.name === 'All'),
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const handleCreateFriendGroup = useCallback(async () => {
    try {
      await api.post('users/friend-groups', {
        name: groupName,
      });
      getFriendGroups();
      setGroupName('');
      setAddFriendGroupWindow(false);
      addToast({
        type: 'success',
        title: 'Grupo criado com sucesso',
        description: 'Você já pode visualizar adicionar os seus amigos.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Não foi possível criar o seu grupo de amigos',
        description: 'Tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, groupName, getFriendGroups]);

  const handleDeleteFriendFromGroup = useCallback(
    async (props: string) => {
      try {
        await api.delete(`users/friends/${props}`);
        handleFriendLists(selectedGroupId);

        addToast({
          type: 'success',
          title: 'Contato deletado do grupo com sucesso',
          description: 'Você já pode visualizar as alterações.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível deletar o contato do seu grupo de amigos',
          description: 'Tente novamente.',
        });
      }
    },
    [addToast, handleFriendLists, selectedGroupId],
  );

  const handleDeleteFriendFromAllGroups = useCallback(
    async (props: string) => {
      try {
        const allGroups: IFriendDTO[] = friends.filter(
          thisFriend => thisFriend.friend.name === props,
        );
        await Promise.all([
          allGroups.map(async group => {
            await api.delete(`users/friends/${group.id}`);
          }),
        ]);
        handleFriendLists(selectedGroupId);
        addToast({
          type: 'success',
          title: 'Contato deletado do grupo com sucesso',
          description: 'Você já pode visualizar as alterações.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível deletar o contato do seu grupo de amigos',
          description: 'Tente novamente.',
        });
      }
    },
    [addToast, friends, handleFriendLists, selectedGroupId],
  );

  const handleAddFriendToGroup = useCallback(
    async props => {
      try {
        await api.post('/users/friends', {
          friend_id: friendId,
          friend_group: props,
        });

        getFriends();
        getFriendGroups();
        setFriendGroupWindow(false);
        handleFriendLists(selectedGroupId);
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
    },
    [
      addToast,
      getFriends,
      getFriendGroups,
      selectedGroupId,
      friendId,
      handleFriendLists,
    ],
  );

  const handleSelectGroup = useCallback(
    props => {
      handleAddFriendToGroup(props);
    },
    [handleAddFriendToGroup],
  );

  useEffect(() => {
    getFriendGroups();
  }, [getFriendGroups]);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  return (
    <>
      {!!friendGroupWindow && (
        <FriendGroupWindow>
          {friendGroups.map((group: IFriendGroupDTO) => (
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
      {!!addFriendWindow && (
        <AddFriendWindow
          handleFriendLists={handleFriendLists}
          allFriendGroupId={allFriendGroupId}
          handleCloseWindow={() => handleAddFriendWindow(false)}
          onHandleCloseWindow={() => handleAddFriendWindow(false)}
          getFriends={getFriends}
          getFriendGroups={getFriends}
        />
      )}
      {!!addFriendGroupWindow && (
        <WindowContainer
          onHandleCloseWindow={() => handleAddFriendGroupWindow(false)}
          containerStyle={{
            top: '0%',
            left: '0%',
            height: '100%',
            width: '100%',
            zIndex: 14,
          }}
        >
          <h1>Criar grupo de contatos</h1>
          <input
            type="text"
            style={{ height: '40px' }}
            placeholder="Nome"
            onChange={e => setGroupName(e.target.value)}
          />
          <div>
            <button type="button" onClick={handleCreateFriendGroup}>
              Criar
            </button>
          </div>
        </WindowContainer>
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          top: '5%',
          left: '5%',
          height: '90%',
          width: '90%',
          zIndex: 10,
        }}
      >
        <Container>
          <span>
            <h1>Contatos</h1>
            <button type="button" onClick={() => handleAddFriendWindow(true)}>
              <MdPersonAdd size={40} />
            </button>
          </span>
          <div>
            <GroupMenu>
              <span>
                <button type="button" onClick={handleAllFriends}>
                  Todos
                </button>
              </span>
              <button
                type="button"
                onClick={() => handleAddFriendGroupWindow(true)}
              >
                Grupos
                <MdGroupAdd size={40} />
              </button>
              <span>
                {friendGroups.map(group => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleFriendLists(group)}
                  >
                    <strong>{group.name}</strong>
                    <FiChevronRight />
                  </button>
                ))}
              </span>
            </GroupMenu>
            <ListSection>
              <ul>
                {allFriendsWindow
                  ? allFriends.map(friend => {
                      return (
                        <li key={friend.id}>
                          <strong>{friend.friend.name}</strong>
                          <span>
                            <div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAddFriendToGroupWindow(friend.friend.id)
                                }
                              >
                                <MdGroupAdd size={24} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteFriendFromAllGroups(
                                  friend.friend.name,
                                )
                              }
                            >
                              <FiTrash size={24} />
                            </button>
                          </span>
                        </li>
                      );
                    })
                  : friendsByGroup.map(friend => {
                      return (
                        <li key={friend.id}>
                          <strong>{friend.friend.name}</strong>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteFriendFromGroup(friend.id)
                            }
                          >
                            Deletar
                          </button>
                        </li>
                      );
                    })}
              </ul>
            </ListSection>
          </div>
        </Container>
      </WindowContainer>
    </>
  );
};

export default MainFriendsWindow;
