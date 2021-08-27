import React, { useCallback, useRef, ReactElement } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { addDays, addMonths } from 'date-fns';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useTransaction } from '../../../../hooks/transactions';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import ICreateTransactionDTO from '../../../../dtos/ICreateTransactionDTO';
import IEventSupplierDTO from '../../../../dtos/IEventSupplierDTO';
import getValidationErrors from '../../../../utils/getValidationErros';

import { WindowHeader } from '../../../WindowHeader';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import Button from '../../../Button';
import Input from '../../../Input';

import {
  Container,
  SupplierContainer,
  SupplierName,
  Question,
  SupplierText,
} from './styles';
import { useToast } from '../../../../hooks/toast';
import { DatePickerLine } from '../../../TimePickerLine';

interface IFormData {
  amount: string;
  number_of_installments: string;
}

export function CreateSupplierTransactionAgreement(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const {
    selectedEventSupplier,
    selectEventSupplier,
    selectedEvent,
    selectNewTransactions,
    handleSelectedDate,
    selectedDate,
  } = useEventVariables();
  const {
    handleCreateSupplierTransactionAgreementWindow,
  } = useEventSuppliers();
  const {
    handleNewAgreement,
    handleNewEventSupplierTransactionAgreement,
  } = useTransaction();

  function closeWindow(): void {
    handleNewAgreement({
      amount: 0,
      installments: 1,
    });
    selectNewTransactions([]);
    selectEventSupplier({} as IEventSupplierDTO);
    handleCreateSupplierTransactionAgreementWindow();
    handleSelectedDate(addDays(new Date(), 3));
  }

  const handleSubmit = useCallback(
    async ({ amount, number_of_installments }: IFormData) => {
      try {
        formRef.current?.setErrors({});

        if (!Number(amount)) {
          return addToast({
            title: 'Valor do Contrato',
            description: 'Apenas números são aceitos!',
            type: 'error',
          });
        }

        if (!Number(number_of_installments)) {
          return addToast({
            title: 'Número de Parcelas',
            description: 'Apenas números são aceitos!',
            type: 'error',
          });
        }

        if (!selectedEventSupplier || !selectedEventSupplier.id) {
          return addToast({
            title: 'Escolha um fornecedor!',
            type: 'error',
          });
        }

        const data = {
          amount: Number(amount),
          number_of_installments: Number(number_of_installments),
        };

        const schema = Yup.object().shape({
          amount: Yup.number().required('Apenas números'),
          number_of_installments: Yup.number().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        handleNewAgreement({
          amount: data.amount,
          installments: data.number_of_installments,
        });
        const transactions: ICreateTransactionDTO[] = [];
        let i = 0;
        // eslint-disable-next-line no-plusplus
        for (i; i < data.number_of_installments; i++) {
          transactions.push({
            name: '',
            amount: data.amount / data.number_of_installments,
            category: selectedEventSupplier.supplier_sub_category,
            due_date: addMonths(new Date(selectedDate.setHours(10)), i),
            isPaid: false,
            payee_id: selectedEventSupplier.id,
            payer_id: selectedEvent.id,
          });
        }
        selectNewTransactions(transactions);

        handleCreateSupplierTransactionAgreementWindow();
        return handleNewEventSupplierTransactionAgreement();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }
        return addToast({
          title: 'Erro ao criar contrato',
          description: 'Tente novamente!',
          type: 'error',
        });
      }
    },
    [
      addToast,
      handleCreateSupplierTransactionAgreementWindow,
      handleNewEventSupplierTransactionAgreement,
      handleNewAgreement,
      selectNewTransactions,
      selectedEventSupplier,
      selectedEvent,
      selectedDate,
    ],
  );

  function handleFirstInstallmentDate(date: Date): void {
    handleSelectedDate(date);
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={closeWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '2%',
        height: '92%',
        width: '96%',
      }}
    >
      <WindowHeader title="Novo Contrato" />
      <Container>
        <SupplierContainer>
          <SupplierText>Fornecedor: </SupplierText>
          <SupplierName>{selectedEventSupplier.name}</SupplierName>
        </SupplierContainer>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Question>Valor do Contrato</Question>
          <Input name="amount" type="number" />

          <Question>Número de Parcelas</Question>
          <Input defaultValue="1" type="number" name="number_of_installments" />

          <Question>Data da primeira parcela</Question>
          <DatePickerLine
            handleSelectedDate={handleFirstInstallmentDate}
            selectedDate={selectedDate}
          />
          <Button type="submit">Próximo</Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
