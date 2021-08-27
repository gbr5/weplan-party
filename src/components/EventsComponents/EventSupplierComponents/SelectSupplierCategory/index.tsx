import React, { ReactElement } from 'react';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import { Container, CategoryButton, CategoryButtonText } from './styles';

export function SelectSupplierCategory(): ReactElement {
  const {
    selectSupplierCategory,
    selectedSupplierCategory,
    handleSupplierCategoryWindow,
  } = useEventSuppliers();

  function handleSelectSupplierCategory(category: string): void {
    selectSupplierCategory(category);
    handleSupplierCategoryWindow();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleSupplierCategoryWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '65%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader overTitle="Novo(a) Fornecedor(a)" title="Categoria" />
        <CategoryButton
          isActive={selectedSupplierCategory === 'Comes & Bebes'}
          onClick={() => handleSelectSupplierCategory('Comes & Bebes')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Comes & Bebes'}
          >
            Comes & Bebes
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Planejamento'}
          onClick={() => handleSelectSupplierCategory('Planejamento')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Planejamento'}
          >
            Planejamento
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Decoração'}
          onClick={() => handleSelectSupplierCategory('Decoração')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Decoração'}
          >
            Decoração
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Estrutura'}
          onClick={() => handleSelectSupplierCategory('Estrutura')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Estrutura'}
          >
            Estrutura
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Atrações'}
          onClick={() => handleSelectSupplierCategory('Atrações')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Atrações'}
          >
            Atrações
          </CategoryButtonText>
        </CategoryButton>
      </Container>
    </WindowUnFormattedContainer>
  );
}
