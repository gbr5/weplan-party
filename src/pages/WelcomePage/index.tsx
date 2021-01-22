import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';

import weplanLogo from '../../assets/WePlanLogo.svg';

import api from '../../services/api';

import {
  Container,
  LogoContainer,
  Content,
  AnimationContainer,
  Background,
} from './styles';

const WelcomePage: React.FC = () => {
  const { addToast } = useToast();
  const location = useLocation();
  const history = useHistory();

  const [updateTokenButton, setUpdateTokenButton] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      const queryParams = location.search.replace('?token=', '');
      const token = queryParams.split('&')[0];
      const email = queryParams.split('&')[1].replace('email=', '');
      setUserEmail(email);
      console.log('token', token);
      console.log('email', email);
      console.log('location.search', location.search);

      await api.put(`/user/activation/${token}`);

      addToast({
        type: 'success',
        title: 'Conta validada com sucesso!',
        description: 'Você já pode fazer login.',
      });
      history.push('/signin', {
        params: email,
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na validação da conta.',
        description:
          'Ocorreu um erro ao tentar realizar da sua conta, tente novamente.',
      });
      setUpdateTokenButton(true);
      throw new Error(err);
    }
  }, [addToast, location, history]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  const sendNewActivationEmail = useCallback(async () => {
    try {
      await api.post('user/activation', {
        email: userEmail,
      });

      addToast({
        type: 'success',
        title: 'E-mail enviado com sucesso!',
        description:
          'O token para validação do seu perfil tem validade de 2 horas.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao enviar e-mail.',
        description:
          'Ocorreu um erro ao enviar e-mail de verificação, tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, userEmail]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoContainer>
            <img src={weplanLogo} alt="WePlan - Party" />
            <h1>WePlan</h1>
          </LogoContainer>
          <h1>Seja bem vindo!</h1>

          {updateTokenButton && (
            <button type="button" onClick={sendNewActivationEmail}>
              Reenviar e-mail de verificação
            </button>
          )}

          <Link to="/signin">
            <FiArrowLeft />
            Ir para login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default WelcomePage;
