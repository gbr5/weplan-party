import React, { ReactElement } from 'react';
import { FiUpload } from 'react-icons/fi';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';

import {
  Container,
  FileButton,
  FileInput,
  FileContainer,
  HeaderContainer,
  Title,
} from './styles';

export function EventSupplierFilesWindow(): ReactElement {
  const { selectedEventSupplier } = useEventVariables();
  const { handleSupplierFilesWindow, importSupplierFile } = useEventSuppliers();

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleSupplierFilesWindow}
      containerStyle={{
        zIndex: 56,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <HeaderContainer>
          <Title>Arquivos de {selectedEventSupplier.name}</Title>
          <FileInput>
            <label htmlFor="file">
              <FiUpload />
              <input type="file" id="file" onChange={importSupplierFile} />
            </label>
          </FileInput>
        </HeaderContainer>
        {selectedEventSupplier.files.length > 0 && (
          <FileContainer>
            {selectedEventSupplier.files.map(item => {
              return (
                <FileButton key={item.id}>
                  <a target="blank" href={item.url}>
                    {item.name}
                  </a>
                </FileButton>
              );
            })}
          </FileContainer>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
