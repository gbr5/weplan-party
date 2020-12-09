import React, { MouseEventHandler } from 'react';
import ITransactionDTO from '../../dtos/ITransactionDTO';
import Transaction from '../Transaction';

import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface IProps {
  refreshHiredSuppliers: Function;
  title: string;
  transactions: ITransactionDTO[];
  isOwner: boolean;
}

const TransactionsWindow: React.FC<IProps> = ({
  refreshHiredSuppliers,
  title,
  transactions,
  isOwner,
}: IProps) => {
  let allTransactionsIndex = 0;

  return (
    <Container>
      <h3>{title}</h3>
      {transactions.map(transaction => {
        allTransactionsIndex += 1;
        const key = String(allTransactionsIndex);
        return (
          <Transaction
            isOwner={isOwner}
            allTransactions={false}
            refreshHiredSuppliers={refreshHiredSuppliers}
            key={key}
            transaction={transaction}
          />
        );
      })}
    </Container>
  );
};

export default TransactionsWindow;
