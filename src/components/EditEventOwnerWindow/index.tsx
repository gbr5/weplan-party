import React, { MouseEventHandler, useCallback, useState } from 'react';

import WindowContainer from '../WindowContainer';

import { NumberOfGuestWindow } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { useCurrentEvent } from '../../hooks/currentEvent';
import { useEventVariables } from '../../hooks/eventVariables';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getEventInfo: Function;
  availableNumberOfGuests: number;
}

const EditEventOwnerWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getEventInfo,
  availableNumberOfGuests,
}: IProps) => {
  const { addToast } = useToast();
  const { selectedEvent, selectedEventOwner } = useEventVariables();
  const { getEventOwners } = useCurrentEvent();

  const ownerNumberOfGuests =
    selectedEventOwner && selectedEventOwner.number_of_guests
      ? selectedEventOwner.number_of_guests
      : 0;

  const [ownerUpdatedNumberOfGuests, setOwnerUpdatedNumberOfGuests] = useState(
    0,
  );

  const [ownerUpdatedDescription, setOwnerUpdatedDescription] = useState(
    selectedEventOwner && selectedEventOwner.description
      ? selectedEventOwner.description
      : '0',
  );

  const handleUpdateOwner = useCallback(async () => {
    try {
      if (selectedEvent.user_id === selectedEventOwner.userEventOwner.id) {
        await api.put(
          `event-owners/master-number-of-guests/${selectedEvent.id}`,
          {
            description: ownerUpdatedDescription,
            number_of_guests: ownerUpdatedNumberOfGuests,
          },
        );
      } else {
        await api.put(
          `event-owners/${selectedEvent.id}${selectedEventOwner.userEventOwner.id}`,
          {
            description: ownerUpdatedDescription,
            number_of_guests: ownerUpdatedNumberOfGuests,
          },
        );
      }
      getEventInfo();
      await getEventOwners(selectedEvent.id);
      handleCloseWindow();
      addToast({
        type: 'success',
        title: 'As informações do evento foram atualizadas com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao editar informações do evento.',
        description:
          'Erro ao editar as informações do evento, tente novamente.',
      });
      throw new Error(err);
    }
  }, [
    getEventOwners,
    selectedEvent,
    getEventInfo,
    addToast,
    handleCloseWindow,
    ownerUpdatedDescription,
    ownerUpdatedNumberOfGuests,
    selectedEventOwner,
  ]);

  const handleOwnersUpdatedNumberOfGuests = useCallback((props: number) => {
    setOwnerUpdatedNumberOfGuests(props);
  }, []);

  const handleOwnersUpdatedDescription = useCallback((props: string) => {
    setOwnerUpdatedDescription(props);
  }, []);

  return (
    <>
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 20,
          top: '22.5%',
          left: '30%',
          height: '55%',
          width: '40%',
        }}
      >
        <NumberOfGuestWindow>
          <h1>Editar anfitrião</h1>

          <input
            name="description"
            type="text"
            defaultValue={ownerUpdatedDescription || ''}
            onChange={e => handleOwnersUpdatedDescription(e.target.value)}
          />
          {selectedEvent.user_id !== selectedEventOwner.userEventOwner.id && (
            <>
              <p>Com o número de convidados do evento,</p>
              <p>
                você pode adicionar até
                {availableNumberOfGuests +
                  ownerNumberOfGuests -
                  ownerUpdatedNumberOfGuests}{' '}
                convidados.
              </p>
            </>
          )}
          <input
            name="number_of_guests"
            type="number"
            defaultValue={ownerNumberOfGuests || ''}
            onChange={e =>
              handleOwnersUpdatedNumberOfGuests(Number(e.target.value))
            }
          />
          <button type="button" onClick={handleUpdateOwner}>
            Salvar
          </button>
        </NumberOfGuestWindow>
      </WindowContainer>
    </>
  );
};

export default EditEventOwnerWindow;
