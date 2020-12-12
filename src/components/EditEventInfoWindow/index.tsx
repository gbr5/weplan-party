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
import IEventInfoDTO from '../../dtos/IEventInfoDTO';
import IEventDTO from '../../dtos/IEventDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  currentNumberOfGuests: number;
  handleCloseWindow: Function;
  event: IEventDTO;
  eventInfo: IEventInfoDTO;
}

const EditEventInfoWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  currentNumberOfGuests,
  handleCloseWindow,
  event,
  eventInfo,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleEditEventInfo = useCallback(
    async (data: IEventInfoDTO) => {
      try {
        if (!eventInfo.id && !event.eventInfo) {
          formRef.current?.setErrors([]);

          const schema = Yup.object().shape({
            duration: Yup.number(),
            number_of_guests: Yup.number(),
            budget: Yup.number(),
            country: Yup.string(),
            local_state: Yup.string(),
            city: Yup.string(),
            address: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          if (data.number_of_guests < currentNumberOfGuests) {
            addToast({
              type: 'error',
              title: 'Erro ao adicionar anfitrião',
              description:
                'Número de convidados excede o limite, tente novamente.',
            });
            throw new Error('Number of guests is higher than allowed!');
          }

          await api.post(`events/${event.id}/event-info`, {
            number_of_guests: data.number_of_guests,
            local_state: data.local_state,
            city: data.city,
            duration: data.duration,
            country: data.country,
            address: data.address,
            budget: data.budget,
            description: 'Descrição',
          });
        } else {
          formRef.current?.setErrors([]);

          const schema = Yup.object().shape({
            duration: Yup.number(),
            number_of_guests: Yup.number(),
            budget: Yup.number(),
            country: Yup.string(),
            local_state: Yup.string(),
            city: Yup.string(),
            address: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          if (data.number_of_guests < currentNumberOfGuests) {
            addToast({
              type: 'error',
              title: 'Erro ao adicionar anfitrião',
              description:
                'Número de convidados excede o limite, tente novamente.',
            });
            throw new Error('Number of guests is higher than allowed!');
          }

          await api.put(`events/${event.id}/event-info`, {
            number_of_guests: data.number_of_guests,
            local_state: data.local_state,
            city: data.city,
            duration: data.duration,
            country: data.country,
            address: data.address,
            budget: data.budget,
            description: 'Descrição',
          });
        }

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
    [addToast, currentNumberOfGuests, handleCloseWindow, event, eventInfo],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '15%',
        left: '20%',
        height: '70%',
        width: '60%',
      }}
    >
      <Form ref={formRef} onSubmit={handleEditEventInfo}>
        <Container>
          <h1>Editar informações do evento</h1>
          <div>
            <div>
              <Input
                defaultValue={eventInfo ? eventInfo.duration : ''}
                name="duration"
                type="number"
                placeholder="Duração (em horas)"
              />
              <Input
                defaultValue={eventInfo ? eventInfo.number_of_guests : ''}
                name="number_of_guests"
                type="number"
                placeholder="Número de convidados"
              />
              <Input
                defaultValue={eventInfo ? eventInfo.budget : ''}
                name="budget"
                type="number"
                placeholder="Orçamento"
              />
            </div>
            <div>
              <Input
                defaultValue={eventInfo ? eventInfo.country : ''}
                name="country"
                type="text"
                placeholder="País"
              />
              <Input
                defaultValue={eventInfo ? eventInfo.local_state : ''}
                name="local_state"
                type="text"
                placeholder="Estado"
              />
              <Input
                defaultValue={eventInfo ? eventInfo.city : ''}
                name="city"
                type="text"
                placeholder="Cidade"
              />
            </div>
            <Input
              defaultValue={eventInfo ? eventInfo.address : ''}
              name="address"
              type="text"
              placeholder="Endereço"
            />
          </div>
          <button type="submit">
            <h3>Salvar</h3>
          </button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default EditEventInfoWindow;
