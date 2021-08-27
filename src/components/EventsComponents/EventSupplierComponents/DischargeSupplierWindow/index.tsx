import React, { useMemo, ReactElement } from 'react';

import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import ITransactionDTO from '../../../../dtos/ITransactionDTO';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';

import {
  Container,
  OptionsContainer,
  OptionButton,
  OptionText,
  SupplierContainer,
  SupplierTitle,
  SupplierTitleUnderline,
  SupplierResponse,
  SupplierQuestion,
} from './styles';

export function DischargeSupplierWindow(): ReactElement {
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleDischargingWindow,
    handleCancelAllAgreementsWindow,
    handleDichargeOption,
    dischargeOption,
  } = useEventSuppliers();

  const selectedEventSupplierTransactions = useMemo(() => {
    const transactions: ITransactionDTO[] = [];
    selectedEventSupplier.transactionAgreements.length > 0 &&
      selectedEventSupplier.transactionAgreements
        .filter(agreement => !agreement.isCancelled)
        .map(agreement => {
          agreement.transactions.length > 0 &&
            agreement.transactions
              .filter(transaction => !transaction.transaction.isCancelled)
              .map(
                agreementTransaction =>
                  agreementTransaction.transaction &&
                  transactions.push(agreementTransaction.transaction),
              );
          return agreement;
        });
    const debitTransactions = transactions.filter(
      transaction => transaction.payee_id === selectedEventSupplier.id,
    );

    const debitValue = debitTransactions
      .map(transaction => Number(transaction.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const paidValue = debitTransactions
      .filter(transaction => transaction.isPaid)
      .map(transaction => Number(transaction.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const creditTransactions = transactions.filter(
      transaction => transaction.payer_id === selectedEventSupplier.id,
    );

    const creditValue = creditTransactions
      .map(transaction => Number(transaction.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const receivedValue = creditTransactions
      .filter(transaction => transaction.isPaid)
      .map(transaction => Number(transaction.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const balance = formatBrlCurrency(receivedValue - paidValue);
    const toReceive = formatBrlCurrency(creditValue - receivedValue);
    const toPay = formatBrlCurrency(debitValue - paidValue);

    return {
      transactions,
      debitTransactions,
      debitValue,
      creditTransactions,
      creditValue,
      balance,
      paidValue: formatBrlCurrency(paidValue),
      receivedValue: formatBrlCurrency(receivedValue),
      toReceive,
      toPay,
    };
  }, [selectedEventSupplier]);

  const totalAgreements = useMemo(() => {
    const agreementsTotal = selectedEventSupplier.transactionAgreements
      .map(agreement => Number(agreement.amount))
      .reduce((acc, cv) => acc + cv, 0);
    return formatBrlCurrency(agreementsTotal);
  }, [selectedEventSupplier]);

  function handleDischargeOption(data: string): void {
    handleCancelAllAgreementsWindow();
    handleDichargeOption(data);
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleDischargingWindow}
      containerStyle={{
        zIndex: 25,
        top: '5%',
        left: '0%',
        height: '95%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader
          title={selectedEventSupplier.name}
          overTitle="Distrato de Fornecedor"
        />

        <OptionsContainer>
          <OptionButton
            onClick={() => handleDischargeOption('all')}
            isActive={dischargeOption === 'all'}
          >
            <OptionText isActive={dischargeOption === 'all'}>
              Cancelar Contratos e Transações
            </OptionText>
          </OptionButton>
          <OptionButton
            onClick={() => handleDischargeOption('notPaid')}
            isActive={dischargeOption === 'notPaid'}
          >
            <OptionText isActive={dischargeOption === 'notPaid'}>
              Cancelar Transações Não Paga
            </OptionText>
          </OptionButton>
          <OptionButton
            onClick={() => handleDischargeOption('future')}
            isActive={dischargeOption === 'future'}
          >
            <OptionText isActive={dischargeOption === 'future'}>
              Cancelar Transações Futuras
            </OptionText>
          </OptionButton>
          <OptionButton
            onClick={() => handleDischargeOption('edit')}
            isActive={dischargeOption === 'edit'}
          >
            <OptionText isActive={dischargeOption === 'edit'}>
              Editar Contratos e Transações
            </OptionText>
          </OptionButton>
        </OptionsContainer>

        <SupplierTitle>
          Contratos ({selectedEventSupplier.transactionAgreements.length})
        </SupplierTitle>
        <SupplierTitleUnderline />

        <SupplierContainer>
          <SupplierQuestion>Valor Total</SupplierQuestion>
          <SupplierResponse>{totalAgreements}</SupplierResponse>
        </SupplierContainer>

        <SupplierTitle>
          Transações ({selectedEventSupplierTransactions.transactions.length})
        </SupplierTitle>
        <SupplierTitleUnderline />

        <SupplierContainer>
          <SupplierQuestion>Pago</SupplierQuestion>
          <SupplierResponse>
            {selectedEventSupplierTransactions.paidValue}
          </SupplierResponse>
        </SupplierContainer>
        <SupplierContainer>
          <SupplierQuestion>Recebido</SupplierQuestion>
          <SupplierResponse>
            {selectedEventSupplierTransactions.toReceive}
          </SupplierResponse>
        </SupplierContainer>
        <SupplierContainer>
          <SupplierQuestion>A Pagar</SupplierQuestion>
          <SupplierResponse>
            {selectedEventSupplierTransactions.toPay}
          </SupplierResponse>
        </SupplierContainer>
        <SupplierContainer>
          <SupplierQuestion>A Receber</SupplierQuestion>
          <SupplierResponse>
            {selectedEventSupplierTransactions.toReceive}
          </SupplierResponse>
        </SupplierContainer>
      </Container>
    </WindowUnFormattedContainer>
  );
}
