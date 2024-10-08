import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi';
import {
  MdAddAPhoto,
  MdAllInclusive,
  MdFolder,
  MdGroup,
  MdStar,
} from 'react-icons/md';
import SelectUserImageWindow from '../../UserComponents/SelectUserImageWindow';
import UploadImageWindow from '../../UserComponents/UploadImageWindow';

import {
  Container,
  HanldeMenuButton,
  MenuButton,
  MenuContainer,
} from './styles';

interface IProps {
  showAllImages: Function;
  showEventImages: Function;
  showInspirationImages: Function;
  showMarkedImages: Function;
  handleImageByCategories: Function;
}

const SideMenu: React.FC<IProps> = ({
  showAllImages,
  handleImageByCategories,
  showEventImages,
  showInspirationImages,
  showMarkedImages,
}: IProps) => {
  const [sideMenu, setSideMenu] = useState(true);
  const [uploadImage, setUploadImage] = useState(false);
  const [selectUserImageWindow, setSelectUserImageWindow] = useState(false);

  return (
    <>
      {uploadImage && (
        <UploadImageWindow
          handleCloseWindow={() => setUploadImage(false)}
          onHandleCloseWindow={() => setUploadImage(false)}
        />
      )}
      {selectUserImageWindow && (
        <SelectUserImageWindow
          handleCloseWindow={() => setSelectUserImageWindow(false)}
          initialCategory="all"
          onHandleCloseWindow={() => setSelectUserImageWindow(false)}
          selectUserImage={() => setSelectUserImageWindow(true)}
        />
      )}
      <Container>
        {sideMenu && (
          <MenuContainer>
            <MenuButton type="button" onClick={() => showAllImages()}>
              <MdAllInclusive size={32} />
            </MenuButton>
            <MenuButton type="button" onClick={() => showEventImages()}>
              <FiPlay size={32} />
            </MenuButton>
            <MenuButton type="button" onClick={() => showInspirationImages()}>
              <MdStar size={32} />
            </MenuButton>
            <MenuButton type="button" onClick={() => showMarkedImages()}>
              <MdGroup size={32} />
            </MenuButton>
            <MenuButton type="button" onClick={() => handleImageByCategories()}>
              <MdFolder size={32} />
            </MenuButton>
            <MenuButton type="button" onClick={() => setUploadImage(true)}>
              <MdAddAPhoto size={32} />
            </MenuButton>
          </MenuContainer>
        )}
        {sideMenu ? (
          <HanldeMenuButton
            isActive
            type="button"
            onClick={() => setSideMenu(false)}
          >
            <FiChevronRight size={32} />
          </HanldeMenuButton>
        ) : (
          <HanldeMenuButton
            isActive={false}
            type="button"
            onClick={() => setSideMenu(true)}
          >
            <FiChevronLeft size={32} />
          </HanldeMenuButton>
        )}
      </Container>
    </>
  );
};

export default SideMenu;
