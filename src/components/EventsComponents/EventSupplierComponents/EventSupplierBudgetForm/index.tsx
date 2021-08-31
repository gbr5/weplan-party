import React, { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../../hooks/eventVariables';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import Input from '../../../Input';
import { WindowHeader } from '../../../WindowHeader';

import { Container, FormQuestion, DateContainer } from './styles';
import Button from '../../../Button';
import { DatePickerLine } from '../../../TimePickerLine';

interface IFormData {
  amount: string;
  description: string;
}

export function EventSupplierBudgetForm(): JSX.Element {
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleSupplierBudgetForm,
    createSupplierBudget,
    loading,
  } = useEventSuppliers();
  const formRef = useRef<FormHandles>(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  async function handleSubmit({
    amount,
    description,
  }: IFormData): Promise<void> {
    await createSupplierBudget({
      amount: Number(amount),
      description,
      due_date: selectedDate,
      isActive: true,
      supplier_id: selectedEventSupplier.id,
    });
    formRef.current?.clearField;
    handleSupplierBudgetForm();
  }

  function handleSelectedDate(date: Date): void {
    setSelectedDate(date);
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleSupplierBudgetForm}
      containerStyle={{
        top: '5%',
        left: '2%',
        height: '85%',
        width: '96%',
        zIndex: 19,
      }}
      zIndex={18}
    >
      <Container>
        <WindowHeader title="Novo Orçamento" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormQuestion>Valor</FormQuestion>
          <Input name="amount" type="number" />
          <FormQuestion>Descrição (Opcional)</FormQuestion>
          <Input
            name="description"
            autoCapitalize="words"
            placeholder="Descrição"
          />
          <FormQuestion>Data de Vencimento</FormQuestion>
          <DateContainer>
            <DatePickerLine
              selectedDate={selectedDate}
              handleSelectedDate={handleSelectedDate}
            />
          </DateContainer>
          <Button loading={loading} type="submit">
            Salvar
          </Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
