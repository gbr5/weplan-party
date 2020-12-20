import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import AvatarPlaceholder from '../../../assets/WePlanLogo.svg';

import { Container, BooleanButton, Header } from './styles';
import IUserDTO from '../../../dtos/IUserDTO';

interface IProps {
  handleSection: Function;
  handleCloseWindow: Function;
  section: string;
  user: IUserDTO;
}

const SideMenu: React.FC<IProps> = ({
  handleSection,
  handleCloseWindow,
  section,
  user,
}: IProps) => {
  const history = useHistory();
  const avatar = useMemo(() => {
    return user.avatar_url ? user.avatar_url : AvatarPlaceholder;
  }, [user]);

  const imgAlt = useMemo(() => {
    return `${user.avatar_url} - WePlan Party`;
  }, [user]);

  const navigateToProfile = useCallback(() => {
    handleCloseWindow();
    history.push('/profile');
  }, [handleCloseWindow, history]);

  return (
    <Container>
      <Header>
        <button type="button" onClick={navigateToProfile}>
          <img src={avatar} alt={imgAlt} />
        </button>
        <h2>{user.name}</h2>
      </Header>
      <BooleanButton
        type="button"
        isActive={section === 'Profile'}
        onClick={() => handleSection('Profile')}
      >
        Usuário
      </BooleanButton>
      <BooleanButton
        type="button"
        isActive={section === 'Finance'}
        onClick={() => handleSection('Finance')}
      >
        Financeiro
      </BooleanButton>
      <BooleanButton
        type="button"
        isActive={section === 'Contacts'}
        onClick={() => handleSection('Contacts')}
      >
        Contatos
      </BooleanButton>
      <BooleanButton
        type="button"
        isActive={section === 'Public'}
        onClick={() => handleSection('Public')}
      >
        Público
      </BooleanButton>
    </Container>
  );
};

export default SideMenu;
