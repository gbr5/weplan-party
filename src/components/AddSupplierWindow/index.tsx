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
import ISupplierDTO from '../../dtos/ISupplierDTO';

interface ICreateSupplier {
  name: string;
  supplier_sub_category: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  eventId: string;
  isHiredMessage: string;
  supplierSubCategory: string;
  selectedWeplanSupplier: ISupplierDTO;
  isHired: boolean;
  handleCloseWindow: Function;
  weplanSupplier: boolean;
  handleCreateTransactionWindow: Function;
  handleIsHiredDrawer: Function;
  handleSetWeplanSupplierListWindow: Function;
}

const AddSupplierWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventId,
  isHiredMessage,
  supplierSubCategory,
  isHired,
  handleCloseWindow,
  selectedWeplanSupplier,
  weplanSupplier,
  handleCreateTransactionWindow,
  handleIsHiredDrawer,
  handleSetWeplanSupplierListWindow,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleAddSupplier = useCallback(
    async (data: ICreateSupplier) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        if (weplanSupplier) {
          const newSupplier = await api.post(
            `events/event-suppliers/${eventId}`,
            {
              name: selectedWeplanSupplier.supplier.name,
              supplier_sub_category: supplierSubCategory,
              isHired,
              weplanUser: weplanSupplier,
            },
          );
          await api.post(`events/${eventId}/event-weplan-suppliers`, {
            user_id: selectedWeplanSupplier.supplier.id,
            event_supplier_id: newSupplier.data.id,
          });

          addToast({
            type: 'success',
            title: `${data.name} adicionado com Sucesso`,
            description:
              'Você já pode visualizar as alterações na página do seu evento.',
          });
          if (isHired) {
            handleCreateTransactionWindow(newSupplier.data);
          }
          handleCloseWindow();
        } else {
          const newSupplier = await api.post(
            `events/event-suppliers/${eventId}`,
            {
              name: data.name,
              supplier_sub_category: supplierSubCategory,
              isHired,
              weplanUser: weplanSupplier,
            },
          );
          addToast({
            type: 'success',
            title: `${data.name} adicionado com Sucesso`,
            description:
              'Você já pode visualizar as alterações na página do seu evento.',
          });
          if (isHired) {
            handleCreateTransactionWindow(newSupplier.data);
          }
          handleCloseWindow();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao selecionar fornecedor',
          description: 'Erro selecionar fornecedor, tente novamente.',
        });
      }
    },
    [
      isHired,
      addToast,
      supplierSubCategory,
      handleCreateTransactionWindow,
      selectedWeplanSupplier,
      weplanSupplier,
      eventId,
      handleCloseWindow,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 1000,
        top: '20%',
        left: '20%',
        height: '60%',
        width: '60%',
      }}
    >
      <Form ref={formRef} onSubmit={handleAddSupplier}>
        <Container>
          <h1>Adicionar Fornecedor</h1>

          {isHiredMessage === '' ? (
            <button type="button" onClick={() => handleIsHiredDrawer(false)}>
              Contratado?
            </button>
          ) : (
            <h1>
              <button type="button" onClick={() => handleIsHiredDrawer(true)}>
                {isHiredMessage}
              </button>
            </h1>
          )}

          {weplanSupplier ? (
            <button
              type="button"
              onClick={() => handleSetWeplanSupplierListWindow(false)}
            >
              Fornecedor WePlan
            </button>
          ) : (
            <h1>
              <button
                type="button"
                onClick={() => handleSetWeplanSupplierListWindow(true)}
              >
                Forcecedor WePlan?
              </button>
            </h1>
          )}
          <Input
            name="name"
            type="text"
            placeholder="Nome do fornecedor"
            containerStyle={{ height: '40px' }}
          />
          <button type="submit">
            <h3>Salvar</h3>
          </button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default AddSupplierWindow;
