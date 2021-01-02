import React, { useCallback, useEffect, useState } from 'react';

import { MouseEventHandler } from 'react-select';
import {
  SuppliersList,
  SaveButton,
  SupplierButton,
  SuppliersContainer,
} from './styles';
import WindowContainer from '../WindowContainer';
import ISupplierDTO from '../../dtos/ISupplierDTO';
import api from '../../services/api';

interface IPropsDTO {
  sub_category: string;
  category: string;
  onHandleSuppliersListDrawer: MouseEventHandler;
  handleSelectedSupplier(arg: ISupplierDTO): void;
}

const SuppliersListDrawer: React.FC<IPropsDTO> = ({
  sub_category,
  category,
  onHandleSuppliersListDrawer,
  handleSelectedSupplier,
}: IPropsDTO) => {
  const [suppliers, setSuppliers] = useState<ISupplierDTO[]>([]);
  const [supplier, setSupplier] = useState<ISupplierDTO>({} as ISupplierDTO);

  const getSuppliers = useCallback(() => {
    try {
      api
        .get<ISupplierDTO[]>(
          `suppliers/categories/weplan/${category}/${sub_category}`,
        )
        .then(response => {
          setSuppliers(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [category, sub_category]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);
  console.log(supplier);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleSuppliersListDrawer}
      containerStyle={{
        zIndex: 30,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <SuppliersContainer>
        <h1>Contatos</h1>
        <SuppliersList>
          {suppliers.length > 0 &&
            suppliers.map(xSupplier => {
              return (
                <SupplierButton
                  selectedSupplier={xSupplier.id === supplier.id}
                  type="button"
                  onClick={() => setSupplier(xSupplier)}
                  key={xSupplier.id}
                >
                  {xSupplier.userBySupplierCategory.name}
                </SupplierButton>
              );
            })}
        </SuppliersList>
        <SaveButton>
          <button
            type="button"
            onClick={() => handleSelectedSupplier(supplier)}
          >
            Selecionar
          </button>
        </SaveButton>
      </SuppliersContainer>
    </WindowContainer>
  );
};

export default SuppliersListDrawer;
