import React, { MouseEventHandler, useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../Input';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';

interface IFormData {
  number_of_guests: number;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  currentNumberOfGuests: number;
  handleCloseWindow: Function;
  setEventInfo: Function;
  eventId: string;
  eventInfo: IEventInfoDTO;
}

const UpdateEventNumberOfGuestsWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  currentNumberOfGuests,
  handleCloseWindow,
  setEventInfo,
  eventId,
  eventInfo,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleEditEventInfo = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        if (data.number_of_guests < currentNumberOfGuests) {
          addToast({
            type: 'error',
            title: 'Erro ao editar informações do evento',
            description:
              'Número de convidados do evento não pode ser menor do que o número de convidados alocados para membros e anfitriões.',
          });
          throw new Error('Number of guests is higher than allowed!');
        }

        const response = await api.put(
          `/event/number-of-guests/update/${eventId}`,
          {
            number_of_guests: data.number_of_guests,
          },
        );
        const updatedEventInfo = response.data;
        setEventInfo(updatedEventInfo);

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
    [addToast, currentNumberOfGuests, handleCloseWindow, setEventInfo, eventId],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 40,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleEditEventInfo}>
        <Container>
          <h1>Número de convidados do evento</h1>
          <Input
            defaultValue={eventInfo ? eventInfo.number_of_guests : ''}
            name="number_of_guests"
            type="number"
            placeholder="Número de convidados"
          />
          <button type="submit">
            <h3>Salvar</h3>
          </button>
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default UpdateEventNumberOfGuestsWindow;
