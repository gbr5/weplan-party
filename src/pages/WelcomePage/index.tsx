import React, { useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  const handleSubmit = useCallback(async () => {
    try {
      const token = location.search.replace('?token=', '');

      await api.put(`/user/activation/${token}`);

      addToast({
        type: 'success',
        title: 'Conta validada com sucesso!',
        description: 'Você já pode fazer login.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na validação da conta.',
        description:
          'Ocorreu um erro ao tentar realizar da sua conta, tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, location]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoContainer>
            <img src={weplanLogo} alt="WePlan - Party" />
            <h1>WePlan</h1>
          </LogoContainer>
          <h1>Seja bem vindo!</h1>

          <Link to="/">
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
