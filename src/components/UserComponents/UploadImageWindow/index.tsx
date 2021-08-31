import React, {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { MdAttachFile } from 'react-icons/md';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, Header, Body, ImageButton } from './styles';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';
import IUserImageCategoryDTO from '../../../dtos/IUserImageCategoryDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
}

const UploadImageWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [
    selectUserImageCategoryWindow,
    setSelectUserImageCategoryWindow,
  ] = useState(true);
  const [selectUserImageNameWindow, setSelectUserImageNameWindow] = useState(
    false,
  );
  const [uploadUserImageWindow, setUploadUserImageWindow] = useState(false);
  const [
    selectedUserImageCategories,
    setSelectedUserImageCategories,
  ] = useState<IUserImageCategoryDTO[]>([]);

  const [userImageCategories, setUserImageCategories] = useState<
    IUserImageCategoryDTO[]
  >([]);
  const [userImageName, setUserImageName] = useState('');

  const getUserImageCategories = useCallback(() => {
    try {
      api
        .get<IUserImageCategoryDTO[]>(`user/image/categories/${user.id}`)
        .then(response => {
          setUserImageCategories(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

  useEffect(() => {
    getUserImageCategories();
  }, [getUserImageCategories]);

  const selectUserImageCategories = useCallback(
    (props: IUserImageCategoryDTO) => {
      const alreadySelectedCategory = selectedUserImageCategories.find(
        category => category.id === props.id,
      );

      if (alreadySelectedCategory) {
        const updatedSelectedUserImageCategories = selectedUserImageCategories.filter(
          category => category.id !== props.id,
        );
        setSelectedUserImageCategories(updatedSelectedUserImageCategories);
      } else {
        const updatedSelectedUserImageCategories: IUserImageCategoryDTO[] = [];
        selectedUserImageCategories.map(category => {
          updatedSelectedUserImageCategories.push(category);
          return category;
        });
        updatedSelectedUserImageCategories.push(props);
        setSelectedUserImageCategories(updatedSelectedUserImageCategories);
      }
    },
    [selectedUserImageCategories],
  );

  const continueToImageName = useCallback(() => {
    setSelectUserImageCategoryWindow(false);
    setSelectUserImageNameWindow(true);
  }, []);

  const selectUserImageName = useCallback(() => {
    setSelectUserImageNameWindow(false);
    setUploadUserImageWindow(true);
  }, []);

  const uploadUserImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('image_name', e.target.files[0]);

        const userImage = await api.post(
          `/user/images/${userImageName}/${userImageName}`,
          data,
        );

        Promise.all([
          selectedUserImageCategories.map(category => {
            return api.post('category/images', {
              category_id: category.id,
              image_id: userImage.data.id,
            });
          }),
        ]);

        handleCloseWindow();
        addToast({
          type: 'success',
          title: 'Upload de arquivo realizado com sucesso.',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro no upload.',
          description: 'Ocorreu um erro ao realizar o upload, tente novamente.',
        });
      }
    },
    [addToast, userImageName, selectedUserImageCategories, handleCloseWindow],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
      zIndex={14}
    >
      <Container>
        <Header>
          <h1>Upload de Arquivos</h1>
        </Header>
        <Body>
          {selectUserImageCategoryWindow && (
            <>
              <h3>Selecione a categoria do arquivo</h3>
              <div>
                {userImageCategories.map(category => {
                  const isActive = selectedUserImageCategories.find(
                    selectedCategory => selectedCategory.id === category.id,
                  );
                  return (
                    <ImageButton
                      key={category.id}
                      type="button"
                      isActive={!!isActive}
                      onClick={() => selectUserImageCategories(category)}
                    >
                      {category.name}
                    </ImageButton>
                  );
                })}
                {selectedUserImageCategories.length > 0 && (
                  <ImageButton
                    isActive
                    type="button"
                    onClick={continueToImageName}
                  >
                    Pŕoximo
                  </ImageButton>
                )}
              </div>
            </>
          )}
          {selectUserImageNameWindow && (
            <>
              <h3>Insira o nome do arquivo.</h3>
              <input
                type="text"
                onChange={e => setUserImageName(e.target.value)}
              />
              {userImageName !== '' && (
                <ImageButton
                  isActive
                  type="button"
                  onClick={selectUserImageName}
                >
                  Próximo
                </ImageButton>
              )}
            </>
          )}
          {uploadUserImageWindow && (
            <>
              <h3>Clique no clipse e selecione o arquivo</h3>
              <label htmlFor="url">
                <MdAttachFile />
                <input type="file" id="url" onChange={uploadUserImage} />
              </label>
            </>
          )}
        </Body>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default UploadImageWindow;
