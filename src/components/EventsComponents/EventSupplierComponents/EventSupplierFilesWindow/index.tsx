import React, { useCallback, useState, ReactElement } from 'react';
import { FiLoader } from 'react-icons/fi';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import { MenuBooleanButton } from '../../../MenuBooleanButton';
import Button from '../../../Button';

import { Container, FileContainer, IconContainer } from './styles';

export function EventSupplierFilesWindow(): ReactElement {
  const iconSize = 60;
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleSupplierFilesWindow,
    importSupplierFile,
    importSupplierImage,
    loading,
  } = useEventSuppliers();

  const [imageButton, setImageButton] = useState(true);

  async function handleFile(): Promise<void> {
    setImageButton(false);
    await importSupplierFile(selectedEventSupplier.id);
  }

  async function handleImages(): Promise<void> {
    setImageButton(true);
    await importSupplierImage(selectedEventSupplier.id);
  }

  const handlePress = useCallback(async (url: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    // const supported = await Linking.canOpenURL(url);
    // if (supported) {
    //   // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    //   // by some browser in the mobile
    //   await Linking.openURL(url);
    // } else {
    //   Alert.alert(`Don't know how to open this URL: ${url}`);
    // }
  }, []);

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
        <WindowHeader
          overTitle={`Fornecedor(a): ${selectedEventSupplier.name}`}
          title="Arquivos"
        />
        {loading ? (
          <IconContainer>
            <FiLoader size={iconSize} />
          </IconContainer>
        ) : (
          <MenuBooleanButton
            firstActive={imageButton}
            firstFunction={handleImages}
            firstLabel="+ Imagem"
            secondFunction={handleFile}
            secondLabel="+ Arquivo"
          />
        )}
        {selectedEventSupplier.files.length > 0 && (
          <FileContainer>
            {selectedEventSupplier.files.map(item => {
              return (
                <Button key={item.id} onClick={() => handlePress(item.url)}>
                  {item.name}
                </Button>
              );
            })}
          </FileContainer>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
