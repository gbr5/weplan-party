import addMonths from 'date-fns/addMonths';
import React, { useState } from 'react';

import IEventSupplierBudgetDTO from '../../../../dtos/IEventSupplierBudgetDTO';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import { InlineCurrencyFormField } from '../../../InlineCurrencyFormField';
import InlineFormField from '../../../InlineFormField';
import { DatePickerLine } from '../../../TimePickerLine';

import { Container, Button, Amount, Label, SubContainer } from './styles';

interface IProps {
  budget: IEventSupplierBudgetDTO;
}

export function EventSupplierBudgetButtonInfo({ budget }: IProps): JSX.Element {
  const { updateSupplierBudget } = useEventSuppliers();

  const [selectedDate, setSelectedDate] = useState(addMonths(new Date(), 3));
  const [editDescription, setEditDescription] = useState(false);
  const [editAmount, setEditAmount] = useState(false);

  function handleSelectedDate(date: Date): void {
    setSelectedDate(date);
  }

  function openAmountWindow(): void {
    setEditAmount(true);
  }
  async function handleUpdateAmount(amount: number): Promise<void> {
    await updateSupplierBudget({
      ...budget,
      amount,
    });
    setEditAmount(false);
  }

  function openDescriptionWindow(): void {
    setEditDescription(true);
  }

  async function handleUpdateDescription(description: string): Promise<void> {
    await updateSupplierBudget({
      ...budget,
      description,
    });
    setEditDescription(false);
  }

  return (
    <>
      <Container>
        {editAmount ? (
          <SubContainer>
            <Label>Valor: </Label>
            <InlineCurrencyFormField
              defaultValue={String(budget.amount)}
              placeholder={String(budget.amount)}
              handleOnSubmit={handleUpdateAmount}
            />
          </SubContainer>
        ) : (
          <Button onClick={openAmountWindow}>
            <Label>Valor: </Label>
            <Amount>{formatBrlCurrency(budget.amount)}</Amount>
          </Button>
        )}
        {editDescription ? (
          <SubContainer>
            <Label>Descrição: </Label>
            <InlineFormField
              defaultValue={budget.description}
              placeholder={budget.description}
              handleOnSubmit={handleUpdateDescription}
            />
          </SubContainer>
        ) : (
          <Button onClick={openDescriptionWindow}>
            <Label>Descrição: </Label>
            <Amount>
              {budget.description !== '' ? budget.description : '-'}
            </Amount>
          </Button>
        )}
        <SubContainer>
          <Label>Vencimento: </Label>
          <DatePickerLine
            title=""
            selectedDate={selectedDate}
            handleSelectedDate={handleSelectedDate}
          />
        </SubContainer>
      </Container>
    </>
  );
}
