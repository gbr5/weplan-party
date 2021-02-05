import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../Input';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container } from './styles';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import SelectDate from '../../UserComponents/SelectDate';
import formatDateToString from '../../../utils/formatDateToString';

interface IFormData {
  subject: string;
  duration_minutes: number;
  address: string;
}

interface IProps {
  closeWindow: Function;
}

const CreateAppointmentForm: React.FC<IProps> = ({ closeWindow }: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectDateWindow, setSelectDateWindow] = useState(false);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        await api.post('appointments', {
          subject: data.subject,
          address: data.address,
          date: selectedDate,
          duration_minutes: data.duration_minutes,
          weplanGuest: false,
          guest: false,
          appointment_type: 'Personal',
        });
        addToast({
          type: 'success',
          title: 'Compromisso criado com sucesso',
        });
        closeWindow();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar compromisso',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, closeWindow, selectedDate],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={closeWindow}
      containerStyle={{
        zIndex: 15,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      {selectDateWindow && (
        <SelectDate
          closeWindow={() => setSelectDateWindow(false)}
          selectDate={(e: Date) => setSelectedDate(e)}
        />
      )}
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <p>Assunto:</p>
          <Input name="subject" type="text" placeholder="Assunto" />
          <p>Endereço:</p>
          <Input name="address" type="text" placeholder="Endereço" />
          <p>Duração (minutos):</p>
          <Input name="duration_minutes" type="number" />

          <button type="button" onClick={() => setSelectDateWindow(true)}>
            {selectedDate === today
              ? 'Selecionar a data'
              : formatDateToString(String(selectedDate))}
          </button>
          {selectedDate !== today && (
            <button type="submit">Criar compromisso</button>
          )}
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default CreateAppointmentForm;
