import React, { ReactElement, useCallback, useState, useMemo } from 'react';
import { MdPersonAdd } from 'react-icons/md';

import { Container, BooleanNavigationButton } from './styles';
import { useEventVariables } from '../../hooks/eventVariables';
import { SupplierButton } from '../EventsComponents/EventSupplierComponents/SupplierButton';
import { useEventSuppliers } from '../../hooks/eventSuppliers';

export function EventSupplierSection(): ReactElement {
  const { isOwner, eventSuppliers } = useEventVariables();
  const { handleAddSupplierWindow } = useEventSuppliers();

  const [hiredSuppliersSection, setHiredSuppliersSection] = useState(true);

  const handleHiredSuppliersSection = useCallback(props => {
    setHiredSuppliersSection(props);
  }, []);

  let supplierCount = 0;
  let hiredSupplierCount = 0;

  const hiredSuppliers = useMemo(() => {
    return eventSuppliers.filter(
      supplier => !supplier.isDischarged && supplier.isHired,
    );
  }, [eventSuppliers]);

  const notHiredSuppliers = useMemo(() => {
    return eventSuppliers.filter(
      supplier => !supplier.isDischarged && !supplier.isHired,
    );
  }, [eventSuppliers]);

  return (
    <>
      <Container>
        <h1>Fornecedores</h1>
        <span>
          <BooleanNavigationButton
            booleanActiveButton={!hiredSuppliersSection}
            type="button"
            onClick={() => handleHiredSuppliersSection(false)}
          >
            Selecionados
          </BooleanNavigationButton>

          <BooleanNavigationButton
            type="button"
            onClick={() => handleHiredSuppliersSection(true)}
            booleanActiveButton={hiredSuppliersSection}
          >
            Contratados
          </BooleanNavigationButton>

          {isOwner && (
            <span>
              <button type="button" onClick={handleAddSupplierWindow}>
                <MdPersonAdd size={30} />
              </button>
            </span>
          )}
        </span>

        {hiredSuppliersSection && <h3>{hiredSuppliers.length}</h3>}

        {!hiredSuppliersSection && <h3>{notHiredSuppliers.length}</h3>}

        <div>
          {!hiredSuppliersSection &&
            notHiredSuppliers.map(supplier => {
              supplierCount += 1;

              return (
                <SupplierButton
                  supplier={supplier}
                  key={supplier.id}
                  index={supplierCount}
                />
              );
            })}
          {hiredSuppliersSection &&
            hiredSuppliers.map(supplier => {
              hiredSupplierCount += 1;
              return (
                <SupplierButton
                  supplier={supplier}
                  key={supplier.id}
                  index={hiredSupplierCount}
                />
              );
            })}
        </div>
      </Container>
    </>
  );
}

export default EventSupplierSection;
