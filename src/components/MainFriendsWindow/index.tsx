import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import 'react-day-picker/lib/style.css';
import { FiChevronRight } from 'react-icons/fi';

import { MdGroupAdd, MdPersonAdd } from 'react-icons/md';
import { Container, ListSection, GroupMenu } from './styles';

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
  const [addFriendWindow, setAddFriendWindow] = useState(false);
  const [allFriends, setAllFriends] = useState<IFriendGroupDTO[]>([]);
  const [allFriendsWindow, setAllFriendsWindow] = useState(true);
  // const [addFriendGroupWindow, setAddFriendGroupWindow] = useState(false);
  const [friendGroups, setFriendGroups] = useState<IFriendGroupDTO[]>([]);
  const [friends, setFriends] = useState<IFriendDTO[]>([]);
  const [friendsByGroup, setFriendsByGroup] = useState<IFriendDTO[]>([]);

  const handleAddFriendWindow = useCallback(props => {
    setAddFriendWindow(props);
  }, []);

  // const handleAddFriendGroupWindow = useCallback(props => {
  //   setAddFriendGroupWindow(props);
  // }, []);

  const getFriendGroups = useCallback(() => {
    try {
      api.get<IFriendGroupDTO[]>('/users/friend-groups/list').then(response => {
        setFriendGroups(response.data.filter(group => group.name !== 'All'));
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const handleAllFriends = useCallback(() => {
    setFriendsByGroup([]);
    setAllFriendsWindow(true);
  }, []);

  const handleFriendLists = useCallback(
    props => {
      setFriendsByGroup(
        friends.filter(thisFriend => thisFriend.friend_group === props),
      );
      setAllFriendsWindow(false);
    },
    [friends],
  );

  const getFriends = useCallback(() => {
    try {
      api.get<IFriendDTO[]>('/users/friends/list').then(response => {
        console.log(response.data);
        setFriends(response.data);
        setAllFriends(
          response.data.filter(friend => friend.friend_group === 'All'),
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getFriendGroups();
  }, [getFriendGroups]);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  return (
    <>
      {!!addFriendWindow && (
        <AddFriendWindow
          onHandleCloseWindow={() => handleAddFriendWindow(false)}
          friendGroups={friendGroups}
          getFriends={getFriends}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          top: '5%',
          left: '5%',
          height: '90%',
          width: '90%',
          zIndex: '100',
        }}
      >
        <Container>
          <span>
            <h1>Amigos</h1>
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
              <button type="button">
                Grupos
                <MdGroupAdd size={40} />
              </button>
              <span>
                {friendGroups.map(group => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleFriendLists(group.name)}
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
                          <strong>{friend.name}</strong>
                        </li>
                      );
                    })
                  : friendsByGroup.map(friend => {
                      return (
                        <li key={friend.id}>
                          <strong>{friend.name}</strong>
                        </li>
                      );
                    })}
                {!allFriendsWindow
                  ? friendsByGroup.map(friend => {
                      return (
                        <li key={friend.id}>
                          <strong>{friend.name}</strong>
                        </li>
                      );
                    })
                  : friendsByGroup.map(friend => {
                      return (
                        <li key={friend.id}>
                          <strong>{friend.name}</strong>
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