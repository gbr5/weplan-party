import React, { useCallback, useState } from 'react';
import IEventFileDTO from '../../../../../dtos/IEventFileDTO';
import IUserFileDTO from '../../../../../dtos/IUserFileDTO';
import { useToast } from '../../../../../hooks/toast';
import api from '../../../../../services/api';
import SelectUserFileWindow from '../../../../SelectUserFileWindow';
import AddButton from '../../../../UserComponents/AddButton';
import EventFile from '../EventFile';

import { Container } from './styles';

interface IProps {
  files: IEventFileDTO[];
  eventId: string;
  updateEvent: Function;
}

const EventFileSection: React.FC<IProps> = ({
  files,
  eventId,
  updateEvent,
}: IProps) => {
  const { addToast } = useToast();
  const [selectUserFileWindow, setSelectUserFileWindow] = useState(false);

  const selectUserFile = useCallback(
    async (e: IUserFileDTO) => {
      try {
        await api.post('event/files', {
          event_id: eventId,
          file_id: e.id,
        });
        updateEvent();
        addToast({
          type: 'info',
          title: `Importação do arquivo ${e.file_name} enviada.`,
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro de Importação.',
          description: `Importação do arquivo ${e.file_name} falhou, tente novamente.`,
        });
        throw new Error(err);
      }
    },
    [eventId, updateEvent, addToast],
  );

  return (
    <Container>
      {selectUserFileWindow && (
        <SelectUserFileWindow
          onHandleCloseWindow={() => setSelectUserFileWindow(false)}
          handleCloseWindow={() => setSelectUserFileWindow(false)}
          initialCategory=""
          selectUserFile={(e: IUserFileDTO) => selectUserFile(e)}
        />
      )}
      <AddButton onClick={() => setSelectUserFileWindow(true)} />
      <h1>Arquivos</h1>
      {files && <EventFile files={files} />}
    </Container>
  );
};

export default EventFileSection;
