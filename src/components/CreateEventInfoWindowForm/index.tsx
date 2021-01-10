import React, { useCallback, useRef } from 'react';
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

  const handlePostEventInfo = useCallback(
    async (data: ICreateEventInfoDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.string().required('Nome é obrigatório'),
          duration: Yup.string(),
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

        const hours = Number(data.duration.split(':')[0]) * 60;
        const minutes = Number(data.duration.split(':')[0]);

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

        addToast({
          type: 'success',
          title: 'Item criado com Sucesso',
          description: 'O item foi adicionado à sua check-list.',
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
    [addToast, handleCloseWindow, getEventInfo, eventId],
  );

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
      <Form ref={formRef} onSubmit={handlePostEventInfo}>
        <EventInfoForm>
          <h1>Informações do evento</h1>
          <div>
            <div>
              <Input
                name="duration"
                type="number"
                placeholder="Duração (em horas)"
              />
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
              <Input name="dress_code" type="text" placeholder="Traje" />
            </div>
            <Input name="address" type="text" placeholder="Endereço" />
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
