import React from 'react';
import IInspirationImageDTO from '../../../dtos/IInspirationImageDTO';

import { Container, ImageContainer } from './styles';

interface IProps {
  inspirationImages: IInspirationImageDTO[];
}

const InspirationImageGallery: React.FC<IProps> = ({
  inspirationImages,
}: IProps) => {
  return (
    <Container>
      <ImageContainer>
        {inspirationImages.map(image => {
          return (
            <button type="button" key={image.image.id}>
              <img src={image.image.image_url} alt={image.image.image_name} />
            </button>
          );
        })}
      </ImageContainer>
    </Container>
  );
};

export default InspirationImageGallery;
