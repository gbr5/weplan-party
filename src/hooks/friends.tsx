import React, { createContext, useContext, useEffect, useState } from 'react';
import IFriendDTO from '../dtos/IFriendDTO';
import IUserDTO from '../dtos/IUserDTO';
import api from '../services/api';
import { useAuth } from './auth';

interface FriendsContextType {
  friends: IFriendDTO[];
  friendRequests: IFriendDTO[];
  selectedFriends: IFriendDTO[];
  loading: boolean;
  selectUserWindow: boolean;
  friendRequestsWindow: boolean;
  deleteFriendWindow: boolean;
  selectedFriend: IFriendDTO;
  handleFriendRequestsWindow: () => void;
  handleSelectUserWindow: () => void;
  handleDeleteFriendWindow: () => void;
  getFriends: () => Promise<void>;
  getFriendRequests: () => Promise<void>;
  getUsersByUserName: (data: string) => Promise<IUserDTO[]>;
  requestFriendship: (friend_id: string) => Promise<void>;
  updateFriend: (id: string) => Promise<void>;
  deleteFriend: (id: string) => Promise<void>;
  handleSelectedFriend: (data: IFriendDTO) => void;
  handleSelectedFriends: (data: IFriendDTO[]) => void;
  resetFriendsVariables: () => void;
}

const FriendsContext = createContext({} as FriendsContextType);

const FriendsProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [deleteFriendWindow, setDeleteFriendWindow] = useState(false); // 1
  const [friendRequests, setFriendRequests] = useState<IFriendDTO[]>([]); // 2
  const [selectedFriends, setSelectedFriends] = useState<IFriendDTO[]>([]); // 3
  const [friendRequestsWindow, setFriendRequestsWindow] = useState(false); // 4
  const [friends, setFriends] = useState<IFriendDTO[]>([]); // 5
  const [loading, setLoading] = useState(false); // 6
  const [selectedFriend, setSelectedFriend] = useState({} as IFriendDTO); // 7
  const [selectUserWindow, setSelectUserWindow] = useState(true); // 9

  function resetFriendsVariables(): void {
    setDeleteFriendWindow(false); // 1
    setFriendRequests([]); // 2
    setSelectedFriends([]); // 3
    setFriendRequestsWindow(false); // 4
    setFriends([]); // 5
    setLoading(false); // 6
    setSelectedFriend({} as IFriendDTO); // 7
    setSelectUserWindow(false); // 9
  }

  async function loadStorageData(): Promise<void> {
    const storedFriends = localStorage.getItem('@WePlan-Party:friends');
    const storedFriendRequests = localStorage.getItem(
      '@WePlan-Party:friend-requests',
    );

    if (storedFriends && storedFriendRequests) {
      setFriends(JSON.parse(storedFriends));
    }
    if (storedFriendRequests) {
      setFriendRequests(JSON.parse(storedFriendRequests));
    }
    setLoading(false);
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  function handleSelectUserWindow(): void {
    setSelectUserWindow(!selectUserWindow);
  }

  function handleFriendRequestsWindow(): void {
    setFriendRequestsWindow(!friendRequestsWindow);
  }

  function handleDeleteFriendWindow(): void {
    setDeleteFriendWindow(!deleteFriendWindow);
  }

  function handleSelectedFriend(data: IFriendDTO): void {
    setSelectedFriend(data);
  }

  function handleSelectedFriends(data: IFriendDTO[]): void {
    setSelectedFriends(data);
  }

  async function getFriends(): Promise<void> {
    try {
      setFriends([]);
      const response = await api.get<IFriendDTO[]>(`/user-friends`);

      if (response.data.length > 0) {
        const sortedFriends = response.data.sort((a, b) => {
          if (
            a.friend.name.toLocaleLowerCase() >
            b.friend.name.toLocaleLowerCase()
          )
            return 1;
          if (
            a.friend.name.toLocaleLowerCase() <
            b.friend.name.toLocaleLowerCase()
          )
            return -1;
          return 0;
        });
        localStorage.setItem(
          '@WePlan-Party:friends',
          JSON.stringify(sortedFriends),
        );
        setFriends(sortedFriends);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getFriendRequests(): Promise<void> {
    try {
      setFriendRequests([]);
      const response = await api.get<IFriendDTO[]>(
        `/list-user-friend-requests/`,
      );

      if (response.data.length > 0) {
        const sortedFriends = response.data.sort((a, b) => {
          if (
            a.friend.name.toLocaleLowerCase() >
            b.friend.name.toLocaleLowerCase()
          )
            return 1;
          if (
            a.friend.name.toLocaleLowerCase() <
            b.friend.name.toLocaleLowerCase()
          )
            return -1;
          return 0;
        });
        localStorage.setItem(
          '@WePlan-Party:friend-requests',
          JSON.stringify(sortedFriends),
        );
        setFriendRequests(sortedFriends);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getUsersByUserName(data: string): Promise<IUserDTO[]> {
    try {
      const response = await api.get<IUserDTO[]>(`/users?name=${data}`);
      return response.data.filter(item => item.id !== user.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function requestFriendship(friend_id: string): Promise<void> {
    try {
      setLoading(true);
      await api.post(`/user-friends/`, {
        friend_id,
      });
      await getFriends();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateFriend(id: string): Promise<void> {
    try {
      setLoading(true);
      await api.put(`/user-friends/${id}`);
      await getFriendRequests();
      await getFriends();
      handleFriendRequestsWindow();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFriend(id: string): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/user-friends/${id}`);
      setDeleteFriendWindow(false);
      setSelectedFriend({} as IFriendDTO);
      await getFriends();
      await getFriendRequests();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FriendsContext.Provider
      value={{
        friends,
        friendRequests,
        loading,
        selectedFriend,
        requestFriendship,
        deleteFriend,
        getFriends,
        getFriendRequests,
        getUsersByUserName,
        handleSelectedFriend,
        updateFriend,
        handleSelectUserWindow,
        selectUserWindow,
        deleteFriendWindow,
        handleDeleteFriendWindow,
        friendRequestsWindow,
        handleFriendRequestsWindow,
        resetFriendsVariables,
        handleSelectedFriends,
        selectedFriends,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

function useFriends(): FriendsContextType {
  const context = useContext(FriendsContext);

  if (!context)
    throw new Error('useFriends must be used within an AuthProvider!');
  return context;
}

export { FriendsProvider, useFriends };
