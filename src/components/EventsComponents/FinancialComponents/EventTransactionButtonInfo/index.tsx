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

export function EventTransactionButtonInfo(): ReactElement {
  const { getTransactionNotes, selectedTransactionNotes } = useNote();
  const { selectedEventTransaction } = useEventVariables();
  const {
    editTransaction,
    handleCancelEventTransactionConfirmationWindow,
    handleSelectedEventTransaction,
    handleEditTransactionName,
    handleEditTransactionCategory,
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
      handleSelectedEventTransaction({
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
      handleSelectedEventTransaction({
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
      {/* {selectedEventTransaction.transaction.category && ( */}
      <CategoryContainer>
        <MainButton onClick={handleEditTransactionCategory}>
          <FieldLabel>Categoria</FieldLabel>
          <Label>
            {selectedEventTransaction.transaction.category &&
              selectedEventTransaction.transaction.category}
          </Label>
        </MainButton>
      </CategoryContainer>
      {/* )} */}
      <MainButton onClick={handleEditTransactionName}>
        <FieldLabel>Nome</FieldLabel>
        <Label>{selectedEventTransaction.transaction.name}</Label>
      </MainButton>
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
        {/* <FieldButton onClick={handleOpenUpdateTransactionDueDateWindow}>
          <FieldButtonText>
            {formatOnlyDate(
              String(selectedEventTransaction.transaction.due_date),
            )}
          </FieldButtonText>
        </FieldButton> */}
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
