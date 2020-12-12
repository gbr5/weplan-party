import React, { MouseEventHandler, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import IEventDTO from '../../dtos/IEventDTO';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  eventId: string;
  eventName: string;
  eventDate: string;
}

const EditEventNameWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  eventName,
  eventDate,
  eventId,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleEditEventName = useCallback(
    async (data: IEventDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}`, {
          name: data.name,
          date: eventDate,
        });

        handleCloseWindow();
        addToast({
          type: 'success',
          title: 'Informações editadas com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao editar informações do evento',
          description: 'Tente novamente.',
        });
      }
    },
    [addToast, eventId, handleCloseWindow, eventDate],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 10,
        top: '140px',
        left: '535px',
        height: '250px',
        width: '440px',
      }}
    >
      <Form ref={formRef} onSubmit={handleEditEventName}>
        <Container>
          <span>
            <h2>Nome do Evento</h2>
            <Input
              name="name"
              placeholder="Nome do evento"
              defaultValue={eventName}
              type="text"
            />
            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </span>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default EditEventNameWindow;
