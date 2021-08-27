import React, { useCallback, useEffect, useState } from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { Container, DeleteOwnerButton } from './styles';
import avatar_placeholder from '../../assets/WePlanLogo.svg';
import { useAuth } from '../../hooks/auth';

import WindowContainer from '../WindowContainer';
import EditEventOwnerWindow from '../EditEventOwnerWindow';
import { useToast } from '../../hooks/toast';
import { useEventOwners } from '../../hooks/eventOwners';
import { useEventVariables } from '../../hooks/eventVariables';

interface IPropsDTO {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getEventInfo: Function;
  availableNumberOfGuests: number;
}

const OwnerProfileDrawer: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getEventInfo,
  availableNumberOfGuests,
}: IPropsDTO) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { selectedEventOwner, selectedEvent, isOwner } = useEventVariables();
  const { deleteEventOwner } = useEventOwners();

  const [editOwnerWindow, setEditOwnerWindow] = useState(false);

  const [avatar, setAvatar] = useState(avatar_placeholder);

  const openEditOwnerWindow = useCallback(() => {
    setEditOwnerWindow(true);
  }, []);

  const closeEditOwnerWindow = useCallback(() => {
    setEditOwnerWindow(false);
    handleCloseWindow();
  }, [handleCloseWindow]);

  const deleteOwner = useCallback(async () => {
    try {
      if (selectedEvent.user_id !== selectedEventOwner.id)
        await deleteEventOwner(selectedEventOwner.id);
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
  }, [
    selectedEventOwner,
    selectedEvent,
    addToast,
    handleCloseWindow,
    deleteEventOwner,
  ]);

  useEffect(() => {
    if (selectedEventOwner.userEventOwner.avatar_url) {
      setAvatar(selectedEventOwner.userEventOwner.avatar_url);
    }
  }, [selectedEventOwner]);

  return (
    <>
      {editOwnerWindow && (
        <EditEventOwnerWindow
          handleCloseWindow={closeEditOwnerWindow}
          onHandleCloseWindow={() => closeEditOwnerWindow()}
          availableNumberOfGuests={availableNumberOfGuests}
          getEventInfo={getEventInfo}
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
            alt={
              selectedEventOwner
                ? selectedEventOwner.userEventOwner.name
                : 'WePlan'
            }
          />
          {isOwner ? (
            <>
              <button type="button" onClick={openEditOwnerWindow}>
                <FiEdit3 size={24} />

                <h1>
                  username:
                  <strong>
                    {selectedEventOwner &&
                      selectedEventOwner.userEventOwner.name}
                  </strong>
                </h1>
                {selectedEventOwner &&
                  selectedEventOwner.userEventOwner.personInfo && (
                    <h1>
                      Nome:
                      <strong>
                        {selectedEventOwner &&
                        selectedEventOwner.userEventOwner.personInfo
                          ? selectedEventOwner.userEventOwner.personInfo
                              .first_name
                          : '0'}
                      </strong>
                      Sobrenome:
                      <strong>
                        {selectedEventOwner &&
                        selectedEventOwner.userEventOwner.personInfo
                          ? selectedEventOwner.userEventOwner.personInfo
                              .last_name
                          : '0'}
                      </strong>
                    </h1>
                  )}
                <div>
                  <h2>
                    Descrição:{' '}
                    <strong>
                      {selectedEventOwner
                        ? selectedEventOwner.description
                        : '0'}
                    </strong>
                  </h2>
                  <h2>
                    Número de convidados:{' '}
                    <strong>
                      {selectedEventOwner
                        ? selectedEventOwner.number_of_guests
                        : '0'}
                    </strong>
                  </h2>
                </div>
              </button>
              {selectedEvent.user_id !== selectedEventOwner.id &&
                selectedEvent.user_id !== user.id && (
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
                  <strong>{selectedEventOwner.userEventOwner.name}</strong>
                </h1>
                {selectedEventOwner &&
                  selectedEventOwner.userEventOwner.personInfo && (
                    <h1>
                      Nome:
                      <strong>
                        {selectedEventOwner
                          ? selectedEventOwner.userEventOwner.personInfo
                              .first_name
                          : '0'}
                      </strong>
                      Sobrenome:
                      <strong>
                        {selectedEventOwner
                          ? selectedEventOwner.userEventOwner.personInfo
                              .last_name
                          : '0'}
                      </strong>
                    </h1>
                  )}
                <div>
                  <h2>
                    Descrição:{' '}
                    <strong>
                      {selectedEventOwner && selectedEventOwner.description
                        ? selectedEventOwner.description
                        : '0'}
                    </strong>
                  </h2>
                  <h2>
                    Número de convidados:{' '}
                    <strong>
                      {selectedEventOwner && selectedEventOwner.number_of_guests
                        ? selectedEventOwner.number_of_guests
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
