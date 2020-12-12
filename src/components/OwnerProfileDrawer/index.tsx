import React, { useCallback, useEffect, useState } from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { Container, DeleteOwnerButton } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';
import { useAuth } from '../../hooks/auth';

import WindowContainer from '../WindowContainer';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';
import api from '../../services/api';
import IEventDTO from '../../dtos/IEventDTO';
import EditEventOwnerWindow from '../EditEventOwnerWindow';
import { useToast } from '../../hooks/toast';

interface IPropsDTO {
  isOwner: boolean;
  owner: IEventOwnerDTO;
  event: IEventDTO;
  availableNumberOfGuests: number;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getOwner: Function;
}

const OwnerProfileDrawer: React.FC<IPropsDTO> = ({
  isOwner,
  owner,
  event,
  availableNumberOfGuests,
  onHandleCloseWindow,
  handleCloseWindow,
  getOwner,
}: IPropsDTO) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [editOwnerWindow, setEditOwnerWindow] = useState(false);

  const [avatar, setAvatar] = useState(avatar_placeholder);

  const openEditOwnerWindow = useCallback(() => {
    setEditOwnerWindow(true);
  }, []);

  const closeEditOwnerWindow = useCallback(() => {
    setEditOwnerWindow(false);
  }, []);

  const deleteOwner = useCallback(async () => {
    try {
      await api.delete(`events/${event.id}/event-owners/${owner.id}`);
      handleCloseWindow();
      addToast({
        type: 'success',
        title: 'Convidados criados com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar convidado',
        description: 'Erro ao criar o convidado, tente novamente.',
      });
      throw new Error(err);
    }
  }, [owner, event, addToast, handleCloseWindow]);

  useEffect(() => {
    if (owner.userEventOwner.avatar_url) {
      setAvatar(owner.userEventOwner.avatar_url);
    }
  }, [owner]);

  return (
    <>
      {editOwnerWindow && (
        <EditEventOwnerWindow
          availableNumberOfGuests={availableNumberOfGuests}
          event={event}
          getEventInfo={getOwner}
          getEventOwners={getOwner}
          handleCloseWindow={closeEditOwnerWindow}
          onHandleCloseWindow={() => setEditOwnerWindow(false)}
          owner={owner}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 10,
          top: '5%',
          left: '5%',
          height: '90%',
          width: '90%',
        }}
      >
        <Container>
          <img
            src={avatar}
            alt={owner ? owner.userEventOwner.name : 'WePlan'}
          />
          {isOwner ? (
            <>
              <button type="button" onClick={openEditOwnerWindow}>
                <FiEdit3 size={24} />

                <h1>
                  username:
                  <strong>{owner && owner.userEventOwner.name}</strong>
                </h1>
                {owner && owner.userEventOwner.personInfo && (
                  <h1>
                    Nome:
                    <strong>
                      {owner ? owner.userEventOwner.personInfo.first_name : '0'}
                    </strong>
                    Sobrenome:
                    <strong>
                      {owner ? owner.userEventOwner.personInfo.last_name : '0'}
                    </strong>
                  </h1>
                )}
                <div>
                  <h2>
                    Descrição:{' '}
                    <strong>{owner ? owner.description : '0'}</strong>
                  </h2>
                  <h2>
                    Número de convidados:{' '}
                    <strong>{owner ? owner.number_of_guests : '0'}</strong>
                  </h2>
                </div>
              </button>
              {event.user_id !== owner.id && event.user_id !== user.id && (
                <div>
                  <DeleteOwnerButton type="button" onClick={deleteOwner}>
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
                    <strong>
                      {owner ? owner.userEventOwner.personInfo.first_name : '0'}
                    </strong>
                    Sobrenome:
                    <strong>
                      {owner ? owner.userEventOwner.personInfo.last_name : '0'}
                    </strong>
                  </h1>
                )}
                <div>
                  <h2>
                    Descrição:{' '}
                    <strong>
                      {owner && owner.description ? owner.description : '0'}
                    </strong>
                  </h2>
                  <h2>
                    Número de convidados:{' '}
                    <strong>
                      {owner && owner.number_of_guests
                        ? owner.number_of_guests
                        : 0}
                    </strong>
                  </h2>
                </div>
              </button>
            </>
          )}
        </Container>
      </WindowContainer>
    </>
  );
};

export default OwnerProfileDrawer;
