import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import Input from '../../Input';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container } from './styles';

interface IProps {
  appointment: IAppointmentDTO;
  getAppointment: Function;
  closeWindow: Function;
}

interface IFormData {
  subject: string;
}

const EditAppointmentSubject: React.FC<IProps> = ({
  appointment,
  getAppointment,
  closeWindow,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (e: IFormData) => {
      try {
        await api.put(`appointments/${appointment.id}`, {
          subject: e.subject,
          date: appointment.date,
          duration_minutes: appointment.duration_minutes,
          address: appointment.address,
          appointment_type: appointment.appointment_type,
          weplanGuest: appointment.weplanGuest,
          guest: appointment.guest,
        });
        addToast({
          type: 'success',
          title: 'Compromisso atualizado com sucesso',
        });
        getAppointment();
        closeWindow();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar o assunto do compromisso',
          description: 'Ocorreu um erro, tente novamente',
        });
        throw new Error(err);
      }
    },
    [appointment, addToast, getAppointment, closeWindow],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 16,
        top: '0',
        left: '0',
        height: '100%',
        widthtop: '100%',
      }}
      zIndex={15}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h3>Editar assunto do compromisso</h3>
          <Input name="subject" defaultValue={appointment.subject} />
          <button type="submit">Salvar</button>
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default EditAppointmentSubject;
