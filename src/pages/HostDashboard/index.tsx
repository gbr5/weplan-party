import React, { useState, useEffect, useCallback } from 'react';

import 'react-day-picker/lib/style.css';

import {
  FiClock,
  FiChevronRight,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { isAfter } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns/esm';
import {
  Container,
  Content,
  NextEvent,
  SubHeader,
  FirstRow,
  BottomPage,
  LatestNews,
  Payments,
  MyNextEvent,
  MyEvents,
  MyNextEventTitle,
  Section,
  Fields,
  MyEventsDrawer,
  MyEventsDrawerButton,
  MiddlePage,
} from './styles';

import PageHeader from '../../components/PageHeader';
import MenuButton from '../../components/MenuButton';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface IMonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface IEvent {
  id: string;
  name: string;
  date: string;
  daysTillDate: number;
}

interface IEventCheckList {
  id: string;
  checked: boolean;
}

interface IEventGuest {
  id: string;
  confirmed: boolean;
}

const Dashboard: React.FC = () => {
  const [myEvents, setMyEvents] = useState<IEvent[]>([]);
  const [myEventsDrawer, setMyEventsDrawer] = useState(false);
  const [myNextEvent, setMyNextEvent] = useState<IEvent>({} as IEvent);
  const [myNextEventCheckList, setMyNextEventCheckList] = useState<
    IEventCheckList[]
  >([]);
  const [resolvedCheckList, setResolvedCheckList] = useState<IEventCheckList[]>(
    [],
  );
  const [myNextEventGuests, setMyNextEventGuests] = useState<IEventGuest[]>([]);
  const [confirmedGuests, setConfirmedGuests] = useState<IEventGuest[]>([]);
  const [eventId, setEventId] = useState<string>();

  const history = useHistory();

  const handleMyEventDashboard = useCallback(
    (event: IEvent) => {
      history.push('/dashboard/my-event', { params: event });
    },
    [history],
  );

  const getMyEvents = useCallback(() => {
    try {
      api.get<IEvent[]>('/events').then(response => {
        setMyEvents(response.data);
      });

      const nextEvent = myEvents.find(myEvent => {
        return isAfter(new Date(myEvent.date), new Date());
      });

      if (nextEvent) {
        const date = new Date(nextEvent.date);
        const year = date.getFullYear();
        const month =
          date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const hour =
          date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minute =
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        setMyNextEvent({
          id: nextEvent?.id,
          name: nextEvent?.name,
          date: `${hour}:${minute} - ${day}/${month}/${year}`,
          daysTillDate: differenceInCalendarDays(date, new Date()),
        });
      }
      setEventId(myNextEvent.id);
    } catch (err) {
      throw Error(err);
    }
  }, [myEvents, myNextEvent.id]);

  const getMyNextEventCheList = useCallback(() => {
    try {
      api
        .get<IEventCheckList[]>(`/events/${eventId}/check-list`)
        .then(response => {
          setMyNextEventCheckList(response.data);
        });
      setResolvedCheckList(
        myNextEventCheckList.filter(checkList => checkList.checked === true),
      );
    } catch (err) {
      throw new Error('host dashboard, rota checklist para o backend');
    }
  }, [eventId, myNextEventCheckList]);

  const getMyNextEventGuests = useCallback(() => {
    try {
      api.get<IEventGuest[]>(`/events/${eventId}/guests`).then(response => {
        setMyNextEventGuests(response.data);
      });
      setConfirmedGuests(
        myNextEventGuests.filter(guest => guest.confirmed === true),
      );
    } catch (err) {
      throw new Error('host dashboard, rota guests para o backend');
    }
  }, [eventId, myNextEventGuests]);

  useEffect(() => {
    getMyNextEventGuests();
  }, [getMyNextEventGuests]);

  useEffect(() => {
    getMyNextEventCheList();
  }, [getMyNextEventCheList]);

  useEffect(() => {
    getMyEvents();
  }, [getMyEvents]);

  const handleMyEventsDrawer = useCallback(() => {
    setMyEventsDrawer(!myEventsDrawer);
  }, [myEventsDrawer]);

  return (
    <Container>
      <MenuButton />

      <PageHeader />
      <Content>
        <SubHeader>
          <MyEvents>
            <MyEventsDrawerButton type="button" onClick={handleMyEventsDrawer}>
              <h1>Meus Eventos</h1>
            </MyEventsDrawerButton>
            {myEventsDrawer && (
              <MyEventsDrawer>
                {myEvents.map(event => (
                  <button
                    type="button"
                    onClick={() => handleMyEventDashboard(event)}
                    key={event.id}
                  >
                    {event.name}
                    <FiChevronRight size={24} />
                  </button>
                ))}
              </MyEventsDrawer>
            )}
            {myEventsDrawer ? (
              <FiChevronUp size={30} />
            ) : (
              <FiChevronDown size={30} />
            )}
          </MyEvents>
          <h1>Próximo Evento</h1>

          <NextEvent>
            <FirstRow>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <strong>Pedrinho Magalhães 6 anos</strong>
              </div>
              <span>
                <FiClock />
                17/10/2020 - 14:00
              </span>
              <FiChevronRight size={24} />
            </FirstRow>
          </NextEvent>
        </SubHeader>
        <MiddlePage>
          <MyNextEvent>
            {myNextEvent ? (
              <button
                type="button"
                onClick={() => handleMyEventDashboard(myNextEvent)}
              >
                <MyNextEventTitle>
                  <strong>Meu próximo evento:</strong>
                  <h2>{myNextEvent?.name}</h2>
                  <span>{myNextEvent.date}</span>
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
                      {confirmedGuests !== [] ? confirmedGuests.length : '0'}/
                      {myNextEventGuests.length}
                    </h2>
                  </Fields>

                  <Fields>
                    <p>Check-list:</p>
                    <h2>
                      {resolvedCheckList !== []
                        ? resolvedCheckList.length
                        : '0'}
                      /{myNextEventCheckList.length}
                    </h2>
                  </Fields>

                  <Fields>
                    <p>Orçamento:</p>
                    <h2>63%</h2>
                  </Fields>
                  <Fields>
                    <p>Faltam</p>
                    <h2>{myNextEvent.daysTillDate} dias</h2>
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
          </MyNextEvent>

          <BottomPage>
            <LatestNews>
              <strong>Últimas Atualizações</strong>
              <ul>
                <li>
                  <h3>Mensagem |</h3>
                  <span>Sérgio Cerimonial:</span>
                  <p>Degustação no Rullus amanhã às 8hr! Quer ca ...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Mensagem |</h3>
                  <span>Maria Doces:</span>
                  <p>Bom dia Antônio, segue anexo orçamento. Ficamos ...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Solicitação de agendamento |</h3>
                  <span>Degustação Buffet Rullus:</span>
                  <p>Rua Zoroastra 168 ...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Pedrinho Magalhães 6 anos |</h3>
                  <span>Covidados:</span>
                  <p>Eliane confirmou presença</p>
                  <FiCheck size={24} color="#119112" />
                </li>
              </ul>
            </LatestNews>

            <Payments>
              <strong>Tarefas</strong>
              <ul>
                <li>
                  <span>Malu - 7 anos</span>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <span>Pedrinho - 5 anos</span>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <span>Malu - 6 anos</span>
                  <FiChevronRight size={24} />
                </li>
              </ul>
            </Payments>
          </BottomPage>
        </MiddlePage>
      </Content>
    </Container>
  );
};

export default Dashboard;
