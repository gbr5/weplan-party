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
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  eventId: string;
  owner: IEventOwnerDTO;
  availableNumberOfGuests: number;
}

const EditEventOwnerWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  eventId,
  owner,
  availableNumberOfGuests,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleEditOwner = useCallback(
    async (data: IEventOwnerDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          description: Yup.string(),
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

        await api.put(`events/${eventId}/event-owners/${owner.id}`, {
          description: data.description,
          number_of_guests: Number(data.number_of_guests),
        });

        addToast({
          type: 'success',
          title: 'Anfitrião editado com sucesso',
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
          title: 'Erro ao editar anfitrião',
          description: 'Erro ao editar o anfitrião, tente novamente.',
        });
      }
    },
    [addToast, eventId, owner, handleCloseWindow, availableNumberOfGuests],
  );

  return (
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
      <Form ref={formRef} onSubmit={handleEditOwner}>
        <NumberOfGuestWindow>
          <h1>Editar anfitrião</h1>

          <Input
            name="description"
            type="text"
            defaultValue={owner.description}
          />
          <p>Você pode adicionar até {availableNumberOfGuests} convidados</p>
          <Input
            name="number_of_guests"
            type="number"
            defaultValue={owner.number_of_guests}
          />
          <button type="submit">Salvar</button>
        </NumberOfGuestWindow>
      </Form>
    </WindowContainer>
  );
};

export default EditEventOwnerWindow;
