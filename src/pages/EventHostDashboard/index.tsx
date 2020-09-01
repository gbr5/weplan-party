import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Yup from 'yup';

import 'react-day-picker/lib/style.css';
import DayPicker from 'react-day-picker';

import {
  FiChevronRight,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCheckSquare,
  FiUserPlus,
  FiEdit,
  FiUser,
} from 'react-icons/fi';
import { MdClose, MdAdd } from 'react-icons/md';
import { isAfter } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns/esm';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  Container,
  Content,
  SubHeader,
  FirstRow,
  LatestNews,
  Payments,
  MyEvents,
  MyEventsDrawer,
  MyEventsDrawerButton,
  SupplierSection,
  SelectedSuppliers,
  HiredSuppliers,
  Supplier,
  AddSupplierDrawer,
  GuestSection,
  EventGuests,
  MyGuests,
  Guest,
  AddGuestDrawer,
  Financial,
  SideBar,
  Main,
  CheckList,
  Appointments,
  NextAppointment,
  MyAppointments,
  Appointment,
  BudgetDrawer,
  EventInfoDrawer,
  BudgetCloseButton,
  AddAppointmentDrawer,
  EditEventNameDrawer,
  EditEventNameCloseButton,
  MessagesSection,
  UsersChat,
  UserChat,
  ChatMessages,
  Messages,
  AddCheckListDrawer,
  WeplanGuestDrawer,
  GuestConfirmedDrawer,
  WeplanSupplierAppointmentDrawer,
  AppointmentTypeDrawer,
  Calendar,
} from './styles';

import PageHeader from '../../components/PageHeader';
import MenuButton from '../../components/MenuButton';
import UserProfile from '../../components/UserProfile';

import chart from '../../assets/charts.png';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';

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

interface ICreateGuest {
  first_name: string;
  last_name: string;
  description: string;
  confirmed: boolean;
  weplanUser: boolean;
}

interface ICreateAppointment {
  subject: string;
  duration_minutes: number;
  address: string;
  start_hour: number;
  start_minute: number;
}

