import React, { useCallback, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Swicth from 'react-switch';
import { FiPower } from 'react-icons/fi';
import { MdAttachFile, MdGroup, MdImage } from 'react-icons/md';
import { useGoogleLogout } from 'react-google-login';

import { useHistory } from 'react-router-dom';
import { useToggleTheme } from '../../../hooks/theme';

import {
  Container,
  MenuItemContainer,
  ToggleButton,
  LogoutButton,
} from './styles';
import { useAuth } from '../../../hooks/auth';
import { useFriends } from '../../../hooks/friends';
import { useEvent } from '../../../hooks/event';
import { useEventVariables } from '../../../hooks/eventVariables';

interface IProps {
  handleUploadFileWindow: Function;
}

const MenuDrawer: React.FC<IProps> = ({ handleUploadFileWindow }: IProps) => {
  const history = useHistory();
  const { handleCreateEventWindow } = useEvent();
  const { handleSignOut } = useAuth();
  const { colors } = useContext(ThemeContext);
  const clientId = process.env.REACT_APP_URL_GOOGLE_CLIENT_ID;
  const { getFriends, getFriendRequests } = useFriends();
  const { unsetVariables } = useEventVariables();

  const { toggleTheme, themeBoolean } = useToggleTheme();

  const navigateTo = useCallback(
    (e: string) => {
      history.push(e);
    },
    [history],
  );

  async function navigateToFriendsPage(): Promise<void> {
    unsetVariables();
    await getFriends();
    await getFriendRequests();
    navigateTo('/friends');
  }

  const { signOut } = useGoogleLogout({
    clientId: clientId || '',
  });

  function handleUserSignOut(): void {
    unsetVariables();
    handleSignOut();
    signOut();
  }

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
        <button type="button" onClick={() => handleCreateEventWindow()}>
          <h3>Criar Evento</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button" onClick={navigateToFriendsPage}>
          <MdGroup /> <h3>Contatos</h3>
        </button>
      </MenuItemContainer>
      <MenuItemContainer>
        <button type="button" onClick={() => navigateTo('/images')}>
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
        <button type="button" onClick={() => navigateTo('/calendar')}>
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
      <LogoutButton type="button" onClick={handleUserSignOut}>
        <h3>Logout</h3>
        <FiPower size={32} />
      </LogoutButton>
    </Container>
  );
};

export default MenuDrawer;
