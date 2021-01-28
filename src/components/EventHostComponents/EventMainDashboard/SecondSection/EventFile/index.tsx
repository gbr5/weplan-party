import React from 'react';
import IEventFileDTO from '../../../../../dtos/IEventFileDTO';
import ListSection from '../ListSection';
import Row from '../ListSection/Row';

import { FileContainer } from './styles';

interface IProps {
  files: IEventFileDTO[];
}

const EventFile: React.FC<IProps> = ({ files }: IProps) => {
  return (
    <ListSection>
      {!!files &&
        files.map(xfile => {
          const { file } = xfile;
          return (
            <Row key={xfile.id}>
              <FileContainer>
                <a download target="blank" href={file.file_url}>
                  {file.file_name}
                </a>
              </FileContainer>
            </Row>
          );
        })}
    </ListSection>
  );
};

export default EventFile;
