import React, { useState } from 'react';

import { addMonths } from 'date-fns';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { SectionHeader } from '../../../SectionHeader';

import { Container, BudgetContainer } from './styles';
import { EventSupplierBudgetButton } from '../EventSupplierBudgetButton';

export function EventSupplierBudgetsWindow(): JSX.Element {
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleSupplierBudgetsWindow,
    handleSupplierBudgetForm,
  } = useEventSuppliers();

  const [budgetDescriptionWindow, setBudgetDescriptionWindow] = useState(false);

  function handleBudgetDescriptionWindow(): void {
    setBudgetDescriptionWindow(!budgetDescriptionWindow);
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleSupplierBudgetsWindow}
      containerStyle={{
        zIndex: 16,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
      zIndex={15}
    >
      <Container>
        <SectionHeader
          handleAddButton={handleSupplierBudgetForm}
          handleInfoButton={handleBudgetDescriptionWindow}
          title="Orçamentos"
        />
        {selectedEventSupplier.budgets.length > 0 && (
          <BudgetContainer>
            {selectedEventSupplier.budgets.map(item => {
              const index = String(
                selectedEventSupplier.budgets.findIndex(
                  budget => budget.id === item.id,
                ) + 1,
              );
              return (
                <EventSupplierBudgetButton
                  budget={item}
                  key={item.id}
                  index={index}
                />
              );
            })}
          </BudgetContainer>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
