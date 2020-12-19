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

import {
  Container,
  Content,
  AnimationContainer,
  Background,
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

const SignUp: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [options, setOptions] = useState(true);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

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

        await api.post(`/person-info/${userId}`, {
          person_id: data.person_id,
          first_name: data.first_name,
          last_name: data.last_name,
        });

        history.push('/signin');
        setOptions(true);
        setUserId('');

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
          isCompany: false,
        };

        const response = await api.post('/users', validatedData);
        setUserId(response.data.id);

        Promise.all([
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: 'n/a',
            contact_type: 'Whatsapp',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: 'n/a',
            contact_type: 'Phone',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: 'n/a',
            contact_type: 'Email',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: 'n/a',
            contact_type: 'Address',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: 'n/a',
            contact_type: 'Instagram',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: 'n/a',
            contact_type: 'Facebook',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: 'n/a',
            contact_type: 'Linkedin',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: 'n/a',
            contact_type: 'Website',
          }),
        ]);

        setOptions(false);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você será redirecionado para a página de login!',
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
    [addToast],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <h1>WePlan</h1>
          {!!options && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <QuestionTitle>Faça seu cadastro</QuestionTitle>

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
          )}

          <Link to="/signin">
            <FiArrowRight />
            Já sou cadastrado
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
