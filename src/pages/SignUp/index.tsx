import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import weplanLogo from '../../assets/WePlanLogo.svg';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  QuestionTitle,
  LogoContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';
import GoogleSignupComponent from '../../components/AuthComponents/GoogleSignupComponent';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

interface IPersonUser {
  person_id: string;
  first_name: string;
  last_name: string;
}

const SignUp: React.FC = () => {
  const { createdefaultContactInfo, createPersonInfo } = useAuth();
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [options, setOptions] = useState(true);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmitPersonInfo = useCallback(
    async (data: IPersonUser) => {
      try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          first_name: Yup.string().required('Nome é obrigatório'),
          last_name: Yup.string().required('Sobrenome é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        createPersonInfo({
          userId,
          first_name: data.first_name,
          last_name: data.last_name,
        });

        await api.post('user/activation', {
          email: userEmail,
        });
        history.push('/signin');
        setOptions(true);
        setUserId('');

        return addToast({
          type: 'success',
          title: 'Ative a sua Conta',
          description: 'Eviamos o link para ativar a sua conta no seu e-mail.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        return addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, userId, userEmail, createPersonInfo],
  );

  const handleSubmit = useCallback(
    async (data: SignUpForm) => {
      try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas devem ser iguais.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const findByNameOrEmail = await api.get(
          `user/name-or-email?name=${data.name}&email=${data.email}`,
        );

        if (findByNameOrEmail.data.name === data.name) {
          return addToast({
            type: 'error',
            title: 'Erro no cadastro | [Nome de Usuário]',
            description: `Nome de usuário "${data.name}" indisponível, tente novamente`,
          });
        }

        if (findByNameOrEmail.data.email === data.email) {
          return addToast({
            type: 'error',
            title: 'Erro no cadastro | [E-mail]',
            description: `O e-mail "${data.email}" já está cadastrado, tente novamente`,
          });
        }

        const validatedData = {
          name: data.name,
          email: data.email,
          password: data.password,
          isCompany: false,
        };

        const response = await api.post('/users', validatedData);
        setUserId(response.data.id);
        setUserEmail(response.data.email);
        createdefaultContactInfo(response.data.id);
        setOptions(false);

        return addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Agora só falta você nos dizer o seu nome completo.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        return addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, createdefaultContactInfo],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoContainer>
            <img src={weplanLogo} alt="WePlan - Party" />
            <h1>WePlan</h1>
          </LogoContainer>
          <GoogleSignupComponent buttonText="Cadastre com o Google" />

          {!!options && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <QuestionTitle>Faça seu cadastro</QuestionTitle>

              <Input
                name="name"
                icon={FiUser}
                type="text"
                placeholder="Nome de usuário"
              />
              <Input
                name="email"
                icon={FiMail}
                type="email"
                inputMode="email"
                placeholder="E-mail"
              />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
              <Input
                name="password_confirmation"
                icon={FiLock}
                type="password"
                placeholder="Confirme a sua senha"
              />

              <Button loading={loading} type="submit">
                Cadastrar
              </Button>
            </Form>
          )}

          {!options && (
            <Form ref={formRef} onSubmit={handleSubmitPersonInfo}>
              <QuestionTitle>
                <strong>Usuário Final</strong>
                Faça seu cadastro
              </QuestionTitle>

              <Input
                name="first_name"
                icon={FiUser}
                type="text"
                placeholder="Nome"
                autoCapitalize="false"
              />
              <Input
                name="last_name"
                icon={FiUser}
                type="text"
                placeholder="Sobrenome"
              />
              <Button loading={loading} type="submit">
                Cadastrar
              </Button>
            </Form>
          )}

          <Link to="/signin">
            <FiArrowRight />
            Já sou cadastrado
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignUp;
