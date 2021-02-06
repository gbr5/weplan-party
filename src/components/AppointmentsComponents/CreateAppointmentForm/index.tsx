import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../Input';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, ButtonContainer } from './styles';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import SelectDate from '../../UserComponents/SelectDate';
import formatDateToString from '../../../utils/formatDateToString';
import IUserDTO from '../../../dtos/IUserDTO';
import IFriendDTO from '../../../dtos/IFriendDTO';
import SelectFriendWindow from '../../SelectFriendWindow';

interface IFormData {
  subject: string;
  duration_minutes: number;
  address: string;
}

interface IProps {
  closeWindow: Function;
  getAppointments: Function;
}

const CreateAppointmentForm: React.FC<IProps> = ({
  closeWindow,
  getAppointments,
}: IProps) => {
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
  const [appointmentParticipants, setAppointmentParticipants] = useState<
    IUserDTO[]
  >([]);
  const [participants, setParticipants] = useState(false);
  const [finalSection, setFinalSection] = useState(false);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        if (appointmentParticipants.length > 0) {
          await api.post('appointments/weplan-guests', {
            subject,
            address,
            date: selectedDate,
            duration_minutes: duration,
            appointment_type: 'Personal',
            guests: appointmentParticipants,
          });
        } else {
          await api.post('appointments', {
            subject,
            address,
            date: selectedDate,
            duration_minutes: duration,
            weplanGuest: false,
            guest: false,
            appointment_type: 'Personal',
          });
        }
        setSelectedDate(new Date());
        addToast({
          type: 'success',
          title: 'Compromisso criado com sucesso',
        });
        closeWindow();
        getAppointments();
        console.log(!data.duration_minutes);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar compromisso',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      closeWindow,
      selectedDate,
      subject,
      duration,
      address,
      appointmentParticipants,
      getAppointments,
    ],
  );

  const nextSection = useCallback(() => {
    if (subjectInput) {
      setSubjectInput(false);
      setAddressInput(true);
    } else if (addressInput) {
      setAddressInput(false);
      setSelectDateWindow(true);
    } else if (selectDateWindow) {
      setSelectDateWindow(false);
      setDurationInput(true);
    } else if (durationInput) {
      setDurationInput(false);
      setParticipants(true);
    } else if (participants) {
      setParticipants(false);
      setFinalSection(true);
    }
  }, [
    subjectInput,
    addressInput,
    selectDateWindow,
    durationInput,
    participants,
  ]);

  const previousSection = useCallback(() => {
    if (addressInput) {
      setAddressInput(false);
      setSubjectInput(true);
    } else if (selectDateWindow) {
      setSelectDateWindow(false);
      setAddressInput(true);
    } else if (durationInput) {
      setDurationInput(false);
      setSelectDateWindow(true);
    } else if (participants) {
      setParticipants(false);
      setDurationInput(true);
    } else if (finalSection) {
      setFinalSection(false);
      setParticipants(true);
    }
  }, [
    selectDateWindow,
    addressInput,
    durationInput,
    participants,
    finalSection,
  ]);

  const handleSelectedFriend = useCallback(
    (e: IFriendDTO) => {
      if (
        appointmentParticipants.find(
          participant => participant.id === e.friend.id,
        )
      ) {
        const xParticipants = appointmentParticipants.filter(
          xParticipant => xParticipant.id !== e.friend.id,
        );
        setAppointmentParticipants(xParticipants);
        nextSection();
      } else {
        const xParticipants = appointmentParticipants;
        xParticipants.push(e.friend);
        setAppointmentParticipants(xParticipants);
        nextSection();
      }
    },
    [appointmentParticipants, nextSection],
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

              <p>Data: {formatDateToString(String(selectedDate))}</p>
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
          {participants && (
            <SelectFriendWindow
              onHandleCloseWindow={() => nextSection()}
              handleSelectedFriend={(e: IFriendDTO) => handleSelectedFriend(e)}
            />
          )}
          {finalSection && (
            <>
              <p>Assunto: {subject}</p>
              <p>Endereço: {address}</p>
              <p>Data: {formatDateToString(String(selectedDate))}</p>
              <p>Duração: {duration} minutos</p>
              {appointmentParticipants.length > 0 && (
                <div>
                  <p>Participantes:</p>
                  {appointmentParticipants.map(participant => {
                    return <p key={participant.id}>{participant.name}</p>;
                  })}
                </div>
              )}
              <button type="button" onClick={() => setParticipants(true)}>
                Adicionar participantes
              </button>

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
          closeWindow={() => nextSection()}
          selectDate={(e: Date) => setSelectedDate(e)}
        />
      )}
    </WindowUnFormattedContainer>
  );
};

export default CreateAppointmentForm;
