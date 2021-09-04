import React from 'react';

import { useEvent } from '../../hooks/event';
import { useEventVariables } from '../../hooks/eventVariables';
import { useCurrentEvent } from '../../hooks/currentEvent';
import { useEventSuppliers } from '../../hooks/eventSuppliers';
import { useTransaction } from '../../hooks/transactions';
import { useNote } from '../../hooks/notes';

import PageHeader from '../../components/PageHeader';
import { FirstRow } from '../../components/EventHostComponents/FirstRow';
import DeleteConfirmationWindow from '../../components/DeleteConfirmationWindow';
import { EventTaskSection } from '../../components/EventsComponents/EventTaskComponents/EventTaskSection';
import { EventGuestSection } from '../../components/EventsComponents/EventGuestComponents/EventGuestSection';
import EventSupplierSection from '../../components/EventSupplierSection';
import EditEventBudgetWindow from '../../components/EditEventBudgetWindow';
import { EventMainDashboard } from '../../components/EventHostComponents/EventMainDashboard';
import { EditSupplierCategory } from '../../components/EventsComponents/EventSupplierComponents/EditSupplierCategory';
import { SupplierTransactionsWindow } from '../../components/EventsComponents/EventSupplierComponents/SupplierTransactionsWindow';
import { SupplierNotesSection } from '../../components/EventsComponents/EventSupplierComponents/SupplierNotesWindow';
import { TransactionsFilterWindow } from '../../components/TransactionComponents/TransactionsFilterWindow';
import { SupplierTransactionAgreementsWindow } from '../../components/EventsComponents/EventSupplierComponents/SupplierTransactionAgreementsWindow';
import { EventSupplierFilesWindow } from '../../components/EventsComponents/EventSupplierComponents/EventSupplierFilesWindow';
import { CancelAllAgreements } from '../../components/EventsComponents/EventSupplierComponents/CancelAllAgreements';
import { DischargeSupplierWindow } from '../../components/EventsComponents/EventSupplierComponents/DischargeSupplierWindow';
import { SelectSupplierCategory } from '../../components/EventsComponents/EventSupplierComponents/SelectSupplierCategory';
import { NewSupplierForm } from '../../components/EventsComponents/EventSupplierComponents/NewSupplierForm';
import { CreateSupplierTransactionAgreement } from '../../components/EventsComponents/EventSupplierComponents/CreateSupplierTransactionAgreement';
import { NewEventSupplierTransactionAgreementConfirmation } from '../../components/EventsComponents/EventSupplierComponents/NewEventSupplierTransactionAgreementConfirmation';
import { EditSupplierBudgetAmount } from '../../components/EventsComponents/EventSupplierComponents/EditSupplierBudgetAmount';
import { EditSupplierBudgetDescription } from '../../components/EventsComponents/EventSupplierComponents/EditSupplierBudgetDescription';
import { EditTransactionAmount } from '../../components/TransactionComponents/EditTransactionAmount';
import { NotesSection } from '../../components/EventsComponents/EventNotesComponents/NotesSection';
import { EditNoteWindow } from '../../components/NotesComponents/EditNoteWindow';
import { CreateEvent } from '../../components/EventsComponents/CreateEvent';
import { FinancialSection } from '../../components/EventsComponents/FinancialComponents/FinancialSection';
import { EventSupplierAgreementTransactionsWindow } from '../../components/EventsComponents/FinancialComponents/EventSupplierAgreementTransactionsWindow';
import { TransactionFilesWindow } from '../../components/TransactionComponents/TransactionFilesWindow';
import { TransactionNotesWindow } from '../../components/TransactionComponents/TransactionNotesWindow';
import { useEventTasks } from '../../hooks/eventTasks';
import { EventTaskNotesWindow } from '../../components/EventsComponents/EventTaskNotesWindow';
import { EventSupplierBudgetForm } from '../../components/EventsComponents/EventSupplierComponents/EventSupplierBudgetForm';
import { OwnersSection } from '../../components/EventsComponents/OwnersComponents/OwnersSection';
import { MembersSection } from '../../components/EventsComponents/MembersComponents/MembersSection';

import { Container, EventPageContent, Main } from './styles';

