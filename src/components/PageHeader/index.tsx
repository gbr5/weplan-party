import React, { useCallback } from 'react';

import { useHistory, Link } from 'react-router-dom';
import { MdHelp } from 'react-icons/md';
import { FiSettings, FiPower } from 'react-icons/fi';
import { Header, HeaderContent, Profile, Menu, Logo } from './styles';

import profileImg from '../../assets/avatar_placeholder.jpg';
import { useAuth } from '../../hooks/auth';

const PageHeader: React.FC = () => {
  const { signOut, user } = useAuth();
  const history = useHistory();

  const handleNavigateToDashboard = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  return (
    <Header>
      <HeaderContent>
        <button type="button" onClick={handleNavigateToDashboard}>
          <Logo>WePlan</Logo>
        </button>

        <Profile>
          <img src={profileImg} alt="oi" />
          <div>
            <span>Bem-vindo,</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>
        <Menu>
          {/* <button type="button">FOTOS</button>
          <button type="button" onClick={handleNavigateToFriends}>
            AMIGOS
          </button>
          <button type="button" onClick={handleNavigateToEvents}>
            EVENTOS
          </button>
          <button type="button">FORNECEDORES</button> */}
          <button type="button" onClick={signOut}>
            <MdHelp size={30} />
          </button>
          <button type="button" onClick={signOut}>
            <FiSettings size={30} />
          </button>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </Menu>
      </HeaderContent>
    </Header>
  );
};

export default PageHeader;
