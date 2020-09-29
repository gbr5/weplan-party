import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { differenceInDays } from 'date-fns';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';
import PageContainer from '../PageContainer';

import ITransactionDTO from '../../dtos/ITransactionDTO';

import { Container, Suppliers, TransactionsWindow, MenuButton } from './styles';
import ITransactionAgreementDTO from '../../dtos/ITransactionAgreementDTO';
import formatStringToDate from '../../utils/formatStringToDate';
import { numberFormat } from '../../utils/numberFormat';
import Transaction from '../Transaction';
import TransactionAgreement from '../TransactionAgreement';

interface IPropsDTO {
  hiredSuppliers: ISelectedSupplierDTO[];
  refreshHiredSuppliers: Function;
}

const EventFinanceSection: React.FC<IPropsDTO> = ({
  hiredSuppliers,
  refreshHiredSuppliers,
}: IPropsDTO) => {
  const [transactionList, setTransactionList] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<
    ISelectedSupplierDTO
  >({} as ISelectedSupplierDTO);
  const [totalEventCost, setTotalEventCost] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [totalOverdue, setTotalOverdue] = useState(0);
  const [allTransactionsWindow, setAllTransactionsWindow] = useState(true);
  const [paidTransactionsWindow, setPaidTransactionsWindow] = useState(false);
  const [notPaidTransactionsWindow, setNotPaidTransactionsWindow] = useState(
    false,
  );
  const [overdueTransactionsWindow, setOverdueTransactionsWindow] = useState(
    false,
  );

  const transactions = [] as ITransactionDTO[];
  const paidTransactions = [] as ITransactionDTO[];
  const notPaidTransactions = [] as ITransactionDTO[];
  const overdueTransactions = [] as ITransactionDTO[];
  const agreements = [] as ITransactionAgreementDTO[];

  const today = new Date();

  const closeAllWindow = useCallback(() => {
    setTransactionList(false);
    setAllTransactionsWindow(false);
    setPaidTransactionsWindow(false);
    setNotPaidTransactionsWindow(false);
    setOverdueTransactionsWindow(false);
  }, []);

  const handleAllTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setAllTransactionsWindow(!allTransactionsWindow);
  }, [closeAllWindow, allTransactionsWindow]);

  const handlePaidTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setPaidTransactionsWindow(!paidTransactionsWindow);
  }, [closeAllWindow, paidTransactionsWindow]);

  const handleNotPaidTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setNotPaidTransactionsWindow(!notPaidTransactionsWindow);
  }, [closeAllWindow, notPaidTransactionsWindow]);

  const handleOverdueTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setOverdueTransactionsWindow(!overdueTransactionsWindow);
  }, [closeAllWindow, overdueTransactionsWindow]);

  const compareTransactionDate = useCallback(
    (a: ITransactionDTO, b: ITransactionDTO) => {
      if (differenceInDays(a.due_date, b.due_date) < 0) {
        return -1;
      }
      if (differenceInDays(a.due_date, b.due_date) > 0) {
        return 1;
      }
      return 0;
    },
    [],
  );

  let supplierIndex = 0;
  let agreementIndex = 0;
  let allTransactionsIndex = 0;

  hiredSuppliers.map(supplier => {
    supplier.transactionAgreement &&
      supplier.transactionAgreement.map(agreement => {
        agreements.push(agreement);
        agreement.transactions &&
          agreement.transactions.map(transaction => {
            const transactionDate = formatStringToDate(
              String(transaction.due_date),
            ) as string;
            const newDate = new Date(transactionDate);
            const daysTillDueDate = differenceInDays(newDate, today) as number;
            transactions.push({
              id: transaction.id,
              agreement_id: transaction.agreement_id,
              amount: Number(transaction.amount),
              due_date: transaction.due_date,
              isPaid: transaction.isPaid,
              formattedDate: transactionDate,
              difference_in_days: daysTillDueDate,
              supplier_name: supplier.name,
              index: allTransactionsIndex,
            });
            return transaction;
          });

        return agreement;
      });
    return supplier;
  });

  const handleGetTotalEventCost = useCallback(() => {
    setTotalEventCost(
      agreements
        .map(agreement => Number(agreement.amount))
        .reduce((a, b) => a + b, 0),
    );
    setTotalPaid(
      paidTransactions.map(paid => paid.amount).reduce((a, b) => a + b, 0),
    );
    setTotalToPay(
      notPaidTransactions
        .map(notPaid => notPaid.amount)
        .reduce((a, b) => a + b, 0),
    );
    setTotalOverdue(
      overdueTransactions
        .map(overdue => overdue.amount)
        .reduce((a, b) => a + b, 0),
    );
  }, [agreements, paidTransactions, notPaidTransactions, overdueTransactions]);

  useEffect(() => {
    handleGetTotalEventCost();
  }, [handleGetTotalEventCost]);

  const handleSelectedSupplier = useCallback(
    props => {
      closeAllWindow();
      setSelectedSupplier(props);
      setTransactionList(true);
    },
    [closeAllWindow],
  );

  const sortedTransactions = useMemo(() => {
    const sortedByDate = transactions.sort(compareTransactionDate);
    return sortedByDate;
  }, [transactions, compareTransactionDate]);
  sortedTransactions.map(transaction => {
    const transactionDate = formatStringToDate(
      String(transaction.due_date),
    ) as string;
    const newDate = new Date(transactionDate);
    const daysTillDueDate = differenceInDays(newDate, today) as number;

    transaction.isPaid !== true &&
      daysTillDueDate < 0 &&
      overdueTransactions.push({
        id: transaction.id,
        agreement_id: transaction.agreement_id,
        amount: Number(transaction.amount),
        due_date: transaction.due_date,
        isPaid: transaction.isPaid,
        formattedDate: transactionDate,
        difference_in_days: daysTillDueDate,
        supplier_name: transaction.supplier_name,
      });
    transaction.isPaid &&
      paidTransactions.push({
        id: transaction.id,
        agreement_id: transaction.agreement_id,
        amount: Number(transaction.amount),
        due_date: transaction.due_date,
        isPaid: transaction.isPaid,
        formattedDate: transactionDate,
        difference_in_days: daysTillDueDate,
        supplier_name: transaction.supplier_name,
      });
    transaction.isPaid === false &&
      notPaidTransactions.push({
        id: transaction.id,
        agreement_id: transaction.agreement_id,
        amount: Number(transaction.amount),
        due_date: transaction.due_date,
        isPaid: transaction.isPaid,
        formattedDate: transactionDate,
        difference_in_days: daysTillDueDate,
        supplier_name: transaction.supplier_name,
      });
    return transaction;
  });
  return (
    <Container>
      <h1>Financeiro</h1>
      <span>
        <div>
          <MenuButton
            booleanActiveButton={allTransactionsWindow}
            type="button"
            onClick={handleAllTransactionsWindow}
          >
            Transações
          </MenuButton>
          <div>
            <h3>Total:</h3>
            <p>{numberFormat(totalEventCost)}</p>
          </div>
        </div>
        <div>
          <MenuButton
            booleanActiveButton={paidTransactionsWindow}
            type="button"
            onClick={handlePaidTransactionsWindow}
          >
            Trasações Efetuadas
          </MenuButton>
          <div>
            <p>{numberFormat(totalPaid)}</p>
          </div>
        </div>
        <div>
          <MenuButton
            booleanActiveButton={notPaidTransactionsWindow}
            type="button"
            onClick={handleNotPaidTransactionsWindow}
          >
            Transações a Pagar
          </MenuButton>
          <div>
            <p>{numberFormat(totalToPay)}</p>
          </div>
        </div>
        <div>
          <MenuButton
            booleanActiveButton={overdueTransactionsWindow}
            type="button"
            onClick={handleOverdueTransactionsWindow}
          >
            Transações Vencidas
          </MenuButton>
          <div>
            <p>{numberFormat(totalOverdue)}</p>
          </div>
        </div>
      </span>
      <div>
        <Suppliers>
          <h2>Fornecedores</h2>
          <div>
            {hiredSuppliers.map(supplier => {
              supplierIndex += 1;
              return (
                <button
                  type="button"
                  onClick={() => handleSelectedSupplier(supplier)}
                  key={supplier.id}
                >
                  <p>{supplierIndex}</p>
                  <h3>{supplier.name}</h3>
                </button>
              );
            })}
          </div>
        </Suppliers>

        <PageContainer>
          {!!transactionList && (
            <>
              <h1>{selectedSupplier.name}</h1>
              <div>
                {selectedSupplier.transactionAgreement?.map(agreement => {
                  agreementIndex += 1;
                  const key = String(agreementIndex);
                  return (
                    <TransactionAgreement
                      key={key}
                      transactionAgreement={agreement}
                    />
                  );
                })}
              </div>
            </>
          )}
          {!!allTransactionsWindow && (
            <TransactionsWindow>
              <h3>Transações</h3>
              {sortedTransactions.map(transaction => {
                allTransactionsIndex += 1;
                const key = String(allTransactionsIndex);
                return (
                  <Transaction
                    refreshHiredSuppliers={refreshHiredSuppliers}
                    key={key}
                    allTransactions
                    transaction={transaction}
                  />
                );
              })}
            </TransactionsWindow>
          )}
          {!!paidTransactionsWindow && (
            <TransactionsWindow>
              <h3>Transações Efetuadas</h3>
              {paidTransactions.map(transaction => {
                allTransactionsIndex += 1;
                const key = String(allTransactionsIndex);
                return (
                  <Transaction
                    allTransactions={false}
                    refreshHiredSuppliers={refreshHiredSuppliers}
                    key={key}
                    transaction={transaction}
                  />
                );
              })}
            </TransactionsWindow>
          )}
          {!!notPaidTransactionsWindow && (
            <TransactionsWindow>
              <h3>Transações a Pagar</h3>
              {notPaidTransactions.map(transaction => {
                allTransactionsIndex += 1;
                const key = String(allTransactionsIndex);
                return (
                  <Transaction
                    allTransactions={false}
                    refreshHiredSuppliers={refreshHiredSuppliers}
                    key={key}
                    transaction={transaction}
                  />
                );
              })}
            </TransactionsWindow>
          )}
          {!!overdueTransactionsWindow && (
            <TransactionsWindow>
              <h3>Transações Atrasadas</h3>
              {overdueTransactions.map(transaction => {
                allTransactionsIndex += 1;
                const key = String(allTransactionsIndex);
                return (
                  <Transaction
                    allTransactions={false}
                    refreshHiredSuppliers={refreshHiredSuppliers}
                    key={key}
                    transaction={transaction}
                  />
                );
              })}
            </TransactionsWindow>
          )}
        </PageContainer>
      </div>
    </Container>
  );
};

export default EventFinanceSection;
