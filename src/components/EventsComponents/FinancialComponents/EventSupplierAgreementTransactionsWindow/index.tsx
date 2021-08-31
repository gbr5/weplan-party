import React, { useState, useMemo } from 'react';

import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../hooks/transactions';
import IEventSupplierTransactionAgreementDTO from '../../../../dtos/IEventSupplierTransactionAgreementDTO';
import ITransactionDTO from '../../../../dtos/ITransactionDTO';
import IEventSupplierTransactionDTO from '../../../../dtos/IEventSupplierTransactionDTO';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import { EventTransactionButton } from '../EventTransaction';
import Button from '../../../Button';

import { Container, Title, TransactionsContainer } from './styles';
import { useToast } from '../../../../hooks/toast';
import DeleteConfirmationWindow from '../../../DeleteConfirmationWindow';

export function EventSupplierAgreementTransactionsWindow(): JSX.Element {
  const { addToast } = useToast();
  const {
    eventSuppliers,
    transformEventTransactions,
    selectEventSupplierTransactionAgreement,
    selectedEventSupplierTransactionAgreement,
  } = useEventVariables();
  const {
    selectSupplierTransaction,
    handleEventSupplierAgreementTransactionsWindow,
  } = useEventSuppliers();
  const {
    selectTransaction,
    updateEventSupplierTransactionAgreement,
  } = useTransaction();

  const [
    cancelAgreementConfirmationWindow,
    setCancelAgreementConfirmationWindow,
  ] = useState(false);

  const supplier = useMemo(() => {
    return eventSuppliers.find(
      item => item.id === selectedEventSupplierTransactionAgreement.supplier_id,
    );
  }, [eventSuppliers, selectedEventSupplierTransactionAgreement]);

  function closeWindow(): void {
    handleEventSupplierAgreementTransactionsWindow();
    selectSupplierTransaction({} as IEventSupplierTransactionDTO);
    selectEventSupplierTransactionAgreement(
      {} as IEventSupplierTransactionAgreementDTO,
    );
  }

  function handleCancelAgreementConfirmationWindow(): void {
    setCancelAgreementConfirmationWindow(!cancelAgreementConfirmationWindow);
  }

  async function cancelAgreementAndTransactions(): Promise<void> {
    if (selectedEventSupplierTransactionAgreement) {
      const updatedTransactions = selectedEventSupplierTransactionAgreement.transactions.map(
        ({ transaction }) => {
          return {
            ...transaction,
            isCancelled: true,
          };
        },
      );

      const updatedAgreement = {
        id: selectedEventSupplierTransactionAgreement.id,
        amount: 0,
        number_of_installments: 0,
        isCancelled: true,
        transactions: updatedTransactions,
      };
      selectTransaction({} as ITransactionDTO);
      await updateEventSupplierTransactionAgreement(updatedAgreement);
      closeWindow();
      addToast({
        title: `Contrato e transações cancelados com sucesso!`,
        type: 'success',
      });
    }
  }

  const agreementAmount = useMemo(() => {
    return formatBrlCurrency(selectedEventSupplierTransactionAgreement.amount);
  }, [selectedEventSupplierTransactionAgreement]);

  const transactions = useMemo(() => {
    if (selectedEventSupplierTransactionAgreement.transactions.length > 0)
      return transformEventTransactions(
        selectedEventSupplierTransactionAgreement.transactions
          .filter(
            agreementTransaction =>
              !agreementTransaction.transaction.isCancelled,
          )
          .map(({ transaction }) => transaction),
      );
    return undefined;
  }, [
    selectedEventSupplierTransactionAgreement.transactions,
    transformEventTransactions,
  ]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={closeWindow}
      containerStyle={{
        zIndex: 16,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
      zIndex={15}
    >
      {cancelAgreementConfirmationWindow && (
        <DeleteConfirmationWindow
          title="Deseja deletar este contrato?"
          handleDelete={cancelAgreementAndTransactions}
          onHandleCloseWindow={handleCancelAgreementConfirmationWindow}
        />
      )}
      <Container>
        <WindowHeader
          overTitle={`Fornecedor: ${supplier && supplier.name}`}
          title="Transações"
        />

        <Title>Valor Total: {agreementAmount}</Title>

        {transactions && transactions.length > 0 && (
          <TransactionsContainer>
            {transactions.map(item => {
              const year = new Date(item.transaction.due_date).getFullYear();
              const month = new Date(item.transaction.due_date).getMonth();
              const date = new Date(item.transaction.due_date).getDate();

              const firstOfYear =
                transactions.filter(
                  ({ transaction }) =>
                    new Date(transaction.due_date).getFullYear() === year,
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
                  firstOfYear={firstOfYear}
                  key={item.transaction.id}
                  eventTransaction={item}
                />
              );
            })}
          </TransactionsContainer>
        )}
      </Container>
      <Button onClick={handleCancelAgreementConfirmationWindow}>
        Deletar Contrato
      </Button>
    </WindowUnFormattedContainer>
  );
}
