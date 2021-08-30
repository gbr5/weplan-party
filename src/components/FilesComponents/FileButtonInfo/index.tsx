import React, { useMemo } from 'react';
import { useFiles } from '../../../hooks/files';
import { WindowHeader } from '../../WindowHeader';

import { Container, FieldButton, FieldLabel, Label } from './styles';

export function FileButtonInfo(): JSX.Element {
  const { selectedFile, handleEditFileWindow } = useFiles();

  const name = useMemo(() => selectedFile.name, [selectedFile]);

  return (
    <Container>
      <WindowHeader title="Editar Arquivo" />
      <FieldButton onClick={handleEditFileWindow}>
        <FieldLabel>Nome do arquivo</FieldLabel>
        <Label>{name}</Label>
      </FieldButton>
    </Container>
  );
}
