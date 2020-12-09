import React from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { Container, DeleteOwnerButton } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';
import { useAuth } from '../../hooks/auth';

import WindowContainer from '../WindowContainer';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';

interface IPropsDTO {
  isOwner: boolean;
  owner: IEventOwnerDTO;
  onHandleOwnerDrawer: MouseEventHandler;
  onHandleNumberOfGuestDrawer: MouseEventHandler;
  onHandleDeleteOwnerDrawer: MouseEventHandler;
}

const OwnerProfileDrawer: React.FC<IPropsDTO> = ({
  isOwner,
  owner,
  onHandleOwnerDrawer,
  onHandleNumberOfGuestDrawer,
  onHandleDeleteOwnerDrawer,
}: IPropsDTO) => {
  const avatar =
    owner.userEventOwner.avatar_url === ''
      ? avatar_placeholder
      : owner.userEventOwner.avatar_url;
  const { user } = useAuth();

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleOwnerDrawer}
      containerStyle={{
        zIndex: 10,
        top: '20%',
        left: '25%',
        height: '60%',
        width: '50%',
      }}
    >
      <Container>
        <img src={avatar} alt={owner.userEventOwner.name} />
        {owner.userEventOwner.id === user.id || isOwner ? (
          <>
            <button type="button" onClick={onHandleNumberOfGuestDrawer}>
              <FiEdit3 size={24} />

              <h1>
                username:
                <strong>{owner.userEventOwner.name}</strong>
              </h1>
              {owner.userEventOwner.personInfo && (
                <h1>
                  Nome:
                  <strong>{owner.userEventOwner.personInfo.first_name}</strong>
                  Sobrenome:
                  <strong>{owner.userEventOwner.personInfo.first_name}</strong>
                </h1>
              )}
              <div>
                <h2>
                  Descrição: <strong>{owner.description}</strong>
                </h2>
                <h2>
                  Número de convidados:{' '}
                  <strong>{owner.number_of_guests}</strong>
                </h2>
              </div>
            </button>
            {owner.id !== user.id && (
              <div>
                <DeleteOwnerButton
                  type="button"
                  onClick={onHandleDeleteOwnerDrawer}
                >
                  Deletar
                  <MdDelete size={24} />
                </DeleteOwnerButton>
              </div>
            )}
          </>
        ) : (
          <>
            <button type="button">
              <h1>
                username:
                <strong>{owner.userEventOwner.name}</strong>
              </h1>
              {owner.userEventOwner.personInfo && (
                <h1>
                  Nome:
                  <strong>{owner.userEventOwner.personInfo.first_name}</strong>
                  Sobrenome:
                  <strong>{owner.userEventOwner.personInfo.first_name}</strong>
                </h1>
              )}
              <div>
                <h2>
                  Descrição: <strong>{owner.description}</strong>
                </h2>
                <h2>
                  Número de convidados:{' '}
                  <strong>{owner.number_of_guests}</strong>
                </h2>
              </div>
            </button>
          </>
        )}
      </Container>
    </WindowContainer>
  );
};

export default OwnerProfileDrawer;
