import React, { useContext, createContext, useState, ChangeEvent } from 'react';
import { subDays } from 'date-fns';

import api from '../services/api';
import { useCurrentEvent } from './currentEvent';
import { useEventSuppliers } from './eventSuppliers';

import ICreateEventSupplierTransactionAgreementDTO from '../dtos/ICreateEventSupplierTransactionAgreementDTO';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ITransactionDTO from '../dtos/ITransactionDTO';
import IUpdateEventSupplierTransactionAgreementDTO from '../dtos/IUpdateEventSupplierTransactionAgreementDTO';
import IEventTransactionDTO from '../dtos/IEventTransactionDTO';
import { useFiles } from './files';
import { useEventVariables } from './eventVariables';
import { useToast } from './toast';

interface INewAgreementDTO {
  amount: number;
  installments: number;
}

interface IEditTransactionFileDTO {
  id: string;
  name: string;
}

interface ICreateEventSupplierTransactionAgreementWithTransactionsDTO
  extends ICreateEventSupplierTransactionAgreementDTO {
  transactions: ICreateTransactionDTO[];
}
interface TransactionContextType {
  createTransactionWindow: boolean;
  transactionFilesWindow: boolean;
  cancelEventTransactionConfirmationWindow: boolean;
  editEventTransactionValueWindow: boolean;
  filterTransactionWindow: boolean;
  loading: boolean;
  newAgreementAmount: number;
  newAgreementInstallments: number;
  newEventSupplierTransactionAgreement: boolean;
  selectedTransaction: ITransactionDTO;
  cancelledTransactionFilter: boolean;
  sortTransactionsByInterval: boolean;
  transactionNotesWindow: boolean;
  fromDateTransactionFilter: Date;
  toDateTransactionFilter: Date;
  filterTransactionOption: string;
  handleFilterTransactionOption: (data: string) => void;
  cancelEventTransaction: () => Promise<void>;
  editTransactionFile: (data: IEditTransactionFileDTO) => Promise<void>;
  importTransactionFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleTransactionFilesWindow: () => void;
  createSupplierTransactionAgreementWithTransactions: (
    data: ICreateEventSupplierTransactionAgreementWithTransactionsDTO,
  ) => Promise<void>;
  deleteAllSupplierAgreements: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  createTransaction: (data: ICreateTransactionDTO) => Promise<ITransactionDTO>;
  editTransaction: (data: ITransactionDTO) => Promise<ITransactionDTO>;
  handleCreateTransactionWindow: () => void;
  handleCancelEventTransactionConfirmationWindow: () => void;
  handleTransactionNotesWindow: () => void;
  handleCancelledTransactionFilter: () => void;
  handleEditEventTransactionValueWindow: () => void;
  handleSortTransactionsByIntervalFilter: () => void;
  handleFromDateTransactionFilter: (data: Date) => void;
  handleToDateTransactionFilter: (data: Date) => void;
  handleFilterTransactionWindow: () => void;
  handleNewEventSupplierTransactionAgreement: () => void;
  handleNewAgreement: (data: INewAgreementDTO) => void;
  handleUpdateTransactionDueDate: (data: Date) => void;
  selectTransaction: (data: ITransactionDTO) => void;
  updateEventSupplierTransactionAgreement: (
    data: IUpdateEventSupplierTransactionAgreementDTO,
  ) => Promise<void>;
}

const TransactionContext = createContext({} as TransactionContextType);

const TransactionProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const {
    selectedEventSupplier,
    selectedEvent,
    selectEventSupplierTransactionAgreement,
    selectedEventSupplierTransactionAgreement,
    filteredEventTransactions,
    handleFilteredEventTransactions,
    selectedEventTransaction,
    selectEventTransaction,
  } = useEventVariables();
  const {
    getEventSuppliers,
    getEventNotes,
    getEventTransactions,
  } = useCurrentEvent();
  const {
    handleUpdateAgreementAndTransactions,
    updateEventSupplier,
  } = useEventSuppliers();
  const { handleSelectedFile, selectedFile } = useFiles();

  const [loading, setLoading] = useState(false);
  const [transactionNotesWindow, setTransactionNotesWindow] = useState(false);
  const [createTransactionWindow, setCreateTransactionWindow] = useState(false);
  const [
    cancelEventTransactionConfirmationWindow,
    setCancelEventTransactionConfirmationWindow,
  ] = useState(false);
  const [
    editEventTransactionValueWindow,
    setEditEventTransactionValueWindow,
  ] = useState(false);
  const [filterTransactionWindow, setFilterTransactionWindow] = useState(false);
  const [
    newEventSupplierTransactionAgreement,
    setNewEventSupplierTransactionAgreement,
  ] = useState(false);
  const [newAgreementAmount, setNewAgreementAmount] = useState(0);
  const [newAgreementInstallments, setNewAgreementInstallments] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(
    {} as ITransactionDTO,
  );
  const [fromDateTransactionFilter, setFromDateTransactionFilter] = useState(
    subDays(new Date(), 15),
  );
  const [toDateTransactionFilter, setToDateTransactionFilter] = useState(
    new Date(),
  );
  const [sortTransactionsByInterval, setSortTransactionsByInterval] = useState(
    false,
  );
  const [cancelledTransactionFilter, setCancelledTransactionFilter] = useState(
    false,
  );
  const [transactionFilesWindow, setTransactionFilesWindow] = useState(false);
  const [filterTransactionOption, setFilterTransactionOption] = useState('all');

  function handleTransactionFilesWindow(): void {
    setTransactionFilesWindow(!transactionFilesWindow);
  }
  function handleFilterTransactionOption(data: string): void {
    setFilterTransactionOption(data);
  }
  function handleCancelledTransactionFilter(): void {
    setCancelledTransactionFilter(!cancelledTransactionFilter);
  }
  function handleTransactionNotesWindow(): void {
    setTransactionNotesWindow(!transactionNotesWindow);
  }
  function handleEditEventTransactionValueWindow(): void {
    setEditEventTransactionValueWindow(!editEventTransactionValueWindow);
  }
  function handleSortTransactionsByIntervalFilter(): void {
    setSortTransactionsByInterval(!sortTransactionsByInterval);
  }

  function handleFromDateTransactionFilter(data: Date): void {
    setFromDateTransactionFilter(data);
  }
  function handleToDateTransactionFilter(data: Date): void {
    setToDateTransactionFilter(data);
  }

  function handleFilterTransactionWindow(): void {
    setFilterTransactionWindow(!filterTransactionWindow);
  }
  function handleCancelEventTransactionConfirmationWindow(): void {
    setCancelEventTransactionConfirmationWindow(
      !cancelEventTransactionConfirmationWindow,
    );
  }

  function handleNewEventSupplierTransactionAgreement(): void {
    setNewEventSupplierTransactionAgreement(
      !newEventSupplierTransactionAgreement,
    );
  }
  function selectTransaction(data: ITransactionDTO): void {
    setSelectedTransaction(data);
  }
  function handleNewAgreement({
    amount,
    installments,
  }: INewAgreementDTO): void {
    setNewAgreementAmount(amount);
    setNewAgreementInstallments(installments);
  }
  function handleCreateTransactionWindow(): void {
    setCreateTransactionWindow(!createTransactionWindow);
  }
  async function createTransaction({
    amount,
    name,
    due_date,
    isPaid,
    payee_id,
    payer_id,
    category,
  }: ICreateTransactionDTO): Promise<ITransactionDTO> {
    try {
      setLoading(true);
      const response = await api.post('/transactions', {
        amount,
        name,
        due_date,
        isPaid,
        payee_id,
        payer_id,
        category,
      });
      await getEventTransactions(selectedEvent.id);
      return response.data;
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function editTransaction({
    id,
    amount,
    name,
    category,
    due_date,
    isPaid,
  }: ITransactionDTO): Promise<ITransactionDTO> {
    try {
      setLoading(true);
      const response = await api.put('/transactions', {
        id,
        amount,
        name,
        category,
        due_date,
        isPaid,
      });
      if (
        selectedEventSupplierTransactionAgreement &&
        selectedEventSupplierTransactionAgreement.id
      ) {
        const updatedAgreement = selectedEventSupplierTransactionAgreement.transactions.map(
          transaction => {
            return transaction.id === id
              ? {
                  ...transaction,
                  transaction: {
                    ...transaction.transaction,
                    amount,
                    name,
                    category,
                    due_date,
                    isPaid,
                  },
                }
              : transaction;
          },
        );
        selectEventSupplierTransactionAgreement({
          ...selectedEventSupplierTransactionAgreement,
          transactions: updatedAgreement,
        });
      }
      if (filteredEventTransactions.length > 0) {
        const updatedFilteredTransactions: IEventTransactionDTO[] = filteredEventTransactions.map(
          item => {
            if (item.transaction.id === id) {
              return {
                ...item,
                transaction: response.data,
              };
            }
            return item;
          },
        );
        handleFilteredEventTransactions(updatedFilteredTransactions);
      }
      selectedEventTransaction &&
        selectedEventTransaction.transaction &&
        selectEventTransaction({
          ...selectedEventTransaction,
          transaction: response.data,
        });
      selectedEventTransaction &&
        selectedEventTransaction.transaction &&
        selectedEventTransaction.agreement_type === 'suppliers' &&
        (await getEventSuppliers(selectedEvent.id));
      await getEventTransactions(selectedEvent.id);
      return response.data;
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function handleUpdateTransactionDueDate(data: Date): Promise<void> {
    data.setHours(10);
    const oldTransaction = selectedEventTransaction;
    const response = await editTransaction({
      ...selectedEventTransaction.transaction,
      due_date: data,
    });
    await getEventTransactions(selectedEvent.id);
    oldTransaction.agreement_type === 'supplier' &&
      (await getEventSuppliers(selectedEventTransaction.event_id));
    selectEventTransaction({
      ...oldTransaction,
      transaction: response,
    });
  }
  async function deleteTransaction(id: string): Promise<void> {
    try {
      setLoading(true);
      await api.delete(`/transactions/${id}`);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function createSupplierTransactionAgreementWithTransactions({
    amount,
    number_of_installments,
    supplier_id,
    transactions,
  }: ICreateEventSupplierTransactionAgreementWithTransactionsDTO): Promise<
    void
  > {
    try {
      setLoading(true);
      const updatedTransactions = transactions.map(transaction => {
        const name = `${selectedEventSupplier.name} ${
          transactions.length > 1
            ? `${transactions.findIndex(item => item === transaction) + 1} / ${
                transactions.length
              }`
            : ''
        }`;
        return {
          ...transaction,
          name,
        };
      });
      await api.post(
        `/event-supplier-transaction-agreement-with-transactions`,
        {
          amount,
          number_of_installments,
          supplier_id,
          transactions: updatedTransactions,
        },
      );
      if (!selectedEventSupplier.isHired) {
        await updateEventSupplier({
          ...selectedEventSupplier,
          isHired: true,
        });
      }
      await getEventSuppliers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function updateEventSupplierTransactionAgreement({
    amount,
    number_of_installments,
    id,
    isCancelled,
    transactions,
  }: IUpdateEventSupplierTransactionAgreementDTO): Promise<void> {
    try {
      setLoading(true);
      const response = await api.put(`/event-supplier-transaction-agreements`, {
        amount,
        id,
        number_of_installments,
        isCancelled,
        transactions,
      });
      selectEventSupplierTransactionAgreement(response.data);
      await getEventSuppliers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function deleteAllSupplierAgreements(): Promise<void> {
    try {
      await api.delete(
        `/delete-event-supplier-transaction-agreements/${selectedEventSupplier.id}`,
      );
      await getEventSuppliers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function cancelEventTransaction(): Promise<void> {
    try {
      setLoading(true);
      const eventId = selectedEventTransaction.event_id;
      if (selectedEventTransaction.agreement_type === 'none') {
        await editTransaction({
          ...selectedEventTransaction.transaction,
          isCancelled: true,
        });
      }
      if (selectedEventTransaction.agreement_type === 'supplier') {
        const agreement = handleUpdateAgreementAndTransactions({
          id: selectedEventTransaction.agreement_id,
          transactions: [
            {
              ...selectedEventTransaction.transaction,
              isCancelled: true,
            },
          ],
        });

        await updateEventSupplierTransactionAgreement(agreement);
        await getEventSuppliers(eventId);
      }
      await getEventTransactions(eventId);
      setCancelEventTransactionConfirmationWindow(false);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function editTransactionFile({
    id,
    name,
  }: IEditTransactionFileDTO): Promise<void> {
    try {
      setLoading(true);
      const response = await api.put(`/transaction-files/${id}`, {
        name,
      });

      handleSelectedFile({
        ...selectedFile,
        name: response.data.name,
      });
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function importTransactionFile(
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    try {
      setLoading(true);
      if (e.target.files) {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        await api.post(
          `/transaction-files/${selectedEventTransaction.transaction.id}`,
          data,
        );
        addToast({
          type: 'success',
          title: 'Avatar atualizado com sucesso.',
        });

        await getEventSuppliers(selectedEvent.id);
        await getEventTransactions(selectedEvent.id);
      } else {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        cancelEventTransaction,
        cancelEventTransactionConfirmationWindow,
        createTransactionWindow,
        createSupplierTransactionAgreementWithTransactions,
        deleteTransaction,
        deleteAllSupplierAgreements,
        editTransaction,
        editEventTransactionValueWindow,
        filterTransactionWindow,
        handleCancelEventTransactionConfirmationWindow,
        handleCreateTransactionWindow,
        handleEditEventTransactionValueWindow,
        createTransaction,
        handleFilterTransactionWindow,
        handleNewAgreement,
        handleNewEventSupplierTransactionAgreement,
        handleUpdateTransactionDueDate,
        loading,
        newEventSupplierTransactionAgreement,
        newAgreementAmount,
        newAgreementInstallments,
        selectedTransaction,
        selectTransaction,
        updateEventSupplierTransactionAgreement,
        cancelledTransactionFilter,
        fromDateTransactionFilter,
        handleCancelledTransactionFilter,
        handleFromDateTransactionFilter,
        handleSortTransactionsByIntervalFilter,
        handleToDateTransactionFilter,
        sortTransactionsByInterval,
        toDateTransactionFilter,
        handleFilterTransactionOption,
        filterTransactionOption,
        handleTransactionNotesWindow,
        transactionNotesWindow,
        handleTransactionFilesWindow,
        transactionFilesWindow,
        importTransactionFile,
        editTransactionFile,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

function useTransaction(): TransactionContextType {
  const context = useContext(TransactionContext);

  if (!context)
    throw new Error('useTransaction must be used within an AuthProvider');
  return context;
}

export { TransactionProvider, useTransaction };
