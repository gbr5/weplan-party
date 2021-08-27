import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../Input';

import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import { useEvent } from '../../hooks/event';
import { useEventVariables } from '../../hooks/eventVariables';
import { useCurrentEvent } from '../../hooks/currentEvent';

interface IFormProps {
  budget: number;
}

const EditEventBudgetWindow: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { eventBudget } = useEventVariables();
  const { updateEventBudget, createEventBudget } = useCurrentEvent();
  const { handleEventBudgetWindow } = useEvent();

  const handleSubmit = useCallback(
    async (data: IFormProps) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          budget: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { budget } = data;

        if (eventBudget && eventBudget.id) {
          const { id, event_id } = eventBudget;
          await updateEventBudget({
            budget,
            id,
            event_id,
          });
        } else {
          await createEventBudget(budget);
        }

        handleEventBudgetWindow();
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
      eventBudget,
      handleEventBudgetWindow,
      updateEventBudget,
      createEventBudget,
    ],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEventBudgetWindow}
      containerStyle={{
        zIndex: 10,
        top: '29vh',
        left: '5%',
        height: '42vh',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <span>
            <h2>Novo Orçamento</h2>

            <Input
              name="budget"
              placeholder="Orçamento"
              defaultValue={
                eventBudget && eventBudget.id ? eventBudget.budget : 0
              }
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
