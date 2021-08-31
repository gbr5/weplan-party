import React, { useState } from 'react';
import { useMemo } from 'react';
import { CheckBoxButton } from '../../../CheckBoxButton';
import IEventSupplierBudgetDTO from '../../../../dtos/IEventSupplierBudgetDTO';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import { EventSupplierBudgetButtonInfo } from '../EventSupplierBudgetButtonInfo';

import {
  OverContainer,
  Container,
  Index,
  Amount,
  DueDate,
  Row,
} from './styles';

interface IProps {
  index: string;
  budget: IEventSupplierBudgetDTO;
}

export function EventSupplierBudgetButton({
  budget,
  index,
}: IProps): JSX.Element {
  const {
    updateSupplierBudget,
    selectSupplierBudget,
    selectedSupplierBudget,
  } = useEventSuppliers();
  const [loading, setLoading] = useState(false);

  function handleBudgetInfo(): void {
    if (selectedSupplierBudget.id === budget.id)
      return selectSupplierBudget({} as IEventSupplierBudgetDTO);
    return selectSupplierBudget(budget);
  }

  async function handleUpdateSupplierBudgetIsActive(): Promise<void> {
    try {
      setLoading(true);
      await updateSupplierBudget({
        ...budget,
        isActive: !budget.isActive,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  const isActive = useMemo(() => selectedSupplierBudget.id === budget.id, [
    selectedSupplierBudget,
    budget,
  ]);

  return (
    <OverContainer>
      <Container
        style={{
          zIndex: isActive ? 6 : 1,
        }}
        onClick={handleBudgetInfo}
      >
        <Row>
          <Index>{index} )</Index>
          <Amount>{formatBrlCurrency(budget.amount)}</Amount>
          <CheckBoxButton
            isActive={budget.isActive}
            handleIsActive={handleUpdateSupplierBudgetIsActive}
            loading={loading}
          />
        </Row>
        <Row>
          <DueDate>Vencimento: </DueDate>
          <DueDate>{formatOnlyDateShort(String(budget.due_date))}</DueDate>
        </Row>
      </Container>
      {isActive && <EventSupplierBudgetButtonInfo budget={budget} />}
    </OverContainer>
  );
}
