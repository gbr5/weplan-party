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

interface IProps {
  transaction: ICreateTransactionDTO;
  index: string;
}

export function NewTransaction({ transaction, index }: IProps): ReactElement {
  const {
    handleSelectedNewTransaction,
    newTransactions,
    selectNewTransactions,
  } = useEventVariables();
  const { handleEditNewTransactionValueWindow } = useTransaction();
  const [isPaid, setIsPaid] = useState(false);

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
    handleEditNewTransactionValueWindow();
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
  return (
    <>
      <Container>
        <TextContainer>
          <Index>{index}</Index>
          <AmountButton onClick={handleEditAmount}>
            <Amount isOverdue={isOverdue} isPaid={transaction.isPaid}>
              {formatBrlCurrency(transaction.amount)}
            </Amount>
          </AmountButton>
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
