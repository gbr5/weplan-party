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
          first_name: Yup.string().required('Nome é obrigatório'),
          last_name: Yup.string().required('Sobrenome é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const findFirstAndLastName = await api.get(
          `person-info/${data.first_name}/${data.last_name}`,
        );

        if (findFirstAndLastName.data.id) {
          return addToast({
            type: 'error',
            title: 'Erro no cadastro | [Informações de Usuário].',
            description: `Nome e Sobrenome "${data.first_name} ${data.last_name}" já cadastrado em outro perfil, tente novamente.`,
          });
        }

        await api.post(`/person-info/${userId}`, {
          person_id: userId,
          first_name: data.first_name,
          last_name: data.last_name,
        });

        history.push('/signin');
        setOptions(true);
        setUserId('');

        return addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no GoBarber!',
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

        Promise.all([
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: `n/a - ${response.data.id}1`,
            contact_type: 'Whatsapp',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: `n/a - ${response.data.id}2`,
            contact_type: 'Phone',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: `n/a - ${response.data.id}3`,
            contact_type: 'Email',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: `n/a - ${response.data.id}4`,
            contact_type: 'Address',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: `n/a - ${response.data.id}5`,
            contact_type: 'Instagram',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: `n/a - ${response.data.id}6`,
            contact_type: 'Facebook',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: `n/a - ${response.data.id}7`,
            contact_type: 'Linkedin',
          }),
          api.post(`/profile/contact-info/add/${response.data.id}`, {
            contact_info: `n/a - ${response.data.id}8`,
            contact_type: 'Website',
          }),
        ]);

        setOptions(false);

        return addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Agora só falta você nos dizer o ser nome completo.',
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
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoContainer>
            <img src={weplanLogo} alt="WePlan - Party" />
            <h1>WePlan</h1>
          </LogoContainer>

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
                placeholder="Nome"
                autoCapitalize="false"
              />
              <Input
                name="last_name"
                icon={FiUser}
                type="text"
                placeholder="Sobrenome"
              />
              {/* <Input
                name="person_id"
                icon={FiUser}
                type="text"
                placeholder="CPF"
              /> */}

              <Button type="submit">Cadastrar</Button>
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
