import React, { useMemo } from 'react';

import AvatarPlaceholder from '../../../assets/avatar_placeholder.jpg';

import { Container, BooleanButton, Header } from './styles';
import IUserDTO from '../../../dtos/IUserDTO';

interface IProps {
  handleSection: Function;
  section: string;
  user: IUserDTO;
  updateUser: Function;
}

const SideMenu: React.FC<IProps> = ({
  handleSection,
  section,
  user,
  updateUser,
}: IProps) => {
  const avatar = useMemo(() => {
    return user.avatar_url ? user.avatar_url : AvatarPlaceholder;
  }, [user]);

  const imgAlt = useMemo(() => {
    return `${user.avatar_url} - WePlan Party`;
  }, [user]);

  return (
    <Container>
      <Header>
        <img src={avatar} alt={imgAlt} />
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
