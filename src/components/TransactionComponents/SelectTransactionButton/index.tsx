import React, { useMemo, ReactElement } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

import ITransactionDTO from '../../../dtos/ITransactionDTO';

import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';

import {
  Container,
  TextContainer,
  Index,
  Status,
  Amount,
  DateText,
  InfoButton,
  Underline,
} from './styles';

interface IProps {
  transaction: ITransactionDTO;
  index: string;
  selectTransactions: (data: ITransactionDTO[]) => void;
  selectedTransactions: ITransactionDTO[];
}

export function SelectTransactionButton({
  transaction,
  selectTransactions,
  selectedTransactions,
  index,
}: IProps): ReactElement {
  const iconSize = 20;
  const isOverdue = useMemo(() => {
    if (transaction.isPaid) return false;
    const today = new Date();
    const dueDate = new Date(transaction.due_date);
    if (today > dueDate) return true;
    return false;
  }, [transaction]);

  const status = useMemo(() => {
    if (transaction.isPaid) return 'Paga';
    const today = new Date();
    const dueDate = new Date(transaction.due_date);
    if (today > dueDate) return 'Atrasada';
    return 'A Vencer';
  }, [transaction]);

  const isActive = useMemo(() => {
    return !!selectedTransactions.find(item => item.id === transaction.id);
  }, [transaction, selectedTransactions]);

  function handleSelectTransaction(): void {
    const arrayTransactions: ITransactionDTO[] = [];
    const active = selectedTransactions.find(
      item => item.id === transaction.id,
    );
    if (active) {
      const updatedTransactions = selectedTransactions.filter(
        item => item.id !== transaction.id,
      );
      updatedTransactions.map(item => {
        arrayTransactions.push(item);
        return item;
      });
      return selectTransactions(arrayTransactions);
    }
    selectedTransactions.map(item => arrayTransactions.push(item));
    arrayTransactions.push(transaction);
    return selectTransactions(arrayTransactions);
  }

  return (
    <>
      <Container onClick={handleSelectTransaction}>
        <TextContainer>
          <Index>{index}</Index>
          <Status isOverdue={isOverdue} isPaid={transaction.isPaid}>
            {status}
          </Status>
          <Amount isOverdue={isOverdue} isPaid={transaction.isPaid}>
            {formatBrlCurrency(transaction.amount)}
          </Amount>
          <DateText>
            {formatOnlyDateShort(String(transaction.due_date))}
          </DateText>
        </TextContainer>
        <InfoButton onClick={handleSelectTransaction}>
          {isActive ? (
            <FiCheckSquare size={iconSize} />
          ) : (
            <FiSquare size={iconSize} />
          )}
        </InfoButton>
      </Container>
      <Underline />
    </>
  );
}
