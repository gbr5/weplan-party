import React, { useCallback, useMemo, useState } from 'react';
import IEventSupplierDTO from '../../dtos/IEventSupplierDTO';
import PageContainer from '../PageContainer';

import {
  Container,
  Suppliers,
  SupplierButton,
  MenuButton,
  SupplierTransactionAgreementsWindow,
} from './styles';
import { numberFormat } from '../../utils/numberFormat';
import { EventTransactionButton } from '../EventsComponents/FinancialComponents/EventTransaction';
import TransactionsWindow from '../TransactionsWindow';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';
import { useEventVariables } from '../../hooks/eventVariables';

interface IPropsDTO {
  hiredSuppliers: IEventSupplierDTO[];
}

const EventFinanceSection: React.FC<IPropsDTO> = ({
  hiredSuppliers,
}: IPropsDTO) => {
  const { eventTransactions, selectedEvent } = useEventVariables();
  const [supplierTransactions, setSupplierTransactions] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<IEventSupplierDTO>(
    {} as IEventSupplierDTO,
  );
  const [allTransactionsWindow, setAllTransactionsWindow] = useState(true);
  const [paidTransactionsWindow, setPaidTransactionsWindow] = useState(false);
  const [notPaidTransactionsWindow, setNotPaidTransactionsWindow] = useState(
    false,
  );
  const [overdueTransactionsWindow, setOverdueTransactionsWindow] = useState(
    false,
  );

  const closeAllWindow = useCallback(() => {
    setSupplierTransactions(false);
    setAllTransactionsWindow(false);
    setPaidTransactionsWindow(false);
    setNotPaidTransactionsWindow(false);
    setOverdueTransactionsWindow(false);
    setSelectedSupplier({} as IEventSupplierDTO);
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

  let supplierIndex = 0;

  const handleSelectedSupplier = useCallback(
    props => {
      closeAllWindow();
      setSelectedSupplier(props);
      setSupplierTransactions(true);
    },
    [closeAllWindow],
  );

  const paidTransactions = useMemo(() => {
    return eventTransactions.filter(
      ({ transaction }) => !transaction.isCancelled && transaction.isPaid,
    );
  }, [eventTransactions]);

  const notPaidTransactions = useMemo(() => {
    return eventTransactions.filter(
      ({ transaction }) => !transaction.isCancelled && !transaction.isPaid,
    );
  }, [eventTransactions]);

  const overdueTransactions = useMemo(() => {
    return eventTransactions.filter(
      ({ transaction }) =>
        !transaction.isCancelled &&
        !transaction.isPaid &&
        new Date() < new Date(transaction.due_date),
    );
  }, [eventTransactions]);

  const totalCost = useMemo(() => {
    return eventTransactions
      .filter(({ transaction }) => transaction.payer_id === selectedEvent.id)
      .map(({ transaction }) => transaction.amount)
      .reduce((acc, cv) => acc + cv, 0);
  }, [eventTransactions, selectedEvent]);

  const totalPaid = useMemo(() => {
    return paidTransactions
      .filter(({ transaction }) => transaction.payer_id === selectedEvent.id)
      .map(({ transaction }) => transaction.amount)
      .reduce((acc, cv) => acc + cv, 0);
  }, [paidTransactions, selectedEvent]);

  const totalToPay = useMemo(() => {
    return notPaidTransactions
      .filter(({ transaction }) => transaction.payer_id === selectedEvent.id)
      .map(({ transaction }) => transaction.amount)
      .reduce((acc, cv) => acc + cv, 0);
  }, [notPaidTransactions, selectedEvent]);

  const totalOverdue = useMemo(() => {
    return overdueTransactions
      .filter(({ transaction }) => transaction.payer_id === selectedEvent.id)
      .map(({ transaction }) => transaction.amount)
      .reduce((acc, cv) => acc + cv, 0);
  }, [overdueTransactions, selectedEvent]);

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
            <p>{numberFormat(totalCost)}</p>
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
            <p style={{ color: 'red' }}>{numberFormat(totalOverdue)}</p>
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
                <SupplierButton
                  booleanActiveButton={selectedSupplier === supplier}
                  type="button"
                  onClick={() => handleSelectedSupplier(supplier)}
                  key={supplier.id}
                >
                  <p>{supplierIndex}</p>
                  <h3>{supplier.name}</h3>
                </SupplierButton>
              );
            })}
          </div>
        </Suppliers>

        <PageContainer
          containerStyle={{
            height: '368px',
            boxSizing: 'border-box',
            minWidth: '480px',
          }}
        >
          {!!supplierTransactions && (
            <SupplierTransactionAgreementsWindow>
              <h1>{selectedSupplier.name}</h1>
              <div>
                {selectedSupplier.transactionAgreements.map(agreement => {
                  return (
                    <>
                      <SupplierTransactionAgreementsWindow>
                        {agreement.transactions.map(agreementTransaction => {
                          const eventTransaction: IEventTransactionDTO = {
                            agreement_id: agreement.id,
                            agreement_type: 'supplier',
                            event_id: selectedSupplier.event_id,
                            transaction: agreementTransaction.transaction,
                          };
                          const year = new Date(
                            agreementTransaction.transaction.due_date,
                          ).getFullYear();
                          const month = new Date(
                            agreementTransaction.transaction.due_date,
                          ).getMonth();
                          const date = new Date(
                            agreementTransaction.transaction.due_date,
                          ).getDate();

                          const firstOfYear =
                            agreement.transactions.filter(
                              ({ transaction }) =>
                                new Date(transaction.due_date).getFullYear() ===
                                year,
                            )[0].transaction.id ===
                            agreementTransaction.transaction.id;

                          const firstOfMonth =
                            agreement.transactions.filter(
                              ({ transaction }) =>
                                new Date(transaction.due_date).getFullYear() ===
                                  year &&
                                new Date(transaction.due_date).getMonth() ===
                                  month,
                            )[0].transaction.id ===
                            agreementTransaction.transaction.id;

                          const firstOfDay =
                            agreement.transactions.filter(
                              ({ transaction }) =>
                                new Date(transaction.due_date).getFullYear() ===
                                  year &&
                                new Date(transaction.due_date).getMonth() ===
                                  month &&
                                new Date(transaction.due_date).getDate() ===
                                  date,
                            )[0].transaction.id ===
                            agreementTransaction.transaction.id;
                          return (
                            <EventTransactionButton
                              eventTransaction={eventTransaction}
                              firstOfDay={firstOfDay}
                              firstOfMonth={firstOfMonth}
                              firstOfYear={firstOfYear}
                              key={agreementTransaction.id}
                            />
                          );
                        })}
                      </SupplierTransactionAgreementsWindow>
                    </>
                  );
                })}
              </div>
            </SupplierTransactionAgreementsWindow>
          )}
          {!!allTransactionsWindow && (
            <TransactionsWindow
              title="Transações"
              transactions={eventTransactions}
            />
          )}
          {!!paidTransactionsWindow && (
            <TransactionsWindow
              title="Transações Efetuadas"
              transactions={paidTransactions}
            />
          )}
          {!!notPaidTransactionsWindow && (
            <TransactionsWindow
              title="Transações a Pagar"
              transactions={notPaidTransactions}
            />
          )}
          {!!overdueTransactionsWindow && (
            <TransactionsWindow
              title="Transações Atrasadas"
              transactions={overdueTransactions}
            />
          )}
        </PageContainer>
      </div>
    </Container>
  );
};

export default EventFinanceSection;
