import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiCamera, FiMail } from 'react-icons/fi';
import { MdArrowBack, MdPerson } from 'react-icons/md';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import AvatarPlaceholder from '../../../assets/WePlanLogo.svg';

import {
  Container,
  ActivityButton,
  Header,
  AvatarInput,
  InfoSection,
  InfoInputContainer,
} from './styles';
import IUserDTO from '../../../dtos/IUserDTO';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import Input from '../../Input';
import ActivityManagement from '../ActivityManagement';

interface IFormData {
  name: string;
  email: string;
}
interface IProps {
  user: IUserDTO;
}

const SideMenu: React.FC<IProps> = ({ user }: IProps) => {
  const { updateUser } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [userNameField, setUserNameField] = useState(false);
  const [userEmailField, setUserEmailField] = useState(false);
  const updateUserInfo = useCallback(
    async (name: string, email: string) => {
      try {
        const updatedUser = await api.put('users/', {
          name,
          email,
        });
        updateUser(updatedUser.data);
      } catch (err) {
        throw new Error(err);
      }
    },
    [updateUser],
  );
  const [activityManagementWindow, setActivityManagementWindow] = useState(
    false,
  );

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        const response = await api.get<IUserDTO[]>(
          `users?uniqueName=${data.name}&email=${data.email}`,
        );

        if (response.data[0].name === data.name) {
          return addToast({
            type: 'error',
            title: 'Error ao Atualizar o Perfil [Nome de Usuário]',
            description: `Nome de usuário "${data.name}" indisponível, tente novamente.`,
          });
        }

        if (response.data[0].email === data.email) {
          return addToast({
            type: 'error',
            title: 'Error ao Atualizar o Perfil [E-mail]',
            description: `E-mail "${data.email}" indisponível, tente novamente.`,
          });
        }

        if (userNameField && userEmailField) {
          updateUserInfo(data.name, data.email);
        }
        if (userNameField && !userEmailField) {
          updateUserInfo(data.name, user.email);
        }
        if (!userNameField && userEmailField) {
          updateUserInfo(user.name, data.email);
        }

        return addToast({
          type: 'success',
          title: 'Atualização efetuada com sucesso',
          description: 'As alterações já podem ser visualizadas',
        });
      } catch (err) {
        return addToast({
          type: 'error',
          title: 'Erro ao atualizar informações de usuário.',
          description: 'Tente novamente.',
        });
        throw new Error(err);
      }
    },
    [updateUserInfo, user, userNameField, userEmailField, addToast],
  );
  const avatar = useMemo(() => {
    return user.avatar_url ? user.avatar_url : AvatarPlaceholder;
  }, [user]);

  const imgAlt = useMemo(() => {
    return `${user.avatar_url} - WePlan Party`;
  }, [user]);

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch(`/users/avatar/${user.id}`, data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso.',
          });
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, updateUser, user],
  );

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      {activityManagementWindow && (
        <ActivityManagement
          closeWindow={() => setActivityManagementWindow(false)}
        />
      )}
      <Container>
        <Header>
          <AvatarInput>
            <img src={avatar} alt={imgAlt} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h2>{user.name}</h2>
          <InfoSection>
            <InfoInputContainer>
              <p>
                <MdPerson />
                Nome de Usuário:
                {userNameField && (
                  <button type="button" onClick={() => setUserNameField(false)}>
                    <MdArrowBack />
                    <MdArrowBack />
                  </button>
                )}
              </p>
              {!userNameField ? (
                <button
                  type="button"
                  onClick={() => setUserNameField(!userNameField)}
                >
                  {user.name}
                </button>
              ) : (
                <Input name="name" placeholder={user.name} />
              )}
            </InfoInputContainer>
            <InfoInputContainer>
              <p>
                <FiMail />
                Login (e-mail):
                {userEmailField && (
                  <button
                    type="button"
                    onClick={() => setUserEmailField(false)}
                  >
                    <MdArrowBack />
                    <MdArrowBack />
                  </button>
                )}
              </p>
              {!userEmailField ? (
                <button
                  type="button"
                  onClick={() => setUserEmailField(!userEmailField)}
                >
                  {user.email}
                </button>
              ) : (
                <Input name="email" placeholder={user.email} />
              )}
            </InfoInputContainer>
            <button type="submit">Salvar</button>
          </InfoSection>
          <ActivityButton
            type="button"
            onClick={() => setActivityManagementWindow(true)}
          >
            Gerenciar atividade
          </ActivityButton>
        </Header>
      </Container>
    </Form>
  );
};

export default SideMenu;
