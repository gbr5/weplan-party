import React, { useCallback, useEffect, useState } from 'react';
import IUserImageCategoryDTO from '../../../dtos/IUserImageCategoryDTO';

import { Container, ImageContainer, CategoriesMenu, Category } from './styles';

interface IProps {
  userImageCategories: IUserImageCategoryDTO[];
}

const ImagesByCategoryGallery: React.FC<IProps> = ({
  userImageCategories,
}: IProps) => {
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
      <ImageContainer>
        {selectedImageCategory &&
          selectedImageCategory.categoryImages &&
          selectedImageCategory.categoryImages.map(image => {
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

export default ImagesByCategoryGallery;
