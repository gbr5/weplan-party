import React from 'react';
import IUserImageDTO from '../../../dtos/IUserImageDTO';

import { Container, ImageButton } from './styles';

interface IProps {
  images: IUserImageDTO[];
  gridView: boolean;
}

const Gallery: React.FC<IProps> = ({ images, gridView }: IProps) => {
  return (
    <Container gridView={gridView}>
      {images.map(image => {
        return (
          <button type="button" key={image.id}>
            <ImageButton
              gridView={gridView}
              src={image.image_url}
              alt={image.image_name}
            />
          </button>
        );
      })}
    </Container>
  );
};

export default Gallery;
