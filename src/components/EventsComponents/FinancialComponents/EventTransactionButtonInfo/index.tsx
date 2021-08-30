import React, { useState, useMemo, ReactElement, useEffect } from 'react';
import {
  FiLoader,
  FiFile,
  FiFileText,
  FiTrash2,
  FiSquare,
  FiCheckSquare,
} from 'react-icons/fi';

import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';

import { useTransaction } from '../../../../hooks/transactions';
import { NotificationNumber } from '../../../NotificationNumber';
import { useNote } from '../../../../hooks/notes';

import {
  Container,
  FirstContainer,
  FieldContainer,
  FieldText,
  FieldButton,
  FieldButtonText,
  PaidButton,
  ReceiptButton,
  DeleteButton,
  CategoryContainer,
  Label,
  FieldLabel,
  MainButton,
} from './styles';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { DatePickerLine } from '../../../TimePickerLine';
import InlineFormField from '../../../InlineFormField';

export function EventTransactionButtonInfo(): ReactElement {
  const { getTransactionNotes, selectedTransactionNotes } = useNote();
  const {
    selectedEventTransaction,
    selectEventTransaction,
  } = useEventVariables();
  const {
    editTransaction,
    handleCancelEventTransactionConfirmationWindow,
    handleEditEventTransactionValueWindow,
    handleTransactionNotesWindow,
    handleTransactionFilesWindow,
  } = useTransaction();

  const [loading, setLoading] = useState(false);

  const color = useMemo(() => {
    const today = new Date();
    if (selectedEventTransaction.transaction.isPaid) return '#e6fffa';
    if (new Date(selectedEventTransaction.transaction.due_date) < today)
      return '#fddede';
    return '#ebf8ff';
  }, [selectedEventTransaction]);

  async function updateTransactionIsPaid(): Promise<void> {
    try {
      setLoading(true);
      const response = await editTransaction({
        ...selectedEventTransaction.transaction,
        isPaid: !selectedEventTransaction.transaction.isPaid,
      });
      selectEventTransaction({
        ...selectedEventTransaction,
        transaction: response,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTransactionDueDate(due_date: Date): Promise<void> {
    try {
      setLoading(true);
      const response = await editTransaction({
        ...selectedEventTransaction.transaction,
        due_date,
      });
      selectEventTransaction({
        ...selectedEventTransaction,
        transaction: response,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTransactionCategory(
    category: string,
  ): Promise<void> {
    console.log(category);
    if (
      category === '' &&
      category === selectedEventTransaction.transaction.category
    )
      return;
    try {
      setLoading(true);
      const response = await editTransaction({
        ...selectedEventTransaction.transaction,
        category,
      });
      selectEventTransaction({
        ...selectedEventTransaction,
        transaction: response,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTransactionName(name: string): Promise<void> {
    if (name === '' && name === selectedEventTransaction.transaction.name)
      return;
    try {
      setLoading(true);
      const response = await editTransaction({
        ...selectedEventTransaction.transaction,
        name,
      });
      selectEventTransaction({
        ...selectedEventTransaction,
        transaction: response,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTransactionNotes(selectedEventTransaction.transaction.id);
  }, [getTransactionNotes, selectedEventTransaction]);

  const iconSize = 24;

  return (
    <Container>
      <FirstContainer>
        <CategoryContainer>
          <FieldLabel>Categoria</FieldLabel>
          <InlineFormField
            defaultValue={selectedEventTransaction.transaction.category}
            placeholder={selectedEventTransaction.transaction.category}
            handleOnSubmit={handleUpdateTransactionCategory}
          />
        </CategoryContainer>
        <CategoryContainer>
          <FieldLabel>Nome</FieldLabel>
          <InlineFormField
            defaultValue={selectedEventTransaction.transaction.name}
            placeholder={selectedEventTransaction.transaction.name}
            handleOnSubmit={handleUpdateTransactionName}
          />
        </CategoryContainer>
      </FirstContainer>
      <FieldContainer>
        <FieldButton onClick={handleEditEventTransactionValueWindow}>
          <FieldButtonText>
            {formatBrlCurrency(
              Number(selectedEventTransaction.transaction.amount),
            )}
          </FieldButtonText>
        </FieldButton>
        <DatePickerLine
          handleSelectedDate={handleUpdateTransactionDueDate}
          selectedDate={selectedEventTransaction.transaction.due_date}
        />
      </FieldContainer>
      <FieldContainer>
        <PaidButton color={color} onClick={updateTransactionIsPaid}>
          {loading && <FiLoader />}
          {!loading && selectedEventTransaction.transaction.isPaid ? (
            <>
              <FieldText>Paga</FieldText>
              <FiCheckSquare size={iconSize} />
            </>
          ) : (
            <>
              <FieldText>Pagar</FieldText>
              <FiSquare size={iconSize} />
            </>
          )}
        </PaidButton>
        <ReceiptButton onClick={handleTransactionNotesWindow}>
          <NotificationNumber
            number={selectedTransactionNotes.length}
            left="-55%"
            top="-55%"
          />
          <FiFileText size={iconSize} />
        </ReceiptButton>
        <ReceiptButton onClick={handleTransactionFilesWindow}>
          <NotificationNumber
            number={selectedEventTransaction.transaction.files.length}
            left="-55%"
            top="-55%"
          />
          <FiFile size={iconSize} />
        </ReceiptButton>
        <DeleteButton onClick={handleCancelEventTransactionConfirmationWindow}>
          <FiTrash2 size={iconSize} />
        </DeleteButton>
      </FieldContainer>
    </Container>
  );
}
