import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';

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
import SetTimeWindow from '../SetTimeWindow';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  currentNumberOfGuests: number;
  handleCloseWindow: Function;
  eventId: string;
  eventInfo: IEventInfoDTO;
}

const EditEventInfoWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  currentNumberOfGuests,
  handleCloseWindow,
  eventId,
  eventInfo,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [eventDurationWindow, setEventDurationWindow] = useState(true);
  const [eventDuration, setEventDuration] = useState('');

  const handleEditEventInfo = useCallback(
    async (data: IEventInfoDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.number(),
          budget: Yup.number(),
          country: Yup.string(),
          local_state: Yup.string(),
          city: Yup.string(),
          address: Yup.string(),
          dress_code: Yup.string(),
          description: Yup.string(),
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
        let updatedEventInfo = {} as IEventInfoDTO;

        const hours = Number(eventDuration.split(':')[0]) * 60;
        const minutes = Number(eventDuration.split(':')[1]);

        if (!eventInfo.id) {
          const response = await api.post(`events/${eventId}/event-info`, {
            number_of_guests: data.number_of_guests,
            local_state: data.local_state,
            city: data.city,
            duration:
              eventDuration !== '' ? hours + minutes : eventInfo.duration,
            country: data.country,
            address: data.address,
            dress_code: data.dress_code,
            budget: data.budget,
            description: data.description,
          });
          updatedEventInfo = response.data;
        } else {
          const response = await api.put(`events/${eventId}/event-info`, {
            number_of_guests: data.number_of_guests,
            local_state: data.local_state,
            city: data.city,
            duration: eventDuration !== '' ? hours + minutes : '',
            country: data.country,
            address: data.address,
            dress_code: data.dress_code,
            budget: data.budget,
            description: data.description,
          });
          updatedEventInfo = response.data;
        }

        handleCloseWindow(updatedEventInfo);
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
    [
      addToast,
      currentNumberOfGuests,
      eventDuration,
      handleCloseWindow,
      eventId,
      eventInfo,
    ],
  );

  const handleEventDuration = useCallback((e: string) => {
    setEventDuration(e);
    setEventDurationWindow(false);
  }, []);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      {eventDurationWindow && (
        <SetTimeWindow
          closeWindow={() => setEventDurationWindow(false)}
          containerStyle={{
            height: '100%',
            width: '100%',
            left: '0%',
            top: '0%',
            zIndex: 25,
            position: 'fixed',
          }}
          message="Defina a duração do evento"
          setTime={(e: string) => handleEventDuration(e)}
        />
      )}

      <Form ref={formRef} onSubmit={handleEditEventInfo}>
        <Container>
          <h1>Editar informações do evento</h1>
          <div>
            <div>
              <div>
                <p>Descrição</p>
                <Input
                  defaultValue={
                    eventInfo && eventInfo.description
                      ? eventInfo.description
                      : ''
                  }
                  name="description"
                  type="text"
                  placeholder="Descrição"
                />
              </div>
              <div>
                <p>N° de Convidados</p>
                <Input
                  defaultValue={eventInfo ? eventInfo.number_of_guests : ''}
                  name="number_of_guests"
                  type="number"
                  placeholder="Número de convidados"
                />
              </div>
              <div>
                <p>Orçamento</p>
                <Input
                  defaultValue={eventInfo ? eventInfo.budget : ''}
                  name="budget"
                  type="number"
                  placeholder="Orçamento"
                />
              </div>
              <div>
                <p>Traje</p>
                <Input
                  defaultValue={
                    eventInfo && eventInfo.dress_code
                      ? eventInfo.dress_code
                      : ''
                  }
                  name="dress_code"
                  type="text"
                  placeholder="Traje"
                />
              </div>
            </div>
            <div>
              <div>
                <p>País</p>
                <Input
                  defaultValue={eventInfo ? eventInfo.country : ''}
                  name="country"
                  type="text"
                  placeholder="País"
                />
              </div>
              <div>
                <p>Estado</p>
                <Input
                  defaultValue={eventInfo ? eventInfo.local_state : ''}
                  name="local_state"
                  type="text"
                  placeholder="Estado"
                />
              </div>
              <div>
                <p>Cidade</p>
                <Input
                  defaultValue={eventInfo ? eventInfo.city : ''}
                  name="city"
                  type="text"
                  placeholder="Cidade"
                />
              </div>
              <div>
                <p>Endereço</p>
                <Input
                  defaultValue={eventInfo ? eventInfo.address : ''}
                  name="address"
                  type="text"
                  placeholder="Endereço"
                />
              </div>
            </div>
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
