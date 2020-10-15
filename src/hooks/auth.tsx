import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  isSupplier: boolean;
  isCompany: boolean;
  company_id: string;
  employeeId: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as IAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    const getSupplier = await api.get(`supplier-employees/employee/${user.id}`);
    const isSupplier = getSupplier.data;
    console.log('auth.tsx => line 64', isSupplier);
    console.log('auth.tsx => line 67: USER', user);

    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar ? user.avatar : '',
      avatar_url: user.avatar_url ? user.avatar_url : '',
      isSupplier: !!isSupplier,
      isCompany: user.isCompany,
      company_id: isSupplier ? isSupplier.company_id : '',
      employeeId: isSupplier ? isSupplier.id : '',
    };

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(newUser));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user: newUser });
  }, []);

  const updateUser = useCallback(
    (updatedUser: IUser) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(updatedUser));

      setData({
        token: data.token,
        user: updatedUser,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must bu used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
