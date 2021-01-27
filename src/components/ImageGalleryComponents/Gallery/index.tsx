import React from 'react';
import IUserImageDTO from '../../../dtos/IUserImageDTO';

import { Container } from './styles';

interface IProps {
  images: IUserImageDTO[];
}

const Gallery: React.FC<IProps> = ({ images }: IProps) => {
  return (
    <Container>
      {images.map(image => {
        return (
          <button type="button" key={image.id}>
            <img src={image.image_url} alt={image.image_name} />
          </button>
        );
      })}
    </Container>
  );
};

export default Gallery;
