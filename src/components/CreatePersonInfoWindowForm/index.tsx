import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiUser } from 'react-icons/fi';
import Button from '../Button';
import Input from '../Input';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';

import { Container, QuestionTitle } from './styles';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

interface IPersonUser {
  first_name: string;
  last_name: string;
}

interface IProps {
  handleCloseWindow: Function;
  getPersonInfo: Function;
}

const CreatePersonInfoWindowForm: React.FC<IProps> = ({
  handleCloseWindow,
  getPersonInfo,
}: IProps) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

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

        await api.post(`/person-info/${user.id}`, {
          person_id: user.id,
          first_name: data.first_name,
          last_name: data.last_name,
        });

        getPersonInfo();
        handleCloseWindow();

        return addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no WePlan!',
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
    [addToast, getPersonInfo, handleCloseWindow, user],
  );
  const containerStyles = {
    width: '100%',
    height: '40px',
  };

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => handleCloseWindow()}
      containerStyle={{
        zIndex: 100,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
      zIndex={99}
    >
      <Container>
        <Form ref={formRef} onSubmit={handleSubmitPersonInfo}>
          <QuestionTitle>
            <strong>Usuário Final</strong>
            Faça seu cadastro
          </QuestionTitle>

          <Input
            containerStyle={containerStyles}
            name="first_name"
            icon={FiUser}
            type="text"
            placeholder="Prénome"
          />
          <Input
            containerStyle={containerStyles}
            name="last_name"
            icon={FiUser}
            type="text"
            placeholder="Sobrenome"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default CreatePersonInfoWindowForm;
