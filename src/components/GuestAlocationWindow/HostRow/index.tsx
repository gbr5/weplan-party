import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdCheck, MdClose } from 'react-icons/md';
import * as Yup from 'yup';

import IHostDTO from '../../../dtos/IHostDTO';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErros';
import Input from '../../Input';

import { Container } from './styles';

interface IFormData {
  number_of_guests: number;
}

interface IProps {
  availableNumberOfGuests: number;
  masterId: string;
  getHosts: Function;
  handleUpdateEventNumberOfGuests: Function;
  host: IHostDTO;
}

const HostRow: React.FC<IProps> = ({
  availableNumberOfGuests,
  masterId,
  getHosts,
  handleUpdateEventNumberOfGuests,
  host,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [isSelected, setIsSelected] = useState(false);

  const handleIsSelected = useCallback(() => {
    setIsSelected(!isSelected);
  }, [isSelected]);

  const onSubmit = useCallback(
    async (data: IFormData) => {
      if (masterId === host.user_id) {
        try {
          formRef.current?.setErrors([]);

          const schema = Yup.object().shape({
            number_of_guests: Yup.number(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });
          await api.put(`events/master-number-of-guests/${host.event_id}`, {
            number_of_guests: data.number_of_guests,
          });
          handleIsSelected();
          getHosts();
          return addToast({
            type: 'success',
            title: `Número de convidados de ${host.first_name} alterado com sucesso`,
            description: 'As atualizações já foram propagadas.',
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const error = getValidationErrors(err);
            formRef.current?.setErrors(error);
          }
          addToast({
            type: 'error',
            title: `Erro ao editar número de convidados de ${host.first_name}`,
            description:
              'Erro ao editar número de convidados, tente novamente.',
          });
          throw new Error(err);
        }
      } else if (host.isOwner) {
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
              title: `Erro ao editar número de convidados do Anfitrião ${host.first_name}.`,
              description: 'Número de convidados excede o limite!',
            });
            handleUpdateEventNumberOfGuests();
          }
          await api.put(`owner/number-of-guests/${host.id}`, {
            number_of_guests: data.number_of_guests,
          });
          handleIsSelected();
          getHosts();
          return addToast({
            type: 'success',
            title: 'Convidados criados com sucesso',
            description: 'As mudanças já foram atualizadas no seu evento.',
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const error = getValidationErrors(err);
            formRef.current?.setErrors(error);
          }
          addToast({
            type: 'error',
            title: `Erro ao editar número de convidados de ${host.first_name}`,
            description:
              'Erro ao editar número de convidados, tente novamente.',
          });
          throw new Error(err);
        }
      } else {
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
              title: `Erro ao editar número de convidados do membro ${host.first_name}.`,
              description: 'Número de convidados excede o limite!',
            });
            handleUpdateEventNumberOfGuests();
          }
          await api.put(`member/number-of-guests/${host.id}`, {
            number_of_guests: data.number_of_guests,
          });
          handleIsSelected();
          getHosts();
          return addToast({
            type: 'success',
            title: 'Convidados criados com sucesso',
            description: 'As mudanças já foram atualizadas no seu evento.',
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const error = getValidationErrors(err);
            formRef.current?.setErrors(error);
          }
          addToast({
            type: 'error',
            title: `Erro ao editar número de convidados de ${host.first_name}`,
            description:
              'Erro ao editar número de convidados, tente novamente.',
          });
          throw new Error(err);
        }
      }
    },
    [
      availableNumberOfGuests,
      handleIsSelected,
      masterId,
      getHosts,
      host,
      addToast,
      handleUpdateEventNumberOfGuests,
    ],
  );

  const containerStyle = {
    width: '100%',
    height: '40px',
  };

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <Container>
        <span>
          <h1>{host.first_name}</h1>
          <h2>{host.last_name}</h2>
        </span>
        {isSelected ? (
          <div>
            <Input
              defaultValue={host.number_of_guests}
              name="number_of_guests"
              type="number"
              containerStyle={containerStyle}
            />
            <button type="submit" style={{ background: 'green' }}>
              <MdCheck />
            </button>
            <button
              type="button"
              onClick={handleIsSelected}
              style={{ background: 'red' }}
            >
              <MdClose />
            </button>
          </div>
        ) : (
          <button type="button" onClick={handleIsSelected}>
            {host.number_of_guests}
            <FiEdit />
          </button>
        )}
      </Container>
    </Form>
  );
};

export default HostRow;
