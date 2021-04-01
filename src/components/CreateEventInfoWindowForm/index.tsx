import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Input from '../Input';

import { EventInfoForm } from './styles';
import ICreateEventInfoDTO from '../../dtos/ICreateEventInfoDTO';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import SetTimeWindow from '../SetTimeWindow';
import { useEvent } from '../../hooks/event';

interface IProps {
  eventId: string;
  getEventInfo: Function;
  handleCloseWindow: Function;
}

const CreateEventInfoWindowForm: React.FC<IProps> = ({
  handleCloseWindow,
  eventId,
  getEventInfo,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { getEventsAsOwner } = useEvent();

  const [eventDurationWindow, setEventDurationWindow] = useState(true);
  const [eventDuration, setEventDuration] = useState('');

  const handlePostEventInfo = useCallback(
    async (data: ICreateEventInfoDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.string().required('Nome é obrigatório'),
          budget: Yup.number().required(''),
          description: Yup.string().required(),
          country: Yup.string().required(),
          local_state: Yup.string().required(),
          city: Yup.string().required(),
          address: Yup.string().required(),
          dress_code: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const hours = Number(eventDuration.split(':')[0]) * 60;
        const minutes = Number(eventDuration.split(':')[1]);

        await api.post(`events/${eventId}/event-info`, {
          number_of_guests: data.number_of_guests,
          duration: hours + minutes,
          budget: data.budget,
          description: data.description,
          country: data.country,
          local_state: data.local_state,
          city: data.city,
          address: data.address,
          dress_code: data.dress_code,
        });

        getEventInfo();
        getEventsAsOwner();

        addToast({
          type: 'success',
          title: 'Evento Atualizado com Sucesso',
          description: 'As mudanças serão propagadas em instantes.',
        });
        handleCloseWindow();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar item da check-list',
          description: 'Erro  ao criar o item, tente novamente.',
        });
      }
    },
    [
      addToast,
      handleCloseWindow,
      getEventsAsOwner,
      getEventInfo,
      eventDuration,
      eventId,
    ],
  );

  const handleEventDuration = useCallback((e: string) => {
    setEventDuration(e);
    setEventDurationWindow(false);
  }, []);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => handleCloseWindow()}
      containerStyle={{
        zIndex: 15,
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
      <Form ref={formRef} onSubmit={handlePostEventInfo}>
        <EventInfoForm>
          <h1>Informações do evento</h1>
          <div>
            <div>
              <Input name="dress_code" type="text" placeholder="Traje" />
              <Input
                name="number_of_guests"
                type="number"
                placeholder="Número de convidados"
              />
              <Input name="budget" type="number" placeholder="Orçamento" />
              <Input name="description" type="text" placeholder="Descrição" />
            </div>
            <div>
              <Input name="country" type="text" placeholder="País" />
              <Input name="local_state" type="text" placeholder="Estado" />
              <Input name="city" type="text" placeholder="Cidade" />
              <Input name="address" type="text" placeholder="Endereço" />
            </div>
          </div>

          <button type="submit">
            <h3>Salvar</h3>
          </button>
        </EventInfoForm>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default CreateEventInfoWindowForm;
