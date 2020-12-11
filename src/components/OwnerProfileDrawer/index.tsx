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
import IShowEventDTO from '../../dtos/IShowEventDTO';

interface IPropsDTO {
  isOwner: boolean;
  owner: IEventOwnerDTO;
  event: IEventDTO;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
}

const OwnerProfileDrawer: React.FC<IPropsDTO> = ({
  isOwner,
  owner,
  event,
  onHandleCloseWindow,
  handleCloseWindow,
}: IPropsDTO) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [thisOwner, setThisOwner] = useState<IEventOwnerDTO>(
    {} as IEventOwnerDTO,
  );
  const [thisEvent, setThisEvent] = useState<IShowEventDTO>(
    {} as IShowEventDTO,
  );
  const [editOwnerWindow, setEditOwnerWindow] = useState(false);

  const [avatar, setAvatar] = useState(avatar_placeholder);
  const [availableNumberOfGuests, setAvailableNumberOfGuests] = useState(0);

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

  const getOwner = useCallback(() => {
    try {
      api
        .get<IEventOwnerDTO>(`events/event-owner/${owner.userEventOwner.id}`)
        .then(response => {
          const xAvatar = response.data.userEventOwner
            ? response.data.userEventOwner.avatar_url
            : '';
          xAvatar !== '' && xAvatar !== undefined && setAvatar(xAvatar);
          setThisOwner(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [owner]);

  useEffect(() => {
    owner.id ? getOwner() : handleCloseWindow();
  }, [getOwner, owner, handleCloseWindow]);

  const getEvent = useCallback(() => {
    try {
      api.get<IShowEventDTO>(`events/${event.id}`).then(response => {
        setThisEvent(response.data);
        const numberOfGuests = response.data.guests.length;
        setAvailableNumberOfGuests(
          response.data.event.eventInfo.number_of_guests - numberOfGuests,
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [event]);

  useEffect(() => {
    event.id && getEvent();
  }, [getEvent, event]);

  return (
    <>
      {editOwnerWindow && (
        <EditEventOwnerWindow
          availableNumberOfGuests={availableNumberOfGuests}
          event={thisEvent.event}
          getEventInfo={getEvent}
          getEventOwners={getOwner}
          handleCloseWindow={closeEditOwnerWindow}
          onHandleCloseWindow={() => setEditOwnerWindow(false)}
          owner={thisOwner}
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
          <img src={avatar} alt={thisOwner.userEventOwner.name} />
          {isOwner ? (
            <>
              <button type="button" onClick={openEditOwnerWindow}>
                <FiEdit3 size={24} />

                <h1>
                  username:
                  <strong>{thisOwner.userEventOwner.name}</strong>
                </h1>
                {thisOwner.userEventOwner.personInfo && (
                  <h1>
                    Nome:
                    <strong>
                      {thisOwner.userEventOwner.personInfo.first_name}
                    </strong>
                    Sobrenome:
                    <strong>
                      {thisOwner.userEventOwner.personInfo.first_name}
                    </strong>
                  </h1>
                )}
                <div>
                  <h2>
                    Descrição: <strong>{thisOwner.description}</strong>
                  </h2>
                  <h2>
                    Número de convidados:{' '}
                    <strong>{thisOwner.number_of_guests}</strong>
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
                  <strong>{thisOwner.userEventOwner.name}</strong>
                </h1>
                {thisOwner.userEventOwner.personInfo && (
                  <h1>
                    Nome:
                    <strong>
                      {thisOwner.userEventOwner.personInfo.first_name}
                    </strong>
                    Sobrenome:
                    <strong>
                      {thisOwner.userEventOwner.personInfo.first_name}
                    </strong>
                  </h1>
                )}
                <div>
                  <h2>
                    Descrição: <strong>{thisOwner.description}</strong>
                  </h2>
                  <h2>
                    Número de convidados:{' '}
                    <strong>{thisOwner.number_of_guests}</strong>
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
