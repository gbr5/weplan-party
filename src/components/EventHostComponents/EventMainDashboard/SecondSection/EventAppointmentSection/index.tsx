import React, { useCallback, useEffect, useState } from 'react';
import IEventAppointmentDTO from '../../../../../dtos/IEventAppointmentDTO';
import { useToast } from '../../../../../hooks/toast';
import api from '../../../../../services/api';
import CreateEventAppointment from '../../../../AppointmentsComponents/CreateEventAppointment';
import AddButton from '../../../../UserComponents/AddButton';
import EventAppointment from '../EventAppointment';

import { Container } from './styles';

interface IProps {
  eventId: string;
}

const EventAppointmentSection: React.FC<IProps> = ({ eventId }: IProps) => {
  const { addToast } = useToast();
  const [eventAppointments, setEventAppointments] = useState<
    IEventAppointmentDTO[]
  >([]);
  const [createAppointmentWindow, setCreateAppointmentWindow] = useState(false);

  const getEventAppointments = useCallback(() => {
    try {
      api.get(`appointments/event-appointments/${eventId}`).then(response => {
        setEventAppointments(response.data);
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro de Importação.',
      });
      throw new Error(err);
    }
  }, [eventId, addToast]);

  useEffect(() => {
    getEventAppointments();
  }, [getEventAppointments]);

  return (
    <Container>
      {createAppointmentWindow && (
        <CreateEventAppointment
          eventId={eventId}
          closeWindow={() => setCreateAppointmentWindow(false)}
          getAppointments={getEventAppointments}
        />
      )}
      <AddButton onClick={() => setCreateAppointmentWindow(true)} />
      <h1>Compromissos</h1>
      {eventAppointments.length > 0 && (
        <EventAppointment eventAppointments={eventAppointments} />
      )}
    </Container>
  );
};

export default EventAppointmentSection;
