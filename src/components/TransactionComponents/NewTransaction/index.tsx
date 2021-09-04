import React, { useState, useMemo } from 'react';
import { ReactElement } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

import ICreateTransactionDTO from '../../../dtos/ICreateTransactionDTO';
import { useEventVariables } from '../../../hooks/eventVariables';
import { useTransaction } from '../../../hooks/transactions';
import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';

import {
  Container,
  TextContainer,
  Amount,
  Index,
  IsPaidButton,
  Underline,
  AmountButton,
} from './styles';
import { DatePickerLine } from '../../TimePickerLine';
import { InlineCurrencyFormField } from '../../InlineCurrencyFormField';
import { useToast } from '../../../hooks/toast';

interface IProps {
  transaction: ICreateTransactionDTO;
  index: string;
}

export function NewTransaction({ transaction, index }: IProps): ReactElement {
  const { addToast } = useToast();
  const {
    handleSelectedNewTransaction,
    selectedNewTransaction,
    newTransactions,
    selectNewTransactions,
  } = useEventVariables();
  const { handleNewAgreement, newAgreementInstallments } = useTransaction();
  const [isPaid, setIsPaid] = useState(false);
  const [editAmount, setEditAmount] = useState(false);

  function handleIsPaid(): void {
    setIsPaid(!isPaid);
    newTransactions[Number(index) - 1].isPaid = !isPaid;
    selectNewTransactions(newTransactions);
  }

  const isOverdue = useMemo(() => {
    if (transaction.isPaid) return false;
    const today = new Date();
    const dueDate = new Date(transaction.due_date);
    if (today > dueDate) return true;
    return false;
  }, [transaction]);

  function handleEditAmount(): void {
    handleSelectedNewTransaction(transaction);
    setEditAmount(true);
  }

  function handleEditDate(date: Date): void {
    const transactions = newTransactions
      .map(item => {
        if (item === transaction) {
          return {
            ...item,
            due_date: new Date(date),
          };
        }
        return item;
      })
      .sort((a, b) => {
        if (new Date(a.due_date) > new Date(b.due_date)) return 1;
        if (new Date(a.due_date) < new Date(b.due_date)) return -1;
        return 0;
      });
    selectNewTransactions(transactions);
  }

  function handleSubmit(amount: number): void {
    const transactions = newTransactions.map(item => {
      if (item === selectedNewTransaction) {
        return {
          ...item,
          amount,
        };
      }
      return item;
    });
    selectNewTransactions(transactions);
    const totalAmount = transactions
      .map(item => item.amount)
      .reduce((acc, cv) => acc + cv, 0);
    handleNewAgreement({
      amount: totalAmount,
      installments: newAgreementInstallments,
    });
    handleSelectedNewTransaction({} as ICreateTransactionDTO);
    setEditAmount(false);
  }

  return (
    <>
      <Container>
        <TextContainer>
          <Index>{index}</Index>
          {editAmount && selectedNewTransaction === transaction ? (
            <InlineCurrencyFormField
              defaultValue={String(transaction.amount)}
              handleOnSubmit={handleSubmit}
              placeholder={String(transaction.amount)}
            />
          ) : (
            <AmountButton onClick={handleEditAmount}>
              <Amount isOverdue={isOverdue} isPaid={transaction.isPaid}>
                {formatBrlCurrency(transaction.amount)}
              </Amount>
            </AmountButton>
          )}
          <DatePickerLine
            handleSelectedDate={handleEditDate}
            selectedDate={transaction.due_date}
          />
        </TextContainer>
        <IsPaidButton
          onClick={handleIsPaid}
          isOverdue={isOverdue}
          isPaid={isPaid}
        >
          {isPaid ? (
            <FiCheckSquare size={32} color="#ff3030" />
          ) : (
            <FiSquare size={32} color="#007500" />
          )}
        </IsPaidButton>
      </Container>
      <Underline />
    </>
  );
}
