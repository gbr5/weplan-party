import React, { useMemo } from 'react';

import { FiFilter } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useTransaction } from '../../../../hooks/transactions';

import IEventTransactionDTO from '../../../../dtos/IEventTransactionDTO';

import { Container, FilterButton, TransactionContainer, Title } from './styles';
import { AddButton } from '../../../AddButton';
import { SearchTransactions } from '../../../TransactionComponents/SearchTransactions';
import { EventTransactionButton } from '../EventTransaction';

export function EventTransactionSection(): JSX.Element {
  const iconSize = 28;
  const theme = useTheme();
  const {
    eventTransactions,
    filteredEventTransactions,
    handleFilteredEventTransactions,
  } = useEventVariables();
  const {
    cancelledTransactionFilter,
    sortTransactionsByInterval,
    fromDateTransactionFilter,
    toDateTransactionFilter,
    handleFilterTransactionWindow,
    filterTransactionOption,
    handleCreateTransactionWindow,
  } = useTransaction();

  const transactions = useMemo<IEventTransactionDTO[]>(() => {
    if (filteredEventTransactions.length <= 0) {
      handleFilteredEventTransactions(eventTransactions);
      return eventTransactions;
    }
    let resultTransactions = filteredEventTransactions;
    if (sortTransactionsByInterval) {
      resultTransactions = resultTransactions.filter(
        ({ transaction }) =>
          new Date(transaction.due_date) > fromDateTransactionFilter &&
          new Date(transaction.due_date) < toDateTransactionFilter,
      );
    }
    if (filterTransactionOption === 'paid') {
      resultTransactions = resultTransactions.filter(
        ({ transaction }) => transaction.isPaid,
      );
    }
    if (filterTransactionOption === 'notPaid') {
      resultTransactions = resultTransactions.filter(
        ({ transaction }) => !transaction.isPaid,
      );
    }
    if (filterTransactionOption === 'delayed') {
      resultTransactions = resultTransactions.filter(
        ({ transaction }) =>
          !transaction.isCancelled &&
          !transaction.isPaid &&
          new Date() > new Date(transaction.due_date),
      );
    }
    if (!cancelledTransactionFilter) {
      resultTransactions = resultTransactions.filter(
        ({ transaction }) => !transaction.isCancelled,
      );
    }
    return resultTransactions;
  }, [
    filteredEventTransactions,
    filterTransactionOption,
    cancelledTransactionFilter,
    fromDateTransactionFilter,
    toDateTransactionFilter,
    sortTransactionsByInterval,
    eventTransactions,
    handleFilteredEventTransactions,
  ]);

  const filter = useMemo(() => {
    if (
      !cancelledTransactionFilter &&
      !sortTransactionsByInterval &&
      filterTransactionOption === 'all'
    )
      return false;
    return true;
  }, [
    cancelledTransactionFilter,
    sortTransactionsByInterval,
    filterTransactionOption,
  ]);

  function handleOpenCreateTransactionWindow(): void {
    handleCreateTransactionWindow();
  }

  return (
    <Container>
      <FilterButton onClick={handleFilterTransactionWindow}>
        <FiFilter
          size={iconSize}
          color={filter ? theme.colors.red : theme.colors.toastInfoColor}
        />
      </FilterButton>
      <AddButton
        onClick={handleOpenCreateTransactionWindow}
        right="2%"
        top="-6%"
      />
      <Title>Transações</Title>

      <SearchTransactions
        eventTransactions={eventTransactions}
        handleEventTransactions={(data: IEventTransactionDTO[]) =>
          handleFilteredEventTransactions(data)
        }
      />

      {transactions && transactions.length > 0 && (
        <TransactionContainer>
          {transactions.map(item => {
            const year = new Date(item.transaction.due_date).getFullYear();
            const month = new Date(item.transaction.due_date).getMonth();
            const date = new Date(item.transaction.due_date).getDate();

            const firstOfYear =
              transactions.filter(
                ({ transaction }) =>
                  new Date(transaction.due_date).getFullYear() === year,
              )[0].transaction.id === item.transaction.id;

            const firstOfMonth =
              transactions.filter(
                ({ transaction }) =>
                  new Date(transaction.due_date).getFullYear() === year &&
                  new Date(transaction.due_date).getMonth() === month,
              )[0].transaction.id === item.transaction.id;

            const firstOfDay =
              transactions.filter(
                ({ transaction }) =>
                  new Date(transaction.due_date).getFullYear() === year &&
                  new Date(transaction.due_date).getMonth() === month &&
                  new Date(transaction.due_date).getDate() === date,
              )[0].transaction.id === item.transaction.id;

            return (
              <EventTransactionButton
                firstOfDay={firstOfDay}
                firstOfMonth={firstOfMonth}
                firstOfYear={firstOfYear}
                key={item.transaction.id}
                eventTransaction={item}
              />
            );
          })}
        </TransactionContainer>
      )}
    </Container>
  );
}
