import React, { useEffect, useState } from 'react';
import IEventDTO from '../../../dtos/IEventDTO';
import IListUserEventImagesDTO from '../../../dtos/IListUserEventImagesDTO';

import { Container, ImageContainer, CategoriesMenu, Category } from './styles';

interface IProps {
  eventImages: IListUserEventImagesDTO[];
}

const EventImageGallery: React.FC<IProps> = ({ eventImages }: IProps) => {
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [events, setEvents] = useState<IEventDTO[]>([eventImages[0].event]);

  useEffect(() => {
    const filteredEventArray: IEventDTO[] = [];
    const eventArray = eventImages.map(image => image.event);
    eventArray.map(event => {
      const findEvent = filteredEventArray.find(
        xEvent => xEvent.id === event.id,
      );
      !findEvent && filteredEventArray.push(event);
      return event;
    });
    events.length !== filteredEventArray.length &&
      setEvents(filteredEventArray);
  }, [eventImages, events]);

  return (
    <Container>
      <CategoriesMenu>
        {events.map(event => {
          const isActive = event.id === selectedEvent.id;
          return (
            <Category
              type="button"
              isActive={isActive}
              onClick={() => setSelectedEvent(event)}
              key={event.id}
            >
              {event.name}
            </Category>
          );
        })}
      </CategoriesMenu>
      <ImageContainer>
        {eventImages
          .filter(image => image.event_id === selectedEvent.id)
          .map(image => {
            return (
              <button type="button" key={image.id}>
                <img src={image.image_url} alt={image.image.image_name} />
              </button>
            );
          })}
      </ImageContainer>
    </Container>
  );
};

export default EventImageGallery;
