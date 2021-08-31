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
  FieldLabel,
} from './styles';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { DatePickerLine } from '../../../TimePickerLine';
import InlineFormField from '../../../InlineFormField';
import { InlineCurrencyFormField } from '../../../InlineCurrencyFormField';
import { useCurrentEvent } from '../../../../hooks/currentEvent';
import { CloseButton } from '../../../CloseButton';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';

export function EventTransactionButtonInfo(): ReactElement {
  const { getTransactionNotes, selectedTransactionNotes } = useNote();
  const {
    selectedEventTransaction,
    selectEventTransaction,
  } = useEventVariables();
  const { getEventTransactions, getEventSuppliers } = useCurrentEvent();
  const {
    editTransaction,
    handleCancelEventTransactionConfirmationWindow,
    handleTransactionNotesWindow,
    handleTransactionFilesWindow,
  } = useTransaction();

  const [loading, setLoading] = useState(false);
  const [editAmount, setEditAmount] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editName, setEditName] = useState(false);

  function handleEditAmount(): void {
    setEditAmount(!editAmount);
  }

  function handleEditDate(): void {
    setEditDate(!editDate);
  }

  function handleEditCategory(): void {
    setEditCategory(!editCategory);
  }

  function handleEditName(): void {
    setEditName(!editName);
  }

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
      setEditDate(false);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTransactionCategory(
    category: string,
  ): Promise<void> {
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
      setEditCategory(false);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTransactionAmount(amount: number): Promise<void> {
    if (amount === selectedEventTransaction.transaction.amount) return;
    try {
      setLoading(true);
      const response = await editTransaction({
        ...selectedEventTransaction.transaction,
        amount,
      });
      selectEventTransaction({
        ...selectedEventTransaction,
        transaction: response,
      });
      await getEventTransactions(selectedEventTransaction.event_id);
      await getEventSuppliers(selectedEventTransaction.event_id);
      setEditAmount(false);
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
      setEditName(false);
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
        {editCategory ? (
          <CategoryContainer>
            <CloseButton closeFunction={handleEditCategory} />
            <FieldLabel>Categoria</FieldLabel>
            <InlineFormField
              defaultValue={selectedEventTransaction.transaction.category}
              placeholder={selectedEventTransaction.transaction.category}
              handleOnSubmit={handleUpdateTransactionCategory}
            />
          </CategoryContainer>
        ) : (
          <FieldButton onClick={handleEditCategory}>
            <FieldLabel>Categoria</FieldLabel>
            <FieldButtonText>
              {selectedEventTransaction.transaction.category}
            </FieldButtonText>
          </FieldButton>
        )}
        {editName ? (
          <CategoryContainer>
            <CloseButton closeFunction={handleEditName} />
            <FieldLabel>Nome</FieldLabel>
            <InlineFormField
              defaultValue={selectedEventTransaction.transaction.name}
              placeholder={selectedEventTransaction.transaction.name}
              handleOnSubmit={handleUpdateTransactionName}
            />
          </CategoryContainer>
        ) : (
          <FieldButton onClick={handleEditName}>
            <FieldLabel>Nome</FieldLabel>
            <FieldButtonText>
              {selectedEventTransaction.transaction.name}
            </FieldButtonText>
          </FieldButton>
        )}
      </FirstContainer>
      <FirstContainer>
        {editAmount ? (
          <CategoryContainer>
            <CloseButton closeFunction={handleEditAmount} />
            <FieldLabel>Valor</FieldLabel>
            <InlineCurrencyFormField
              defaultValue={String(selectedEventTransaction.transaction.amount)}
              placeholder={String(selectedEventTransaction.transaction.amount)}
              handleOnSubmit={handleUpdateTransactionAmount}
            />
          </CategoryContainer>
        ) : (
          <FieldButton onClick={handleEditAmount}>
            <FieldLabel>Valor</FieldLabel>
            <FieldButtonText>
              {formatBrlCurrency(
                Number(selectedEventTransaction.transaction.amount),
              )}
            </FieldButtonText>
          </FieldButton>
        )}
        {editDate ? (
          <CategoryContainer>
            <CloseButton closeFunction={handleEditDate} />
            <FieldLabel>Vencimento</FieldLabel>
            <DatePickerLine
              handleSelectedDate={handleUpdateTransactionDueDate}
              selectedDate={selectedEventTransaction.transaction.due_date}
            />
          </CategoryContainer>
        ) : (
          <FieldButton onClick={handleEditDate}>
            <FieldLabel>Vencimento</FieldLabel>
            <FieldButtonText>
              {formatOnlyDateShort(
                String(selectedEventTransaction.transaction.due_date),
              )}
            </FieldButtonText>
          </FieldButton>
        )}
      </FirstContainer>
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
