import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Input from '../../Input';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';

import { Container } from './styles';
import { useFiles } from '../../../hooks/files';
import { useTransaction } from '../../../hooks/transactions';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';

interface IFormParams {
  name: string;
}

export function EditFileNameWindow(): JSX.Element {
  const { addToast } = useToast();
  const { selectedFile, handleEditFileWindow } = useFiles();
  const { editTransactionFile } = useTransaction();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ name }: IFormParams): Promise<void> {
    if (name === '')
      return addToast({
        title: 'Defina um nome único!',
        type: 'error',
      });
    // if (name === '') return Alert.alert('Este nome já existe!');
    if (selectedFile.file_origin === 'transaction') {
      await editTransactionFile({
        name,
        id: selectedFile.id,
      });
      handleEditFileWindow();
    }
    return handleEditFileWindow();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEditFileWindow}
      containerStyle={{
        zIndex: 28,
        top: '5%',
        left: '2%',
        height: '70%',
        width: '96%',
      }}
      zIndex={27}
    >
      <WindowHeader overTitle="Editar" title="Nome do Arquivo" />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder={selectedFile.name} />
          <Button type="submit">Salvar</Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
