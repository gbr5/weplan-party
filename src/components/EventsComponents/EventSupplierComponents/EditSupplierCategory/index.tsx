import React, { ReactElement } from 'react';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';

import { Container, CategoryButton, CategoryButtonText } from './styles';

export function EditSupplierCategory(): ReactElement {
  const { selectedEventSupplier } = useEventVariables();
  const {
    selectSupplierCategory,
    selectedSupplierCategory,
    handleEditSupplierCategoryWindow,
    updateEventSupplier,
  } = useEventSuppliers();

  async function handleSelectSupplierCategory(category: string): Promise<void> {
    selectSupplierCategory(category);
    await updateEventSupplier({
      ...selectedEventSupplier,
      supplier_sub_category: category,
    });
    handleEditSupplierCategoryWindow();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEditSupplierCategoryWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '65%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader
          overTitle={`Fornecedor ${selectedEventSupplier.name}`}
          title="Editar Categoria"
        />
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
