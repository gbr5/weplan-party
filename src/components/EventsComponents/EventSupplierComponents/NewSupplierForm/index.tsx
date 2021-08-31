import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { ReactElement } from 'react';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import ISupplierSubCategoryDTO from '../../../../dtos/ISupplierSubCategoryDTO';

import Input from '../../../Input';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';

import {
  Container,
  FormQuestion,
  SupplierCategoryButton,
  SupplierCategoryButtonText,
} from './styles';
import Button from '../../../Button';
import { useToast } from '../../../../hooks/toast';

interface IFormData {
  name: string;
}

export function NewSupplierForm(): ReactElement {
  const {
    createEventSuppliers,
    loading,
    selectedSupplierCategory,
    handleSupplierCategoryWindow,
    selectSupplierCategory,
    selectSupplierSubCategory,
    handleAddSupplierWindow,
  } = useEventSuppliers();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async ({ name }: IFormData) => {
      if (name === '')
        return addToast({ title: 'Dê um nome ao fornecedor!', type: 'error' });
      if (selectedSupplierCategory === '')
        return addToast({
          title: 'Defina a categoria do fonecedor!',
          type: 'error',
        });
      await createEventSuppliers({
        isHired: false,
        name,
        supplier_sub_category: selectedSupplierCategory,
        weplanUser: false,
      });
      selectSupplierCategory('');
      selectSupplierSubCategory({} as ISupplierSubCategoryDTO);
      return handleAddSupplierWindow();
    },
    [
      handleAddSupplierWindow,
      createEventSuppliers,
      addToast,
      selectSupplierCategory,
      selectSupplierSubCategory,
      selectedSupplierCategory,
    ],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleAddSupplierWindow}
      containerStyle={{
        top: '5%',
        left: '2%',
        height: '90%',
        width: '96%',
        zIndex: 11,
      }}
      zIndex={10}
    >
      <WindowHeader title="Novo(a) Fornecedor(a)" />

      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormQuestion>Nome</FormQuestion>
          <Input name="name" placeholder="Nome" />
          <SupplierCategoryButton onClick={handleSupplierCategoryWindow}>
            <SupplierCategoryButtonText>
              {selectedSupplierCategory !== ''
                ? selectedSupplierCategory
                : 'Defina a categoria'}
            </SupplierCategoryButtonText>
          </SupplierCategoryButton>
          <Button loading={loading} type="submit">
            Salvar
          </Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
