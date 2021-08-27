import React, { useRef, ReactElement } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useTransaction } from '../../../hooks/transactions';

import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';
import Input from '../../Input';

import { Container, Title } from './styles';
import Button from '../../Button';
import { useEventVariables } from '../../../hooks/eventVariables';

interface IFormParams {
  category: string;
}

export function EditTransactionCategory(): ReactElement {
  const { selectedEventTransaction } = useEventVariables();
  const {
    editTransaction,
    handleEditTransactionCategory,
    loading,
  } = useTransaction();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ category }: IFormParams): Promise<void> {
    await editTransaction({
      ...selectedEventTransaction.transaction,
      category,
    });
    handleEditTransactionCategory();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEditTransactionCategory}
      containerStyle={{
        zIndex: 31,
        top: '5%',
        left: '2%',
        height: '60%',
        width: '96%',
      }}
    >
      <WindowHeader title="Editar Transação" />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Categoria da transação</Title>
          <Input
            name="category"
            placeholder={selectedEventTransaction.transaction.category ?? ''}
          />
          <Button loading={loading} type="submit">
            Salvar
          </Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
