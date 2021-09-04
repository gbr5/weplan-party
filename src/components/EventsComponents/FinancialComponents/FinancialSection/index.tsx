import React, { useMemo } from 'react';
import { FiDollarSign, FiFileText, FiHome } from 'react-icons/fi';
import { useCurrentEvent } from '../../../../hooks/currentEvent';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import { useEventVariables } from '../../../../hooks/eventVariables';

import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import { EventSupplierBudgetsWindow } from '../../EventSupplierComponents/EventSupplierBudgetsWindow';

import { EventSupplierTransactionAgreementsSection } from '../EventSupplierTransactionAgreementsSection';
import { EventTransactionSection } from '../EventTransactionSection';

import {
  Container,
  TitleButton,
  Title,
  FirstSection,
  BudgetSection,
  BudgetTitle,
  BudgetValue,
  Resume,
  ResumeUnderline,
  PercentageUnderline,
  ResumeTitle,
  ResumeValue,
  SectionButton,
  MenuButton,
} from './styles';

export function FinancialSection(): JSX.Element {
  const iconSize = 24;
  const { eventBudget, eventTransactions, selectedEvent } = useEventVariables();
  const {
    handleBudgetWindow,
    eventFinancialSubSection,
    handleEventFinancialSubSection,
  } = useCurrentEvent();
  const { supplierBudgetsWindow } = useEventSuppliers();

  const budget = useMemo(() => {
    return eventBudget
      ? formatBrlCurrency(eventBudget.budget)
      : formatBrlCurrency(0);
  }, [eventBudget]);

  const totalExecutedValue = useMemo(() => {
    return formatBrlCurrency(
      eventTransactions
        .filter(
          ({ transaction }) =>
            transaction.payer_id === selectedEvent.id &&
            transaction.isPaid &&
            !transaction.isCancelled,
        )
        .map(({ transaction }) => Number(transaction.amount))
        .reduce((acc, cv) => acc + cv, 0),
    );
  }, [eventTransactions, selectedEvent]);

  const totalHiredValue = useMemo(() => {
    return formatBrlCurrency(
      eventTransactions
        .filter(
          ({ transaction }) =>
            transaction.payer_id === selectedEvent.id &&
            !transaction.isCancelled,
        )
        .map(({ transaction }) => Number(transaction.amount))
        .reduce((acc, cv) => acc + cv, 0),
    );
  }, [eventTransactions, selectedEvent]);

  return (
    <>
      {supplierBudgetsWindow && <EventSupplierBudgetsWindow />}

      <Container>
        <TitleButton onClick={() => handleEventFinancialSubSection('Main')}>
          <Title>Financeiro</Title>
        </TitleButton>
        {eventFinancialSubSection === 'TransactionAgreements' && (
          <EventSupplierTransactionAgreementsSection />
        )}
        {eventFinancialSubSection === 'Transactions' && (
          <EventTransactionSection />
        )}
        {eventFinancialSubSection === 'Main' && (
          <FirstSection>
            <BudgetSection onClick={handleBudgetWindow}>
              <BudgetTitle>Orçamento</BudgetTitle>
              <PercentageUnderline />
              <BudgetValue>{budget}</BudgetValue>
            </BudgetSection>
            <Resume>
              <ResumeTitle>Valores Contratados:</ResumeTitle>
              <ResumeUnderline />
              <ResumeValue>{totalHiredValue}</ResumeValue>
            </Resume>
            <Resume>
              <ResumeTitle>Valores Executados:</ResumeTitle>
              <ResumeUnderline />
              <ResumeValue>{totalExecutedValue}</ResumeValue>
            </Resume>
          </FirstSection>
        )}
        <SectionButton>
          <MenuButton
            onClick={() => handleEventFinancialSubSection('Main')}
            isActive={eventFinancialSubSection === 'Main'}
          >
            <FiHome size={iconSize} />
          </MenuButton>
          <MenuButton
            onClick={() =>
              handleEventFinancialSubSection('TransactionAgreements')
            }
            isActive={eventFinancialSubSection === 'TransactionAgreements'}
          >
            <FiFileText size={iconSize} />
          </MenuButton>
          <MenuButton
            onClick={() => handleEventFinancialSubSection('Transactions')}
            isActive={eventFinancialSubSection === 'Transactions'}
          >
            <FiDollarSign size={iconSize} />
          </MenuButton>
        </SectionButton>
      </Container>
    </>
  );
}
