import React from 'react';
import IEventInspirationImageDTO from '../../../../../dtos/IEventInspirationImageDTO';
import ListSection from '../ListSection';
import Row from '../ListSection/Row';

import { ImageContainer } from './styles';

interface IProps {
  images: IEventInspirationImageDTO[];
}

const EventInspirationImage: React.FC<IProps> = ({ images }: IProps) => {
  return (
    <ListSection>
      {!!images &&
        images.map(ximage => {
          const { inspirationImage } = ximage;
          const { image } = inspirationImage;
          return (
            <Row key={ximage.id}>
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

export default EventInspirationImage;
