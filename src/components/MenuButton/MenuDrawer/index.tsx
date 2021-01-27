import React, { useCallback, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Swicth from 'react-switch';
import { FiPower } from 'react-icons/fi';
import { MdAttachFile, MdGroup, MdImage } from 'react-icons/md';

import { useHistory } from 'react-router-dom';
import { useToggleTheme } from '../../../hooks/theme';

import {
  Container,
  MenuItemContainer,
  ToggleButton,
  LogoutButton,
} from './styles';

interface IProps {
  handleCreateEventDrawer: Function;
  signOut: Function;
  handleUploadFileWindow: Function;
  handleNavigateToFriends: Function;
}

const MenuDrawer: React.FC<IProps> = ({
  handleCreateEventDrawer,
  signOut,
  handleUploadFileWindow,
  handleNavigateToFriends,
}: IProps) => {
  const history = useHistory();
  const { colors } = useContext(ThemeContext);

  const { toggleTheme, themeBoolean } = useToggleTheme();

  const navigateToUserImages = useCallback(() => {
    history.push('/images');
  }, [history]);

  return (
    <Container>
      <MenuItemContainer>
        <ToggleButton>
          <strong>Tema {themeBoolean ? 'Escuro' : 'Claro'}</strong>
          <Swicth
            onChange={toggleTheme}
            checked={themeBoolean}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
            offColor={colors.secondary}
            onColor={colors.primary}
          />
        </ToggleButton>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button" onClick={() => handleCreateEventDrawer()}>
          <h3>Criar Evento</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button" onClick={() => handleNavigateToFriends()}>
          <MdGroup /> <h3>Contatos</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button" onClick={() => navigateToUserImages()}>
          <MdImage /> <h3>Imagens</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button" onClick={() => handleUploadFileWindow()}>
          <MdAttachFile /> <h3>Arquivos</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button">
          <h3>Configurações</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button">
          <h3>Compromissos</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button">
          <h3>Financeiro</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button">
          <h3>Ajuda</h3>
        </button>
      </MenuItemContainer>
      <LogoutButton type="button" onClick={() => signOut()}>
        <h3>Logout</h3>
        <FiPower size={32} />
      </LogoutButton>
    </Container>
  );
};

export default MenuDrawer;
