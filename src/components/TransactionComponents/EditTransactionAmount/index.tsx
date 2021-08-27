import React, { useRef, useState, useMemo, ReactElement } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErros';
import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';

import { useTransaction } from '../../../hooks/transactions';

import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';
import Input from '../../Input';
import Button from '../../Button';

import { Container, ValueContainer, CurrentValue, Title } from './styles';
import { useEventSuppliers } from '../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../hooks/eventVariables';
import { useToast } from '../../../hooks/toast';

interface IFormParams {
  amount: string;
}

export function EditTransactionAmount(): ReactElement {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { handleUpdateAgreementAndTransactions } = useEventSuppliers();
  const { selectedEventTransaction } = useEventVariables();
  const {
    editTransaction,
    handleSelectedEventTransaction,
    handleEditEventTransactionValueWindow,
    updateEventSupplierTransactionAgreement,
  } = useTransaction();

  const [loading, setLoading] = useState(false);

  const currentValue = useMemo(() => {
    return formatBrlCurrency(selectedEventTransaction.transaction.amount);
  }, [selectedEventTransaction.transaction.amount]);

  async function handleSubmit(data: IFormParams): Promise<void> {
    try {
      setLoading(true);

      if (!Number(data.amount)) {
        return addToast({
          title: 'Valor da Transação',
          description: 'Apenas números são aceitos!',
          type: 'error',
        });
      }
      if (Number(data.amount) <= 0) {
        return addToast({
          title: 'Valor da Transação',
          description: 'Apenas valores maiores do que zero são aceitos!',
          type: 'error',
        });
      }
      const amount = Number(data.amount);
      const oldEventTransaction = selectedEventTransaction;
      if (selectedEventTransaction.agreement_type === 'none') {
        const response = await editTransaction({
          ...selectedEventTransaction.transaction,
          amount,
        });
        handleSelectedEventTransaction({
          ...oldEventTransaction,
          transaction: response,
        });
      }
      if (selectedEventTransaction.agreement_type === 'supplier') {
        const updatedAgreement = handleUpdateAgreementAndTransactions({
          id: selectedEventTransaction.agreement_id,
          transactions: [
            {
              ...selectedEventTransaction.transaction,
              amount,
            },
          ],
        });
        await updateEventSupplierTransactionAgreement(updatedAgreement);
      }
      return handleEditEventTransactionValueWindow();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }
      return addToast({
        title: 'Erro na atualização',
        description: 'Tente novamente!',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEditEventTransactionValueWindow}
      containerStyle={{
        zIndex: 25,
        top: '5%',
        left: '0%',
        height: '70%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader title="Editar Valor" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <ValueContainer>
            <Title>Valor Atual</Title>
            <CurrentValue>{currentValue}</CurrentValue>
          </ValueContainer>
          <Input name="amount" type="number" />
          <Button loading={loading} type="submit">
            Salvar
          </Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
