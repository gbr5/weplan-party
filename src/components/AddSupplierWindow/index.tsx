import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../Input';

import { Container, InputContainer } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import ISupplierDTO from '../../dtos/ISupplierDTO';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import SuppliersListDrawer from '../SuppliersListDrawer';
import SupplierServiceOrderFormWindow from '../SupplierServiceOrderFormWindow';

interface ICreateSupplier {
  name: string;
  supplier_sub_category: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  eventId: string;
  isHiredMessage: string;
  supplierSubCategory: string;
  supplierCategory: string;
  isHired: boolean;
  handleCloseWindow: Function;
  handleCreateTransactionWindow: Function;
  handleIsHiredDrawer: Function;
}

const AddSupplierWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventId,
  isHiredMessage,
  supplierSubCategory,
  isHired,
  handleCloseWindow,
  supplierCategory,
  handleCreateTransactionWindow,
  handleIsHiredDrawer,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [weplanSupplier, setWePlanSupplier] = useState(false);
  const [supplierServiceOrderWindow, setSupplierServiceOrderWindow] = useState(
    false,
  );
  const [weplanSupplierListWindow, setWeplanSupplierListWindow] = useState(
    false,
  );
  const [selectedWeplanSupplier, setSelectedWeplanSupplier] = useState<
    ISupplierDTO
  >({} as ISupplierDTO);

  const handleAddSupplier = useCallback(
    async (data: ICreateSupplier) => {
      console.log(data);
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(weplanSupplier, selectedWeplanSupplier, 'linha 64');

        if (
          weplanSupplier &&
          selectedWeplanSupplier &&
          selectedWeplanSupplier.userBySupplierCategory
        ) {
          console.log(weplanSupplier, selectedWeplanSupplier, 'linha 70');
          const newSupplier = await api.post(
            `events/event-suppliers/${eventId}`,
            {
              name: selectedWeplanSupplier.userBySupplierCategory.name,
              supplier_sub_category: supplierSubCategory,
              isHired,
              weplanUser: weplanSupplier,
            },
          );
          await api.post(`events/${eventId}/event-weplan-suppliers`, {
            user_id: selectedWeplanSupplier.userBySupplierCategory.id,
            event_supplier_id: newSupplier.data.id,
          });

          setSupplierServiceOrderWindow(true);
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
          setSupplierServiceOrderWindow(true);
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
      setSupplierServiceOrderWindow,
      addToast,
      supplierSubCategory,
      handleCreateTransactionWindow,
      selectedWeplanSupplier,
      weplanSupplier,
      eventId,
      handleCloseWindow,
    ],
  );
  const handleSetSelectedWeplanSupplier = useCallback((props: ISupplierDTO) => {
    console.log(props);
    setSelectedWeplanSupplier(props);
    setWePlanSupplier(true);
    setWeplanSupplierListWindow(false);
  }, []);
  return (
    <>
      {supplierServiceOrderWindow && (
        <SupplierServiceOrderFormWindow
          event_id={eventId}
          supplier_id={selectedWeplanSupplier.userBySupplierCategory.id}
          handleCloseWindow={() => setSupplierServiceOrderWindow(false)}
          onHandleCloseWindow={() => setSupplierServiceOrderWindow(false)}
        />
      )}
      {weplanSupplierListWindow && (
        <SuppliersListDrawer
          category={supplierCategory}
          sub_category={supplierSubCategory}
          handleSelectedSupplier={(e: ISupplierDTO) =>
            handleSetSelectedWeplanSupplier(e)
          }
          onHandleSuppliersListDrawer={() =>
            setWeplanSupplierListWindow(!weplanSupplierListWindow)
          }
        />
      )}
      <WindowUnFormattedContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 15,
          top: '5%',
          left: '5%',
          height: '90%',
          width: '90%',
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
                onClick={() => setWeplanSupplierListWindow(false)}
              >
                Fornecedor WePlan
              </button>
            ) : (
              <h1>
                <button
                  type="button"
                  onClick={() => setWeplanSupplierListWindow(true)}
                >
                  Forcecedor WePlan?
                </button>
              </h1>
            )}
            {weplanSupplier &&
            selectedWeplanSupplier &&
            selectedWeplanSupplier.userBySupplierCategory ? (
              <h3>{selectedWeplanSupplier.userBySupplierCategory.name}</h3>
            ) : (
              <InputContainer>
                <h3>Nome do Fornecedor</h3>
                <Input
                  name="name"
                  type="text"
                  placeholder="Nome do fornecedor"
                  containerStyle={{ height: '40px' }}
                />
              </InputContainer>
            )}
            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </Container>
        </Form>
      </WindowUnFormattedContainer>
    </>
  );
};

export default AddSupplierWindow;
