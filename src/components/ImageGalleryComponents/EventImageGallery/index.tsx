import React, { useState } from 'react';
import IEventDTO from '../../../dtos/IEventDTO';
import IListUserEventImagesDTO from '../../../dtos/IListUserEventImagesDTO';

import { Container, ImageContainer, CategoriesMenu, Category } from './styles';

interface IProps {
  eventImages: IListUserEventImagesDTO[];
}

const EventImageGallery: React.FC<IProps> = ({ eventImages }: IProps) => {
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  return (
    <Container>
      <CategoriesMenu>
        {eventImages.map(eventImage => {
          const isActive = eventImage.event_id === selectedEvent.id;
          return (
            <Category
              type="button"
              isActive={isActive}
              onClick={() => setSelectedEvent(eventImage.event)}
              key={eventImage.id}
            >
              {eventImage.image.name}
            </Category>
          );
        })}
      </CategoriesMenu>
      <ImageContainer>
        {eventImages.map(image => {
          return (
            <button type="button" key={image.image.id}>
              <img src={image.image_url} alt={image.image.image_name} />
            </button>
          );
        })}
      </ImageContainer>
    </Container>
  );
};

export default EventImageGallery;
