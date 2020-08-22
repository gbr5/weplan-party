import React, { useState, useEffect, useCallback } from 'react';

import 'react-day-picker/lib/style.css';

import {
  FiPower,
  FiChevronRight,
  FiSettings,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCheckSquare,
  FiUserPlus,
  FiEdit,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MdHelp, MdClose, MdAdd } from 'react-icons/md';
import { isAfter } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns/esm';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  SubHeader,
  Menu,
  FirstRow,
  LatestNews,
  Payments,
  Logo,
  MyEvents,
  MyEventsDrawer,
  MyEventsDrawerButton,
  SupplierSection,
  SelectedSuppliers,
  HiredSuppliers,
  Supplier,
  AddSupplierDrawer,
  AddSupplierDrawerCloseButton,
  GuestSection,
  EventGuests,
  MyGuests,
  Guest,
  AddGuestDrawer,
  AddGuestDrawerCloseButton,
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
  CloseButton,
  BudgetCloseButton,
  AddAppointmentDrawer,
  AddAppointmentDrawerCloseButton,
  EditEventNameDrawer,
  EditEventNameCloseButton,
} from './styles';

import profileImg from '../../assets/guy.jpg';
import chart from '../../assets/charts.png';

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

const EventHostDashboard: React.FC = () => {
  const { signOut, user } = useAuth();
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

  const [latestActionsSection, setLatestActionsSection] = useState(true);
  const [guestsSection, setGuestsSection] = useState(false);
  const [appointmentsSection, setAppointmentsSection] = useState(false);
  const [financeSection, setFinanceSection] = useState(false);
  const [checkListSection, setCheckListSection] = useState(false);
  const [supplierSection, setSupplierSection] = useState(false);

  useEffect(() => {
    try {
      api.get<IEvent[]>('/events').then(response => {
        setMyEvents(response.data);
      });
    } catch (err) {
      throw Error(err);
    }
  }, [myEvents]);

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

  const handleAddSupplierDrawer = useCallback(() => {
    setAddSupplierDrawer(!addSupplierDrawer);
  }, [addSupplierDrawer]);

  const handleAddAppointmentDrawer = useCallback(() => {
    setAddAppointmentDrawer(!addAppointmentDrawer);
  }, [addAppointmentDrawer]);

  const handleEditEventNameDrawer = useCallback(() => {
    setEditEventNameDrawer(!editEventNameDrawer);
  }, [editEventNameDrawer]);

  const handleLatestActionsSection = useCallback(() => {
    setLatestActionsSection(true);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
  }, []);

  const handleGuestsSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(true);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
  }, []);

  const handleAppointmentsSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(true);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
  }, []);

  const handleFinanceSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(true);
    setCheckListSection(false);
    setSupplierSection(false);
  }, []);

  const handleCheckListSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(true);
    setSupplierSection(false);
  }, []);

  const handleSupplierSection = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(true);
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
    console.log(myNextEvent.id);
  }, [myNextEvent]);
  console.log(user);

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
    console.log(myNextEventGuests.filter(guest => guest.confirmed === false));
  }, [myNextEvent, myNextEventGuests]);
  console.log(myNextEventGuests);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo>WePlan</Logo>

          <Profile>
            <img src={profileImg} alt="oi" />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <Menu>
            <button type="button">FOTOS</button>
            <button type="button">AMIGOS</button>
            <button type="button">EVENTOS</button>
            <button type="button">FORNECEDORES</button>
            <button type="button" onClick={signOut}>
              <MdHelp size={30} />
            </button>
            <button type="button" onClick={signOut}>
              <FiSettings size={30} />
            </button>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Menu>
        </HeaderContent>
      </Header>
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
                  <span key={event.id}>
                    {event.name}
                    <FiChevronRight size={24} />
                  </span>
                ))}
              </MyEventsDrawer>
            )}
          </MyEvents>
          <button type="button" onClick={handleEventInfoDrawer}>
            Informações do Evento
          </button>
          {!!eventInfoDrawer && (
            <>
              <CloseButton type="button" onClick={handleEventInfoDrawer}>
                <MdClose size={30} />
              </CloseButton>
              <EventInfoDrawer>
                <div>
                  <div>
                    <span>
                      <h2>1) Data do Evento</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>2) Tipo de Evento</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>3) Horário de início</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>4) Duração</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>5) Número de convidados</h2>
                      <input type="text" />
                    </span>
                  </div>
                  <div>
                    <span>
                      <h2>6) Traje</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>7) País</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>8) Estado</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>9) Cidade</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>10) Endereço</h2>
                      <input type="text" />
                    </span>
                  </div>
                </div>
                <button type="button">
                  <h3>Salvar</h3>
                </button>
              </EventInfoDrawer>
            </>
          )}
          <button type="button" onClick={handleLatestActionsSection}>
            Últimas Atualizações
          </button>
          <button type="button" onClick={handleSupplierSection}>
            Fornecedores
          </button>
          <button type="button" onClick={handleSupplierSection}>
            Mensagens
          </button>
          <h1>Cerimonialista</h1>
          <span>
            <button type="button">
              <h3>Sergio Mendes</h3>
            </button>
          </span>
          <h1>Donos da Festa</h1>
          <span>
            <p>Noiva</p>

            <button type="button">
              <h2>Roberta</h2>
            </button>
          </span>
          <span>
            <p>Noivo</p>
            <button type="button">
              <h2>Roberto</h2>
            </button>
          </span>
          <h1>Membros da Festa</h1>
          <span>
            <p>Mãe da Noiva</p>
            <button type="button">
              <h2>@espacofareast</h2>
            </button>
          </span>
          <span>
            <p>Mãe do Noivo</p>
            <button type="button">
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
                  <AddSupplierDrawerCloseButton
                    type="button"
                    onClick={handleAddSupplierDrawer}
                  >
                    <MdClose size={30} />
                  </AddSupplierDrawerCloseButton>
                  <AddSupplierDrawer>
                    <h1>Adicionar Fornecedor</h1>
                    <span>
                      <h2>1) Nome</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>2) É usuário WePlan?</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>3) Se sim, qual o nome de usuário?</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>4) Contratado?</h2>
                      <input type="text" />
                    </span>
                    <button type="button">
                      <h3>Salvar</h3>
                    </button>
                  </AddSupplierDrawer>
                </>
              )}
            </SupplierSection>
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
                <>
                  <AddGuestDrawerCloseButton
                    type="button"
                    onClick={handleAddGuestDrawer}
                  >
                    <MdClose size={30} />
                  </AddGuestDrawerCloseButton>
                  <AddGuestDrawer>
                    <h1>Adicionar Convidado</h1>
                    <span>
                      <h2>1) Nome</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>2) É usuário WePlan?</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>3) Se sim, qual o nome de usuário?</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>4) Confirmado?</h2>
                      <input type="text" />
                    </span>
                    <button type="button">
                      <h3>Salvar</h3>
                    </button>
                  </AddGuestDrawer>
                </>
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
                <>
                  <AddAppointmentDrawerCloseButton
                    type="button"
                    onClick={handleAddAppointmentDrawer}
                  >
                    <MdClose size={30} />
                  </AddAppointmentDrawerCloseButton>
                  <AddAppointmentDrawer>
                    <h1>Adicionar Convidado</h1>
                    <span>
                      <h2>1) Nome</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>2) É usuário WePlan?</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>3) Se sim, qual o nome de usuário?</h2>
                      <input type="text" />
                    </span>
                    <span>
                      <h2>4) Confirmado?</h2>
                      <input type="text" />
                    </span>
                    <button type="button">
                      <h3>Salvar</h3>
                    </button>
                  </AddAppointmentDrawer>
                </>
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
            <CheckList>
              <strong>Check List</strong>
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
          )}
        </Main>
      </Content>
    </Container>
  );
};

export default EventHostDashboard;
