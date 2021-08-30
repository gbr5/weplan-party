import React, { ReactElement } from 'react';
import { FiLoader, FiUpload } from 'react-icons/fi';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';

import {
  Container,
  FileButton,
  FileInput,
  FileContainer,
  IconContainer,
  HeaderContainer,
  Title,
} from './styles';

export function EventSupplierFilesWindow(): ReactElement {
  const iconSize = 60;
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleSupplierFilesWindow,
    importSupplierFile,
    loading,
  } = useEventSuppliers();

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
          <Title>Arquivos - {selectedEventSupplier.name}</Title>
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
