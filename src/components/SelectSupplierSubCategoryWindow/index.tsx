import React from 'react';
import ISupplierSubCategoryDTO from '../../dtos/ISupplierSubCategoryDTO';

import WindowContainer from '../WindowContainer';

import { Container, SuppliersContainer } from './styles';

interface IProps {
  handleCloseWindow: Function;
  supplierSubCategories: ISupplierSubCategoryDTO[];
  handleAddSupplierDrawer: Function;
}

const SelectSupplierSubCategoryWindow: React.FC<IProps> = ({
  supplierSubCategories,
  handleCloseWindow,
  handleAddSupplierDrawer,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={() => handleCloseWindow()}
      containerStyle={{
        zIndex: 100,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <h1>Sub-Categoria de Fornecedores</h1>
      <Container>
        <SuppliersContainer>
          {supplierSubCategories.map(subCategory => (
            <button
              key={subCategory.id}
              type="button"
              onClick={() => handleAddSupplierDrawer(subCategory.sub_category)}
            >
              <h1>{subCategory.sub_category}</h1>
            </button>
          ))}
        </SuppliersContainer>
      </Container>
    </WindowContainer>
  );
};

export default SelectSupplierSubCategoryWindow;
