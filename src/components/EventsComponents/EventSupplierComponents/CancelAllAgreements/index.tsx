import React, { useState, useMemo, ReactElement } from 'react';

import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';

import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useTransaction } from '../../../../hooks/transactions';

import ITransactionDTO from '../../../../dtos/ITransactionDTO';
import IEventSupplierTransactionAgreementDTO from '../../../../dtos/IEventSupplierTransactionAgreementDTO';
import IUpdateEventSupplierTransactionAgreementDTO from '../../../../dtos/IUpdateEventSupplierTransactionAgreementDTO';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import ShortConfirmationWindow from '../../../DeleteConfirmationWindow';
import Button from '../../../Button';
import { SelectTransactionButton } from '../../../TransactionComponents/SelectTransactionButton';

import {
  Container,
  AgreementContainer,
  AgreementButton,
  Title,
  AgreementDate,
  AgreementValue,
  AgreementsContainer,
  NumberOfInstallments,
  SectionUnderline,
  TransactionsContainer,
  AgreementIndex,
  TransactionTitleButton,
  TransactionTitleContainer,
  TransactionTitleText,
} from './styles';

export function CancelAllAgreements(): ReactElement {
  const {
    selectedEventSupplier,
    selectedEventSupplierTransactionAgreement,
    selectEventSupplierTransactionAgreement,
  } = useEventVariables();
  const {
    dischargeOption,
    supplierTransactions,
    updateEventSupplier,
    handleDischargingWindow,
    handleCancelAllAgreementsWindow,
    handleDichargeOption,
  } = useEventSuppliers();
  const {
    updateEventSupplierTransactionAgreement,
    deleteAllSupplierAgreements,
  } = useTransaction();

  const [
    deleteAllConfirmationWindow,
    setDeleteAllConfirmationWindow,
  ] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<
    ITransactionDTO[]
  >(
    supplierTransactions && dischargeOption !== 'edit'
      ? supplierTransactions
      : [],
  );

  function closeWindow(): void {
    selectEventSupplierTransactionAgreement(
      {} as IEventSupplierTransactionAgreementDTO,
    );
    setDeleteAllConfirmationWindow(false);
    setSelectedTransactions([]);
    handleCancelAllAgreementsWindow();
    handleDichargeOption('');
  }
  function selectTransactions(data: ITransactionDTO[]): void {
    setSelectedTransactions(data);
  }
  function handleSelectAgreement(
    data: IEventSupplierTransactionAgreementDTO,
  ): void {
    selectEventSupplierTransactionAgreement(data);
  }

  function cancelAgreementSelectedTransactions({
    id,
    transactions,
  }: IEventSupplierTransactionAgreementDTO): IUpdateEventSupplierTransactionAgreementDTO {
    const updatedTransactions = transactions.map(transaction => {
      if (
        selectedTransactions.find(
          item => item.id === transaction.transaction.id,
        )
      ) {
        return {
          ...transaction.transaction,
          isCancelled: true,
        };
      }
      return transaction.transaction;
    });
    const newAmount = updatedTransactions
      .filter(transaction => !transaction.isCancelled)
      .map(transaction => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    const newNumberOfInstallments = updatedTransactions.filter(
      transaction => !transaction.isCancelled,
    ).length;
    return {
      id,
      amount: newAmount,
      number_of_installments: newNumberOfInstallments,
      isCancelled: newAmount === 0,
      transactions: updatedTransactions,
    };
  }

  async function handleDeleteSelectedTransactios(): Promise<void> {
    const agreements: IUpdateEventSupplierTransactionAgreementDTO[] = [];
    selectedEventSupplier.transactionAgreements.map(agreement => {
      const updatedAgreement = cancelAgreementSelectedTransactions(agreement);
      agreements.push(updatedAgreement);
      return updatedAgreement;
    });
    Promise.all([
      agreements.map(agreement => {
        return updateEventSupplierTransactionAgreement(agreement);
      }),
    ]);
    await updateEventSupplier({
      ...selectedEventSupplier,
      isDischarged: true,
      isHired: false,
    });
    closeWindow();
    handleDischargingWindow();
  }
  const transactions = useMemo(() => {
    const today = new Date();
    if (dischargeOption === 'all' || dischargeOption === 'edit') {
      if (
        selectedEventSupplierTransactionAgreement.id &&
        selectedEventSupplierTransactionAgreement.transactions.length > 0
      ) {
        const updatedTransactions = selectedEventSupplierTransactionAgreement.transactions
          .filter(transaction => !transaction.transaction.isCancelled)
          .map(transaction => transaction.transaction)
          .sort((a, b) => {
            if (new Date(a.due_date) > new Date(b.due_date)) return 1;
            if (new Date(a.due_date) < new Date(b.due_date)) return -1;
            return 0;
          });
        dischargeOption === 'all' &&
          setSelectedTransactions(updatedTransactions);
        return updatedTransactions;
      }
      const updatedTransactions =
        supplierTransactions &&
        supplierTransactions
          .filter(transaction => !transaction.isCancelled)
          .map(transaction => transaction)
          .sort((a, b) => {
            if (new Date(a.due_date) > new Date(b.due_date)) return 1;
            if (new Date(a.due_date) < new Date(b.due_date)) return -1;
            return 0;
          });
      dischargeOption === 'all' &&
        updatedTransactions &&
        setSelectedTransactions(updatedTransactions);
      return updatedTransactions;
    }

    if (supplierTransactions && supplierTransactions.length > 0) {
      if (dischargeOption === 'notPaid') {
        const updatedTransactions = supplierTransactions.filter(
          transaction =>
            transaction.isCancelled === false && transaction.isPaid === false,
        );
        setSelectedTransactions(updatedTransactions);
        return updatedTransactions;
      }
      const updatedTransactions = supplierTransactions.filter(
        transaction => new Date(transaction.due_date) > today,
      );
      setSelectedTransactions(
        updatedTransactions.filter(transaction => !transaction.isPaid),
      );
      return updatedTransactions;
    }
    return undefined;
  }, [
    selectedEventSupplierTransactionAgreement,
    supplierTransactions,
    dischargeOption,
  ]);
  async function handleDeleteAll(): Promise<void> {
    if (
      supplierTransactions &&
      selectedTransactions.length < supplierTransactions.length
    )
      return handleDeleteSelectedTransactios();
    if (!selectedEventSupplier.isDischarged) {
      await deleteAllSupplierAgreements();
    }

    closeWindow();
    return handleDischargingWindow();
  }

  function handleDeleteAllConfirmationWindow(): void {
    setDeleteAllConfirmationWindow(!deleteAllConfirmationWindow);
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={closeWindow}
      containerStyle={{
        zIndex: 36,
        top: '5%',
        left: '0%',
        height: '95%',
        width: '100%',
      }}
    >
      {deleteAllConfirmationWindow && (
        <ShortConfirmationWindow
          title="Deseja deletar todos os contratos?"
          onHandleCloseWindow={handleDeleteAllConfirmationWindow}
          handleDelete={handleDeleteAll}
        />
      )}
      <Container>
        {dischargeOption === 'all' && (
          <>
            <WindowHeader
              overTitle="Distrato de Fornecedor"
              title="Cancelar Contratos e Transações"
            />
            <Title>Contratos</Title>
            <AgreementsContainer>
              {selectedEventSupplier.transactionAgreements.length > 0 &&
                selectedEventSupplier.transactionAgreements.map(agreement => {
                  const index =
                    selectedEventSupplier.transactionAgreements.findIndex(
                      tAgreement => tAgreement.id === agreement.id,
                    ) + 1;
                  return (
                    <AgreementContainer
                      isActive={
                        selectedEventSupplierTransactionAgreement.id ===
                        agreement.id
                      }
                      onClick={() => handleSelectAgreement(agreement)}
                      key={agreement.id}
                    >
                      <AgreementIndex
                        isActive={
                          selectedEventSupplierTransactionAgreement.id ===
                          agreement.id
                        }
                      >
                        {index}
                      </AgreementIndex>
                      <AgreementButton
                        onClick={() => handleSelectAgreement(agreement)}
                      >
                        <AgreementValue
                          isActive={
                            selectedEventSupplierTransactionAgreement.id ===
                            agreement.id
                          }
                        >
                          {formatBrlCurrency(agreement.amount)}
                        </AgreementValue>
                        <NumberOfInstallments
                          isActive={
                            selectedEventSupplierTransactionAgreement.id ===
                            agreement.id
                          }
                        >
                          x {agreement.number_of_installments}
                        </NumberOfInstallments>
                      </AgreementButton>
                      <AgreementDate
                        isActive={
                          selectedEventSupplierTransactionAgreement.id ===
                          agreement.id
                        }
                      >
                        Criado em{' '}
                        {formatOnlyDateShort(String(agreement.created_at))}
                      </AgreementDate>
                    </AgreementContainer>
                  );
                })}
            </AgreementsContainer>

            <SectionUnderline />

            <TransactionTitleContainer>
              <Title>Transações</Title>

              <TransactionTitleButton
                isActive={!selectedEventSupplierTransactionAgreement.id}
                onClick={() =>
                  handleSelectAgreement(
                    {} as IEventSupplierTransactionAgreementDTO,
                  )
                }
              >
                <TransactionTitleText
                  isActive={!selectedEventSupplierTransactionAgreement.id}
                >
                  Todas
                </TransactionTitleText>
              </TransactionTitleButton>
            </TransactionTitleContainer>
          </>
        )}
        {dischargeOption === 'edit' && (
          <>
            <WindowHeader
              overTitle="Distrato de Fornecedor"
              title="Editar Contratos e Transações"
            />
            <Title>Contratos</Title>
            <AgreementsContainer>
              {selectedEventSupplier.transactionAgreements.length > 0 &&
                selectedEventSupplier.transactionAgreements.map(agreement => {
                  const index =
                    selectedEventSupplier.transactionAgreements.findIndex(
                      tAgreement => tAgreement.id === agreement.id,
                    ) + 1;
                  return (
                    <AgreementContainer
                      isActive={
                        selectedEventSupplierTransactionAgreement.id ===
                        agreement.id
                      }
                      onClick={() => handleSelectAgreement(agreement)}
                      key={agreement.id}
                    >
                      <AgreementIndex
                        isActive={
                          selectedEventSupplierTransactionAgreement.id ===
                          agreement.id
                        }
                      >
                        {index}
                      </AgreementIndex>
                      <AgreementButton
                        onClick={() => handleSelectAgreement(agreement)}
                      >
                        <AgreementValue
                          isActive={
                            selectedEventSupplierTransactionAgreement.id ===
                            agreement.id
                          }
                        >
                          {formatBrlCurrency(agreement.amount)}
                        </AgreementValue>
                        <NumberOfInstallments
                          isActive={
                            selectedEventSupplierTransactionAgreement.id ===
                            agreement.id
                          }
                        >
                          x {agreement.number_of_installments}
                        </NumberOfInstallments>
                      </AgreementButton>
                      <AgreementDate
                        isActive={
                          selectedEventSupplierTransactionAgreement.id ===
                          agreement.id
                        }
                      >
                        Criado em{' '}
                        {formatOnlyDateShort(String(agreement.created_at))}
                      </AgreementDate>
                    </AgreementContainer>
                  );
                })}
            </AgreementsContainer>

            <SectionUnderline />

            <TransactionTitleContainer>
              <Title>Transações</Title>

              <TransactionTitleButton
                isActive={!selectedEventSupplierTransactionAgreement.id}
                onClick={() =>
                  handleSelectAgreement(
                    {} as IEventSupplierTransactionAgreementDTO,
                  )
                }
              >
                <TransactionTitleText
                  isActive={!selectedEventSupplierTransactionAgreement.id}
                >
                  Todas
                </TransactionTitleText>
              </TransactionTitleButton>
            </TransactionTitleContainer>
          </>
        )}
        {dischargeOption === 'notPaid' && (
          <>
            <WindowHeader
              overTitle="Distrato de Fornecedor"
              title="Cancelar Transações Não Pagas"
            />
            <Title>Selecione as transações que deseja cancelar</Title>
          </>
        )}
        {dischargeOption === 'future' && (
          <>
            <WindowHeader
              overTitle="Distrato de Fornecedor"
              title="Cancelar Transações Futuras"
            />
            <Title>Selecione as transações que deseja cancelar</Title>
          </>
        )}

        {supplierTransactions &&
          supplierTransactions.length > 0 &&
          dischargeOption === 'all' &&
          !selectedEventSupplierTransactionAgreement.id && (
            <TransactionsContainer>
              {supplierTransactions.map(item => {
                const index = String(
                  supplierTransactions.findIndex(
                    transaction => transaction.id === item.id,
                  ) + 1,
                );
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) =>
                      selectTransactions(data)
                    }
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
                );
              })}
            </TransactionsContainer>
          )}
        {supplierTransactions &&
          supplierTransactions.length > 0 &&
          dischargeOption === 'edit' &&
          !selectedEventSupplierTransactionAgreement.id && (
            <TransactionsContainer>
              {supplierTransactions.map(item => {
                const index = String(
                  supplierTransactions.findIndex(
                    transaction => transaction.id === item.id,
                  ) + 1,
                );
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) =>
                      selectTransactions(data)
                    }
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
                );
              })}
            </TransactionsContainer>
          )}
        {transactions &&
          transactions.length > 0 &&
          dischargeOption === 'all' &&
          !!selectedEventSupplierTransactionAgreement.id && (
            <TransactionsContainer>
              {transactions.map(item => {
                const index = String(
                  transactions.findIndex(
                    transaction => transaction.id === item.id,
                  ) + 1,
                );
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) =>
                      selectTransactions(data)
                    }
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
                );
              })}
            </TransactionsContainer>
          )}
        {transactions &&
          transactions.length > 0 &&
          dischargeOption === 'edit' &&
          !!selectedEventSupplierTransactionAgreement.id && (
            <TransactionsContainer>
              {transactions.map(item => {
                const index = String(
                  transactions.findIndex(
                    transaction => transaction.id === item.id,
                  ) + 1,
                );
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) =>
                      selectTransactions(data)
                    }
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
                );
              })}
            </TransactionsContainer>
          )}
        {transactions &&
          transactions.length > 0 &&
          dischargeOption === 'notPaid' && (
            <TransactionsContainer>
              {transactions.map(item => {
                const index = String(
                  transactions.findIndex(
                    transaction => transaction.id === item.id,
                  ) + 1,
                );
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) =>
                      selectTransactions(data)
                    }
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
                );
              })}
            </TransactionsContainer>
          )}
        {transactions &&
          transactions.length > 0 &&
          dischargeOption === 'future' && (
            <TransactionsContainer>
              {transactions.map(item => {
                const index = String(
                  transactions.findIndex(
                    transaction => transaction.id === item.id,
                  ) + 1,
                );
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) =>
                      selectTransactions(data)
                    }
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
                );
              })}
            </TransactionsContainer>
          )}
        <Button onClick={handleDeleteAllConfirmationWindow}>
          Cancelar Transações
        </Button>
      </Container>
    </WindowUnFormattedContainer>
  );
}
