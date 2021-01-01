import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { FiCamera, FiLock, FiMail } from 'react-icons/fi';
import { MdArrowBack, MdPerson } from 'react-icons/md';

import AvatarPlaceholder from '../../../assets/WePlanLogo.svg';

import {
  Container,
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

interface IProps {
  user: IUserDTO;
}

const SideMenu: React.FC<IProps> = ({ user }: IProps) => {
  const { updateUser } = useAuth();
  const { addToast } = useToast();

  const [userNameField, setUserNameField] = useState(false);
  const [userEmailField, setUserEmailField] = useState(false);

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
                <button type="button" onClick={() => setUserEmailField(false)}>
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
          <InfoInputContainer>
            <p>
              <FiLock />
              Senha:
              {userEmailField && (
                <button type="button" onClick={() => setUserEmailField(false)}>
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
        </InfoSection>
      </Header>
    </Container>
  );
};

export default SideMenu;
