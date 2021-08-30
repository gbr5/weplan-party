import React, { useMemo } from 'react';
import { FiLink } from 'react-icons/fi';

import IFileDTO from '../../../dtos/IFileDTO';
import { useFiles } from '../../../hooks/files';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';
import { FileButtonInfo } from '../FileButtonInfo';

import {
  Container,
  FileContainer,
  FileName,
  EditButton,
  CreatedAtContainer,
  CreatedAt,
  Underline,
} from './styles';

interface IProps {
  file: IFileDTO;
}

export function FileButton({ file }: IProps): JSX.Element {
  const { handleSelectedFile, selectedFile } = useFiles();

  function handleSelectFile(): void {
    selectedFile.id === file.id && handleSelectedFile({} as IFileDTO);
    selectedFile.id !== file.id && handleSelectedFile(file);
  }

  const fileType = useMemo(() => {
    return file.url.split('.com/')[1].split('.')[1];
  }, [file]);

  return (
    <>
      <Container onClick={handleSelectFile}>
        <FileContainer>
          <FileName>{file.name}</FileName>
          <EditButton>
            <a target="blank" href={file.url}>
              {file.name}
            </a>
            <FiLink size={24} />
          </EditButton>
        </FileContainer>
        <Underline />
        <CreatedAtContainer>
          <CreatedAt>Atualizado:</CreatedAt>
          <CreatedAt>{formatOnlyDateShort(String(file.updated_at))}</CreatedAt>
          <CreatedAt>Tipo:</CreatedAt>
          <CreatedAt>{fileType}</CreatedAt>
        </CreatedAtContainer>
      </Container>
      {selectedFile.id === file.id && <FileButtonInfo />}
    </>
  );
}
