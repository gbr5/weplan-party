import React, { useCallback, useEffect, useState } from 'react';
import IEventInspirationImageDTO from '../../../../../dtos/IEventInspirationImageDTO';
import api from '../../../../../services/api';
import EventInspirationImage from '../EventInspirationImage';

import { Container } from './styles';

interface IProps {
  eventId: string;
}

const EventInspirationImageSection: React.FC<IProps> = ({
  eventId,
}: IProps) => {
  const [eventInspirationImages, setEventInspirationImages] = useState<
    IEventInspirationImageDTO[]
  >([]);

  const getEventInspirationImages = useCallback(() => {
    try {
      api.get(`event/inspiration/images/${eventId}`).then(response => {
        setEventInspirationImages(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);

  useEffect(() => {
    getEventInspirationImages();
  }, [getEventInspirationImages]);

  return (
    <>
      <Container>
        <h1>Inspirações</h1>
        {eventInspirationImages && (
          <EventInspirationImage images={eventInspirationImages} />
        )}
      </Container>
    </>
  );
};

export default EventInspirationImageSection;
