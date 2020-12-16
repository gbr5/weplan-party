import React, { MouseEventHandler, useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { MdGroupAdd, MdPartyMode } from 'react-icons/md';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import { Container, AddMultipleGuests } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import IFriendDTO from '../../dtos/IFriendDTO';

interface ICreateGuest {
  first_name: string;
  last_name: string;
  description: string;
  confirmed: boolean;
  weplanUser: boolean;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  eventId: string;
  weplanUser: boolean;
  isOwner: boolean;
  myAvailableNumberOfGuests: number;
  handleCloseWindow: Function;
  handleGuestAllocationWindow: MouseEventHandler;
  handleGetGuests: Function;
  selectedFriend: IFriendDTO;
  handleAddGuestListWindow: MouseEventHandler;
  openWPGuestQuestionWindow: Function;
  handleGuestConfirmedWindow: MouseEventHandler;
  guestConfirmed: boolean;
}

const AddGuestWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventId,
  weplanUser,
  isOwner,
  myAvailableNumberOfGuests,
  handleCloseWindow,
  handleGuestAllocationWindow,
  handleGetGuests,
  selectedFriend,
  handleAddGuestListWindow,
  openWPGuestQuestionWindow,
  handleGuestConfirmedWindow,
  guestConfirmed,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleAddGuest = useCallback(
    async (data: ICreateGuest) => {
      try {
        formRef.current?.setErrors([]);

        if (myAvailableNumberOfGuests <= 0) {
          addToast({
            type: 'error',
            title: 'Erro ao adicionar anfitrião',
            description:
              'Número de convidados excede o limite, tente novamente.',
          });
          throw new Error('Number of guests is higher than allowed!');
        }

        if (weplanUser && selectedFriend.friend.personInfo) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post(`events/${eventId}/guests`, {
            first_name: selectedFriend.friend.personInfo.first_name,
            last_name: selectedFriend.friend.personInfo.last_name,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: selectedFriend.friend.id,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post(`events/${eventId}/guests`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: '0',
          });
        }

        handleCloseWindow();
        handleGetGuests();
        return addToast({
          type: 'success',
          title: 'Convidado criado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
        return addToast({
          type: 'error',
          title: 'Erro ao criar convidado',
          description: 'Erro ao criar o convidado, tente novamente.',
        });
      }
    },
    [
      addToast,
      eventId,
      weplanUser,
      guestConfirmed,
      handleGetGuests,
      myAvailableNumberOfGuests,
      selectedFriend,
      handleCloseWindow,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '20%',
        height: '90%',
        width: '60%',
      }}
    >
      <Form ref={formRef} onSubmit={handleAddGuest}>
        <Container>
          <h1>Adicionar Convidado</h1>
          <p>Você pode adicionar até {myAvailableNumberOfGuests} convidados</p>
          <AddMultipleGuests>
            <button type="button" onClick={handleAddGuestListWindow}>
              Adicionar lista de convidados
              <MdGroupAdd size={24} />
            </button>
            {isOwner && (
              <button type="button" onClick={handleGuestAllocationWindow}>
                Editar alocação de convidados
              </button>
            )}
          </AddMultipleGuests>

          {!weplanUser && (
            <>
              <Input name="first_name" type="text" placeholder="Nome" />
              <Input name="last_name" type="text" placeholder="Sobrenome" />
            </>
          )}

          <Input name="description" type="text" defaultValue="Descrição" />

          <div>
            {!guestConfirmed ? (
              <button type="button" onClick={handleGuestConfirmedWindow}>
                Não confirmado
              </button>
            ) : (
              <h1>
                <button type="button" onClick={handleGuestConfirmedWindow}>
                  <MdPartyMode />
                  Confirmado!
                </button>
              </h1>
            )}
            {!weplanUser && !selectedFriend.friend ? (
              <button
                type="button"
                onClick={() => openWPGuestQuestionWindow(true)}
              >
                Convidado Weplan ?
              </button>
            ) : (
              <h1>
                <button
                  type="button"
                  onClick={() => openWPGuestQuestionWindow(true)}
                >
                  {selectedFriend.friend.name}
                </button>
              </h1>
            )}
          </div>

          <button type="submit">
            <h3>Salvar</h3>
          </button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default AddGuestWindow;
