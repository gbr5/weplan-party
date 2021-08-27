import React from 'react';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';
import { EventTransactionButton } from '../EventsComponents/FinancialComponents/EventTransaction';

import { Container } from './styles';

interface IProps {
  title: string;
  transactions: IEventTransactionDTO[];
}

const TransactionsWindow: React.FC<IProps> = ({
  title,
  transactions,
}: IProps) => {
  return (
    <Container>
      <h3>{title}</h3>
      {transactions.map(agreementTransaction => {
        const year = new Date(
          agreementTransaction.transaction.due_date,
        ).getFullYear();
        const month = new Date(
          agreementTransaction.transaction.due_date,
        ).getMonth();
        const date = new Date(
          agreementTransaction.transaction.due_date,
        ).getDate();
        const firstOfYear =
          transactions.filter(
            ({ transaction }) =>
              new Date(transaction.due_date).getFullYear() === year,
          )[0].transaction.id === agreementTransaction.transaction.id;

        const firstOfMonth =
          transactions.filter(
            ({ transaction }) =>
              new Date(transaction.due_date).getFullYear() === year &&
              new Date(transaction.due_date).getMonth() === month,
          )[0].transaction.id === agreementTransaction.transaction.id;

        const firstOfDay =
          transactions.filter(
            ({ transaction }) =>
              new Date(transaction.due_date).getFullYear() === year &&
              new Date(transaction.due_date).getMonth() === month &&
              new Date(transaction.due_date).getDate() === date,
          )[0].transaction.id === agreementTransaction.transaction.id;
        return (
          <EventTransactionButton
            eventTransaction={agreementTransaction}
            firstOfDay={firstOfDay}
            firstOfMonth={firstOfMonth}
            firstOfYear={firstOfYear}
            key={agreementTransaction.transaction.id}
          />
        );
      })}
    </Container>
  );
};

export default TransactionsWindow;
