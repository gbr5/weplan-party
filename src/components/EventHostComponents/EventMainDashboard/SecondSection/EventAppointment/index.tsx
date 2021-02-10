import React from 'react';
import IEventAppointmentDTO from '../../../../../dtos/IEventAppointmentDTO';
import formatDateToString from '../../../../../utils/formatDateToString';
import ListSection from '../ListSection';
import Row from '../ListSection/Row';

import { Container } from './styles';

interface IProps {
  eventAppointments: IEventAppointmentDTO[];
}

const EventAppointment: React.FC<IProps> = ({ eventAppointments }: IProps) => {
  return (
    <ListSection>
      {!!eventAppointments &&
        eventAppointments.map(xAppointment => {
          const { appointment } = xAppointment;
          return (
            <Row key={xAppointment.id}>
              <Container>
                <p>{appointment.subject}</p>
                <p>{formatDateToString(String(appointment.date))}</p>
              </Container>
              <p>{appointment.duration_minutes} minutos</p>
              <p>Endereço: {appointment.address}</p>
            </Row>
          );
        })}
    </ListSection>
  );
};

export default EventAppointment;
