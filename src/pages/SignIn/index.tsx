import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import weplanLogo from '../../assets/WePlanLogo.svg';

import {
  Container,
  ActivationMessageContainer,
  LogoContainer,
  Content,
  AnimationContainer,
  Background,
} from './styles';
import IUserDTO from '../../dtos/IUserDTO';
import api from '../../services/api';
import WindowUnFormattedContainer from '../../components/WindowUnFormattedContainer';
import GoogleLoginComponent from '../../components/AuthComponents/GoogleLoginComponent';

interface SignInFormData {
  email: string;
  password: string;
}

interface IParams {
  params?: string;
}

const SignIn: React.FC = () => {
  const location = useLocation<IParams>();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const defaultEmail = (location.state && location.state.params) || '';
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const [activationMessage, setActivationMessage] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const user = await api.get<IUserDTO>(`/user-profile/${data.email}`);

        if (!user.data.isActive) {
          await api.post('user/activation', {
            email: data.email,
          });
          setActivationMessage(true);
          return addToast({
            type: 'info',
            title: 'Ativação de perfil',
            description:
              'Enviamos ao seu e-mail o link para a ativação da sua conta. Este é um procedimento de segurança!',
          });
        }

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');

        return addToast({
          type: 'success',
          title: 'Bem Vindo!',
          description: 'Sua dashboard está pronta!.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        return addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credênciais.',
        });
      } finally {
        setLoading(false);
      }
    },
    [signIn, addToast, history],
  );

  return (
    <>
      {activationMessage && (
        <WindowUnFormattedContainer
          onHandleCloseWindow={() => setActivationMessage(false)}
          containerStyle={{
            zIndex: 15,
            top: '0%',
            lef: '0%',
            height: '100%',
            width: '100%',
          }}
        >
          <ActivationMessageContainer>
            <h1>Ativação de conta</h1>

            <p>Enviamos ao seu e-mail o link para ativação da sua conta.</p>
            <p>Este é um procedimento de segurança.</p>

            <button type="button" onClick={() => setActivationMessage(false)}>
              Fechar
            </button>
          </ActivationMessageContainer>
        </WindowUnFormattedContainer>
      )}
      <Container>
        <Content>
          <AnimationContainer>
            <LogoContainer>
              <img src={weplanLogo} alt="WePlan - Party" />
              <h1>WePlan</h1>
            </LogoContainer>
            <GoogleLoginComponent buttonText="Entre com o Google" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu login</h1>

              <Input
                name="email"
                icon={FiMail}
                type="email"
                inputMode="email"
                placeholder="E-mail"
                defaultValue={defaultEmail}
              />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button loading={loading} type="submit">
                Entrar
              </Button>
              <Link to="/forgot-password">Esqueci minha senha</Link>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
