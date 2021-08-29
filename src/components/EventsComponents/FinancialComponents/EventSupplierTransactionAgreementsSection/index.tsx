import React from 'react';
import { useMemo } from 'react';
import IEventSupplierTransactionAgreementDTO from '../../../../dtos/IEventSupplierTransactionAgreementDTO';
import { useCurrentEvent } from '../../../../hooks/currentEvent';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { SupplierAgreementButton } from '../SupplierAgreementButton';

import { Container, Title, AgreementsContainer } from './styles';

export function EventSupplierTransactionAgreementsSection(): JSX.Element {
  const { eventSuppliers } = useEventVariables();

  const supplierAgreements = useMemo(() => {
    const agreements: IEventSupplierTransactionAgreementDTO[] = [];
    eventSuppliers.map(supplier => {
      supplier.transactionAgreements.map(
        agreement => !agreement.isCancelled && agreements.push(agreement),
      );
      return supplier;
    });
    return agreements;
  }, [eventSuppliers]);
  return (
    <Container>
      <Title>Contratos</Title>

      {supplierAgreements.length > 0 && (
        <AgreementsContainer>
          {supplierAgreements.map(item => {
            const index =
              supplierAgreements.findIndex(
                agreement => agreement.id === item.id,
              ) + 1;
            return (
              <SupplierAgreementButton
                key={item.id}
                index={index}
                agreement={item}
              />
            );
          })}
        </AgreementsContainer>
      )}
    </Container>
  );
}
