import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Container, SideMenu, CategoryButton, Section } from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import IUserImageDTO from '../../dtos/IUserImageDTO';
// import IUserImageCategoryDTO from '../../dtos/IUserImageCategoryDTO';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

interface IFormDTO {
  title: string;
  message: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  selectUserImage: Function;
  initialCategory: string;
}

const SelectUserImageWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  selectUserImage,
  initialCategory,
}: IProps) => {
  const { user } = useAuth();

  // const [userImageCategories, setUserImageCategories] = useState<
  //   IUserImageCategoryDTO[]
  // >([]);
  // const [selectedUserImageCategory, setSelectedUserImageCategory] = useState<
  //   IUserImageCategoryDTO
  // >({} as IUserImageCategoryDTO);

  // const [selectedUserImage, setSelectedUserImage] = useState<IUserImageDTO>(
  //   {} as IUserImageDTO,
  // );

  // const handleSelectUserImageCategory = useCallback(
  //   (props: IUserImageCategoryDTO) => {
  //     setSelectedUserImageCategory(props);
  //   },
  //   [],
  // );

  // const handleSelectUserImage = useCallback(() => {
  //   selectUserImage(selectedUserImage);
  //   handleCloseWindow();
  // }, [selectUserImage, handleCloseWindow, selectedUserImage]);

  // const getUserImageCategories = useCallback(() => {
  //   try {
  //     api
  //       .get<IUserImageCategoryDTO[]>(`user/file/categories/${user.id}`)
  //       .then(response => {
  //         setUserImageCategories(response.data);
  //       });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   getUserImageCategories();
  // }, [getUserImageCategories]);

  // useEffect(() => {
  //   if (userImageCategories.length > 0) {
  //     const defaultCategory = userImageCategories.find(
  //       category => category.name === initialCategory,
  //     );

  //     defaultCategory && setSelectedUserImageCategory(defaultCategory);
  //   }
  // }, [userImageCategories, initialCategory]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      <Container>
        {/* <SideMenu>
          <h2>Categorias</h2>
          <div>
            {userImageCategories.map(category => {
              return (
                <CategoryButton
                  key={category.id}
                  isActive={selectedUserImageCategory.id === category.id}
                  onClick={() => handleSelectUserImageCategory(category)}
                  type="button"
                  style={{ background: `${category.color}` }}
                >
                  {category.name}
                </CategoryButton>
              );
            })}
          </div>
        </SideMenu>
        <Section>
          <h2>Arquivos por Categoria</h2>
          <h3>{selectedUserImageCategory && selectedUserImageCategory.name}</h3>
          <div>
            {selectedUserImageCategory &&
              selectedUserImageCategory.categoryImages &&
              selectedUserImageCategory.categoryImages.map(categoryImage => {
                const { file } = categoryImage;

                return (
                  <ImageButton
                    isActive={selectedUserImage.id === file.id}
                    onClick={() => setSelectedUserImage(file)}
                    type="button"
                    key={file.id}
                  >
                    <strong>Nome: {file.file_name}</strong>
                    <p>Descrição: {file.description}</p>
                  </ImageButton>
                );
              })}
          </div>

          {selectedUserImage && selectedUserImage.id && (
            <button type="button" onClick={handleSelectUserImage}>
              Selecionar
            </button>
          )}
        </Section> */}
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectUserImageWindow;
