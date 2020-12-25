import React, {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { MdAttachFile } from 'react-icons/md';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container, Header, Body, FileButton } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import IUserFileCategoryDTO from '../../dtos/IUserFileCategoryDTO';

interface IFormDTO {
  title: string;
  message: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
}

const UploadFileWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [
    selectUserFileCategoryWindow,
    setSelectUserFileCategoryWindow,
  ] = useState(true);
  const [selectUserFileNameWindow, setSelectUserFileNameWindow] = useState(
    false,
  );
  const [uploadUserFileWindow, setUploadUserFileWindow] = useState(false);
  const [selectedUserFileCategories, setSelectedUserFileCategories] = useState<
    IUserFileCategoryDTO[]
  >([]);

  const [userFileCategories, setUserFileCategories] = useState<
    IUserFileCategoryDTO[]
  >([]);
  const [userFileName, setUserFileName] = useState('');

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

  const selectUserFileCategories = useCallback(
    (props: IUserFileCategoryDTO) => {
      const alreadySelectedCategory = selectedUserFileCategories.find(
        category => category.id === props.id,
      );

      if (alreadySelectedCategory) {
        const updatedSelectedUserFileCategories = selectedUserFileCategories.filter(
          category => category.id !== props.id,
        );
        setSelectedUserFileCategories(updatedSelectedUserFileCategories);
      } else {
        const updatedSelectedUserFileCategories: IUserFileCategoryDTO[] = [];
        selectedUserFileCategories.map(category => {
          updatedSelectedUserFileCategories.push(category);
          return category;
        });
        updatedSelectedUserFileCategories.push(props);
        setSelectedUserFileCategories(updatedSelectedUserFileCategories);
      }
    },
    [selectedUserFileCategories],
  );

  const continueToFileName = useCallback(() => {
    setSelectUserFileCategoryWindow(false);
    setSelectUserFileNameWindow(true);
  }, []);

  const selectUserFileName = useCallback(() => {
    setSelectUserFileNameWindow(false);
    setUploadUserFileWindow(true);
  }, []);

  const uploadUserFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('url', e.target.files[0]);

        const userFile = await api.post(
          `/user/files/${user.id}/${userFileName}`,
          data,
        );

        Promise.all([
          selectedUserFileCategories.map(category => {
            return api.post('category/files', {
              category_id: category.id,
              file_id: userFile.data.id,
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
    [
      addToast,
      userFileName,
      selectedUserFileCategories,
      user,
      handleCloseWindow,
    ],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <Header>
          <h1>Upload de Arquivos</h1>
        </Header>
        <Body>
          {selectUserFileCategoryWindow && (
            <>
              <h1>Selecione a categoria do arquivo</h1>
              <div>
                {userFileCategories.map(category => {
                  const isActive = selectedUserFileCategories.find(
                    selectedCategory => selectedCategory.id === category.id,
                  );
                  return (
                    <FileButton
                      key={category.id}
                      type="button"
                      isActive={!!isActive}
                      onClick={() => selectUserFileCategories(category)}
                    >
                      {category.name}
                    </FileButton>
                  );
                })}
              </div>
              {selectedUserFileCategories.length > 0 && (
                <button type="button" onClick={continueToFileName}>
                  Pŕoximo
                </button>
              )}
            </>
          )}
          {selectUserFileNameWindow && (
            <>
              <h1>Insira o nome do arquivo.</h1>
              <input
                type="text"
                onChange={e => setUserFileName(e.target.value)}
              />
              {userFileName !== '' && (
                <button type="button" onClick={selectUserFileName}>
                  Próximo
                </button>
              )}
            </>
          )}
          {uploadUserFileWindow && (
            <>
              <h1>Clique no clipse e selecione o arquivo</h1>
              <label htmlFor="url">
                <MdAttachFile />
                <input type="file" id="url" onChange={uploadUserFile} />
              </label>
            </>
          )}
        </Body>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default UploadFileWindow;
