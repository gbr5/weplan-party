import React, { ReactElement, useMemo } from 'react';

import { useEventVariables } from '../../../../hooks/eventVariables';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import { SupplierAgreementButton } from '../SupplierAgreementButton';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import Button from '../../../Button';
import { AddButton } from '../../../AddButton';

import { Container, HeaderContainer, AgreementsContainer } from './styles';

export function SupplierTransactionAgreementsWindow(): ReactElement {
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleSupplierTransactionAgreementsWindow,
    handleCreateSupplierTransactionAgreementWindow,
  } = useEventSuppliers();

  const agreements = useMemo(() => {
    return selectedEventSupplier &&
      selectedEventSupplier.id &&
      selectedEventSupplier.transactionAgreements
      ? selectedEventSupplier.transactionAgreements.filter(
          agreement => !agreement.isCancelled,
        )
      : null;
  }, [selectedEventSupplier]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleSupplierTransactionAgreementsWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '95%',
        width: '100%',
      }}
      zIndex={14}
    >
      <Container>
        <HeaderContainer>
          <WindowHeader
            overTitle={`Fornecedor: ${selectedEventSupplier.name}`}
            title="Contratos"
          />
          <AddButton
            onClick={handleCreateSupplierTransactionAgreementWindow}
            top="20%"
            right="5%"
          />
        </HeaderContainer>
        {agreements && agreements.length > 0 && (
          <AgreementsContainer>
            {agreements.map(item => {
              const index =
                agreements.findIndex(agreement => agreement.id === item.id) + 1;
              return (
                <SupplierAgreementButton
                  key={item.id}
                  index={index}
                  agreement={item}
                  isSupplierSelected
                />
              );
            })}
          </AgreementsContainer>
        )}
      </Container>
      <Button onClick={handleSupplierTransactionAgreementsWindow}>
        Fechar
      </Button>
    </WindowUnFormattedContainer>
  );
}
