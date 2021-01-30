import React from 'react';
import IInspirationImageDTO from '../../../dtos/IInspirationImageDTO';

import { Container, ImageButton } from './styles';

interface IProps {
  inspirationImages: IInspirationImageDTO[];
  gridView: boolean;
}

const InspirationImageGallery: React.FC<IProps> = ({
  inspirationImages,
  gridView,
}: IProps) => {
  return (
    <Container gridView={gridView}>
      {inspirationImages.map(image => {
        return (
          <button type="button" key={image.image.id}>
            <ImageButton
              gridView={gridView}
              src={image.image.image_url}
              alt={image.image.image_name}
            />
          </button>
        );
      })}
    </Container>
  );
};

export default InspirationImageGallery;
