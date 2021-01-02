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
        zIndex: 20,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <h1>Sub-Categoria de Fornecedores</h1>
        <SuppliersContainer>
          {supplierSubCategories.map(subCategory => (
            <button
              key={subCategory.id}
              type="button"
              onClick={() => handleAddSupplierDrawer(subCategory.sub_category)}
            >
              {subCategory.sub_category}
            </button>
          ))}
        </SuppliersContainer>
      </Container>
    </WindowContainer>
  );
};

export default SelectSupplierSubCategoryWindow;
