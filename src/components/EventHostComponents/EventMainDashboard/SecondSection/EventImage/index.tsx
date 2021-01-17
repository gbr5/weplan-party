import React from 'react';
import IEventImageDTO from '../../../../../dtos/IEventImageDTO';
import ListSection from '../ListSection';
import Row from '../ListSection/Row';

import { ImageContainer } from './styles';

interface IProps {
  images: IEventImageDTO[];
}

const EventImage: React.FC<IProps> = ({ images }: IProps) => {
  return (
    <ListSection>
      {!!images &&
        images.map(ximage => {
          const { image } = ximage;
          return (
            <Row>
              <ImageContainer>
                <img src={image.image_url} alt="WePlan" />
                <p>{image.name}</p>
              </ImageContainer>
            </Row>
          );
        })}
    </ListSection>
  );
};

export default EventImage;
