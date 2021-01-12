import React from 'react';
import IEventCheckListDTO from '../../../dtos/IEventCheckListDTO';
import IEventGuestDTO from '../../../dtos/IEventGuestDTO';
import IEventInfoDTO from '../../../dtos/IEventInfoDTO';
import IEventSupplierDTO from '../../../dtos/IEventSupplierDTO';
import { numberFormat } from '../../../utils/numberFormat';

import { Container } from './styles';

interface IProps {
  handleGuestsSection: Function;
  handleBudgetDrawer: Function;
  handleCheckListSection: Function;
  handleSupplierSection: Function;
  handleFinanceSection: Function;
  confirmedGuests: number;
  eventGuests: IEventGuestDTO[];
  eventInfo: IEventInfoDTO;
  hiredSuppliers: IEventSupplierDTO[];
  selectedSuppliers: IEventSupplierDTO[];
  totalEventCost: number;
  resolvedCheckListTasks: IEventCheckListDTO[];
  checkListTasks: number;
  isOwner: boolean;
}

const FirstRow: React.FC<IProps> = ({
  handleGuestsSection,
  confirmedGuests,
  eventGuests,
  handleBudgetDrawer,
  eventInfo,
  handleSupplierSection,
  handleFinanceSection,
  hiredSuppliers,
  selectedSuppliers,
  totalEventCost,
  handleCheckListSection,
  resolvedCheckListTasks,
  checkListTasks,
  isOwner,
}: IProps) => {
  return (
    <Container>
      <div>
        <button type="button" onClick={() => handleGuestsSection()}>
          <h2>Convidados</h2>
          <p>
            {confirmedGuests}/{eventGuests.length}
          </p>
        </button>
      </div>
      <div>
        {isOwner ? (
          <button type="button" onClick={() => handleBudgetDrawer()}>
            <h2>Orçamento</h2>
            <p>{eventInfo ? numberFormat(eventInfo.budget) : ''}</p>
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
          <p>
            {hiredSuppliers.length}/
            {selectedSuppliers.length + hiredSuppliers.length}
          </p>
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
          <p>
            {resolvedCheckListTasks.length}/{checkListTasks}
          </p>
        </button>
      </div>
    </Container>
  );
};

export default FirstRow;
