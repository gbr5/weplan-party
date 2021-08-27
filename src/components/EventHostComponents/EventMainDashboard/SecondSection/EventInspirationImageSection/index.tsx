import React, { useCallback, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import IEventInspirationImageDTO from '../../../../../dtos/IEventInspirationImageDTO';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import api from '../../../../../services/api';
import EventInspirationImage from '../EventInspirationImage';

import { Container } from './styles';

export function EventInspirationImageSection(): ReactElement {
  const { selectedEvent } = useEventVariables();

  const [eventInspirationImages, setEventInspirationImages] = useState<
    IEventInspirationImageDTO[]
  >([]);

  const getEventInspirationImages = useCallback(() => {
    try {
      api.get(`event/inspiration/images/${selectedEvent.id}`).then(response => {
        setEventInspirationImages(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedEvent.id]);

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
}
