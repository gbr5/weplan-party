import React from 'react';
import IImageParticipantDTO from '../../../dtos/IImageParticipantDTO';

import { Container, ImageButton } from './styles';

interface IProps {
  images: IImageParticipantDTO[];
  gridView: boolean;
}

const ImageParticipantsGallery: React.FC<IProps> = ({
  images,
  gridView,
}: IProps) => {
  return (
    <Container gridView={gridView}>
      {images.map(image => {
        return (
          <button type="button" key={image.userImage.id}>
            <ImageButton
              gridView={gridView}
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
