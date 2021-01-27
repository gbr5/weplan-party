import React from 'react';
import IImageParticipantDTO from '../../../dtos/IImageParticipantDTO';

import { Container } from './styles';

interface IProps {
  images: IImageParticipantDTO[];
}

const ImageParticipantsGallery: React.FC<IProps> = ({ images }: IProps) => {
  return (
    <Container>
      {images.map(image => {
        return (
          <button type="button" key={image.userImage.id}>
            <img
              src={image.userImage.image_url}
              alt={image.userImage.image_name}
            />
          </button>
        );
      })}
    </Container>
  );
};

export default ImageParticipantsGallery;
