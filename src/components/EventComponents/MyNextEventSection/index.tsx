import { differenceInDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import formatStringToDate from '../../../utils/formatDateToString';
import { Container, Fields, MyNextEventTitle, Section } from './styles';
import placeholder from '../../../assets/WePlanLogo.svg';
import { useEvent } from '../../../hooks/event';

interface IProps {
  handleMyEventDashboard: Function;
}

const MyNextEventSection: React.FC<IProps> = ({
  handleMyEventDashboard,
}: IProps) => {
  const { nextEvent, getNextEvent } = useEvent();
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [totalNumberOfGuests, setTotalNumberOfGuests] = useState(0);
  const [checkListTasks, setCheckListTasks] = useState(0);
  const [checkListResolvedTasks, setCheckListResolvedTasks] = useState(0);
  const [eventCostPercentage, setEventCostPercentage] = useState(0);
  const [daysToDate, setDaysToDate] = useState(0);

  useEffect(() => {
    getNextEvent();
  }, [getNextEvent]);

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
        setEventCostPercentage(
          Math.round(cost / Number(nextEvent.event.eventInfo.budget)),
        );
      setCheckListResolvedTasks(
        nextEvent.checkLists.filter(task => task.status === 3).length,
      );
      setCheckListTasks(nextEvent.checkLists.length);
    }
  }, [nextEvent]);

  const avatar =
    nextEvent.event_avatar_url && nextEvent.event_avatar_url !== 'n/a'
      ? nextEvent.event_avatar_url
      : placeholder;

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
              <img src={avatar} alt="WePlan" />
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
