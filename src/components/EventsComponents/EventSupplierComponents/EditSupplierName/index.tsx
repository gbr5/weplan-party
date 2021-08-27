import React, { useRef, ReactElement } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import Input from '../../../Input';

import { Container, Title } from './styles';
import { useToast } from '../../../../hooks/toast';
import Button from '../../../Button';

interface IFormParams {
  name: string;
}

export function EditSupplierName(): ReactElement {
  const { selectedEventSupplier } = useEventVariables();
  const { addToast } = useToast();
  const {
    updateEventSupplier,
    handleEditSupplierNameWindow,
    loading,
  } = useEventSuppliers();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ name }: IFormParams): Promise<void> {
    if (name === '')
      return addToast({
        title: 'Digite o nome do fornecedor!',
        type: 'error',
      });
    await updateEventSupplier({
      ...selectedEventSupplier,
      name,
    });
    return handleEditSupplierNameWindow();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEditSupplierNameWindow}
      containerStyle={{
        zIndex: 31,
        top: '5%',
        left: '2%',
        height: '60%',
        width: '96%',
      }}
    >
      <WindowHeader
        overTitle="Editar Fornecedor"
        title={`${selectedEventSupplier.name}`}
      />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Nome do Fornecedor</Title>
          <Input
            name="name"
            autoCapitalize="words"
            placeholder={selectedEventSupplier.name}
          />
        </Form>
      </Container>
      <Button loading={loading} type="submit">
        Salvar
      </Button>
    </WindowUnFormattedContainer>
  );
}
