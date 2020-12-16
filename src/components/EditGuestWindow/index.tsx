import React, { MouseEventHandler, useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  eventId: string;
  weplanUser: boolean;
  guest: IEventGuestDTO;
  handleCloseWindow: Function;
  handleGetGuests: Function;
}

const EditGuestWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventId,
  weplanUser,
  guest,
  handleCloseWindow,
  handleGetGuests,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleEditGuest = useCallback(
    async (data: IEventGuestDTO) => {
      try {
        formRef.current?.setErrors([]);

        if (weplanUser) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${eventId}/guests/${guest.id}`, {
            first_name: guest.first_name,
            last_name: guest.last_name,
            description: data.description,
            confirmed: guest.confirmed,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${eventId}/guests/${guest.id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            confirmed: guest.confirmed,
          });
        }

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        handleGetGuests();
        handleCloseWindow();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
      }
    },
    [addToast, eventId, weplanUser, guest, handleGetGuests, handleCloseWindow],
  );

  const handleDeleteGuest = useCallback(async () => {
    try {
      await api.delete(`/events/guests/${guest.id}`);

      addToast({
        type: 'success',
        title: 'Convidado excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      handleCloseWindow(false);
      handleGetGuests();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir convidado',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [guest, addToast, handleGetGuests, handleCloseWindow]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '5%',
        left: '20%',
        height: '90%',
        width: '60%',
      }}
    >
      <Form ref={formRef} onSubmit={handleEditGuest}>
        <Container>
          <h1>Editar Convidado</h1>

          {!guest.weplanUser && (
            <>
              <Input
                defaultValue={guest.first_name}
                name="first_name"
                type="text"
                placeholder="Nome"
              />
              <Input
                defaultValue={guest.last_name}
                name="last_name"
                type="text"
                placeholder="Sobrenome"
              />
            </>
          )}
          <Input
            defaultValue={guest.description}
            name="description"
            type="text"
            placeholder="Alguma descrição necessária?"
          />

          <button type="submit">
            <h3>Salvar</h3>
          </button>

          <button type="button" onClick={handleDeleteGuest}>
            <h3>Deletar</h3>
          </button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default EditGuestWindow;
