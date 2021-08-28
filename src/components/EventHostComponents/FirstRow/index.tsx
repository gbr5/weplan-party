import React from 'react';
import { useMemo } from 'react';
import { useEventVariables } from '../../../hooks/eventVariables';

import { Container } from './styles';

export function FirstRow(): JSX.Element {
  const {
    eventOwners,
    eventBudget,
    eventMembers,
    eventGuests,
    eventTasks,
    eventNotes,
    eventSuppliers,
    selectedEvent,
    handleCurrentSection,
  } = useEventVariables();

  const numberOfConfirmedGuests = useMemo(() => {
    return eventGuests.filter(guest => guest.confirmed).length;
  }, [eventGuests]);

  const eventTaskInfo = useMemo(() => {
    const resolved = eventTasks.filter(task => task.status === 'finnished');
    return `${resolved.length} / ${eventTasks.length}`;
  }, [eventTasks]);

  const hiredSuppliers = useMemo(() => {
    return eventSuppliers.filter(
      supplier => !supplier.isDischarged && supplier.isHired,
    );
  }, [eventSuppliers]);

  const totalEventCost = useMemo(() => {
    const total: number[] = [];
    hiredSuppliers.map(supplier => {
      supplier.transactionAgreements.map(agreement => {
        total.push(Number(agreement.amount));
        return agreement;
      });
      return supplier;
    });
    return total.reduce((acc, cv) => acc + cv, 0);
  }, [hiredSuppliers]);

  const suppliersInfo = useMemo(() => {
    const suppliers = eventSuppliers.filter(supplier => !supplier.isDischarged);
    return `${hiredSuppliers.length} / ${suppliers.length}`;
  }, [hiredSuppliers, eventSuppliers]);

  const notesInfo = useMemo(() => `${eventNotes.length}`, [eventNotes]);
  const guestsInfo = useMemo(() => {
    return `${numberOfConfirmedGuests} / ${eventGuests.length}`;
  }, [numberOfConfirmedGuests, eventGuests]);
  const financialInfo = useMemo(() => {
    return totalEventCost > 0 && eventBudget.budget > 0
      ? `${Math.round((totalEventCost / eventBudget.budget) * 100)}%`
      : '0%';
  }, [eventBudget, totalEventCost]);
  const ownersNumber = useMemo(() => `${eventOwners.length}`, [eventOwners]);
  const membersNumber = useMemo(() => `${eventMembers.length}`, [eventMembers]);

  return (
    <Container>
      <button type="button" onClick={() => handleCurrentSection('dashboard')}>
        <h2>Dashboard</h2>
      </button>
      <button type="button" onClick={() => handleCurrentSection('notes')}>
        <h2>Notas</h2>
        <p>{notesInfo}</p>
      </button>
      <button type="button" onClick={() => handleCurrentSection('tasks')}>
        <h2>Tarefas</h2>
        <p>{eventTaskInfo}</p>
      </button>
      <button type="button" onClick={() => handleCurrentSection('guests')}>
        <h2>Convidados</h2>
        <p>{guestsInfo}</p>
      </button>
      <button type="button" onClick={() => handleCurrentSection('suppliers')}>
        <h2>Fornecedores</h2>
        <p>{suppliersInfo}</p>
      </button>
      <button type="button" onClick={() => handleCurrentSection('financial')}>
        <h2>Financeiro</h2>
        <p>{financialInfo}</p>
      </button>
      <button type="button" onClick={() => handleCurrentSection('owners')}>
        <h2>Anfritriões</h2>
        <p>{ownersNumber}</p>
      </button>
      {selectedEvent.event_type === 'Prom' && (
        <button type="button" onClick={() => handleCurrentSection('members')}>
          <h2>Membros</h2>
          <p>{membersNumber}</p>
        </button>
      )}
    </Container>
  );
}
