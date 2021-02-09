import React, { useCallback, useState } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { MdPersonAdd } from 'react-icons/md';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import formatDateToString from '../../../utils/formatDateToString';
import SelectDate from '../../UserComponents/SelectDate';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import AddAppointmentFilesWindow from '../AddAppointmentFilesWindow';
import AddAppointmentParticipantsWindow from '../AddAppointmentParticipantsWindow';

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

  const getAppointment = useCallback(() => {
    try {
      api
        .get<IAppointmentDTO>(`appointments/show/${appointment.id}`)
        .then(response => {
          setUpdatedAppointment(response.data);
        });
      getAppointments();
      addToast({
        type: 'success',
        title: 'Compromisso atualizado!',
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [appointment, addToast, getAppointments]);

  const handleSelectedDate = useCallback(
    async (e: Date) => {
      try {
        await api.post(`appointments/${updatedAppointment.id}`, {
          ...updatedAppointment,
          date: e,
        });
        addToast({
          type: 'info',
          title: 'Atualização enviada',
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
      <Container>
        <h1>Compromisso</h1>
        <span>
          <h3>Assunto: {updatedAppointment.subject}</h3>
        </span>
        <span>
          <p>Data: {formatDateToString(String(updatedAppointment.date))}</p>
          <AddButton type="button" />
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
            return <p>{participant.guest.name}</p>;
          })}
        </Section>
        <Section>
          <AddButton type="button" onClick={() => setAddAppointmentFile(true)}>
            <FiFilePlus />
          </AddButton>
          <h3>Arquivos</h3>
          {updatedAppointment.appointmentFiles.map(file => {
            return <a href={file.file.file_url}>{file.file.file_name}</a>;
          })}
        </Section>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default AppointmentWindow;
