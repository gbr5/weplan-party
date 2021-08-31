import React, { useRef, useState, ReactElement } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErros';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import Input from '../../../Input';
import Button from '../../../Button';

import { Container } from './styles';
import { useToast } from '../../../../hooks/toast';

interface IFormParams {
  description: string;
}

export function EditSupplierBudgetDescription(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const {
    updateSupplierBudget,
    selectedSupplierBudget,
    handleEditSupplierBudgetDescriptionWindow,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);

  async function handleSubmit({ description }: IFormParams): Promise<void> {
    try {
      setLoading(true);
      await updateSupplierBudget({
        ...selectedSupplierBudget,
        description,
      });
      return handleEditSupplierBudgetDescriptionWindow();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }
      return addToast({
        title: 'Erro na atualização',
        description: 'Tente novamente!',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEditSupplierBudgetDescriptionWindow}
      containerStyle={{
        zIndex: 25,
        top: '5%',
        left: '0%',
        height: '70%',
        width: '100%',
      }}
      zIndex={24}
    >
      <Container>
        <WindowHeader title="Editar Descrição" />
        {/* <Title></Title> */}
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="description"
            placeholder={selectedSupplierBudget.description}
          />
          <Button loading={loading} type="submit">
            Salvar
          </Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
