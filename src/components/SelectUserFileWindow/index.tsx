import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Container,
  SideMenu,
  CategoryButton,
  Section,
  FileButton,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import IUserFileDTO from '../../dtos/IUserFileDTO';
import IUserFileCategoryDTO from '../../dtos/IUserFileCategoryDTO';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

interface IFormDTO {
  title: string;
  message: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  selectUserFile: Function;
  initialCategory: string;
}

const SelectUserFileWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  selectUserFile,
  initialCategory,
}: IProps) => {
  const { user } = useAuth();

  const [userFileCategories, setUserFileCategories] = useState<
    IUserFileCategoryDTO[]
  >([]);
  const [selectedUserFileCategory, setSelectedUserFileCategory] = useState<
    IUserFileCategoryDTO
  >({} as IUserFileCategoryDTO);

  const [selectedUserFile, setSelectedUserFile] = useState<IUserFileDTO>(
    {} as IUserFileDTO,
  );

  const handleSelectUserFileCategory = useCallback(
    (props: IUserFileCategoryDTO) => {
      setSelectedUserFileCategory(props);
    },
    [],
  );

  const handleSelectUserFile = useCallback(() => {
    selectUserFile(selectedUserFile);
    handleCloseWindow();
  }, [selectUserFile, handleCloseWindow, selectedUserFile]);

  const getUserFileCategories = useCallback(() => {
    try {
      api
        .get<IUserFileCategoryDTO[]>(`user/file/categories/${user.id}`)
        .then(response => {
          setUserFileCategories(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

  useEffect(() => {
    getUserFileCategories();
  }, [getUserFileCategories]);

  useEffect(() => {
    if (userFileCategories.length > 0) {
      const defaultCategory = userFileCategories.find(
        category => category.name === initialCategory,
      );

      defaultCategory && setSelectedUserFileCategory(defaultCategory);
    }
  }, [userFileCategories, initialCategory]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <SideMenu>
          {userFileCategories.map(category => {
            return (
              <CategoryButton
                key={category.id}
                isActive={selectedUserFileCategory.id === category.id}
                onClick={() => handleSelectUserFileCategory(category)}
                type="button"
                style={{ background: `${category.color}` }}
              >
                {category.name}
              </CategoryButton>
            );
          })}
        </SideMenu>
        <Section>
          {selectedUserFileCategory &&
            selectedUserFileCategory.categoryFiles &&
            selectedUserFileCategory.categoryFiles.map(categoryFile => {
              const { file } = categoryFile;

              return (
                <FileButton
                  isActive={selectedUserFile.id === file.id}
                  onClick={() => setSelectedUserFile(file)}
                  type="button"
                  key={file.id}
                >
                  <strong>{file.file_name}</strong>
                  <p>{file.description}</p>
                </FileButton>
              );
            })}
        </Section>
        {selectedUserFile && selectedUserFile.id && (
          <button type="button" onClick={handleSelectUserFile}>
            Selecionar
          </button>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectUserFileWindow;
