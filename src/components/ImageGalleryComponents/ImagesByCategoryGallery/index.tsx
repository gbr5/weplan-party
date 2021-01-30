import React, { useCallback, useEffect, useState } from 'react';
import IUserImageCategoryDTO from '../../../dtos/IUserImageCategoryDTO';
import AddUserImageCategory from '../AddUserImageCategory';

import {
  Container,
  ImageContainer,
  CategoriesMenu,
  Category,
  AddButton,
  ImageButton,
} from './styles';

interface IProps {
  userImageCategories: IUserImageCategoryDTO[];
  getUserImageCategories: Function;
  gridView: boolean;
}

const ImagesByCategoryGallery: React.FC<IProps> = ({
  userImageCategories,
  getUserImageCategories,
  gridView,
}: IProps) => {
  const [addUserImageWindow, setAddUserImageWindow] = useState(false);
  const [selectedImageCategory, setSelectedImageCategory] = useState(
    {} as IUserImageCategoryDTO,
  );

  useEffect(() => {
    if (!selectedImageCategory.id && userImageCategories.length >= 1) {
      setSelectedImageCategory(userImageCategories[0]);
    }
  }, [selectedImageCategory, userImageCategories]);

  const handleSelectedImageCategory = useCallback(
    (e: IUserImageCategoryDTO) => {
      selectedImageCategory.id !== e.id && setSelectedImageCategory(e);
    },
    [selectedImageCategory],
  );

  return (
    <Container>
      {addUserImageWindow && (
        <AddUserImageCategory
          closeWindow={() => setAddUserImageWindow(false)}
          getUserImageCategories={getUserImageCategories}
        />
      )}
      <CategoriesMenu>
        <div>
          {userImageCategories.map(category => {
            const isActive =
              selectedImageCategory && selectedImageCategory.id === category.id;
            return (
              <Category
                type="button"
                isActive={isActive}
                background={category.color}
                key={category.id}
                onClick={() => handleSelectedImageCategory(category)}
              >
                {category.name}
              </Category>
            );
          })}
        </div>
      </CategoriesMenu>
      <AddButton type="button" onClick={() => setAddUserImageWindow(true)}>
        Adicionar Pasta
      </AddButton>
      <ImageContainer gridView={gridView}>
        {selectedImageCategory &&
          selectedImageCategory.categoryImages &&
          selectedImageCategory.categoryImages.map(image => {
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
      </ImageContainer>
    </Container>
  );
};

export default ImagesByCategoryGallery;
