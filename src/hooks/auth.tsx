import React, { createContext, useCallback, useState, useContext } from 'react';
import IUserDTO from '../dtos/IUserDTO';
import api from '../services/api';
import { useToast } from './toast';

interface IAuthState {
  token: string;
  user: IUserDTO;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IGoogleSignInCredentials {
  email: string;
  googleToken: string;
  name: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
  googleId: string;
}

interface ICreatePersonInfoDTO {
  userId: string;
  first_name: string;
  last_name: string;
}

interface IAuthContextData {
  user: IUserDTO;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signInWithGoogle(credentials: IGoogleSignInCredentials): Promise<void>;
  handleSignOut(): void;
  createdefaultContactInfo(id: string): void;
  updateUser(user: IUserDTO): void;
  createPersonInfo(personInfo: ICreatePersonInfoDTO): void;
  resetPassword: (email: string) => Promise<void>;
  getUser: (id: string) => Promise<IUserDTO | undefined>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@WePlan-Party:token');
    const user = localStorage.getItem('@WePlan-Party:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('@WePlan-Party:token');
    localStorage.removeItem('@WePlan-Party:user');
    localStorage.removeItem('@WePlan-Party:friends');
    localStorage.removeItem('@WePlan-Party:friend-requests');
    localStorage.removeItem('@WePlan-Party:selected-event');
    localStorage.clear();

    setData({} as IAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@WePlan-Party:token', token);
    localStorage.setItem('@WePlan-Party:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signInWithGoogle = useCallback(
    async ({
      email,
      googleToken,
      googleId,
      imageUrl,
      familyName,
      givenName,
      name,
    }: IGoogleSignInCredentials) => {
      const response = await api.post('google-sessions', {
        email,
        token: googleToken,
        googleId,
        name,
        familyName,
        givenName,
        imageUrl,
      });

      const { token, user } = response.data;

      localStorage.setItem('@WePlan-Party:token', token);
      localStorage.setItem('@WePlan-Party:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    },
    [],
  );

  const createPersonInfo = useCallback(
    async (personData: ICreatePersonInfoDTO) => {
      try {
        const findFirstAndLastName = await api.get(
          `person-info/${personData.first_name}/${personData.last_name}`,
        );
        if (findFirstAndLastName.data.id) {
          addToast({
            type: 'error',
            title: 'Erro no cadastro | [Informações de Usuário].',
            description: `Nome e Sobrenome "${personData.first_name} ${personData.last_name}" já cadastrado em outro perfil, tente novamente.`,
          });
        }
        await api.post(`/person-info/${personData.userId}`, {
          person_id: personData.userId,
          first_name: personData.first_name,
          last_name: personData.last_name,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Yuhuu!! Vamos fazer a festaaa!!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast],
  );

  const createdefaultContactInfo = useCallback((id: string) => {
    Promise.all([
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}1`,
        contact_type: 'Whatsapp',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}2`,
        contact_type: 'Phone',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}3`,
        contact_type: 'Email',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}4`,
        contact_type: 'Address',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}5`,
        contact_type: 'Instagram',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}6`,
        contact_type: 'Facebook',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}7`,
        contact_type: 'Linkedin',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}8`,
        contact_type: 'Website',
      }),
    ]);
  }, []);

  const updateUser = useCallback(
    (updatedUser: IUserDTO) => {
      localStorage.setItem('@WePlan-Party:user', JSON.stringify(updatedUser));

      setData({
        token: data.token,
        user: updatedUser,
      });
    },
    [data],
  );

  async function resetPassword(email: string): Promise<void> {
    try {
      await api.post('/password/forgot', {
        email,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getUser(id: string): Promise<IUserDTO | undefined> {
    const response = await api.get(`/users/${id}`);

    if (response.data) return response.data;
    return undefined;
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signInWithGoogle,
        handleSignOut,
        createdefaultContactInfo,
        updateUser,
        createPersonInfo,
        getUser,
        resetPassword,
      }}
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
