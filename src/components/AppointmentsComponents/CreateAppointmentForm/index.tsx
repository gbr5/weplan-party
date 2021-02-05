import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { differenceInDays } from 'date-fns/esm';
import Input from '../../Input';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, ButtonContainer } from './styles';
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
  const [subjectInput, setSubjectInput] = useState(true);
  const [subject, setSubject] = useState('');
  const [address, setAddress] = useState('');
  const [addressInput, setAddressInput] = useState(false);
  const [duration, setDuration] = useState(0);
  const [durationInput, setDurationInput] = useState(false);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        await api.post('appointments', {
          subject,
          address,
          date: selectedDate,
          duration_minutes: duration,
          weplanGuest: false,
          guest: false,
          appointment_type: 'Personal',
        });
        setSelectedDate(new Date());
        addToast({
          type: 'success',
          title: 'Compromisso criado com sucesso',
        });
        closeWindow();
        console.log(data.duration_minutes);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar compromisso',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, closeWindow, selectedDate, subject, duration, address],
  );

  const nextSection = useCallback(() => {
    if (subjectInput) {
      setSubjectInput(false);
      setAddressInput(true);
    } else if (addressInput) {
      setAddressInput(false);
      setDurationInput(true);
    } else if (durationInput) {
      setDurationInput(false);
      setSelectDateWindow(true);
    }
  }, [subjectInput, addressInput, durationInput]);

  const previousSection = useCallback(() => {
    if (addressInput) {
      setAddressInput(false);
      setSubjectInput(true);
    } else if (durationInput) {
      setDurationInput(false);
      setAddressInput(true);
    } else if (selectDateWindow) {
      setSelectDateWindow(false);
      setDurationInput(true);
    }
  }, [selectDateWindow, addressInput, durationInput]);

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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          {subjectInput && (
            <>
              <strong>Qual o assunto:</strong>
              <Input
                onChange={e => setSubject(e.target.value)}
                name="subject"
                type="text"
                placeholder="Assunto"
              />
              <button type="button" onClick={nextSection}>
                Próximo
              </button>
            </>
          )}
          {addressInput && (
            <>
              <p>Assunto: {subject}</p>
              <strong>Qual o endereço:</strong>
              <Input
                onChange={e => setAddress(e.target.value)}
                name="address"
                type="text"
                placeholder="Endereço"
              />
              <ButtonContainer>
                <button type="button" onClick={previousSection}>
                  Voltar
                </button>
                <button type="button" onClick={nextSection}>
                  Próximo
                </button>
              </ButtonContainer>
            </>
          )}
          {durationInput && (
            <>
              <p>Assunto: {subject}</p>
              <p>Endereço: {address}</p>
              <strong>Duração (minutos):</strong>
              <Input
                onChange={e => setDuration(Number(e.target.value))}
                name="duration_minutes"
                type="number"
              />
              <ButtonContainer>
                <button type="button" onClick={previousSection}>
                  Voltar
                </button>
                <button type="button" onClick={nextSection}>
                  Próximo
                </button>
              </ButtonContainer>
            </>
          )}
          {differenceInDays(today, selectedDate) < 0 && (
            <>
              <p>Assunto: {subject}</p>
              <p>Endereço: {address}</p>
              <p>Data: {formatDateToString(String(selectedDate))}</p>
              <p>Duração: {duration} minutos</p>

              <ButtonContainer>
                <button type="button" onClick={previousSection}>
                  Voltar
                </button>
                <button type="submit">Criar compromisso</button>
              </ButtonContainer>
            </>
          )}
        </Container>
      </Form>
      {selectDateWindow && (
        <SelectDate
          closeWindow={() => setSelectDateWindow(false)}
          selectDate={(e: Date) => setSelectedDate(e)}
        />
      )}
    </WindowUnFormattedContainer>
  );
};

export default CreateAppointmentForm;
