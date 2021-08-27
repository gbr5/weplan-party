import React, { useState, ReactElement } from 'react';
import { addDays } from 'date-fns';
import { FiEdit, FiLoader } from 'react-icons/fi';

import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';

import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useTransaction } from '../../../../hooks/transactions';

import { EditNewTransactionAmount } from '../../../TransactionComponents/EditNewTransactionAmount';
import { NewTransaction } from '../../../TransactionComponents/NewTransaction';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';

import {
  Container,
  TransactionContainer,
  Value,
  EditButton,
  EndButton,
  CancelButton,
  ButtonContainer,
} from './styles';
import { WindowHeader } from '../../../WindowHeader';

export function NewEventSupplierTransactionAgreementConfirmation(): ReactElement {
  const {
    selectedEventSupplier,
    handleSelectedDate,
    newTransactions,
    selectNewTransactions,
    selectedNewTransaction,
  } = useEventVariables();
  const {
    handleCreateSupplierTransactionAgreementWindow,
  } = useEventSuppliers();
  const {
    createSupplierTransactionAgreementWithTransactions,
    editNewTransactionValueWindow,
    handleNewEventSupplierTransactionAgreement,
    handleNewAgreement,
    newAgreementAmount,
    newAgreementInstallments,
  } = useTransaction();

  const [loading, setLoading] = useState(false);

  function closeWindow(): void {
    selectNewTransactions([]);
    handleNewAgreement({
      amount: 0,
      installments: 1,
    });
    handleNewEventSupplierTransactionAgreement();
    handleSelectedDate(addDays(new Date(), 3));
  }
  async function handleSubmit(): Promise<void> {
    try {
      setLoading(true);
      await createSupplierTransactionAgreementWithTransactions({
        amount: newAgreementAmount,
        number_of_installments: newAgreementInstallments,
        supplier_id: selectedEventSupplier.id,
        transactions: newTransactions,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      closeWindow();
      setLoading(false);
    }
  }

  function handleGoBack(): void {
    handleNewEventSupplierTransactionAgreement();
    handleCreateSupplierTransactionAgreementWindow();
  }

  return (
    <>
      {editNewTransactionValueWindow &&
        selectedNewTransaction &&
        selectedNewTransaction.amount && <EditNewTransactionAmount />}
      <WindowUnFormattedContainer
        onHandleCloseWindow={closeWindow}
        containerStyle={{
          zIndex: 30,
          top: '5%',
          left: '2%',
          height: '95%',
          width: '96%',
        }}
      >
        <Container>
          <WindowHeader
            overTitle={`Contrato com ${selectedEventSupplier.name}`}
            title={`Total: ${formatBrlCurrency(newAgreementAmount)}`}
          />
          <TransactionContainer>
            {newTransactions.map(transaction => {
              const findIndex = String(
                newTransactions.findIndex(
                  thisTransaction =>
                    thisTransaction.due_date === transaction.due_date,
                ) + 1,
              );
              return (
                <NewTransaction
                  key={findIndex}
                  index={findIndex}
                  transaction={transaction}
                />
              );
            })}
          </TransactionContainer>
          <EditButton onClick={handleGoBack}>
            <Value>Editar</Value>
            <FiEdit />
          </EditButton>
          <ButtonContainer>
            {loading ? (
              <FiLoader size={24} />
            ) : (
              <>
                <CancelButton onClick={closeWindow}>
                  <Value>Cancelar</Value>
                </CancelButton>
                <EndButton onClick={handleSubmit}>
                  <Value>Confirmar</Value>
                </EndButton>
              </>
            )}
          </ButtonContainer>
        </Container>
      </WindowUnFormattedContainer>
    </>
  );
}
