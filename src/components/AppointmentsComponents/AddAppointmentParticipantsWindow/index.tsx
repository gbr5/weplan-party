import React, { useCallback, useEffect, useState } from 'react';

import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';
import IUserDTO from '../../../dtos/IUserDTO';
import IFriendDTO from '../../../dtos/IFriendDTO';
import SelectFriendWindow from '../../SelectFriendWindow';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';

import { Container } from './styles';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

interface IFormData {
  subject: string;
  duration_minutes: number;
  address: string;
}

interface IProps {
  closeWindow: Function;
  getAppointments: Function;
  appointment: IAppointmentDTO;
}

const AddAppointmentParticipantsWindow: React.FC<IProps> = ({
  closeWindow,
  getAppointments,
  appointment,
}: IProps) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [appointmentParticipants, setAppointmentParticipants] = useState<
    IUserDTO[]
  >([]);
  const [alreadySelected, setAlreadySelected] = useState<IUserDTO[]>([]);
  const [participants, setParticipants] = useState(false);

  useEffect(() => {
    if (appointment.weplanGuestAppointments.length > 0) {
      const alreadySelectedUsers: IUserDTO[] = [];
      appointment.weplanGuestAppointments.map(xU => {
        alreadySelectedUsers.push(xU.guest);
        return '';
      });
      setAlreadySelected(alreadySelectedUsers);
    }
  }, [appointment]);

  const handleSubmit = useCallback(async () => {
    try {
      if (appointmentParticipants.length > 0) {
        await api.post('appointment/wp-participants', {
          appointment_id: appointment.id,
          host_id: user.id,
          guests: appointmentParticipants,
        });

        addToast({
          type: 'success',
          title: 'Compromisso criado com sucesso',
        });
        closeWindow();
        getAppointments();
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar compromisso',
        description: 'Tente novamente!',
      });
      throw new Error(err);
    }
  }, [
    addToast,
    closeWindow,
    user,
    appointment,
    appointmentParticipants,
    getAppointments,
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
        const xSelected = alreadySelected.filter(
          xSelect => xSelect.id !== e.friend.id,
        );
        setAlreadySelected(xSelected);
        setAppointmentParticipants(xParticipants);
        setParticipants(false);
      } else {
        const xParticipants = appointmentParticipants;
        xParticipants.push(e.friend);
        setAppointmentParticipants(xParticipants);
        setAlreadySelected([...alreadySelected, e.friend]);
        setParticipants(false);
      }
    },
    [appointmentParticipants, alreadySelected],
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
      <Container>
        <p>Participantes do compromisso</p>
        {alreadySelected.length > 0 ? (
          alreadySelected.map(xParticipant => {
            return <p key={xParticipant.id}>{xParticipant.name}</p>;
          })
        ) : (
          <p>Este compromisso ainda não tem participantes</p>
        )}
        <strong>Participantes selecionados:</strong>
        {appointmentParticipants.map(participant => {
          return <p key={participant.id}>{participant.name}</p>;
        })}
        <button type="button" onClick={() => setParticipants(true)}>
          Adicionar participantes
        </button>
        {appointmentParticipants.length > 0 && (
          <button type="button" onClick={handleSubmit}>
            Salvar
          </button>
        )}
      </Container>
      {participants && (
        <SelectFriendWindow
          alreadySelected={alreadySelected}
          onHandleCloseWindow={() => setParticipants(false)}
          handleSelectedFriend={(e: IFriendDTO) => handleSelectedFriend(e)}
        />
      )}
    </WindowUnFormattedContainer>
  );
};

export default AddAppointmentParticipantsWindow;
