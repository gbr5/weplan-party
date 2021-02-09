import React, { useCallback, useState } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { MdEdit, MdPersonAdd } from 'react-icons/md';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import formatDateToString from '../../../utils/formatDateToString';
import SelectDate from '../../UserComponents/SelectDate';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import AddAppointmentFilesWindow from '../AddAppointmentFilesWindow';
import AddAppointmentParticipantsWindow from '../AddAppointmentParticipantsWindow';
import EditAppointmentDuration from '../EditAppointmentDuration';

import { Container, Section, AddButton } from './styles';

interface IProps {
  appointment: IAppointmentDTO;
  closeWindow: Function;
  getAppointments: Function;
}

const AppointmentWindow: React.FC<IProps> = ({
  appointment,
  closeWindow,
  getAppointments,
}: IProps) => {
  const { addToast } = useToast();
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);
  const [addAppointmentParticipant, setAddAppointmentParticipant] = useState(
    false,
  );
  const [addAppointmentFile, setAddAppointmentFile] = useState(false);
  const [editAppointmentDate, setEditAppointmentDate] = useState(false);
  const [editAppointmentDuration, setEditAppointmentDuration] = useState(false);

  const getAppointment = useCallback(() => {
    try {
      api
        .get<IAppointmentDTO>(`appointments/show/${appointment.id}`)
        .then(response => {
          setUpdatedAppointment(response.data);
        });
      getAppointments();
    } catch (err) {
      throw new Error(err);
    }
  }, [appointment, getAppointments]);

  const handleSelectedDate = useCallback(
    async (e: Date) => {
      try {
        await api.put(`appointments/${updatedAppointment.id}`, {
          subject: updatedAppointment.subject,
          date: e,
          duration_minutes: updatedAppointment.duration_minutes,
          address: updatedAppointment.address,
          appointment_type: updatedAppointment.appointment_type,
          weplanGuest: updatedAppointment.weplanGuest,
          guest: updatedAppointment.guest,
        });
        addToast({
          type: 'success',
          title: 'Compromisso atualizado com sucesso',
        });
        getAppointment();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar data do compromisso',
          description: 'Ocorreu um erro, tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, updatedAppointment, getAppointment],
  );
  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 10,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      {editAppointmentDate && (
        <SelectDate
          selectDate={(e: Date) => handleSelectedDate(e)}
          closeWindow={() => setEditAppointmentDate(false)}
        />
      )}
      {addAppointmentParticipant && (
        <AddAppointmentParticipantsWindow
          appointment={appointment}
          getAppointments={getAppointment}
          closeWindow={() => setAddAppointmentParticipant(false)}
        />
      )}
      {addAppointmentFile && (
        <AddAppointmentFilesWindow
          appointment={appointment}
          getAppointments={getAppointment}
          closeWindow={() => setAddAppointmentFile(false)}
        />
      )}
      {editAppointmentDuration && (
        <EditAppointmentDuration
          appointment={appointment}
          getAppointment={getAppointment}
          closeWindow={() => setEditAppointmentDuration(false)}
        />
      )}
      <Container>
        <h1>Compromisso</h1>
        <span>
          <h3>Assunto: {updatedAppointment.subject}</h3>
        </span>
        <span>
          <p>Data: {formatDateToString(String(updatedAppointment.date))}</p>
          <AddButton type="button" onClick={() => setEditAppointmentDate(true)}>
            <MdEdit />
          </AddButton>
        </span>
        <span>
          <p>Duração: {updatedAppointment.duration_minutes} minutos</p>
          <AddButton
            type="button"
            onClick={() => setEditAppointmentDuration(true)}
          >
            <MdEdit />
          </AddButton>
        </span>
        <span>
          <p>Endereço: {updatedAppointment.address}</p>
        </span>
        <Section>
          <AddButton
            type="button"
            onClick={() => setAddAppointmentParticipant(true)}
          >
            <MdPersonAdd />
          </AddButton>
          <h3>Participantes</h3>
          {updatedAppointment.weplanGuestAppointments.map(participant => {
            return <p key={participant.id}>{participant.guest.name}</p>;
          })}
        </Section>
        <Section>
          <AddButton type="button" onClick={() => setAddAppointmentFile(true)}>
            <FiFilePlus />
          </AddButton>
          <h3>Arquivos</h3>
          {updatedAppointment.appointmentFiles.map(file => {
            return (
              <a key={file.id} href={file.file.file_url}>
                {file.file.file_name}
              </a>
            );
          })}
        </Section>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default AppointmentWindow;
