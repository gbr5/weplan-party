import React, { useMemo } from 'react';

import { FiLoader, FiUpload } from 'react-icons/fi';
import { useTransaction } from '../../../hooks/transactions';

import { WindowHeader } from '../../WindowHeader';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import IFileDTO from '../../../dtos/IFileDTO';
import { FileButton } from '../../FilesComponents/FileButton';

import { Container, FileContainer, IconContainer, FileInput } from './styles';
import { useEventVariables } from '../../../hooks/eventVariables';

export function TransactionFilesWindow(): JSX.Element {
  const iconSize = 60;
  const { selectedEventTransaction } = useEventVariables();
  const {
    handleTransactionFilesWindow,
    importTransactionFile,
    loading,
  } = useTransaction();

  const files: IFileDTO[] = useMemo(() => {
    return selectedEventTransaction.transaction.files.map(file => {
      const { id, name, url, transaction_id, created_at, updated_at } = file;
      return {
        id,
        name,
        url,
        type: '',
        file_origin: 'transaction',
        origin_id: transaction_id,
        created_at,
        updated_at,
      };
    });
  }, [selectedEventTransaction]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleTransactionFilesWindow}
      containerStyle={{
        zIndex: 18,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
      zIndex={17}
    >
      <Container>
        <WindowHeader
          overTitle={`Transação: ${selectedEventTransaction.transaction.name}`}
          title="Arquivos"
        />
        {loading ? (
          <IconContainer>
            <FiLoader size={iconSize} />
          </IconContainer>
        ) : (
          <FileInput>
            <label htmlFor="file">
              <FiUpload size={iconSize} />
              <input type="file" id="file" onChange={importTransactionFile} />
            </label>
          </FileInput>
        )}
        {files.length > 0 && (
          <FileContainer>
            {files.map(item => {
              return <FileButton key={item.id} file={item} />;
            })}
          </FileContainer>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
