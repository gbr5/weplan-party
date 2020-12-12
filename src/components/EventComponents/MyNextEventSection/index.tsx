import { differenceInDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import IShowEventDTO from '../../../dtos/IShowEventDTO';
import formatStringToDate from '../../../utils/formatDateToString';
import { Container, Fields, MyNextEventTitle, Section } from './styles';

interface IProps {
  handleMyEventDashboard: Function;
  nextEvent: IShowEventDTO;
}

const MyNextEventSection: React.FC<IProps> = ({
  handleMyEventDashboard,
  nextEvent,
}: IProps) => {
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [totalNumberOfGuests, setTotalNumberOfGuests] = useState(0);
  const [checkListTasks, setCheckListTasks] = useState(0);
  const [checkListResolvedTasks, setCheckListResolvedTasks] = useState(0);
  const [eventCostPercentage, setEventCostPercentage] = useState(0);
  const [daysToDate, setDaysToDate] = useState(0);

  useEffect(() => {
    if (nextEvent.event) {
      const today = new Date();
      const eventDate = new Date(nextEvent.event.date);
      setDaysToDate(differenceInDays(eventDate, today));

      setConfirmedGuests(
        nextEvent.guests.filter(guest => guest.confirmed).length,
      );
      setTotalNumberOfGuests(nextEvent.guests.length);

      const hiredSuppliers = nextEvent.suppliers.filter(
        supplier => supplier.isHired,
      );
      const cost = hiredSuppliers
        .map(supplier => {
          const totalCost = supplier.transactionAgreements
            .map(agreement => Number(agreement.amount))
            .reduce((a, b) => a + b, 0);
          return totalCost;
        })
        .reduce((a, b) => a + b, 0);
      nextEvent.event.eventInfo &&
        setEventCostPercentage(cost / Number(nextEvent.event.eventInfo.budget));
      setCheckListResolvedTasks(
        nextEvent.checkLists.filter(task => task.status === 3).length,
      );
      setCheckListTasks(nextEvent.checkLists.length);
    }
  }, [nextEvent]);

  return (
    <Container>
      {nextEvent.event ? (
        <button
          type="button"
          onClick={() => handleMyEventDashboard(nextEvent.event)}
        >
          <MyNextEventTitle>
            <strong>Meu próximo evento:</strong>
            <h2>{nextEvent.event.name}</h2>
            <span>{formatStringToDate(String(nextEvent.event.date))}</span>
          </MyNextEventTitle>

          <Section>
            <Fields>
              <img
                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </Fields>

            <Fields>
              <p>Convidados:</p>
              <h2>
                {confirmedGuests}/{totalNumberOfGuests}
              </h2>
            </Fields>

            <Fields>
              <p>Check-list:</p>
              <h2>
                {checkListResolvedTasks}/{checkListTasks}
              </h2>
            </Fields>

            <Fields>
              <p>Orçamento:</p>
              <h2>{eventCostPercentage}%</h2>
            </Fields>
            <Fields>
              <p>Faltam</p>
              <h2>{daysToDate} dias</h2>
            </Fields>
          </Section>
        </button>
      ) : (
        <>
          <strong>Meu próximo evento:</strong>
          <h2>Você não tem nenhum evento futuro.</h2>
          <span>-</span>
        </>
      )}
    </Container>
  );
};

export default MyNextEventSection;
