import React, { useCallback, useEffect, useState } from 'react';
import { MdAddAlert, MdArrowForward } from 'react-icons/md';
import Appointment from '../../components/AppointmentsComponents/Appointment';
import AppointmentWindow from '../../components/AppointmentsComponents/AppointmentWindow';
import DashboardCalendar from '../../components/CalendarDashboard';
import CreateAppointmentForm from '../../components/AppointmentsComponents/CreateAppointmentForm';
import PageHeader from '../../components/PageHeader';
import IAppointmentDTO from '../../dtos/IAppointmentDTO';
import api from '../../services/api';
import dateToFormattedDate from '../../utils/dateToFormattedDate';
import {
  Container,
  ArrowContainer,
  Body,
  Section,
  FirstSection,
  Appointments,
  AddAppointmentButton,
} from './styles';

const CalendarPage: React.FC = () => {
  const today = new Date();
  const [appointmentWindow, setAppointmentWindow] = useState(false);
  const [createAppointmentForm, setCreateAppointmentForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedAppointment, setSelectedAppointment] = useState(
    {} as IAppointmentDTO,
  );
  const [dayAppointments, setDayAppointments] = useState<IAppointmentDTO[]>([]);
  const [monthAppointments, setMonthAppointments] = useState<IAppointmentDTO[]>(
    [],
  );
  const [nextAppointments, setNextAppointments] = useState<IAppointmentDTO[]>(
    [],
  );

  const getTodayAppointments = useCallback(() => {
    try {
      const xtoday = new Date();

      api
        .get<IAppointmentDTO[]>(
          `user-appointments/by-month?month=${xtoday.getMonth()}&year=${xtoday.getFullYear()}`,
        )
        .then(response => {
          setNextAppointments(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getTodayAppointments();
  }, [getTodayAppointments]);

  const getSelectedDateAppointments = useCallback(() => {
    try {
      api
        .get<IAppointmentDTO[]>(
          `user-appointments/by-month?month=${
            selectedDate.getMonth() + 1
          }&year=${selectedDate.getFullYear()}`,
        )
        .then(response => {
          setMonthAppointments(response.data);
        });
      api
        .get<IAppointmentDTO[]>(
          `user-appointments/by-date?day=${selectedDate.getDate()}&month=${
            selectedDate.getMonth() + 1
          }&year=${selectedDate.getFullYear()}`,
        )
        .then(response => {
          setDayAppointments(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedDate]);

  useEffect(() => {
    getSelectedDateAppointments();
  }, [getSelectedDateAppointments]);

  const handleOpenAppointmentWindow = useCallback((e: IAppointmentDTO) => {
    setSelectedAppointment(e);
    setAppointmentWindow(true);
  }, []);

  return (
    <Container>
      {appointmentWindow && (
        <AppointmentWindow
          appointment={selectedAppointment}
          closeWindow={() => setAppointmentWindow(false)}
        />
      )}
      {createAppointmentForm && (
        <CreateAppointmentForm
          getAppointments={getSelectedDateAppointments}
          closeWindow={() => setCreateAppointmentForm(false)}
        />
      )}
      <PageHeader updateMyEvents={() => setSelectedDate(today)} />
      <Body>
        <AddAppointmentButton
          type="button"
          onClick={() => setCreateAppointmentForm(true)}
        >
          <MdAddAlert size={32} />
        </AddAppointmentButton>
        <h1>Compromissos</h1>
        <FirstSection>
          <DashboardCalendar handleSetDate={(e: Date) => setSelectedDate(e)} />
          <Appointments>
            <h3>{dateToFormattedDate(String(selectedDate))}</h3>
            {dayAppointments.map(appointment => {
              const isActive = selectedAppointment.id === appointment.id;
              return (
                <Appointment
                  openAppointment={() =>
                    handleOpenAppointmentWindow(appointment)
                  }
                  selectAppointment={() => setSelectedAppointment(appointment)}
                  isActive={isActive}
                  key={appointment.id}
                  appointment={appointment}
                  index={dayAppointments.indexOf(appointment) + 1}
                />
              );
            })}
          </Appointments>
        </FirstSection>
        <ArrowContainer>
          <MdArrowForward />
        </ArrowContainer>
        <Section>
          <Appointments>
            <h3>Próximos compromissos</h3>
            {nextAppointments.map(appointment => {
              const isActive = selectedAppointment.id === appointment.id;
              return (
                <Appointment
                  openAppointment={() =>
                    handleOpenAppointmentWindow(appointment)
                  }
                  selectAppointment={() => setSelectedAppointment(appointment)}
                  isActive={isActive}
                  key={appointment.id}
                  appointment={appointment}
                  index={nextAppointments.indexOf(appointment) + 1}
                />
              );
            })}
          </Appointments>
          <Appointments>
            <h3>Compromissos do mês</h3>
            {monthAppointments.map(appointment => {
              const isActive = selectedAppointment.id === appointment.id;
              return (
                <Appointment
                  openAppointment={() =>
                    handleOpenAppointmentWindow(appointment)
                  }
                  selectAppointment={() => setSelectedAppointment(appointment)}
                  isActive={isActive}
                  key={appointment.id}
                  appointment={appointment}
                  index={monthAppointments.indexOf(appointment) + 1}
                />
              );
            })}
          </Appointments>
        </Section>
        <ArrowContainer>
          <MdArrowForward />
        </ArrowContainer>
      </Body>
    </Container>
  );
};

export default CalendarPage;