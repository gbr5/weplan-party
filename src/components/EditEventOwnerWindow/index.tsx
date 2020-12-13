import React, { MouseEventHandler, useCallback, useState } from 'react';

import WindowContainer from '../WindowContainer';

import { NumberOfGuestWindow } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';

interface IProps {
  eventMaster: string;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getOwners: Function;
  getEventInfo: Function;
  owner: IEventOwnerDTO;
  availableNumberOfGuests: number;
  eventId: string;
}

const EditEventOwnerWindow: React.FC<IProps> = ({
  eventMaster,
  onHandleCloseWindow,
  handleCloseWindow,
  getOwners,
  getEventInfo,
  owner,
  availableNumberOfGuests,
  eventId,
}: IProps) => {
  const { addToast } = useToast();

  const ownerNumberOfGuests =
    owner && owner.number_of_guests ? owner.number_of_guests : 0;

  const [ownerUpdatedNumberOfGuests, setOwnerUpdatedNumberOfGuests] = useState(
    0,
  );

  const [ownerUpdatedDescription, setOwnerUpdatedDescription] = useState(
    owner && owner.description ? owner.description : '0',
  );

  const handleUpdateOwner = useCallback(async () => {
    try {
      if (eventMaster === owner.userEventOwner.id) {
        await api.put(`events/master-number-of-guests/${eventId}`, {
          description: ownerUpdatedDescription,
          number_of_guests: ownerUpdatedNumberOfGuests,
        });
      } else {
        await api.put(
          `events/${eventId}/event-owners/${owner.userEventOwner.id}`,
          {
            description: ownerUpdatedDescription,
            number_of_guests: ownerUpdatedNumberOfGuests,
          },
        );
      }
      getEventInfo();
      getOwners();
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
    getOwners,
    getEventInfo,
    addToast,
    handleCloseWindow,
    eventId,
    ownerUpdatedDescription,
    ownerUpdatedNumberOfGuests,
    owner,
    eventMaster,
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
          {eventMaster !== owner.userEventOwner.id && (
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
