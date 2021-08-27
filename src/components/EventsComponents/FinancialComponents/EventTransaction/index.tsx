/* eslint-disable react/require-default-props */
import React, { ReactElement, useMemo } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import IEventTransactionDTO from '../../../../dtos/IEventTransactionDTO';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import { EventTransactionButtonInfo } from '../EventTransactionButtonInfo';

import {
  Container,
  TextContainer,
  Sign,
  Name,
  Amount,
  InfoButton,
  Underline,
  CancelledTransaction,
  YearContainer,
  Year,
  MonthContainer,
  Month,
  DayContainer,
  Day,
} from './styles';

interface IProps {
  firstOfDay?: boolean;
  firstOfMonth?: boolean;
  firstOfYear?: boolean;
  eventTransaction: IEventTransactionDTO;
}

export function EventTransactionButton({
  eventTransaction,
  firstOfYear,
  firstOfMonth,
  firstOfDay,
}: IProps): ReactElement {
  const {
    selectedEventTransaction,
    selectEventTransaction,
  } = useEventVariables();

  function handleSelectTransaction(): void {
    eventTransaction.transaction.isCancelled &&
      selectEventTransaction({} as IEventTransactionDTO);
    !selectedEventTransaction ||
    !selectedEventTransaction.transaction ||
    selectedEventTransaction.transaction.id !== eventTransaction.transaction.id
      ? selectEventTransaction(eventTransaction)
      : selectEventTransaction({} as IEventTransactionDTO);
  }

  const isOverdue = useMemo(() => {
    if (eventTransaction.transaction.isPaid) return false;
    const today = new Date();
    const dueDate = new Date(eventTransaction.transaction.due_date);
    if (today > dueDate) return true;
    return false;
  }, [eventTransaction]);

  const month = useMemo(() => {
    if (firstOfMonth) {
      const newmonth = new Date(
        eventTransaction.transaction.due_date,
      ).toLocaleString('pt-BR', { month: 'long' });
      const thisMonth = newmonth[0].toUpperCase() + newmonth.slice(1);
      return `${thisMonth}`;
    }
    return undefined;
  }, [eventTransaction, firstOfMonth]);

  const day = useMemo(
    () => formatOnlyDateShort(String(eventTransaction.transaction.due_date)),
    [eventTransaction],
  );
  const year = new Date(eventTransaction.transaction.due_date).getFullYear();

  return (
    <>
      {firstOfYear && (
        <>
          <Underline />
          <YearContainer>
            <Year>{year}</Year>
          </YearContainer>
        </>
      )}
      {firstOfMonth && (
        <>
          <Underline />
          <MonthContainer>
            <Month>{month}</Month>
          </MonthContainer>
        </>
      )}
      {firstOfDay && (
        <>
          <Underline />
          <DayContainer>
            <Day>{day}</Day>
          </DayContainer>
        </>
      )}

      <Container
        isSelected={
          selectedEventTransaction &&
          selectedEventTransaction.transaction &&
          eventTransaction.transaction.id ===
            selectedEventTransaction.transaction.id
        }
        isCancelled={eventTransaction.transaction.isCancelled}
        onClick={handleSelectTransaction}
      >
        {eventTransaction.transaction.isCancelled && <CancelledTransaction />}
        {eventTransaction.transaction.payer_id === eventTransaction.event_id ? (
          <TextContainer>
            <Name>{eventTransaction.transaction.name}</Name>
            <Amount
              isOverdue={isOverdue}
              isPaid={eventTransaction.transaction.isPaid}
            >
              {formatBrlCurrency(eventTransaction.transaction.amount)}
            </Amount>
          </TextContainer>
        ) : (
          <TextContainer>
            <Name>{eventTransaction.transaction.name}</Name>
            <Amount
              style={{
                textAlign: 'left',
              }}
              isOverdue={isOverdue}
              isPaid={eventTransaction.transaction.isPaid}
            >
              <Sign> - </Sign>
              {formatBrlCurrency(eventTransaction.transaction.amount)}
            </Amount>
          </TextContainer>
        )}
        {!eventTransaction.transaction.isCancelled && (
          <InfoButton onClick={handleSelectTransaction}>
            {selectedEventTransaction &&
            selectedEventTransaction.transaction &&
            selectedEventTransaction.transaction.id ===
              eventTransaction.transaction.id ? (
              // eslint-disable-next-line react/jsx-indent
              <FiChevronUp size={24} />
            ) : (
              <FiChevronDown size={24} />
            )}
          </InfoButton>
        )}
      </Container>
      <Underline />

      {selectedEventTransaction &&
        selectedEventTransaction.transaction &&
        selectedEventTransaction.transaction.id ===
          eventTransaction.transaction.id &&
        !eventTransaction.transaction.isCancelled && (
          <EventTransactionButtonInfo />
        )}
    </>
  );
}
