import React, { ReactElement, useCallback, useState } from 'react';
import IAppointmentDTO from '../../../../../dtos/IAppointmentDTO';
import IEventAppointmentDTO from '../../../../../dtos/IEventAppointmentDTO';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useToast } from '../../../../../hooks/toast';
import api from '../../../../../services/api';
import AddAppointmentReminderWindow from '../../../../AppointmentsComponents/AddAppointmentReminderWindow';
import { CreateEventAppointment } from '../../../../AppointmentsComponents/CreateEventAppointment';
import AddButton from '../../../../UserComponents/AddButton';
import EventAppointment from '../EventAppointment';

import { Container } from './styles';

export function EventAppointmentSection(): ReactElement {
  const { addToast } = useToast();
  const { selectedEvent } = useEventVariables();

  const [eventAppointments, setEventAppointments] = useState<
    IEventAppointmentDTO[]
  >([]);
  const [selectedAppointment, setSelectedAppointment] = useState(
    {} as IAppointmentDTO,
  );
  const [appointmentReminderWindow, setAppointmentReminderWindow] = useState(
    false,
  );
  const [createAppointmentWindow, setCreateAppointmentWindow] = useState(false);

  async function getEventAppointments(): Promise<void> {
    try {
      await api
        .get(`appointments/event-appointments/${selectedEvent.id}`)
        .then(response => {
          setEventAppointments(response.data);
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro de Importação.',
      });
      throw new Error(err);
    }
  }

  const addReminder = useCallback((e: IAppointmentDTO) => {
    setSelectedAppointment(e);
    setAppointmentReminderWindow(true);
  }, []);

  return (
    <Container>
      {createAppointmentWindow && (
        <CreateEventAppointment
          addReminder={(e: IAppointmentDTO) => addReminder(e)}
          closeWindow={() => setCreateAppointmentWindow(false)}
          getAppointments={getEventAppointments}
        />
      )}
      {appointmentReminderWindow && (
        <AddAppointmentReminderWindow
          closeWindow={() => setAppointmentReminderWindow(false)}
          getAppointments={getEventAppointments}
          appointment={selectedAppointment}
        />
      )}
      <AddButton onClick={() => setCreateAppointmentWindow(true)} />
      <h1>Compromissos</h1>
      {eventAppointments.length > 0 && (
        <EventAppointment eventAppointments={eventAppointments} />
      )}
    </Container>
  );
}

export default EventAppointmentSection;
