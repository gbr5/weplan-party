import React, { useState, useEffect, ReactElement } from 'react';
import { useMemo } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import IEventSupplierDTO from '../../../../dtos/IEventSupplierDTO';
import { useEventVariables } from '../../../../hooks/eventVariables';

import { SupplierButtonInfo } from '../SupplierButtonInfo';

import { OutContainer, Container, SupplierIndex, SupplierName } from './styles';

interface IProps {
  supplier: IEventSupplierDTO;
  index: number;
}

export function SupplierButton({ supplier, index }: IProps): ReactElement {
  const iconSize = 30;

  const { selectedEventSupplier, selectEventSupplier } = useEventVariables();

  const [supplierBody, setSupplierBody] = useState(false);

  function handleSupplierBody(): void {
    supplierBody
      ? selectEventSupplier({} as IEventSupplierDTO)
      : selectEventSupplier(supplier);
    setSupplierBody(!supplierBody);
  }

  useEffect(() => {
    selectedEventSupplier &&
    selectedEventSupplier.id &&
    selectedEventSupplier.id === supplier.id
      ? setSupplierBody(true)
      : setSupplierBody(false);
  }, [selectedEventSupplier, supplier]);

  const isActive = useMemo(() => selectedEventSupplier.id === supplier.id, [
    selectedEventSupplier,
    supplier,
  ]);

  return (
    <OutContainer>
      <Container
        style={{
          zIndex: isActive ? 3 : 1,
        }}
        isActive={isActive}
        onClick={handleSupplierBody}
      >
        <SupplierIndex>{index}</SupplierIndex>
        <SupplierName>{supplier.name}</SupplierName>
        {supplierBody ? (
          <FiChevronUp size={iconSize} />
        ) : (
          <FiChevronDown size={iconSize} />
        )}
      </Container>
      {supplierBody &&
        selectedEventSupplier &&
        selectedEventSupplier.id &&
        selectedEventSupplier.id === supplier.id && <SupplierButtonInfo />}
    </OutContainer>
  );
}