const EventHostDashboard: React.FC = () => {
  const { createEventWindow } = useEvent();
  const {
    selectedEventTask,
    currentSection,
    selectedEventSupplierTransactionAgreement,
  } = useEventVariables();
  const { budgetWindow } = useCurrentEvent();
  const {
    editSupplierCategoryWindow,
    createSupplierTransactionAgreementWindow,
    addSupplierWindow,
    editSupplierBudgetAmountWindow,
    editSupplierBudgetDescriptionWindow,
    supplierNotesWindow,
    supplierFilesWindow,
    supplierTransactionsWindow,
    supplierTransactionAgreementsWindow,
    cancelAgreementsWindow,
    dischargingWindow,
    supplierCategoryWindow,
    supplierBudgetForm,
    eventSupplierAgreementTransactionsWindow,
  } = useEventSuppliers();
  const {
    filterTransactionWindow,
    editEventTransactionValueWindow,
    newEventSupplierTransactionAgreement,
    transactionFilesWindow,
    transactionNotesWindow,
  } = useTransaction();
  const { editNoteWindow } = useNote();
  const {
    eventTaskNotesWindow,
    deleteTaskConfirmationWindow,
    handleDeleteTaskConfirmationWindow,
    deleteTask,
  } = useEventTasks();

  return (
    <Container>
      <PageHeader />
      {/* Supplier Windows */}
      {editSupplierCategoryWindow && <EditSupplierCategory />}
      {createSupplierTransactionAgreementWindow && (
        <CreateSupplierTransactionAgreement />
      )}
      {supplierTransactionsWindow && <SupplierTransactionsWindow />}
      {supplierFilesWindow && <EventSupplierFilesWindow />}
      {cancelAgreementsWindow && <CancelAllAgreements />}
      {dischargingWindow && <DischargeSupplierWindow />}
      {supplierCategoryWindow && <SelectSupplierCategory />}
      {addSupplierWindow && <NewSupplierForm />}
      {editSupplierBudgetAmountWindow && <EditSupplierBudgetAmount />}
      {editSupplierBudgetDescriptionWindow && <EditSupplierBudgetDescription />}
      {supplierTransactionAgreementsWindow && (
        <SupplierTransactionAgreementsWindow />
      )}
      {supplierNotesWindow && <SupplierNotesSection />}
      {newEventSupplierTransactionAgreement && (
        <NewEventSupplierTransactionAgreementConfirmation />
      )}
      {supplierBudgetForm && <EventSupplierBudgetForm />}
      {/* End of Supplier Windows */}
      {/* Transaction Windows */}
      {filterTransactionWindow && <TransactionsFilterWindow />}
      {editEventTransactionValueWindow && <EditTransactionAmount />}
      {selectedEventSupplierTransactionAgreement &&
        selectedEventSupplierTransactionAgreement.id &&
        eventSupplierAgreementTransactionsWindow && (
          <EventSupplierAgreementTransactionsWindow />
        )}
      {transactionNotesWindow && <TransactionNotesWindow />}
      {transactionFilesWindow && <TransactionFilesWindow />}
      {/* End of Transaction Windows */}
      {/* Event Tasks Windows */}
      {eventTaskNotesWindow && <EventTaskNotesWindow />}
      {deleteTaskConfirmationWindow &&
        selectedEventTask &&
        selectedEventTask.id && (
          <DeleteConfirmationWindow
            title="Deseja deletar esta tarefa?"
            onHandleCloseWindow={handleDeleteTaskConfirmationWindow}
            handleDelete={() => deleteTask(selectedEventTask)}
          />
        )}

      {/* Notes Windows */}
      {editNoteWindow && <EditNoteWindow />}
      {/* End of Notes Windows */}
      <EventPageContent>
        <Main>
          <FirstRow />
          {createEventWindow && <CreateEvent />}
          {budgetWindow && <EditEventBudgetWindow />}
          {currentSection === 'notes' && <NotesSection />}
          {currentSection === 'dashboard' && <EventMainDashboard />}
          {currentSection === 'suppliers' && <EventSupplierSection />}
          {currentSection === 'guests' && <EventGuestSection />}
          {currentSection === 'financial' && <FinancialSection />}
          {currentSection === 'tasks' && <EventTaskSection />}
          {currentSection === 'owners' && <OwnersSection />}
          {currentSection === 'members' && <MembersSection />}
        </Main>
      </EventPageContent>
    </Container>
  );
};

export default EventHostDashboard;
