import React, { useCallback, useState } from 'react';
import IEventImageDTO from '../../../../../dtos/IEventImageDTO';
import IUserImageDTO from '../../../../../dtos/IUserImageDTO';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useToast } from '../../../../../hooks/toast';
import api from '../../../../../services/api';
import AddButton from '../../../../UserComponents/AddButton';
import AddImageQuestion from '../../../../UserComponents/AddImageQuestion';
import SelectUserImageWindow from '../../../../UserComponents/SelectUserImageWindow';
import EventImage from '../EventImage';

import { Container } from './styles';

interface IProps {
  images: IEventImageDTO[];
  updateEvent: Function;
}

const EventImageSection: React.FC<IProps> = ({
  images,
  updateEvent,
}: IProps) => {
  const { addToast } = useToast();
  const { selectedEvent } = useEventVariables();

  const [selectUserImageWindow, setSelectUserImageWindow] = useState(false);
  const [addImageQuestion, setAddImageQuestion] = useState(false);

  const selectUserImage = useCallback(
    async (e: IUserImageDTO) => {
      try {
        await api.post('event/images', {
          event_id: selectedEvent.id,
          image_id: e.id,
        });
        updateEvent();
        addToast({
          type: 'info',
          title: `Importação do arquivo ${e.image_name} enviada.`,
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro de Importação.',
          description: `Importação do arquivo ${e.image_name} falhou, tente novamente.`,
        });
        throw new Error(err);
      }
    },
    [selectedEvent.id, updateEvent, addToast],
  );

  return (
    <>
      {addImageQuestion && (
        <AddImageQuestion
          addNewImage={() => setAddImageQuestion(true)}
          selectExistingImage={() => setSelectUserImageWindow(true)}
          closeWindow={() => setAddImageQuestion(false)}
        />
      )}
      <Container>
        {selectUserImageWindow && (
          <SelectUserImageWindow
            onHandleCloseWindow={() => setSelectUserImageWindow(false)}
            handleCloseWindow={() => setSelectUserImageWindow(false)}
            initialCategory="all"
            selectUserImage={(e: IUserImageDTO) => selectUserImage(e)}
          />
        )}
        <AddButton onClick={() => setSelectUserImageWindow(true)} />
        <h1>Imagens</h1>
        {images && <EventImage images={images} />}
      </Container>
    </>
  );
};

export default EventImageSection;