const EventHostDashboard: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

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

  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [budgetDrawer, setBudgetDrawer] = useState(false);
  const [addGuestDrawer, setAddGuestDrawer] = useState(false);
  const [addSupplierDrawer, setAddSupplierDrawer] = useState(false);
  const [addAppointmentDrawer, setAddAppointmentDrawer] = useState(false);
  const [editEventNameDrawer, setEditEventNameDrawer] = useState(false);
  const [addCheckListDrawer, setAddCheckListDrawer] = useState(false);

  const [latestActionsSection, setLatestActionsSection] = useState(true);
  const [guestsSection, setGuestsSection] = useState(false);
  const [appointmentsSection, setAppointmentsSection] = useState(false);
  const [financeSection, setFinanceSection] = useState(false);
  const [checkListSection, setCheckListSection] = useState(false);
  const [supplierSection, setSupplierSection] = useState(false);
  const [messagesSection, setMessagesSection] = useState(false);

  const [userProfileWindow, setUserProfileWindow] = useState(false);

  const [weplanGuestDrawer, setWeplanGuestDrawer] = useState(false);
  const [weplanUser, setWeplanUser] = useState(false);
  const [weplanGuestUser, setWeplanGuestUser] = useState('');

  const [guestConfirmedDrawer, setGuestConfirmedDrawer] = useState(false);
  const [guestConfirmedMessage, setGuestConfirmedMessage] = useState('');
  const [guestConfirmed, setGuestConfirmed] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [
    weplanSupplierAppointmentDrawer,
    setWeplanSupplierAppointmentDrawer,
  ] = useState(false);
  const [
    weplanSupplierAppointmentUser,
    setWeplanSupplierAppointmentUser,
  ] = useState(false);
  const [
    weplanSupplierAppointmentMessage,
    setWeplanSupplierAppointmentMessage,
  ] = useState('');
  const [appointmentTypeDrawer, setAppointmentTypeDrawer] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');

  useEffect(() => {
    try {
      api.get<IEvent[]>('/events').then(response => {
        setMyEvents(response.data);
      });
    } catch (err) {
      throw Error(err);
    }
  }, [myEvents]);

  const handleMyEventDashboard = useCallback(
    (event: IEvent) => {
      history.push('/dashboard/my-event', { params: event });
    },
    [history],
  );

  const handleMyEventsDrawer = useCallback(() => {
    setMyEventsDrawer(!myEventsDrawer);
  }, [myEventsDrawer]);

  const handleEventInfoDrawer = useCallback(() => {
    setEventInfoDrawer(!eventInfoDrawer);
  }, [eventInfoDrawer]);

  const handleBudgetDrawer = useCallback(() => {
    setBudgetDrawer(!budgetDrawer);
  }, [budgetDrawer]);

  const handleAddGuestDrawer = useCallback(() => {
    setAddGuestDrawer(!addGuestDrawer);
  }, [addGuestDrawer]);

  const handleWeplanGuestDrawer = useCallback(() => {
    setWeplanGuestDrawer(!weplanGuestDrawer);
  }, [weplanGuestDrawer]);

  const handleGuestConfirmedDrawer = useCallback(() => {
    setGuestConfirmedDrawer(!guestConfirmedDrawer);
  }, [guestConfirmedDrawer]);

  const handleWeplanGuestQuestion = useCallback(
    (weplan_user: boolean) => {
      if (weplan_user === true) {
        setWeplanGuestUser('É usuário WePlan S2!');
        setWeplanUser(true);
      } else {
        setWeplanGuestUser('AINDA não é usuário WePlan!');
        setWeplanUser(false);
      }
      return handleWeplanGuestDrawer();
    },
    [handleWeplanGuestDrawer],
  );

  const handleGuestConfirmedQuestion = useCallback(
    (guest_confirmed: boolean) => {
      if (guest_confirmed === true) {
        setGuestConfirmedMessage('Convidado confirmado!');
        setGuestConfirmed(true);
      } else {
        setGuestConfirmedMessage('');
        setGuestConfirmed(false);
      }
      return handleGuestConfirmedDrawer();
    },
    [handleGuestConfirmedDrawer],
  );

  const handleAddGuest = useCallback(
    async (data: ICreateGuest) => {
      console.log(data);
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          first_name: Yup.string().required('Primeiro nome é obrigatório'),
          last_name: Yup.string().required('Sobrenome é obrigatório'),
          description: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log('passou pelo Yup');

        console.log(
          {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
          },
          { event_id: eventId },
        );

        await api.post(`events/${eventId}/guests`, {
          first_name: data.first_name,
          last_name: data.last_name,
          description: data.description,
          weplanUser,
          confirmed: guestConfirmed,
        });

        addToast({
          type: 'success',
          title: 'Evento Criado com Sucesso',
          description: 'Você já pode começar a planejar o seu evento.',
        });

        handleAddGuestDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar evento',
          description: 'Erro  ao criar o evento, tente novamente.',
        });
      }
    },
    [addToast, eventId, handleAddGuestDrawer, weplanUser, guestConfirmed],
  );

  const handleAddSupplierDrawer = useCallback(() => {
    setAddSupplierDrawer(!addSupplierDrawer);
  }, [addSupplierDrawer]);

  const handleAddAppointmentDrawer = useCallback(() => {
    setAddAppointmentDrawer(!addAppointmentDrawer);
  }, [addAppointmentDrawer]);

  const handleWeplanSupplierAppointmentDrawer = useCallback(() => {
    setWeplanSupplierAppointmentDrawer(!weplanSupplierAppointmentDrawer);
  }, [weplanSupplierAppointmentDrawer]);

  const handleAppointmentTypeDrawer = useCallback(() => {
    setAppointmentTypeDrawer(!appointmentTypeDrawer);
  }, [appointmentTypeDrawer]);

  const handleWeplanSupplierAppointmentQuestion = useCallback(
    (weplan_user: boolean) => {
      if (weplan_user === true) {
        setWeplanSupplierAppointmentMessage('É usuário WePlan S2!');
        setWeplanSupplierAppointmentUser(true);
      } else {
        setWeplanSupplierAppointmentMessage('AINDA não é usuário WePlan!');
        setWeplanSupplierAppointmentUser(false);
      }
      return handleWeplanGuestDrawer();
    },
    [handleWeplanGuestDrawer],
  );

  const handleAppointmentTypeQuestion = useCallback(
    (appointment_type: string) => {
      if (appointment_type === 'Comercial') {
        setAppointmentType('Comercial');
      } else {
        setAppointmentType('Técnico');
      }
      return handleGuestConfirmedDrawer();
    },
    [handleGuestConfirmedDrawer],
  );

  const handleAddAppointment = useCallback(
    async (data: ICreateAppointment) => {
      console.log(data);
      try {
        formRef.current?.setErrors([]);
        const date = new Date(selectedDate);

        date.setHours(Number(data.start_hour));
        date.setMinutes(Number(data.start_minute));

        const schema = Yup.object().shape({
          subject: Yup.string().required('Assunto é obrigatório'),
          duration_minutes: Yup.number(),
          address: Yup.string(),
          start_hour: Yup.number().required(),
          start_minute: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log('passou pelo Yup', {
          subject: data.subject,
          date,
          duration_minutes: Number(data.duration_minutes),
          address: data.address,
          weplanGuest: weplanSupplierAppointmentUser,
          appointment_type: appointmentType,
        });

        await api.post(`/appointments`, {
          subject: data.subject,
          date,
          duration_minutes: Number(data.duration_minutes),
          address: data.address,
          weplanGuest: weplanSupplierAppointmentUser,
          appointment_type: appointmentType,
        });

        addToast({
          type: 'success',
          title: 'Agendamento Criado com Sucesso',
          description:
            'Você já pode visualizar no seu dashboard de agendamentos.',
        });

        handleAddAppointmentDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar agendamento',
          description: 'Erro  ao criar o agendamento, tente novamente.',
        });
      }
    },
    [
      addToast,
      handleAddAppointmentDrawer,
      weplanSupplierAppointmentUser,
      appointmentType,
      selectedDate,
    ],
  );

  const handleEditEventNameDrawer = useCallback(() => {
    setEditEventNameDrawer(!editEventNameDrawer);
  }, [editEventNameDrawer]);

  const handleAddCheckListDrawer = useCallback(() => {
    setAddCheckListDrawer(!addCheckListDrawer);
  }, [addCheckListDrawer]);

  const handleUserProfileWindow = useCallback(() => {
    setUserProfileWindow(!userProfileWindow);
  }, [userProfileWindow]);

  const handleLatestActionsSection = useCallback(() => {
    setLatestActionsSection(true);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
  }, []);

  const handleGuestsSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(true);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
  }, []);

  const handleAppointmentsSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(true);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
  }, []);

  const handleFinanceSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(true);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
  }, []);

  const handleCheckListSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(true);
    setSupplierSection(false);
    setMessagesSection(false);
  }, []);

  const handleSupplierSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(true);
    setMessagesSection(false);
  }, []);

  const handleMessagesSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(true);
  }, []);

  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    if (myEvents) {
      const nextEvent = myEvents.find(myEvent => {
        return isAfter(new Date(myEvent.date), new Date());
      });

      if (nextEvent) {
        api.get(`/events/${nextEvent.id}`).then(response => {
          console.log(response.data);
        });
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
    }
  }, [myEvents]);
  useEffect(() => {
    setEventId(myNextEvent.id);
  }, [myNextEvent]);

  useEffect(() => {
    api.get(`/events/${eventId}/check-list`).then(response => {
      setMyNextEventCheckList(response.data);
    });
  }, [myNextEvent, eventId]);

  useEffect(() => {
    setResolvedCheckList(
      myNextEventCheckList.filter(checkList => checkList.checked === true),
    );
  }, [myNextEventCheckList]);

  useEffect(() => {
    api.get(`/events/${eventId}/guestsSection`).then(response => {
      setMyNextEventGuests(response.data);
      console.log(response.data);
    });
  }, [myNextEvent, eventId]);

  useEffect(() => {
    setConfirmedGuests(
      myNextEventGuests.filter(guest => guest.confirmed === true),
    );
  }, [myNextEvent, myNextEventGuests]);

  return (
    <Container>
      <MenuButton />
      <PageHeader />
      {!!userProfileWindow && <UserProfile />}

      <Content>
        <SideBar>
          <MyEvents>
            <MyEventsDrawerButton type="button" onClick={handleMyEventsDrawer}>
              <h1>Meus Eventos</h1>
              {myEventsDrawer ? (
                <FiChevronUp size={30} />
              ) : (
                <FiChevronDown size={30} />
              )}
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
          </MyEvents>
          <button type="button" onClick={handleEventInfoDrawer}>
            Informações do Evento
          </button>
          {!!eventInfoDrawer && (
            <EventInfoDrawer>
              <span>
                <button type="button" onClick={handleEventInfoDrawer}>
                  <MdClose size={30} />
                </button>
              </span>
              <h1>Informações do evento</h1>
              <div>
                <div>
                  <input type="text" placeholder="Data do evento" />
                  <input type="text" placeholder="Tipo de Evento" />
                  <input type="text" placeholder="Horário de início" />
                  <input type="text" placeholder="Duração" />
                  <input type="text" placeholder="Número de convidados" />
                </div>
                <div>
                  <input type="text" placeholder="Traje" />
                  <input type="text" placeholder="País" />
                  <input type="text" placeholder="Estado" />
                  <input type="text" placeholder="Cidade" />
                  <input type="text" placeholder="Endereço" />
                </div>
              </div>
              <button type="button">
                <h3>Salvar</h3>
              </button>
            </EventInfoDrawer>
          )}
          <button type="button" onClick={handleLatestActionsSection}>
            Últimas Atualizações
          </button>
          <button type="button" onClick={handleSupplierSection}>
            Fornecedores
          </button>
          <button type="button" onClick={handleMessagesSection}>
            Mensagens
          </button>
          <h1>Cerimonialista</h1>
          <span>
            <button type="button" onClick={handleUserProfileWindow}>
              <h3>Sergio Mendes</h3>
            </button>
          </span>
          <h1>Donos da Festa</h1>
          <span>
            <p>Noiva</p>

            <button type="button" onClick={handleUserProfileWindow}>
              <h2>Roberta</h2>
            </button>
          </span>
          <span>
            <p>Noivo</p>
            <button type="button" onClick={handleUserProfileWindow}>
              <h2>Roberto</h2>
            </button>
          </span>
          <h1>Membros da Festa</h1>
          <span>
            <p>Mãe da Noiva</p>
            <button type="button" onClick={handleUserProfileWindow}>
              <h2>@espacofareast</h2>
            </button>
          </span>
          <span>
            <p>Mãe do Noivo</p>
            <button type="button" onClick={handleUserProfileWindow}>
              <h2>Rubia</h2>
            </button>
          </span>
        </SideBar>
        <Main>
          <SubHeader>
            <span>
              <h1>{myNextEvent.name}</h1>
              <button type="button" onClick={handleEditEventNameDrawer}>
                <FiEdit size={30} />
              </button>
            </span>

            {!!editEventNameDrawer && (
              <>
                <EditEventNameCloseButton
                  type="button"
                  onClick={handleEditEventNameDrawer}
                >
                  <MdClose size={30} />
                </EditEventNameCloseButton>
                <EditEventNameDrawer>
                  <span>
                    <h2>Nome do Evento</h2>

                    <input type="text" />

                    <button type="button">
                      <h3>Salvar</h3>
                    </button>
                  </span>
                </EditEventNameDrawer>
              </>
            )}

            <FirstRow>
              <div>
                <button type="button" onClick={handleGuestsSection}>
                  <h2>N° Convidados</h2>
                  <p>57/150</p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleBudgetDrawer}>
                  <h2>Orçamento</h2>

                  <p>R$ 215.000,00</p>
                </button>
              </div>

              <div>
                <button type="button" onClick={handleAppointmentsSection}>
                  <h2>Compromissos</h2>
                  <p>4</p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleFinanceSection}>
                  <h2>Financeiro</h2>
                  <p>41%</p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleCheckListSection}>
                  <h2>Check List</h2>

                  <p>4/15</p>
                </button>
              </div>
            </FirstRow>

            {!!budgetDrawer && (
              <BudgetDrawer>
                <BudgetCloseButton type="button" onClick={handleBudgetDrawer}>
                  <MdClose size={30} />
                </BudgetCloseButton>
                <span>
                  <h2>Novo Orçamento</h2>

                  <input type="text" />

                  <button type="button">
                    <h3>Salvar</h3>
                  </button>
                </span>
              </BudgetDrawer>
            )}
          </SubHeader>
          {!!latestActionsSection && (
            <LatestNews>
              <strong>Últimas Atualizações</strong>
              <ul>
                <li>
                  <h3>Mensagem |</h3>
                  <span>Sérgio Cerimonial:</span>
                  <p>Degustação ...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Mensagem |</h3>
                  <span>Maria Doces:</span>
                  <p>Bom dia Antônio, ...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Solicitação de agendamento |</h3>
                  <span>Degustação Buffet Rullus:</span>
                  <p>R...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Pedrinho Magalhães 6 anos |</h3>
                  <span>Covidados:</span>
                  <p>Eliane confirmou ...</p>
                  <FiCheck size={24} color="#119112" />
                </li>
              </ul>
            </LatestNews>
          )}
          {!!supplierSection && (
            <SupplierSection>
              <SelectedSuppliers>
                <h1>Fornecedores Selecionados</h1>
                <button type="button" onClick={handleAddSupplierDrawer}>
                  <FiUserPlus size={26} />
                </button>
                <div>
                  <Supplier>
                    <h1>Rullus</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>ZCM</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Company</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Vagalumens</h1>
                    <FiChevronRight />
                  </Supplier>
                </div>
              </SelectedSuppliers>
              <HiredSuppliers>
                <h1>Fornecedores Contratados</h1>
                <button type="button" onClick={handleAddSupplierDrawer}>
                  <FiUserPlus size={26} />
                </button>
                <div>
                  <Supplier>
                    <h1>Far East</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Sergio Mendes</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Luisa Fotógrafa</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Marcela Ferrari</h1>
                    <FiChevronRight />
                  </Supplier>
                </div>
              </HiredSuppliers>
              {!!addSupplierDrawer && (
                <>
                  <AddSupplierDrawer>
                    <span>
                      <button type="button" onClick={handleAddSupplierDrawer}>
                        <MdClose size={30} />
                      </button>
                    </span>
                    <h1>Adicionar Fornecedor</h1>
                    <input type="text" placeholder="Nome" />

                    <input type="text" placeholder="Usuário We Plan?" />

                    <input type="text" placeholder="Qual o nome do usuário?" />

                    <input type="text" placeholder="Contratado?" />

                    <button type="button">
                      <h3>Salvar</h3>
                    </button>
                  </AddSupplierDrawer>
                </>
              )}
            </SupplierSection>
          )}
          {!!messagesSection && (
            <MessagesSection>
              <UsersChat>
                <div>
                  <h1>Contatos</h1>

                  <UserChat>
                    <h1>Rullus</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>ZCM</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>Company</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>Vagalumens</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>ZCM</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>Company</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>ZCM</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>Company</h1>
                    <FiChevronRight />
                  </UserChat>
                </div>
              </UsersChat>
              <ChatMessages>
                <div>
                  <span>
                    <button type="button" onClick={handleUserProfileWindow}>
                      <h1>Rullus</h1>
                    </button>
                  </span>

                  <Messages>
                    <span>Rullus: </span>
                    <p>
                      Então, posso ver o que pode ser feito, o Felipe vai te
                      ligar. Mas de toda forma, segue agendado para segunda as
                      8am. ;)
                    </p>
                    <p>14:20</p>
                  </Messages>
                  <Messages>
                    <span>Você: </span>
                    <p>
                      Tudo bem. Fico aguardando o seu retorno. Muito obrigado
                      Alice! ;D
                    </p>
                    <p>14:22</p>
                  </Messages>
                  <Messages>
                    <span>Rullus: </span>
                    <p>
                      Imagina, é um prazer. Precisando só falar! Um excelente
                      fim de semana.
                    </p>
                    <p>14:27</p>
                  </Messages>
                  <Messages>
                    <span>Você: </span>
                    <p>Um beijo, bom fim de semana.</p>
                    <p>14:29</p>
                  </Messages>
                  <Messages>
                    <span>Rullus: </span>
                    <p>
                      Imagina, é um prazer. Precisando só falar! Um excelente
                      fim de semana.
                    </p>
                    <p>14:30</p>
                  </Messages>
                  <Messages>
                    <span>Você: </span>
                    <p>Um beijo, bom fim de semana.</p>
                    <p>14:32</p>
                  </Messages>

                  <input type="text" />
                  <button type="button">Enviar</button>
                </div>
              </ChatMessages>
            </MessagesSection>
          )}
          {!!guestsSection && (
            <GuestSection>
              <EventGuests>
                <h1>Convidados do Evento</h1>
                <div>
                  <Guest>
                    <h1>Luisa</h1>
                    <FiCheckSquare />
                  </Guest>
                  <Guest>
                    <h1>Luisa</h1>
                    <FiCheckSquare />
                  </Guest>
                  <Guest>
                    <h1>Luisa</h1>
                    <button type="button" onClick={handleUserProfileWindow}>
                      <FiUser size={24} />
                    </button>
                    <FiCheckSquare />
                  </Guest>
                  <Guest>
                    <h1>Luisa</h1>
                    <FiCheckSquare />
                  </Guest>
                </div>
              </EventGuests>
              <MyGuests>
                <h1>Meus Convidados</h1>
                <button type="button" onClick={handleAddGuestDrawer}>
                  <FiUserPlus size={26} />
                </button>
                <div>
                  <Guest>
                    <h1>Luisa</h1>
                    <button type="button" onClick={handleUserProfileWindow}>
                      <FiUser size={24} />
                    </button>
                    <FiCheckSquare />
                  </Guest>
                  <Guest>
                    <h1>Luisa</h1>
                    <FiCheckSquare />
                  </Guest>
                  <Guest>
                    <h1>Luisa</h1>
                    <FiCheckSquare />
                  </Guest>
                  <Guest>
                    <h1>Luisa</h1>
                    <FiCheckSquare />
                  </Guest>
                </div>
              </MyGuests>
              {!!addGuestDrawer && (
                <Form ref={formRef} onSubmit={handleAddGuest}>
                  <AddGuestDrawer>
                    <span>
                      <button type="button" onClick={handleAddGuestDrawer}>
                        <MdClose size={30} />
                      </button>
                    </span>
                    <h1>Adicionar Convidado</h1>

                    <div>
                      {weplanGuestUser === '' ? (
                        <button type="button" onClick={handleWeplanGuestDrawer}>
                          Convidado Weplan ?
                        </button>
                      ) : (
                        <h1>
                          <button
                            type="button"
                            onClick={handleWeplanGuestDrawer}
                          >
                            {weplanGuestUser}
                          </button>
                        </h1>
                      )}
                      {guestConfirmedMessage === '' ? (
                        <button
                          type="button"
                          onClick={handleGuestConfirmedDrawer}
                        >
                          Confirmado?
                        </button>
                      ) : (
                        <h1>
                          <button
                            type="button"
                            onClick={handleGuestConfirmedDrawer}
                          >
                            {guestConfirmedMessage}
                          </button>
                        </h1>
                      )}
                    </div>
                    {!!weplanGuestDrawer && (
                      <WeplanGuestDrawer>
                        <h1>É usuário WePlan?</h1>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleWeplanGuestQuestion(true)}
                          >
                            Sim
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWeplanGuestQuestion(false)}
                          >
                            Não
                          </button>
                        </div>
                      </WeplanGuestDrawer>
                    )}
                    {!!guestConfirmedDrawer && (
                      <GuestConfirmedDrawer>
                        <h1>Convidado confirmado?</h1>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleGuestConfirmedQuestion(true)}
                          >
                            Sim
                          </button>
                          <button
                            type="button"
                            onClick={() => handleGuestConfirmedQuestion(false)}
                          >
                            Não
                          </button>
                        </div>
                      </GuestConfirmedDrawer>
                    )}

                    <Input name="first_name" type="text" placeholder="Nome" />
                    <Input
                      name="last_name"
                      type="text"
                      placeholder="Sobrenome"
                    />

                    <Input
                      name="description"
                      type="text"
                      placeholder="Alguma descrição necessária?"
                    />

                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </AddGuestDrawer>
                </Form>
              )}
            </GuestSection>
          )}
          {!!appointmentsSection && (
            <Appointments>
              <NextAppointment>
                <h1>Próximo Compromisso</h1>
                <div>
                  <div>
                    <h1>Rullus Buffet</h1>
                    <span>17/10/2020 - 14:00</span>
                  </div>

                  <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                </div>
              </NextAppointment>
              <MyAppointments>
                <h1>Meus Compromissos</h1>
                <button type="button" onClick={handleAddAppointmentDrawer}>
                  <MdAdd size={30} />
                </button>
                <div>
                  <Appointment>
                    <div>
                      <h1>Rullus Buffet</h1>
                      <span>17/10/2020 - 14:00</span>
                    </div>
                    <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                  </Appointment>
                  <Appointment>
                    <div>
                      <h1>Rullus Buffet</h1>
                      <span>17/10/2020 - 14:00</span>
                    </div>
                    <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                  </Appointment>
                  <Appointment>
                    <div>
                      <h1>Rullus Buffet</h1>
                      <span>17/10/2020 - 14:00</span>
                    </div>
                    <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                  </Appointment>
                  <Appointment>
                    <div>
                      <h1>Rullus Buffet</h1>
                      <span>17/10/2020 - 14:00</span>
                    </div>
                    <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                  </Appointment>
                </div>
              </MyAppointments>
              {!!addAppointmentDrawer && (
                <Form ref={formRef} onSubmit={handleAddAppointment}>
                  <AddAppointmentDrawer>
                    <div>
                      <div>
                        <span>
                          <button
                            type="button"
                            onClick={handleAddAppointmentDrawer}
                          >
                            <MdClose size={30} />
                          </button>
                        </span>
                        <h1>Adicionar Compromisso</h1>

                        <Input
                          name="subject"
                          type="text"
                          placeholder="Assunto"
                        />

                        <Input
                          type="text"
                          placeholder="Hora"
                          name="start_hour"
                        />
                        <Input
                          type="text"
                          placeholder="Minuto"
                          name="start_minute"
                        />
                        <Input
                          name="duration_minutes"
                          type="number"
                          placeholder="Duração em minutos"
                        />
                      </div>
                      <span>
                        <div>
                          {weplanSupplierAppointmentMessage === '' ? (
                            <button
                              type="button"
                              onClick={handleWeplanSupplierAppointmentDrawer}
                            >
                              Fornecedor Weplan ?
                            </button>
                          ) : (
                            <h1>
                              <button
                                type="button"
                                onClick={handleWeplanSupplierAppointmentDrawer}
                              >
                                {weplanSupplierAppointmentMessage}
                              </button>
                            </h1>
                          )}
                          {appointmentType === '' ? (
                            <button
                              type="button"
                              onClick={handleAppointmentTypeDrawer}
                            >
                              Qual o tipo de compromisso ?
                            </button>
                          ) : (
                            <h1>
                              <button
                                type="button"
                                onClick={handleAppointmentTypeDrawer}
                              >
                                {appointmentType}
                              </button>
                            </h1>
                          )}
                          {!!weplanSupplierAppointmentDrawer && (
                            <WeplanSupplierAppointmentDrawer>
                              <h1>Fornecedor é usuário WePlan?</h1>
                              <div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleWeplanSupplierAppointmentQuestion(
                                      true,
                                    )}
                                >
                                  Sim
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleWeplanSupplierAppointmentQuestion(
                                      false,
                                    )
                                  }
                                >
                                  Não
                                </button>
                              </div>
                            </WeplanSupplierAppointmentDrawer>
                          )}
                          {!!appointmentTypeDrawer && (
                            <AppointmentTypeDrawer>
                              <h1>Qual o tipo de compromisso?</h1>
                              <div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAppointmentTypeQuestion('Comercial')
                                  }
                                >
                                  Comercial
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAppointmentTypeQuestion('Técnico')
                                  }
                                >
                                  Técnico
                                </button>
                              </div>
                            </AppointmentTypeDrawer>
                          )}
                        </div>
                        <Calendar>
                          <DayPicker
                            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                            fromMonth={new Date()}
                            onMonthChange={handleMonthChange}
                            selectedDays={selectedDate}
                            onDayClick={handleDateChange}
                            months={[
                              'Janeiro',
                              'Fevereiro',
                              'Março',
                              'Abril',
                              'Maio',
                              'Junho',
                              'Julho',
                              'Agosto',
                              'Setembro',
                              'Outubro',
                              'Novembro',
                              'Dezembro',
                            ]}
                          />
                        </Calendar>
                        <Input
                          name="address"
                          type="text"
                          placeholder="Endereço"
                        />
                      </span>
                    </div>
                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </AddAppointmentDrawer>
                </Form>
              )}
            </Appointments>
          )}
          {!!financeSection && (
            <Financial>
              <img src={chart} alt="chart" />
              <Payments>
                <strong>Transações</strong>
                <ul>
                  <li>
                    <span>Malu - 7 anos</span>
                    <FiCheckSquare size={24} />
                  </li>
                  <li>
                    <span>Pedrinho - 5 anos</span>
                    <FiCheckSquare size={24} />
                  </li>
                  <li>
                    <span>Malu - 6 anos</span>
                    <FiCheckSquare size={24} />
                  </li>
                </ul>
              </Payments>
            </Financial>
          )}
          {!!checkListSection && (
            <>
              <CheckList>
                <strong>Check List</strong>
                <button type="button" onClick={handleAddCheckListDrawer}>
                  <MdAdd size={30} />
                </button>
                <ul>
                  <li>
                    <span>Cerimonialista</span>
                    <FiCheckSquare size={24} />
                  </li>
                  <li>
                    <span>Espaço</span>
                    <FiCheckSquare size={24} />
                  </li>
                  <li>
                    <span>Decoração</span>
                    <FiCheckSquare size={24} />
                  </li>
                </ul>
              </CheckList>
              {!!addCheckListDrawer && (
                <AddCheckListDrawer>
                  <span>
                    <button type="button" onClick={handleAddCheckListDrawer}>
                      <MdClose size={30} />
                    </button>
                  </span>
                  <h1>Adicionar</h1>
                  <input type="text" placeholder="Nome" />

                  <input
                    type="text"
                    placeholder="Nível de prioridade (1 a 5)"
                  />

                  <input type="text" placeholder="Realizado?" />

                  <button type="button">
                    <h3>Salvar</h3>
                  </button>
                </AddCheckListDrawer>
              )}
            </>
          )}
        </Main>
      </Content>
    </Container>
  );
};

export default EventHostDashboard;
