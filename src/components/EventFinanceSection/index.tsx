import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { differenceInDays } from 'date-fns';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';
import PageContainer from '../PageContainer';

import ITransactionDTO from '../../dtos/ITransactionDTO';

import { Container, Suppliers, AllTransactionsWindow } from './styles';
import ITransactionAgreementDTO from '../../dtos/ITransactionAgreementDTO';
import formatStringToDate from '../../utils/formatStringToDate';
import { numberFormat } from '../../utils/numberFormat';
import Transaction from '../Transaction';
import TransactionAgreement from '../TransactionAgreement';

interface IPropsDTO {
  hiredSuppliers: ISelectedSupplierDTO[];
  // updateHiredSuppliers: Function;
}

const EventFinanceSection: React.FC<IPropsDTO> = ({
  hiredSuppliers,
}: // updateHiredSuppliers,
IPropsDTO) => {
  const [transactionList, setTransactionList] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<
    ISelectedSupplierDTO
  >({} as ISelectedSupplierDTO);
  const [totalEventCost, setTotalEventCost] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [totalOverdue, setTotalOverdue] = useState(0);
  const [allTransactionsWindow, setAllTransactionsWindow] = useState(false);

  const transactions = [] as ITransactionDTO[];
  const paidTransactions = [] as ITransactionDTO[];
  const notPaidTransactions = [] as ITransactionDTO[];
  const overdueTransactions = [] as ITransactionDTO[];
  const agreements = [] as ITransactionAgreementDTO[];

  const today = new Date();

  const closeAllWindow = useCallback(() => {
    setTransactionList(false);
    setAllTransactionsWindow(false);
  }, []);

  const handleAllTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setAllTransactionsWindow(!allTransactionsWindow);
  }, [closeAllWindow, allTransactionsWindow]);

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
            daysTillDueDate < 0 &&
              overdueTransactions.push({
                id: transaction.id,
                agreement_id: transaction.agreement_id,
                amount: Number(transaction.amount),
                due_date: newDate,
                isPaid: transaction.isPaid,
                formattedDate: transactionDate,
                difference_in_days: daysTillDueDate,
              });

            transaction.isPaid &&
              paidTransactions.push({
                id: transaction.id,
                agreement_id: transaction.agreement_id,
                amount: Number(transaction.amount),
                due_date: newDate,
                isPaid: transaction.isPaid,
                formattedDate: transactionDate,
                difference_in_days: daysTillDueDate,
              });
            transaction.isPaid === false &&
              notPaidTransactions.push({
                id: transaction.id,
                agreement_id: transaction.agreement_id,
                amount: Number(transaction.amount),
                due_date: newDate,
                isPaid: transaction.isPaid,
                formattedDate: transactionDate,
                difference_in_days: daysTillDueDate,
              });
            transactions.push({
              id: transaction.id,
              agreement_id: transaction.agreement_id,
              amount: Number(transaction.amount),
              due_date: newDate,
              isPaid: transaction.isPaid,
              formattedDate: transactionDate,
              difference_in_days: daysTillDueDate,
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

  let supplierIndex = 0;
  let agreementIndex = 0;
  let allTransactionsIndex = 0;

  return (
    <Container>
      <h1>Financeiro</h1>
      <span>
        <div>
          <h3>Custo Total:</h3>
          <p>{numberFormat(totalEventCost)}</p>
        </div>
        <div>
          <h3>Total Pago:</h3>
          <p>{numberFormat(totalPaid)}</p>
        </div>
        <div>
          <h3>Total a Pagar:</h3>
          <p>{numberFormat(totalToPay)}</p>
        </div>
        <div>
          <h3>Total Atrasado:</h3>
          <p>{numberFormat(totalOverdue)}</p>
        </div>
      </span>
      <span>
        <button type="button" onClick={handleAllTransactionsWindow}>
          <h3>Todas as transações</h3>
        </button>
        <button type="button">
          <h3>Custo Total do Evento</h3>
        </button>
        <button type="button">
          <h3>Total pago</h3>
        </button>
        <button type="button">
          <h3>Total há pagar</h3>
        </button>
      </span>
      <div>
        <Suppliers>
          <h2>Suppliers</h2>
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
                  return (
                    <TransactionAgreement
                      key={agreementIndex}
                      transactionAgreement={agreement}
                    />
                  );
                })}
              </div>
            </>
          )}
          {!!allTransactionsWindow && (
            <AllTransactionsWindow>
              {sortedTransactions.map(transaction => {
                allTransactionsIndex += 1;
                return (
                  <Transaction
                    key={allTransactionsIndex}
                    transaction={transaction}
                  />
                );
              })}
            </AllTransactionsWindow>
          )}
        </PageContainer>
      </div>
    </Container>
  );
};

export default EventFinanceSection;
