import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

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
  QuestionTitle,
} from './styles';

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
interface ICompanyUser {
  company_id: string;
  name: string;
}

const SignUp: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [isSupplier, setIsSupplier] = useState(false);
  const [options, setOptions] = useState(true);
  const [isCompanyQuestion, setIsCompanyQuestion] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleUserSupplier = useCallback(() => {
    setIsCompany(true);
    setOptions(false);
    setIsSupplier(true);
    setIsCompanyQuestion(false);
  }, []);

  const handleUserHost = useCallback(() => {
    setIsCompany(false);
    setOptions(false);
    setIsSupplier(false);
    setIsCompanyQuestion(false);
  }, []);

  const handleCompanyInfo = useCallback(() => {
    setIsSupplier(true);
    setIsCompanyQuestion(true);
  }, []);

  const handlePersonInfo = useCallback(() => {
    setIsSupplier(false);
    setIsCompanyQuestion(true);
  }, []);

  const handleSubmitPersonInfo = useCallback(
    async (data: IPersonUser) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          person_id: Yup.string().required('CPF é obrigatório'),
          first_name: Yup.string().required('Nome é obrigatório'),
          last_name: Yup.string().required('Sobrenome é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/person-info', {
          person_id: data.person_id,
          first_name: data.first_name,
          last_name: data.last_name,
          user_id: userId,
        });

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
    [addToast, history, userId],
  );

  const handleSubmitCompanyInfo = useCallback(
    async (data: ICompanyUser) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          company_id: Yup.string().required('CNPJ é obrigatório'),
          name: Yup.string().required('Nome é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/company-info', {
          company_id: data.company_id,
          name: data.name,
          user_id: userId,
        });

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
    [addToast, history, userId],
  );

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

        const response = await api.post('/users', validatedData);
        setUserId(response.data.id);

        setOptions(false);
        setIsCompanyQuestion(true);

        if (isCompany) {
          handleCompanyInfo();
        } else {
          handlePersonInfo();
        }

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
    [addToast, handleCompanyInfo, handlePersonInfo, isCompany],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          {options && isCompanyQuestion && (
            <>
              <h1>WePlan</h1>
              <QuestionContainer>
                <QuestionTitle>Quem é você?</QuestionTitle>
                <SubContainer>
                  <ButtonContainer>
                    <Button onClick={handleUserHost}>Usuário final</Button>
                  </ButtonContainer>
                  <ButtonContainer>
                    <Button onClick={handleUserSupplier}>Fornecedor</Button>
                  </ButtonContainer>
                </SubContainer>
              </QuestionContainer>

              {/* {isCompanyQuestion === false ? (
                <QuestionContainer>
                  <QuestionTitle>Quem é você?</QuestionTitle>
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
                      <Button onClick={handleUserHost}>Usuário final</Button>
                    </ButtonContainer>
                    <ButtonContainer>
                      <Button onClick={handleUserSupplier}>Fornecedor</Button>
                    </ButtonContainer>
                  </SubContainer>
                </QuestionContainer>
              )} */}
            </>
          )}

          {/* {!options &&
            (isSupplier ? (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <QuestionTitle>
                  <strong>Fornecedor</strong>
                  Faça seu cadastro
                </QuestionTitle>

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
                <QuestionTitle>
                  <strong>Usuário Final</strong>
                  Faça seu cadastro
                </QuestionTitle>

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
            ))} */}
          {!options && !isCompanyQuestion && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <QuestionTitle>
                <strong>WePlan</strong>
                Faça seu cadastro
              </QuestionTitle>

              <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
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
          )}

          {!options &&
            isCompanyQuestion &&
            (isSupplier ? (
              <Form ref={formRef} onSubmit={handleSubmitCompanyInfo}>
                <QuestionTitle>
                  <strong>Usuário Final</strong>
                  Faça seu cadastro
                </QuestionTitle>

                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder="Razão social"
                />
                <Input
                  name="company_id"
                  icon={FiUser}
                  type="text"
                  placeholder="CNPJ"
                />

                <Button type="submit">Cadastrar</Button>
              </Form>
            ) : (
              <Form ref={formRef} onSubmit={handleSubmitPersonInfo}>
                <QuestionTitle>
                  <strong>Usuário Final</strong>
                  Faça seu cadastro
                </QuestionTitle>

                <Input
                  name="first_name"
                  icon={FiUser}
                  type="text"
                  placeholder="Prénome"
                />
                <Input
                  name="last_name"
                  icon={FiUser}
                  type="text"
                  placeholder="Sobrenome"
                />
                <Input
                  name="person_id"
                  icon={FiUser}
                  type="text"
                  placeholder="CPF"
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
