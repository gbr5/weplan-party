import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../Input';

import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';

interface IProps {
  handleGetEventInfo: Function;
  setBudgetDrawer: Function;
  eventId: string;
  eventInfo: IEventInfoDTO;
}

const EditEventBudgetWindow: React.FC<IProps> = ({
  handleGetEventInfo,
  setBudgetDrawer,
  eventInfo,
  eventId,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleEditBudget = useCallback(
    async (data: IEventInfoDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          budget: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-info`, {
          duration: eventInfo.duration,
          number_of_guests: eventInfo.number_of_guests,
          budget: Number(data.budget),
          description: eventInfo.description,
          country: eventInfo.country,
          local_state: eventInfo.local_state,
          city: eventInfo.city,
          address: eventInfo.address,
        });

        setBudgetDrawer(false);
        handleGetEventInfo();
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
    [addToast, eventId, eventInfo, setBudgetDrawer, handleGetEventInfo],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => setBudgetDrawer(false)}
      containerStyle={{
        zIndex: 10,
        top: '29vh',
        left: '5%',
        height: '42vh',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleEditBudget}>
        <Container>
          <span>
            <h2>Novo Orçamento</h2>

            <Input
              name="budget"
              placeholder="Orçamento"
              defaultValue={eventInfo.budget}
              type="text"
            />

            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </span>
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default EditEventBudgetWindow;
