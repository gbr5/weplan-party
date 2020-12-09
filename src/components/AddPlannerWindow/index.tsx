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
import IEventSupplierDTO from '../../dtos/IEventSupplierDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  eventId: string;
  handleCloseWindow: Function;
  selectedSupplier: IEventSupplierDTO;
}

const AddPlannerWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventId,
  handleCloseWindow,
  selectedSupplier,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleAddPlanner = useCallback(async () => {
    try {
      await api.post(`events/${eventId}/event-planner`, {
        planner_id: selectedSupplier.id,
      });
      handleCloseWindow();
      addToast({
        type: 'success',
        title: 'Cerimonialista adicionado com sucesso com Sucesso',
        description: 'O item foi adicionado à sua check-list.',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }
      handleCloseWindow();

      addToast({
        type: 'error',
        title: 'Erro ao adicionar cerimonialista',
        description: 'Erro  ao adicionar cerimonialista, tente novamente.',
      });
    }
  }, [addToast, eventId, handleCloseWindow, selectedSupplier]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '20%',
        left: '20%',
        height: '60%',
        width: '60%',
      }}
    >
      <Form ref={formRef} onSubmit={handleAddPlanner}>
        <Container>
          <h1>Adicionar Cerimonialista</h1>

          <Input
            name="planner_id"
            type="text"
            placeholder="Qual o id do cerimonialista?"
          />

          <button type="submit">
            <h3>Salvar</h3>
          </button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default AddPlannerWindow;
