import React, { useState } from 'react';
import { MdAddAPhoto, MdGridOff, MdGridOn } from 'react-icons/md';
import UploadImageWindow from '../../UserComponents/UploadImageWindow';

import { Container, MenuButton } from './styles';

interface IProps {
  handleGridView: Function;
}

const BottomMenu: React.FC<IProps> = ({ handleGridView }: IProps) => {
  const [uploadImage, setUploadImage] = useState(false);

  return (
    <>
      {uploadImage && (
        <UploadImageWindow
          handleCloseWindow={() => setUploadImage(false)}
          onHandleCloseWindow={() => setUploadImage(false)}
        />
      )}
      <Container>
        <MenuButton type="button" onClick={() => handleGridView(true)}>
          <MdGridOn size={32} />
        </MenuButton>
        <MenuButton type="button" onClick={() => setUploadImage(true)}>
          <MdAddAPhoto size={32} />
        </MenuButton>
        <MenuButton type="button" onClick={() => handleGridView(false)}>
          <MdGridOff size={32} />
        </MenuButton>
      </Container>
    </>
  );
};

export default BottomMenu;
