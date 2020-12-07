import React, { MouseEventHandler, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import { NumberOfGuestWindow } from './styles';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import IEventMemberDTO from '../../dtos/IEventMemberDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  eventId: string;
  member: IEventMemberDTO;
  availableNumberOfGuests: number;
}

const EditMemberNumberOfGuestsWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  eventId,
  member,
  availableNumberOfGuests,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const handleEditMember = useCallback(
    async (data: IEventMemberDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
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

        await api.put(`events/${eventId}/event-members/${member.id}`, {
          number_of_guests: Number(data.number_of_guests),
        });

        addToast({
          type: 'success',
          title: 'Membro editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        handleCloseWindow();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar membro',
          description: 'Erro ao editar o membro, tente novamente.',
        });
      }
    },
    [addToast, eventId, member, handleCloseWindow, availableNumberOfGuests],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 100000,
        top: '25%',
        left: '30%',
        height: '50%',
        width: '40%',
      }}
    >
      <Form ref={formRef} onSubmit={handleEditMember}>
        <NumberOfGuestWindow>
          <h1>Número de convidados</h1>
          <p>Você pode adicionar até {availableNumberOfGuests} convidados</p>

          <Input
            name="number_of_guests"
            type="number"
            defaultValue={member.number_of_guests}
          />

          <button type="submit">Salvar</button>
        </NumberOfGuestWindow>
      </Form>
    </WindowContainer>
  );
};

export default EditMemberNumberOfGuestsWindow;
