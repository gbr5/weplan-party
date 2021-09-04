import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useEventGuests } from '../../../../hooks/eventGuests';

import Input from '../../../Input';
import Button from '../../../Button';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';

import { Container, Title, FormQuestion } from './styles';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useToast } from '../../../../hooks/toast';

interface IFormData {
  first_name: string;
  last_name: string;
}

const NewGuestForm: React.FC = () => {
  const { addNewGuest, loading, handleNewGuestForm } = useEventGuests();
  const { eventGuests } = useEventVariables();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async ({ first_name, last_name }: IFormData) => {
      const findGuest = eventGuests.find(
        guest =>
          guest.first_name === first_name && guest.last_name === last_name,
      );

      if (findGuest) {
        return addToast({
          title: `Convidado duplicado!`,
          description: `Já existe um convidado ${first_name} ${last_name}.`,
          type: 'error',
        });
      }
      await addNewGuest({
        first_name,
        last_name,
      });
      return handleNewGuestForm();
    },
    [handleNewGuestForm, addNewGuest, addToast, eventGuests],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleNewGuestForm}
      zIndex={11}
      containerStyle={{
        zIndex: 12,
        top: '10%',
        left: '2%',
        height: '60%',
        width: '96%',
      }}
    >
      <Container>
        <Title>Novo(a) Convidado(a)</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormQuestion>Nome</FormQuestion>
          <Input name="first_name" placeholder="Nome" />
          <FormQuestion>Sobrenome</FormQuestion>
          <Input name="last_name" placeholder="Sobrenome" />
          <Button loading={loading} type="submit">
            Criar
          </Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default NewGuestForm;
