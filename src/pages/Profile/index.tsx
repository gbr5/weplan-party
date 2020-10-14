import React, {
  useCallback,
  useRef,
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';
import MenuButton from '../../components/MenuButton';
import PageHeader from '../../components/PageHeader';

import {
  Container,
  Content,
  AvatarInput,
  PasswordContainer,
  UserInfoButton,
} from './styles';

import { useAuth } from '../../hooks/auth';

interface IProfileForm {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface IPersonInfoDTO {
  first_name: string;
  last_name: string;
  person_id: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [resetPassword, setResetPassword] = useState(false);
  const [userInfoWindow, setUserInfoWindow] = useState(true);
  const [personInfoWindow, setPersonInfoWindow] = useState(false);
  const [personInfo, setPersonInfo] = useState<IPersonInfoDTO>(
    {} as IPersonInfoDTO,
  );

  const handleUserInfoWindow = useCallback(() => {
    if (userInfoWindow) {
      setUserInfoWindow(false);
      setPersonInfoWindow(true);
    } else {
      setUserInfoWindow(true);
      setPersonInfoWindow(false);
    }
  }, [userInfoWindow]);

  const handleSubmit = useCallback(
    async (data: IProfileForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val?.length,
            then: Yup.string().required('Campo obrigatório.').min(6),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val?.length,
              then: Yup.string().required('Campo obrigatório.').min(6),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), undefined],
              'As senhas devem ser iguais',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          email,
          name,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso.',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const editPersonInfo = useCallback(
    async (data: IPersonInfoDTO) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          first_name: Yup.string().required('Nome é obrigatório'),
          last_name: Yup.string().required('Sobrenome é obrigatório'),
          person_id: Yup.string().required('Identidade é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (personInfo) {
          await api.put('person-info', {
            first_name: data.first_name,
            last_name: data.last_name,
            person_id: data.person_id,
          });
        } else {
          await api.post('person-info', {
            first_name: data.first_name,
            last_name: data.last_name,
            person_id: data.person_id,
          });
        }
        history.push('/');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, history, personInfo],
  );

  const handlePasswordDrawer = useCallback(() => {
    if (resetPassword === false) {
      setResetPassword(true);
    } else {
      setResetPassword(false);
    }
  }, [resetPassword]);

  const handleGetPersonInfo = useCallback(() => {
    try {
      api.get('person-info').then(response => {
        console.log(response.data);
        setPersonInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    handleGetPersonInfo();
  }, [handleGetPersonInfo]);

  return (
    <Container>
      <PageHeader />

      <Content>
        <AvatarInput>
          <img src={user.avatar_url} alt={user.name} />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>

        <UserInfoButton type="button" onClick={handleUserInfoWindow}>
          <h3>
            {userInfoWindow ? 'Informações pessoais' : 'Informações de usuário'}
          </h3>
        </UserInfoButton>
        {!!userInfoWindow && (
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: user.name,
              email: user.email,
            }}
          >
            <h1>Meu perfil</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />

            <PasswordContainer>
              {resetPassword ? (
                <button type="button" onClick={handlePasswordDrawer}>
                  <MdKeyboardArrowUp />
                  Voltar
                </button>
              ) : (
                <button type="button" onClick={handlePasswordDrawer}>
                  Trocar a senha
                  <MdKeyboardArrowDown />
                </button>
              )}
              {resetPassword && (
                <>
                  <Input
                    containerStyle={{ marginTop: 16 }}
                    name="old_password"
                    icon={FiLock}
                    type="password"
                    placeholder="Senha atual"
                  />

                  <Input
                    name="password"
                    icon={FiLock}
                    type="password"
                    placeholder="Nova senha"
                  />

                  <Input
                    name="password_confirmation"
                    icon={FiLock}
                    type="password"
                    placeholder="Confirme a sua senha"
                  />
                </>
              )}
            </PasswordContainer>

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        )}
        {!!personInfoWindow && (
          <Form ref={formRef} onSubmit={editPersonInfo}>
            <h1>Informações pessoais</h1>

            <Input
              name="first_name"
              icon={FiUser}
              type="text"
              placeholder="Primeiro nome"
              defaultValue={personInfo.first_name}
            />
            <Input
              name="last_name"
              icon={FiUser}
              type="text"
              placeholder="Sobrenome"
              defaultValue={personInfo.last_name}
            />
            <Input
              name="person_id"
              icon={FiUser}
              type="text"
              placeholder="Identidade"
              defaultValue={personInfo.person_id}
            />

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        )}
      </Content>
    </Container>
  );
};

export default Profile;
