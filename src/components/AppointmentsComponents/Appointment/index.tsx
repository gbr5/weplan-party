import React, { memo } from 'react';
import { MdAttachFile, MdGroup, MdInfo } from 'react-icons/md';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';
import dateToFormattedDate from '../../../utils/dateToFormattedDate';

import { Container, TitleButton, AppointmentInfoButton } from './styles';

interface IProps {
  appointment: IAppointmentDTO;
  isActive: boolean;
  index: number;
  selectAppointment: Function;
  openAppointment: Function;
}

const Appointment: React.FC<IProps> = ({
  appointment,
  index,
  isActive,
  openAppointment,
  selectAppointment,
}: IProps) => {
  return (
    <Container isActive={isActive}>
      <p>{index}</p>
      <TitleButton type="button" onClick={() => selectAppointment()}>
        <strong>{appointment.subject}</strong>
        <p>{dateToFormattedDate(String(appointment.date))}</p>
      </TitleButton>
      <AppointmentInfoButton type="button" onClick={() => openAppointment()}>
        {appointment.weplanGuestAppointments.length > 0 && (
          <MdGroup size={16} />
        )}
        {appointment.appointmentFiles.length > 0 && <MdAttachFile size={16} />}
        <MdInfo size={16} />
      </AppointmentInfoButton>
    </Container>
  );
};

export default memo(Appointment);
