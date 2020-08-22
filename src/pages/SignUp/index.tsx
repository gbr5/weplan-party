import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { MdBusiness } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  QuestionContainer,
  SubContainer,
  ButtonContainer,
  ButtonContainerTitle,
  QuestionTitle,
} from './styles';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [isSupplier, setIsSupplier] = useState(false);
  const [options, setOptions] = useState(true);
  const [isCompanyQuestion, setIsCompanyQuestion] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleUserSupplier = useCallback(() => {
    setIsSupplier(true);
    setOptions(false);
  }, []);

  const handleUserHost = useCallback(() => {
    setIsSupplier(false);
    setOptions(false);
  }, []);

  const handleIsCompany = useCallback(() => {
    setIsCompany(true);
    setIsCompanyQuestion(true);
  }, []);

  const handleIsPerson = useCallback(() => {
    setIsCompany(false);
    setIsCompanyQuestion(true);
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpForm) => {
      try {
        formRef.current?.setErrors({});

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

        const validatedData = {
          name: data.name,
          email: data.email,
          password: data.password,
          isCompany,
        };

        await api.post('/users', validatedData);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history, isCompany],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          {options && (
            <>
              <img src={logoImg} alt="GoBarber" />

              {isCompanyQuestion === false ? (
                <QuestionContainer>
                  <QuestionTitle>Quero criar um perfil de</QuestionTitle>
                  <SubContainer>
                    <ButtonContainer>
                      <ButtonContainerTitle>Pessoa Física</ButtonContainerTitle>
                      <Button onClick={handleIsPerson}>
                        <FiUser size={30} />
                      </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                      <ButtonContainerTitle>
                        Pessoa Jurídica
                      </ButtonContainerTitle>
                      <Button onClick={handleIsCompany}>
                        <MdBusiness size={30} />
                      </Button>
                    </ButtonContainer>
                  </SubContainer>
                </QuestionContainer>
              ) : (
                <QuestionContainer>
                  <QuestionTitle>Quem é você?</QuestionTitle>
                  <SubContainer>
                    <ButtonContainer>
                      <ButtonContainerTitle>Anfitrião</ButtonContainerTitle>
                      <Button onClick={handleUserHost}>Dono da Festa</Button>
                    </ButtonContainer>
                    <ButtonContainer>
                      <ButtonContainerTitle>Fornecedor</ButtonContainerTitle>
                      <Button onClick={handleUserSupplier}>
                        Faço a FESTA acontecer
                      </Button>
                    </ButtonContainer>
                  </SubContainer>
                </QuestionContainer>
              )}
            </>
          )}

          {!options &&
            (isSupplier ? (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faço a FESTA acontecer</h1>
                <h1>Faça seu cadastro</h1>

                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder="Nome"
                />
                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
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

                <Button type="submit">Cadastrar</Button>
              </Form>
            ) : (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Dono da festa</h1>
                <h1>Faça seu cadastro</h1>

                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder="Nome"
                />
                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
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
                <Button type="submit">Cadastrar</Button>
              </Form>
            ))}

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
