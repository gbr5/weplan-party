import React, { useState } from 'react';
import { MdArrowForward } from 'react-icons/md';
import DashboardCalendar from '../../components/CalendarDashboard';
import PageHeader from '../../components/PageHeader';
import dateToFormattedDate from '../../utils/dateToFormattedDate';
import { Container, Body, Section, FirstSection, Appointments } from './styles';

const CalendarPage: React.FC = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  return (
    <Container>
      <PageHeader updateMyEvents={() => setSelectedDate(today)} />
      <Body>
        <h1>Compromissos</h1>
        <FirstSection>
          <DashboardCalendar handleSetDate={(e: Date) => setSelectedDate(e)} />
          <Appointments>
            <h3>{dateToFormattedDate(String(selectedDate))}</h3>
          </Appointments>
        </FirstSection>
        <MdArrowForward />
        <Section>
          <Appointments>
            <h3>Próximos compromissos</h3>
          </Appointments>
          <Appointments>
            <h3>Compromissos do mês</h3>
          </Appointments>
        </Section>
        <MdArrowForward />
      </Body>
    </Container>
  );
};

export default CalendarPage;
