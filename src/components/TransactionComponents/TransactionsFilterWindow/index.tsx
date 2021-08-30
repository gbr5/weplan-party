import React, { ReactElement } from 'react';
import {
  FiCheckSquare,
  FiChevronDown,
  FiChevronUp,
  FiSquare,
} from 'react-icons/fi';

import { useTransaction } from '../../../hooks/transactions';

import Button from '../../Button';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';
import { DatePickerLine } from '../../TimePickerLine';

import {
  Container,
  Option,
  Text,
  CancelOption,
  CancelText,
  Body,
  DateContainer,
  DateTitle,
  SubContainer,
} from './styles';

export function TransactionsFilterWindow(): ReactElement {
  const iconSize = 32;
  const {
    cancelledTransactionFilter,
    sortTransactionsByInterval,
    fromDateTransactionFilter,
    toDateTransactionFilter,
    filterTransactionOption,
    handleFilterTransactionOption,
    handleCancelledTransactionFilter,
    handleSortTransactionsByIntervalFilter,
    handleFromDateTransactionFilter,
    handleToDateTransactionFilter,
    handleFilterTransactionWindow,
  } = useTransaction();

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleFilterTransactionWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '85%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader overTitle="Filtrar" title="Transações" />
        <SubContainer>
          <Option onClick={() => handleFilterTransactionOption('all')}>
            <Text>Todas</Text>
            {filterTransactionOption === 'all' ? (
              <FiCheckSquare size={iconSize} />
            ) : (
              <FiSquare size={iconSize} />
            )}
          </Option>
          <Option onClick={() => handleFilterTransactionOption('paid')}>
            <Text>Pagas</Text>
            {filterTransactionOption === 'paid' ? (
              <FiCheckSquare size={iconSize} />
            ) : (
              <FiSquare size={iconSize} />
            )}
          </Option>
          <Option onClick={() => handleFilterTransactionOption('notPaid')}>
            <Text>Não Pagas</Text>
            {filterTransactionOption === 'notPaid' ? (
              <FiCheckSquare size={iconSize} />
            ) : (
              <FiSquare size={iconSize} />
            )}
          </Option>
          <Option onClick={() => handleFilterTransactionOption('delayed')}>
            <Text>Atrasadas</Text>
            {filterTransactionOption === 'delayed' ? (
              <FiCheckSquare size={iconSize} />
            ) : (
              <FiSquare size={iconSize} />
            )}
          </Option>

          <CancelOption onClick={handleCancelledTransactionFilter}>
            <CancelText>Mostrar canceladas</CancelText>
            {cancelledTransactionFilter ? (
              <FiCheckSquare color="#007500" size={iconSize} />
            ) : (
              <FiSquare color="#ff3030" size={iconSize} />
            )}
          </CancelOption>
          <Option onClick={handleSortTransactionsByIntervalFilter}>
            <Text>Filtrar por data</Text>
            {sortTransactionsByInterval ? (
              <FiChevronUp size={iconSize} color="#ff3030" />
            ) : (
              <FiChevronDown size={iconSize} />
            )}
          </Option>
          {sortTransactionsByInterval && (
            <Body>
              <DateContainer>
                <DateTitle>Do dia</DateTitle>
                <DatePickerLine
                  handleSelectedDate={handleFromDateTransactionFilter}
                  selectedDate={fromDateTransactionFilter}
                />
              </DateContainer>
              <DateContainer>
                <DateTitle>Até o dia</DateTitle>
                <DatePickerLine
                  handleSelectedDate={handleToDateTransactionFilter}
                  selectedDate={toDateTransactionFilter}
                />
              </DateContainer>
            </Body>
          )}
        </SubContainer>
      </Container>
      <Button onClick={handleFilterTransactionWindow}>Filtrar</Button>
    </WindowUnFormattedContainer>
  );
}
