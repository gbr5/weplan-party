import React, { MouseEventHandler, useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';
import IFriendDTO from '../../dtos/IFriendDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  eventId: string;
  availableNumberOfGuests: number;
  handleCloseWindow: Function;
  selectedFriend: IFriendDTO;
  handleFriendsWindow: Function;
}

const AddOwnerWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventId,
  availableNumberOfGuests,
  handleCloseWindow,
  selectedFriend,
  handleFriendsWindow,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleAddOwner = useCallback(
    async (data: IEventOwnerDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          description: Yup.string().required('Título é obrigatório.'),
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.number_of_guests > availableNumberOfGuests) {
          addToast({
            type: 'error',
            title: 'Erro ao adicionar anfitrião',
            description:
              'Número de convidados excede o limite, tente novamente.',
          });
          throw new Error('Number of guests is higher than allowed!');
        }

        await api.post(`event-owners/${eventId}`, {
          owner_id: selectedFriend.friend_id,
          description: data.description,
          number_of_guests: data.number_of_guests,
        });

        addToast({
          type: 'success',
          title: 'Dono da festa adicionado com sucesso',
          description: 'Ele já pode contribuir com o evento.',
        });
        handleCloseWindow();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar Dono da Festa',
          description: 'Erro ao adicionar Dono da Festa, tente novamente.',
        });
      }
    },
    [
      addToast,
      eventId,
      handleCloseWindow,
      selectedFriend,
      availableNumberOfGuests,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      <Form ref={formRef} onSubmit={handleAddOwner}>
        <Container>
          <h1>Adicionar Anfitrião</h1>

          <button type="button" onClick={() => handleFriendsWindow(true)}>
            {selectedFriend.friend
              ? `Amigo selecionado: ${selectedFriend.friend.name}`
              : 'Selecionar Amigo'}
          </button>

          <Input
            name="description"
            type="text"
            placeholder="Título do Anfitrião (Noiva, Mãe da noiva, ...)"
          />
          <p>Número de convidados é opcional</p>
          <p>Você pode adicionar até {availableNumberOfGuests} convidados</p>

          <Input name="number_of_guests" type="number" defaultValue={0} />
          <button type="submit">
            <h3>Salvar</h3>
          </button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default AddOwnerWindow;
