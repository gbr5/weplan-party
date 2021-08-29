/* eslint-disable react/require-default-props */
import React, { useMemo } from 'react';
import { FiFlag } from 'react-icons/fi';
import IEventSupplierTransactionAgreementDTO from '../../../../dtos/IEventSupplierTransactionAgreementDTO';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';

import {
  Container,
  Index,
  Body,
  SupplierName,
  ContractInfo,
  Amount,
  NumberOfInstallments,
  StatusContainer,
} from './styles';

interface IProps {
  index: number;
  agreement: IEventSupplierTransactionAgreementDTO;
  isSupplierSelected?: boolean;
}

export function SupplierAgreementButton({
  agreement,
  index,
  isSupplierSelected,
}: IProps): JSX.Element {
  const iconSize = 28;
  const { eventSuppliers } = useEventVariables();
  const {
    handleEventSupplierAgreementTransactionsWindow,
    selectSupplierTransactionAgreement,
  } = useEventSuppliers();

  const supplier = useMemo(() => {
    return eventSuppliers.find(item => item.id === agreement.supplier_id);
  }, [eventSuppliers, agreement]);

  const { isOverdue, numberOfPaidTransactions } = useMemo(() => {
    const paid = agreement.transactions.filter(
      ({ transaction }) => !transaction.isCancelled && transaction.isPaid,
    ).length;
    const today = new Date();
    const overdue = agreement.transactions.filter(
      ({ transaction }) =>
        !transaction.isCancelled &&
        !transaction.isPaid &&
        new Date(transaction.due_date) < today,
    );
    return {
      numberOfPaidTransactions: paid,
      isOverdue: overdue.length > 0,
    };
  }, [agreement]);

  function handleSelectAgreement(): void {
    selectSupplierTransactionAgreement(agreement);
    handleEventSupplierAgreementTransactionsWindow();
  }
  return (
    <Container onClick={handleSelectAgreement}>
      <Index>{index}</Index>
      <Body>
        {!isSupplierSelected ? (
          supplier && <SupplierName>{supplier.name}</SupplierName>
        ) : (
          <SupplierName>
            Criado dia: {formatOnlyDateShort(String(agreement.created_at))}
          </SupplierName>
        )}
        <ContractInfo>
          <Amount>{formatBrlCurrency(agreement.amount)} | </Amount>
          <NumberOfInstallments>
            {numberOfPaidTransactions} / {agreement.number_of_installments}
          </NumberOfInstallments>
        </ContractInfo>
      </Body>
      <StatusContainer isOverdue={isOverdue}>
        <FiFlag size={iconSize} />
      </StatusContainer>
    </Container>
  );
}
