import React, { useState } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { MdPersonAdd } from 'react-icons/md';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';
import formatDateToString from '../../../utils/formatDateToString';
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
  const [addAppointmentParticipant, setAddAppointmentParticipant] = useState(
    false,
  );
  const [addAppointmentFile, setAddAppointmentFile] = useState(false);
  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      {addAppointmentParticipant && (
        <AddAppointmentParticipantsWindow
          appointment={appointment}
          getAppointments={getAppointments}
          closeWindow={() => setAddAppointmentParticipant(false)}
        />
      )}
      {addAppointmentFile && (
        <AddAppointmentFilesWindow
          appointment={appointment}
          getAppointments={getAppointments}
          closeWindow={() => setAddAppointmentFile(false)}
        />
      )}
      <Container>
        <h3>Assunto: {appointment.subject}</h3>
        <p>Data: {formatDateToString(String(appointment.date))}</p>
        <p>Endereço: {appointment.address}</p>
        <Section>
          <AddButton
            type="button"
            onClick={() => setAddAppointmentParticipant(true)}
          >
            <MdPersonAdd />
          </AddButton>
          <h3>Participantes</h3>
          {appointment.weplanGuestAppointments.map(participant => {
            return <p>{participant.guest.name}</p>;
          })}
        </Section>
        <Section>
          <AddButton type="button" onClick={() => setAddAppointmentFile(true)}>
            <FiFilePlus />
          </AddButton>
          <h3>Arquivos</h3>
          {appointment.appointmentFiles.map(file => {
            return <a href={file.file.file_url}>{file.file.file_name}</a>;
          })}
        </Section>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default AppointmentWindow;
