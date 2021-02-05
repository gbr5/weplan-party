import React from 'react';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';
import dateToFormattedDate from '../../../utils/dateToFormattedDate';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, Section } from './styles';

interface IProps {
  appointment: IAppointmentDTO;
  closeWindow: Function;
}

const AppointmentWindow: React.FC<IProps> = ({
  appointment,
  closeWindow,
}: IProps) => {
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
      <Container>
        <h3>{appointment.subject}</h3>
        <p>{dateToFormattedDate(String(appointment.date))}</p>
        <p>{appointment.address}</p>
        <Section>
          <h3>Participantes</h3>
          {appointment.weplanGuestAppointments.map(participant => {
            return <p>{participant.guest.name}</p>;
          })}
        </Section>
        <Section>
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
