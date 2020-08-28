import React, { useCallback } from 'react';

// import { MdClose } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { UserProfileWindow } from './styles';

const UserProfile: React.FC = () => {
  const history = useHistory();

  const handleNavigateToEvents = useCallback(() => {
    history.push('/events');
  }, [history]);

  return (
    <UserProfileWindow>
      {/* <span>
        <button type="button" onClick={handleCreateEventDrawer}>
          <MdClose size={30} />
        </button>
      </span> */}
      <h1>Nome do usuário</h1>
      <p>é um fornecedor (perfil sempre aberto)?</p>
      <p>é uma empresa?</p>
      <p>se não é fornecedor, o perfil é aberto?</p>
      <p>se não é fornecedor, é um amigo?</p>
      <p>
        se for amigo ou o perfil for aberto, aqui aparecem os contatos da pessoa
      </p>
      <div>
        <button type="button" onClick={handleNavigateToEvents}>
          se for amigo ou o perfil for aberto, aqui aparecem as festas da pessoa
        </button>
      </div>
      <button type="button">
        <h3>Criar</h3>
      </button>
    </UserProfileWindow>
  );
};

export default UserProfile;
