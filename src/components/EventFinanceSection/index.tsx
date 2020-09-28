import React, { useCallback, useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';
import PageContainer from '../PageContainer';

import ITransactionDTO from '../../dtos/ITransactionDTO';

import {
  Container,
  Suppliers,
  Transaction,
  AllTransactionsWindow,
} from './styles';
import ITransactionAgreementDTO from '../../dtos/ITransactionAgreementDTO';
import formatStringToDate from '../../utils/formatStringToDate';
import WindowContainer from '../WindowContainer';

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
          });
      });
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

  const handleSelectedSupplier = useCallback(props => {
    setSelectedSupplier(props);
    setTransactionList(true);
  }, []);
  let supplierIndex = 0;
  let agreementIndex = 0;
  let allTransactionsIndex = 0;

  return (
    <>
      {/* {!!} */}
      {!!allTransactionsWindow && (
        <WindowContainer
          containerStyle={{
            zIndex: 10,
            width: '90%',
            height: '90%',
            top: '5%',
            left: '5%',
          }}
          onHandleCloseWindow={() => setAllTransactionsWindow(false)}
        >
          <AllTransactionsWindow>
            {transactions.map(transaction => {
              allTransactionsIndex += 1;
              return (
                <Transaction key={allTransactionsIndex}>
                  <p>{allTransactionsIndex}</p>
                  <h3>{transaction.amount}</h3>
                  <h3>
                    {transaction.difference_in_days &&
                      (transaction.difference_in_days > 0
                        ? `Faltam ${transaction.difference_in_days}`
                        : `Está atrasado ${transaction.difference_in_days}`)}
                  </h3>
                  <h3>{transaction.formattedDate}</h3>
                </Transaction>
              );
            })}
          </AllTransactionsWindow>
        </WindowContainer>
      )}
      <Container>
        <h1>Financeiro</h1>
        <span>
          <h3>Custo Total {totalEventCost}</h3>
          <h3>Total Pago {totalPaid}</h3>
          <h3>Total a Pagar {totalToPay}</h3>
          <h3>Total Atrasado {totalOverdue}</h3>
        </span>
        <span>
          <button type="button" onClick={() => setAllTransactionsWindow(true)}>
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
                      <>
                        <p>{agreementIndex}</p>
                        <h2 key={agreement.id}>{agreement.amount}</h2>
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </PageContainer>
        </div>
      </Container>
    </>
  );
};

export default EventFinanceSection;
