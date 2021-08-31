import React, { useRef, useState, useMemo, ReactElement } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErros';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import Input from '../../../Input';
import Button from '../../../Button';

import { Container, ValueContainer, CurrentValue, Title } from './styles';
import { useToast } from '../../../../hooks/toast';

interface IFormParams {
  amount: string;
}

export function EditSupplierBudgetAmount(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const {
    updateSupplierBudget,
    selectedSupplierBudget,
    handleEditSupplierBudgetAmountWindow,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);

  const currentValue = useMemo(() => {
    return formatBrlCurrency(selectedSupplierBudget.amount);
  }, [selectedSupplierBudget.amount]);

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
      await updateSupplierBudget({
        ...selectedSupplierBudget,
        amount,
      });
      return handleEditSupplierBudgetAmountWindow();
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
      onHandleCloseWindow={handleEditSupplierBudgetAmountWindow}
      containerStyle={{
        zIndex: 25,
        top: '5%',
        left: '0%',
        height: '70%',
        width: '100%',
      }}
      zIndex={24}
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
