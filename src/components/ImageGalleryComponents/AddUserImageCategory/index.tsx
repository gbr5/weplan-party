import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, SelectColorContainer, ColorButton } from './styles';
import Input from '../../Input';
import getValidationErrors from '../../../utils/getValidationErros';
import api from '../../../services/api';
import Button from '../../Button';

interface IFormData {
  name: string;
  description: string;
}

interface IProps {
  getUserImageCategories: Function;
  closeWindow: Function;
}

const AddUserImageCategory: React.FC<IProps> = ({
  getUserImageCategories,
  closeWindow,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#a02300');

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          description: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('user/image/categories', {
          user_id: user.id,
          name: data.name,
          description: data.description,
          color,
        });
        getUserImageCategories();
        closeWindow();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'info',
          title: 'Pasta criada com sucesso.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, getUserImageCategories, closeWindow, user.id, color],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome da Categoria" />
        <Input
          name="description"
          type="text"
          defaultValue="Descrição"
          placeholder="Descrição (Não é obrigatório)"
        />
        <SelectColorContainer>
          <ColorButton
            type="button"
            onClick={() => setColor('rgb(219,201,0)')}
            color="rgb(219,201,0)"
            isActive={color === 'rgb(219,201,0)'}
          >
            Amarelo
          </ColorButton>
          <ColorButton
            type="button"
            onClick={() => setColor('rgb(32,148,0)')}
            color="rgb(32,148,0)"
            isActive={color === 'rgb(32,148,0)'}
          >
            Verde
          </ColorButton>
          <ColorButton
            type="button"
            onClick={() => setColor('rgb(0,69,219)')}
            color="rgb(0,69,219)"
            isActive={color === 'rgb(0,69,219)'}
          >
            Azul
          </ColorButton>
          <ColorButton
            type="button"
            onClick={() => setColor('#a02300')}
            color="#a02300"
            isActive={color === '#a02300'}
          >
            Marrom
          </ColorButton>
          <ColorButton
            type="button"
            onClick={() => setColor('rgb(240,0,0)')}
            color="rgb(240,0,0)"
            isActive={color === 'rgb(240,0,0)'}
          >
            Vermelho
          </ColorButton>
        </SelectColorContainer>

        <Button loading={loading} type="submit">
          Criar Pasta de Imagens
        </Button>
      </Form>
      <Container />
    </WindowUnFormattedContainer>
  );
};

export default AddUserImageCategory;
