import React, { ReactElement, useMemo } from 'react';
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
  // eslint-disable-next-line react/require-default-props
  isSupplierSelected?: boolean;
}

export function SupplierAgreementButton({
  agreement,
  index,
  isSupplierSelected,
}: IProps): ReactElement {
  const {
    eventSuppliers,
    selectEventSupplierTransactionAgreement,
  } = useEventVariables();
  const {
    handleEventSupplierAgreementTransactionsWindow,
  } = useEventSuppliers();

  const supplier = useMemo(() => {
    return eventSuppliers.find(item => item.id === agreement.supplier_id);
  }, [eventSuppliers, agreement]);

  const { isOverdue, numberOfPaidTransactions } = useMemo(() => {
    const paidTransactions = agreement.transactions.filter(
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
      numberOfPaidTransactions: paidTransactions,
      isOverdue: overdue.length > 0,
    };
  }, [agreement]);

  function handleSelectAgreement(): void {
    selectEventSupplierTransactionAgreement(agreement);
    handleEventSupplierAgreementTransactionsWindow();
  }

  const agreementInfo = useMemo(
    () => `${numberOfPaidTransactions} / ${agreement.number_of_installments}`,
    [numberOfPaidTransactions, agreement],
  );
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
          <Amount>{formatBrlCurrency(agreement.amount)}</Amount>
          <NumberOfInstallments>{agreementInfo}</NumberOfInstallments>
        </ContractInfo>
      </Body>
      <StatusContainer isOverdue={isOverdue}>
        <FiFlag size={24} />
      </StatusContainer>
    </Container>
  );
}
