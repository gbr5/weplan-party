import React, { useState, useEffect, ReactElement } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import IEventSupplierDTO from '../../../../dtos/IEventSupplierDTO';
import { useEventVariables } from '../../../../hooks/eventVariables';

import { SupplierButtonInfo } from '../SupplierButtonInfo';

import { Container, SupplierIndex, SupplierName } from './styles';

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

  return (
    <>
      <Container
        isActive={selectedEventSupplier.id === supplier.id}
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
    </>
  );
}
