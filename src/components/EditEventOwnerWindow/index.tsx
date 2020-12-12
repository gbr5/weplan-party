import React, { MouseEventHandler, useCallback, useState } from 'react';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import { NumberOfGuestWindow } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';
import BooleanQuestionWindow from '../BooleanQuestionWindow';
import IEventDTO from '../../dtos/IEventDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getEventInfo: Function;
  getEventOwners: Function;
  event: IEventDTO;
  owner: IEventOwnerDTO;
  availableNumberOfGuests: number;
}

const EditEventOwnerWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getEventOwners,
  getEventInfo,
  event,
  owner,
  availableNumberOfGuests,
}: IProps) => {
  const { addToast } = useToast();

  const ownerNumberOfGuests =
    owner && owner.number_of_guests ? owner.number_of_guests : 0;

  const ownerDescription = owner && owner.description ? owner.description : '0';

  const [ownerUpdatedNumberOfGuests, setOwnerUpdatedNumberOfGuests] = useState(
    0,
  );
  const [
    confirmUpdateEventNumberOfGuests,
    setConfirmUpdateEventNumberOfGuests,
  ] = useState(false);

  const [ownerUpdatedDescription, setOwnerUpdatedDescription] = useState(
    ownerDescription,
  );

  const handleUpdateOwner = useCallback(async () => {
    try {
      await api.put(`events/${event.id}/event-owners`, {
        description: ownerUpdatedDescription,
        number_of_guests: ownerUpdatedNumberOfGuests,
      });
      handleCloseWindow();
      getEventOwners();
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
    addToast,
    handleCloseWindow,
    getEventOwners,
    event,
    ownerUpdatedDescription,
    ownerUpdatedNumberOfGuests,
  ]);

  const handleUpdateNumberOfGuests = useCallback(
    async (props: boolean) => {
      if (props) {
        try {
          await api.put(`events/update-number-of-guests/${event.id}`, {
            number_of_guests: ownerUpdatedNumberOfGuests,
          });
          getEventInfo();
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
      }
      setConfirmUpdateEventNumberOfGuests(false);
    },
    [addToast, event, ownerUpdatedNumberOfGuests, getEventInfo],
  );

  const handleOwnersUpdatedNumberOfGuests = useCallback((props: number) => {
    setOwnerUpdatedNumberOfGuests(props);
  }, []);

  const handleOwnersUpdatedDescription = useCallback((props: string) => {
    setOwnerUpdatedDescription(props);
  }, []);

  // useEffect(() => {
  //   if (
  //     ownerUpdatedNumberOfGuests - owner.number_of_guests >
  //     availableNumberOfGuests
  //   ) {
  //     setConfirmUpdateEventNumberOfGuests(true);
  //   }
  // }, [ownerUpdatedNumberOfGuests, availableNumberOfGuests, owner]);

  return (
    <>
      {confirmUpdateEventNumberOfGuests && (
        <BooleanQuestionWindow
          handleWeplanUserQuestion={(e: boolean) =>
            handleUpdateNumberOfGuests(e)
          }
          onHandleCloseWindow={() => setConfirmUpdateEventNumberOfGuests(false)}
          question={`O número de escolhido irá aumentar o número de convidados do evento para ${
            availableNumberOfGuests +
            (ownerUpdatedNumberOfGuests - ownerNumberOfGuests)
          }. Deseja atualizar as informações do evento?`}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 20,
          top: '22,5%',
          left: '30%',
          height: '55%',
          width: '40%',
        }}
      >
        <NumberOfGuestWindow>
          <h1>Editar anfitrião</h1>

          <Input
            name="description"
            type="text"
            defaultValue={ownerDescription}
            onChange={e => handleOwnersUpdatedDescription(e.target.value)}
          />
          <p>Com o número de convidados do evento,</p>
          <p>
            você pode adicionar até
            {availableNumberOfGuests +
              ownerNumberOfGuests -
              ownerUpdatedNumberOfGuests}{' '}
            convidados.
          </p>
          <Input
            name="number_of_guests"
            type="number"
            defaultValue={ownerNumberOfGuests}
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
