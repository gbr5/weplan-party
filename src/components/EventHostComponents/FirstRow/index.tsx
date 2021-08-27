import React from 'react';
import { useMemo } from 'react';
import IEventInfoDTO from '../../../dtos/IEventInfoDTO';
import { useEvent } from '../../../hooks/event';
import { useEventVariables } from '../../../hooks/eventVariables';
import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import { numberFormat } from '../../../utils/numberFormat';

import { Container } from './styles';

interface IProps {
  handleGuestsSection: Function;
  handleCheckListSection: Function;
  handleSupplierSection: Function;
  handleFinanceSection: Function;
  eventInfo: IEventInfoDTO;
}

const FirstRow: React.FC<IProps> = ({
  handleGuestsSection,
  eventInfo,
  handleSupplierSection,
  handleFinanceSection,
  handleCheckListSection,
}: IProps) => {
  const { handleEventBudgetWindow } = useEvent();
  const {
    isOwner,
    eventBudget,
    eventGuests,
    eventTasks,
    eventNotes,
    eventSuppliers,
  } = useEventVariables();

  const budget = useMemo(() => {
    return eventBudget && eventBudget.id
      ? formatBrlCurrency(eventBudget.budget)
      : formatBrlCurrency(0);
  }, [eventBudget]);

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

  return (
    <Container>
      <div>
        <button type="button" onClick={() => handleGuestsSection()}>
          <h2>Notas</h2>
          <p>{notesInfo}</p>
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handleGuestsSection()}>
          <h2>Convidados</h2>
          <p>
            {numberOfConfirmedGuests}/{eventGuests.length}
          </p>
        </button>
      </div>
      <div>
        {isOwner ? (
          <button type="button" onClick={handleEventBudgetWindow}>
            <h2>Orçamento</h2>
            <p>{budget}</p>
          </button>
        ) : (
          <button type="button">
            <h2>Orçamento</h2>
            <p>{eventInfo.budget ? numberFormat(eventInfo.budget) : ''}</p>
          </button>
        )}
      </div>
      <div>
        <button type="button" onClick={() => handleSupplierSection()}>
          <h2>Fornecedores</h2>
          <p>{suppliersInfo}</p>
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handleFinanceSection()}>
          <h2>Financeiro</h2>
          <p>{Math.round((totalEventCost / eventInfo.budget) * 100)}%</p>
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handleCheckListSection()}>
          <h2>Check-List</h2>
          <p>{eventTaskInfo}</p>
        </button>
      </div>
    </Container>
  );
};

export default FirstRow;
