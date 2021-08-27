import React, { useRef, ReactElement } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useTransaction } from '../../../hooks/transactions';
import ICreateTransactionDTO from '../../../dtos/ICreateTransactionDTO';

import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';
import Input from '../../Input';

import { Container, Title } from './styles';
import { useEventVariables } from '../../../hooks/eventVariables';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';

interface IFormParams {
  amount: string;
}

export function EditNewTransactionAmount(): ReactElement {
  const { addToast } = useToast();
  const {
    newTransactions,
    selectNewTransactions,
    selectedNewTransaction,
    handleSelectedNewTransaction,
  } = useEventVariables();
  const {
    handleNewAgreement,
    newAgreementInstallments,
    handleEditNewTransactionValueWindow,
  } = useTransaction();
  const formRef = useRef<FormHandles>(null);

  function handleSubmit({ amount }: IFormParams): void {
    if (amount === '')
      return addToast({ title: 'Digite o valor da transação!', type: 'error' });
    const transactions = newTransactions.map(item => {
      if (item === selectedNewTransaction) {
        return {
          ...item,
          amount: Number(amount),
        };
      }
      return item;
    });
    selectNewTransactions(transactions);
    const totalAmount = transactions
      .map(item => item.amount)
      .reduce((acc, cv) => acc + cv, 0);
    handleNewAgreement({
      amount: totalAmount,
      installments: newAgreementInstallments,
    });
    handleSelectedNewTransaction({} as ICreateTransactionDTO);
    return handleEditNewTransactionValueWindow();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEditNewTransactionValueWindow}
      containerStyle={{
        zIndex: 31,
        top: '5%',
        left: '2%',
        height: '50%',
        width: '96%',
      }}
    >
      <WindowHeader overTitle="Novo Contrato" title="Editar Transação" />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Valor da Transação</Title>
          <Input
            name="amount"
            type="number"
            placeholder={String(selectedNewTransaction.amount)}
          />
        </Form>
      </Container>
      <Button type="submit">Salvar</Button>
    </WindowUnFormattedContainer>
  );
}
