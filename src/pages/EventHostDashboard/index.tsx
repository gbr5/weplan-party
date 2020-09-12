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
  FiSquare,
  FiEdit3,
} from 'react-icons/fi';
import { MdClose, MdPersonAdd, MdAdd } from 'react-icons/md';
import { differenceInCalendarDays } from 'date-fns/esm';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { format, setHours, setMinutes } from 'date-fns';
import {
  Container,
  EventPageContent,
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
  WeplanUserDrawer,
  GuestConfirmedDrawer,
  AppointmentTypeDrawer,
  Calendar,
  CheckedListItemDrawer,
  IsHiredDrawer,
  AddPlannerDrawer,
  AddOwnerDrawer,
  AddMemberDrawer,
  MembersWindow,
  Guest,
  GuestNavigationButton,
  NotHostGuest,
  NumberOfGuestWindow,
  MembersContainer,
  EditEventInfoDrawer,
  EventInfo,
} from './styles';

import PageHeader from '../../components/PageHeader';
import MenuButton from '../../components/MenuButton';

import chart from '../../assets/charts.png';
import avatar_placeholder from '../../assets/avatar_placeholder_cat2.jpeg';

import api from '../../services/api';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';
import FriendsListDrawer from '../../components/FriendsListDrawer';
import MemberProfileDrawer from '../../components/MemberProfileDrawer';
import OwnerProfileDrawer from '../../components/OwnerProfileDrawer';

interface IEvent {
  id: string;
  name: string;
  trimmed_name: string;
  date: string;
  event_type: string;
  daysTillDate: number;
}
interface IEventCheckList {
  id: string;
  name: string;
  priority_level: number;
  checked: boolean;
}
interface IEventGuest {
  id: string;
  confirmed: boolean;
  host: string;
  first_name: string;
  last_name: string;
  weplanUser: boolean;
  description: string;
}
interface ICreateGuest {
  first_name: string;
  last_name: string;
  description: string;
  confirmed: boolean;
  weplanUser: boolean;
}
interface ICreateCheckListItem {
  name: string;
  priority_level: number;
  checked: boolean;
}
interface ICreateAppointment {
  subject: string;
  duration_minutes: number;
  address: string;
  start_hour: number;
  start_minute: number;
  weplanGuest: boolean;
  appointment_type: string;
}
interface IAppointmentDTO {
  id: string;
  subject: string;
  duration_minutes: number;
  address: string;
  date: string;
  start_hour: number;
  start_minute: number;
  days_till_date: number;
  weplanGuest: boolean;
  appointment_type: string;
}
interface ICreateSupplier {
  supplier_id: string;
  supplier_sub_category: number;
}
interface IEditEventInfo {
  date: Date;
  number_of_guests: number;
  duration: number;
  budget: number;
  description: boolean;
  country: string;
  local_state: string;
  city: string;
  address: string;
}
interface IEventParams {
  params: {
    id: string;
    name: string;
    date: string;
    daysTillDate: number;
  };
}
interface IUserInfoDTO {
  id: string;
  name: string;
  avatar: string;
}
interface IEventOwnerDTO {
  id: string;
  name: string;
  avatar: string;
  description: string;
  number_of_guests: number;
}
interface IEventMemberDTO {
  id: string;
  name: string;
  avatar: string;
  number_of_guests: number;
}
interface IEventInfo {
  number_of_guests: number;
  duration: number;
  budget: number;
  description: string;
  country: string;
  local_state: string;
  city: string;
  address: string;
}
const EventHostDashboard: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const location = useLocation<IEventParams>();
  const { user } = useAuth();

  const pageEvent = location.state.params;

  const [eventId, setEventId] = useState(pageEvent.id);

  const notHostMessage = 'Você não é o anfitrião deste convidado!';

  const [myEvents, setMyEvents] = useState<IEvent[]>([]);
  const [myEventsDrawer, setMyEventsDrawer] = useState(false);
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const [friends, setFriends] = useState<IUserInfoDTO[]>([]);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [checkListItems, setCheckListItems] = useState<IEventCheckList[]>([]);
  const [resolvedCheckListItems, setResolvedCheckListItems] = useState(0);
  const [checkListItem, setCheckListItem] = useState<IEventCheckList>(
    {} as IEventCheckList,
  );
  const [editCheckListItemWindow, setEditCheckListItemWindow] = useState(false);
  const [appointments, setAppointments] = useState<IAppointmentDTO[]>([]);
  const [appointment, setAppointment] = useState<IAppointmentDTO>(
    {} as IAppointmentDTO,
  );
  const [editAppointmentDrawer, setEditAppointmentDrawer] = useState(false);
  const [eventGuests, setEventGuests] = useState<IEventGuest[]>([]);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myGuests, setMyGuests] = useState<IEventGuest[]>([]);
  const [updated_guest, setUpdated_guest] = useState<IEventGuest>(
    {} as IEventGuest,
  );
  const [wpUserId, setWpUserId] = useState(''); // wpUser é para usuários dos sistema que não seja o próprio usuário
  const [wpUserName, setWpUserName] = useState('');
  const [planners, setPlanners] = useState<IUserInfoDTO[]>([]);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [owner, setOwner] = useState<IEventOwnerDTO>({} as IEventOwnerDTO);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [member, setMember] = useState<IEventMemberDTO>({} as IEventMemberDTO);
  const [membersWindow, setMembersWindow] = useState(false);
  const [eventInfo, setEventInfo] = useState<IEventInfo>({} as IEventInfo);
  const [guestWindow, setGuestWindow] = useState(true);
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [editEventInfoDrawer, setEditEventInfoDrawer] = useState(false);
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
  const [wpUserQuestionDrawer, setWpUserQuestionDrawer] = useState(false);
  const [weplanUser, setWeplanUser] = useState(false);
  const [guestConfirmedDrawer, setGuestConfirmedDrawer] = useState(false);
  const [guestConfirmedMessage, setGuestConfirmedMessage] = useState('');
  const [guestConfirmed, setGuestConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointmentTypeDrawer, setAppointmentTypeDrawer] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');
  const [checkedListItemDrawer, setCheckedListItemDrawer] = useState(false);
  const [CheckedListItemMessage, setCheckedListItemMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const [isHiredDrawer, setIsHiredDrawer] = useState(false);
  const [isHiredMessage, setIsHiredMessage] = useState('');
  const [isHired, setIsHired] = useState(false);
  const [addPlannerDrawer, setAddPlannerDrawer] = useState(false);
  const [addOwnerDrawer, setAddOwnerDrawer] = useState(false);
  const [addMemberDrawer, setAddMemberDrawer] = useState(false);
  const [editGuestDrawer, setEditGuestDrawer] = useState(false);
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [memberProfileWindow, setMemberProfileWindow] = useState(false);
  const [ownerProfileWindow, setOwnerProfileWindow] = useState(false);
  const [numberOfGuestDrawer, setNumberOfGuestDrawer] = useState(false);
  const [editOwnerDrawer, setEditOwnerDrawer] = useState(false);
  const [deleteMemberDrawer, setDeleteMemberDrawer] = useState(false);
  const [deleteOwnerDrawer, setDeleteOwnerDrawer] = useState(false);
  const [numberOfOwners, setNumberOfOwners] = useState(0);
  const [numberOfMembers, setNumberOfMembers] = useState(0);

  const closeAllWindows = useCallback(() => {
    setMyEventsDrawer(false);
    setCheckedListItemDrawer(false);
    setAddCheckListDrawer(false);
    setIsHiredDrawer(false);
    setEventInfoDrawer(false);
    setBudgetDrawer(false);
    setAddGuestDrawer(false);
    setAddMemberDrawer(false);
    setAddOwnerDrawer(false);
    setAddSupplierDrawer(false);
    setAddAppointmentDrawer(false);
    setEditEventNameDrawer(false);
    setWpUserQuestionDrawer(false);
    setGuestConfirmedDrawer(false);
    setAppointmentTypeDrawer(false);
    setCheckedListItemDrawer(false);
    setAddPlannerDrawer(false);
    setFriendsWindow(false);
    setMemberProfileWindow(false);
    setDeleteMemberDrawer(false);
    setNumberOfGuestDrawer(false);
  }, []);
  const closeAllSections = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
  }, []);

  const handleMyEventsDrawer = useCallback(() => {
    closeAllWindows();
    setMyEventsDrawer(!myEventsDrawer);
  }, [myEventsDrawer, closeAllWindows]);
  const handleEventInfoDrawer = useCallback(() => {
    closeAllWindows();
    setEventInfoDrawer(!eventInfoDrawer);
  }, [eventInfoDrawer, closeAllWindows]);
  const handleEditGuestDrawer = useCallback(
    (props: IEventGuest) => {
      closeAllWindows();
      setUpdated_guest(props);
      if (props.weplanUser === true) {
        setWeplanUser(true);
      } else {
        setWeplanUser(false);
      }

      return setEditGuestDrawer(!editGuestDrawer);
    },
    [editGuestDrawer, closeAllWindows],
  );
  const handleOwnerProfileWindow = useCallback(
    (props: IEventOwnerDTO) => {
      closeAllWindows();
      setOwner(props);
      setOwnerProfileWindow(true);
    },
    [closeAllWindows],
  );
  const handleMemberProfileWindow = useCallback(
    (props: IEventMemberDTO) => {
      closeAllWindows();
      setMember(props);
      setMemberProfileWindow(true);
    },
    [closeAllWindows],
  );

  const handleMembersWindow = useCallback(() => {
    closeAllWindows();
    setMembersWindow(!membersWindow);
  }, [membersWindow, closeAllWindows]);

  const handleEditCheckListItemWindow = useCallback(props => {
    setCheckListItem(props);
    setEditCheckListItemWindow(true);
  }, []);
  const handleGuestWindow = useCallback(props => {
    setGuestWindow(props);
  }, []);
  const handleBudgetDrawer = useCallback(() => {
    closeAllWindows();
    setBudgetDrawer(!budgetDrawer);
  }, [budgetDrawer, closeAllWindows]);
  const handleAddGuestDrawer = useCallback(() => {
    closeAllWindows();
    setAddGuestDrawer(!addGuestDrawer);
  }, [addGuestDrawer, closeAllWindows]);
  const handleWeplanGuestDrawer = useCallback(props => {
    setWpUserQuestionDrawer(props);
  }, []);
  const handleGuestConfirmedDrawer = useCallback(() => {
    setGuestConfirmedDrawer(!guestConfirmedDrawer);
  }, [guestConfirmedDrawer]);
  const handleAddSupplierDrawer = useCallback(() => {
    closeAllWindows();
    setAddSupplierDrawer(!addSupplierDrawer);
  }, [addSupplierDrawer, closeAllWindows]);
  const handleIsHiredDrawer = useCallback(() => {
    setIsHiredDrawer(!isHiredDrawer);
  }, [isHiredDrawer]);
  const handleAddAppointmentDrawer = useCallback(() => {
    closeAllWindows();
    setAddAppointmentDrawer(!addAppointmentDrawer);
  }, [addAppointmentDrawer, closeAllWindows]);
  const handleAppointmentTypeDrawer = useCallback(() => {
    setAppointmentTypeDrawer(!appointmentTypeDrawer);
  }, [appointmentTypeDrawer]);
  const handleEditEventNameDrawer = useCallback(() => {
    closeAllWindows();
    setEditEventNameDrawer(!editEventNameDrawer);
  }, [editEventNameDrawer, closeAllWindows]);
  const handleCheckedListItemDrawer = useCallback(() => {
    setCheckedListItemDrawer(!checkedListItemDrawer);
  }, [checkedListItemDrawer]);
  const handleEditAppointmentDrawer = useCallback(
    props => {
      closeAllWindows();
      setEditAppointmentDrawer(true);
      setAppointment(props);
    },
    [closeAllWindows],
  );
  const handleAddCheckListDrawer = useCallback(() => {
    closeAllWindows();
    setAddCheckListDrawer(!addCheckListDrawer);
  }, [addCheckListDrawer, closeAllWindows]);
  const handleAddMemberDrawer = useCallback(() => {
    closeAllWindows();
    setAddMemberDrawer(!addMemberDrawer);
    setFriendsWindow(!wpUserId);
  }, [addMemberDrawer, closeAllWindows, wpUserId]);
  const handleAddOwnerDrawer = useCallback(() => {
    closeAllWindows();
    setAddOwnerDrawer(!addOwnerDrawer);
    setFriendsWindow(!wpUserId);
  }, [addOwnerDrawer, closeAllWindows, wpUserId]);
  const handleAddPlannerDrawer = useCallback(() => {
    closeAllWindows();
    setAddPlannerDrawer(!addPlannerDrawer);
  }, [addPlannerDrawer, closeAllWindows]);

  const handleLatestActionsSection = useCallback(() => {
    closeAllSections();
    setLatestActionsSection(true);
  }, [closeAllSections]);
  const handleGuestsSection = useCallback(() => {
    closeAllSections();
    setGuestsSection(true);
  }, [closeAllSections]);
  const handleAppointmentsSection = useCallback(() => {
    closeAllSections();
    setAppointmentsSection(true);
  }, [closeAllSections]);
  const handleFinanceSection = useCallback(() => {
    closeAllSections();
    setFinanceSection(true);
  }, [closeAllSections]);
  const handleCheckListSection = useCallback(() => {
    closeAllSections();
    setCheckListSection(true);
  }, [closeAllSections]);
  const handleSupplierSection = useCallback(() => {
    closeAllSections();
    setSupplierSection(true);
  }, [closeAllSections]);
  const handleMessagesSection = useCallback(() => {
    closeAllSections();
    setMessagesSection(true);
  }, [closeAllSections]);

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
  const handleWeplanUserQuestion = useCallback(
    (weplan_user: boolean) => {
      if (weplan_user === true) {
        setWeplanUser(true);
        setWpUserQuestionDrawer(false);
        setFriendsWindow(true);
      } else {
        setWeplanUser(false);
        setWpUserQuestionDrawer(false);
        setWpUserName('');
        setWpUserId('');
      }
      return handleWeplanGuestDrawer(false);
    },
    [handleWeplanGuestDrawer],
  );
  const handleIsHiredQuestion = useCallback(
    (is_hired: boolean) => {
      if (is_hired === true) {
        setIsHiredMessage('Contratado S2!');
        setIsHired(true);
      } else {
        setIsHiredMessage('Avaliando ...');
        setIsHired(false);
      }
      return handleWeplanGuestDrawer(false);
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
      return setAppointmentTypeDrawer(false);
    },
    [],
  );

  const handleSelectedWeplanUser = useCallback((WPUser: IUserInfoDTO) => {
    setWpUserName(WPUser.name);
    setWpUserId(WPUser.id);
    setFriendsWindow(false);
  }, []);
  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);
  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  const handleGetAppointments = useCallback(() => {
    try {
      api
        .get<IAppointmentDTO[]>(`appointments/my-appointments`)
        .then(response =>
          setAppointments(
            response.data.map(ap => {
              const date = new Date(ap.date);
              const tillMinutes =
                setMinutes(date, ap.duration_minutes).getMinutes() < 10
                  ? `0${date.getMinutes()}`
                  : date.getMinutes();
              const tillHour =
                setMinutes(date, ap.duration_minutes).getHours() < 10
                  ? `0${date.getHours()}`
                  : date.getHours();
              const year = date.getFullYear();
              const month =
                date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
              const day =
                date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
              const hour =
                date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
              const minute =
                date.getMinutes() < 10
                  ? `0${date.getMinutes()}`
                  : date.getMinutes();
              return {
                id: ap.id,
                subject: ap.subject,
                duration_minutes: ap.duration_minutes,
                address: ap.address,
                date: `${hour}:${minute} às ${tillHour}:${tillMinutes} | ${day}/${month}/${year}`,
                start_hour: Number(hour),
                start_minute: Number(minute),
                days_till_date: differenceInCalendarDays(date, new Date()),
                weplanGuest: ap.weplanGuest,
                appointment_type: ap.appointment_type,
              };
            }),
          ),
        );
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const handleGetPlanners = useCallback(() => {
    try {
      api
        .get<IUserInfoDTO[]>(`events/${eventId}/event-planner`)
        .then(response => {
          setPlanners(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetOwners = useCallback(() => {
    try {
      api
        .get<IEventOwnerDTO[]>(`events/${eventId}/event-owners`)
        .then(response => {
          setOwners(response.data);
          setNumberOfOwners(response.data.length);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetMembers = useCallback(() => {
    try {
      api
        .get<IEventMemberDTO[]>(`events/${eventId}/event-members`)
        .then(response => {
          setMembers(response.data);
          setNumberOfMembers(response.data.length);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetCheckListItems = useCallback(() => {
    try {
      api
        .get<IEventCheckList[]>(`/events/${eventId}/check-list`)
        .then(response => {
          setCheckListItems(response.data);
          setResolvedCheckListItems(
            response.data.filter(item => item.checked === true).length,
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetEventInfo = useCallback(() => {
    console.log('Entrou aqui no get event info');
    try {
      api.get<IEventInfo>(`/events/${eventId}/event-info`).then(response => {
        console.log('552', response.data);
        setEventInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetFriends = useCallback(() => {
    try {
      eventId &&
        api.get<IUserInfoDTO[]>(`/users/friends/list`).then(response => {
          setFriends(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetEvents = useCallback(() => {
    try {
      eventId &&
        api.get<IEvent[]>('/events').then(response => {
          setMyEvents(response.data);
        });
    } catch (err) {
      throw Error(err);
    }
  }, [eventId]);
  const handleGetGuests = useCallback(() => {
    try {
      api.get<IEventGuest[]>(`/events/${eventId}/guests`).then(response => {
        setEventGuests(response.data);
        setConfirmedGuests(
          response.data.filter(guest => guest.confirmed === true).length,
        );
        setMyGuests(response.data.filter(guest => guest.host === user.name));
        setMyGuestsConfirmed(
          response.data.filter(
            guest => guest.host === user.name && guest.confirmed === true,
          ).length,
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId, user]);
  const handleGetEvent = useCallback(() => {
    try {
      api.get<IEvent>(`/events/${pageEvent.id}`).then(response => {
        const date = new Date(response.data.date);
        const year = date.getFullYear();
        const month =
          date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const hour =
          date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minute =
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        setEvent({
          id: response.data.id,
          name: response.data.name,
          trimmed_name: response.data.trimmed_name,
          date: `${hour}:${minute} - ${day}/${month}/${year}`,
          event_type: response.data.event_type,
          daysTillDate: differenceInCalendarDays(date, new Date()),
        });
      });
    } catch (err) {
      throw Error(err);
    }
  }, [pageEvent]);
  const handleAddSupplier = useCallback(
    async (data: ICreateSupplier) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          supplier_id: Yup.string(),
          supplier_sub_category: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post(`events/${eventId}/suppliers`, {
          supplier_id: data.supplier_id,
          supplier_sub_category: data.supplier_sub_category,
          isHired,
        });
        addToast({
          type: 'success',
          title: 'Fornecedor selecionado com Sucesso',
          description: 'Você já pode visualizar no dashboard do seu evento.',
        });
        handleAddSupplierDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao selecionar fornecedor',
          description: 'Erro selecionar fornecedor, tente novamente.',
        });
      }
    },
    [addToast, eventId, handleAddSupplierDrawer, isHired],
  );
  const handleAddCheckListItem = useCallback(
    async (data: ICreateCheckListItem) => {
      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          priority_level: Yup.string().required('Sobrenome é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post(`events/${eventId}/check-list`, {
          name: data.name,
          priority_level: data.priority_level,
          checked,
        });
        addToast({
          type: 'success',
          title: 'Item criado com Sucesso',
          description: 'O item foi adicionado à sua check-list.',
        });
        handleAddCheckListDrawer();
        handleGetCheckListItems();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao criar item da check-list',
          description: 'Erro  ao criar o item, tente novamente.',
        });
      }
    },
    [
      addToast,
      eventId,
      handleAddCheckListDrawer,
      handleGetCheckListItems,
      checked,
    ],
  );
  const handleAddPlanner = useCallback(async () => {
    try {
      await api.post(`events/${eventId}/event-planner`, {
        planner_id: wpUserId,
      });

      addToast({
        type: 'success',
        title: 'Cerimonialista adicionado com sucesso com Sucesso',
        description: 'O item foi adicionado à sua check-list.',
      });

      setWpUserId('');
      setWeplanUser(false);
      setWpUserName('');
      setAddPlannerDrawer(false);

      handleAddPlannerDrawer();
      handleGetPlanners();
    } catch (err) {
      setWpUserId('');
      setWeplanUser(false);
      setWpUserName('');
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao adicionar cerimonialista',
        description: 'Erro  ao adicionar cerimonialista, tente novamente.',
      });
    }
  }, [addToast, eventId, handleAddPlannerDrawer, handleGetPlanners, wpUserId]);
  const handleAddOwner = useCallback(
    async (data: IEventOwnerDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          description: Yup.string().required('Título é obrigatório.'),
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${eventId}/event-owners`, {
          owner_id: wpUserId,
          description: data.description,
          number_of_guests: data.number_of_guests,
        });

        addToast({
          type: 'success',
          title: 'Dono da festa adicionado com sucesso',
          description: 'Ele já pode contribuir com o evento.',
        });

        setWpUserId('');
        setWeplanUser(false);
        setWpUserName('');
        setAddOwnerDrawer(false);
        handleGetOwners();
      } catch (err) {
        setWpUserId('');
        setWeplanUser(false);
        setWpUserName('');
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar Dono da Festa',
          description: 'Erro ao adicionar Dono da Festa, tente novamente.',
        });
      }
    },
    [addToast, eventId, handleGetOwners, wpUserId],
  );
  const handleAddMember = useCallback(
    async (data: IEventMemberDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${eventId}/event-members`, {
          number_of_guests: Number(data.number_of_guests),
          member_id: wpUserId,
        });

        addToast({
          type: 'success',
          title: 'Membro da festa adicionado com sucesso',
          description: 'Ele já pode visualizar as informações do evento.',
        });
        setWpUserId('');
        setWeplanUser(false);
        setWpUserName('');

        setAddMemberDrawer(false);
        handleGetMembers();
      } catch (err) {
        setWpUserId('');
        setWeplanUser(false);
        setWpUserName('');
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar membro da festa',
          description: 'Erro ao adicionar membro da festa, tente novamente.',
        });
      }
    },
    [addToast, eventId, wpUserId, handleGetMembers],
  );
  const handleAddGuest = useCallback(
    async (data: ICreateGuest) => {
      try {
        formRef.current?.setErrors([]);

        if (weplanUser) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post(`events/${eventId}/guests`, {
            first_name: '0',
            last_name: '0',
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: wpUserId,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post(`events/${eventId}/guests`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: '0',
          });
        }

        setWpUserId('');
        setGuestConfirmedMessage('');
        setWeplanUser(false);
        setGuestConfirmed(false);
        setWpUserName('');

        handleAddGuestDrawer();
        handleGetGuests();

        return addToast({
          type: 'success',
          title: 'Convidado criado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        setWpUserId('');
        setGuestConfirmedMessage('');
        setWeplanUser(false);
        setGuestConfirmed(false);
        setWpUserName('');
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
        return addToast({
          type: 'error',
          title: 'Erro ao criar convidado',
          description: 'Erro ao criar o convidado, tente novamente.',
        });
      }
    },
    [
      addToast,
      eventId,
      handleAddGuestDrawer,
      weplanUser,
      guestConfirmed,
      wpUserId,
      handleGetGuests,
    ],
  );

  const handleEditEventInfo = useCallback(
    async (data: IEventInfo) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          duration: Yup.number(),
          number_of_guests: Yup.number(),
          budget: Yup.number(),
          description: Yup.string(),
          country: Yup.string(),
          local_state: Yup.string(),
          city: Yup.string(),
          address: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-info`, data);
        setEventInfo(data);
        setEditEventInfoDrawer(false);

        addToast({
          type: 'success',
          title: 'Informações editadas com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar informações do evento',
          description: 'Tente novamente.',
        });
      }
    },
    [addToast, eventId],
  );
  const handleEditGuest = useCallback(
    async (data: IEventGuest) => {
      console.log(data);
      try {
        formRef.current?.setErrors([]);

        if (weplanUser) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });
          console.log('guest', {
            first_name: updated_guest.first_name,
            last_name: updated_guest.last_name,
            description: data.description,
            confirmed: updated_guest.confirmed,
          });

          await api.put(`events/${eventId}/guests/${updated_guest.id}`, {
            first_name: updated_guest.first_name,
            last_name: updated_guest.last_name,
            description: data.description,
            confirmed: updated_guest.confirmed,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${eventId}/guests/${updated_guest.id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            confirmed: updated_guest.confirmed,
          });
        }

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditGuestDrawer(false);
        setWeplanUser(false);
        handleGetGuests();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
      }
    },
    [addToast, eventId, weplanUser, updated_guest, handleGetGuests],
  );
  const handleEditConfirmedGuest = useCallback(
    async (props: IEventGuest) => {
      try {
        await api.put(`events/${eventId}/guests/${props.id}`, {
          first_name: props.first_name,
          last_name: props.last_name,
          description: props.description,
          confirmed: !props.confirmed,
        });

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
        handleGetGuests();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
      }
    },
    [addToast, eventId, handleGetGuests],
  );
  const handleDeleteGuest = useCallback(async () => {
    try {
      await api.delete(`/events/${eventId}/guests/${updated_guest.id}`);

      addToast({
        type: 'success',
        title: 'Convidado excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setEditGuestDrawer(false);
      handleGetGuests();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir convidado',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [eventId, updated_guest, addToast, handleGetGuests]);
  const handleDeleteMember = useCallback(async () => {
    try {
      await api.delete(`/events/${eventId}/event-members/${member.id}`);

      addToast({
        type: 'success',
        title: 'Membro excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setMemberProfileWindow(false);
      setDeleteMemberDrawer(false);
      handleGetMembers();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir convidado',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [eventId, member, addToast, handleGetMembers]);
  const handleDeleteOwner = useCallback(async () => {
    try {
      await api.delete(`/events/${eventId}/event-owners/${owner.id}`);

      addToast({
        type: 'success',
        title: 'Anfitrião excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setOwnerProfileWindow(false);
      setDeleteOwnerDrawer(false);
      handleGetOwners();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir anfitrião',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [eventId, owner, addToast, handleGetOwners]);
  const handleEditMember = useCallback(
    async (data: IEventMemberDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-members/${member.id}`, {
          number_of_guests: Number(data.number_of_guests),
        });

        addToast({
          type: 'success',
          title: 'Membro editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setNumberOfGuestDrawer(false);
        setMemberProfileWindow(false);
        setMember({} as IEventMemberDTO);
        handleGetMembers();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar membro',
          description: 'Erro ao editar o membro, tente novamente.',
        });
      }
    },
    [addToast, eventId, member, handleGetMembers],
  );
  const handleEditOwner = useCallback(
    async (data: IEventOwnerDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          description: Yup.string(),
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-owners/${owner.id}`, {
          description: data.description,
          number_of_guests: Number(data.number_of_guests),
        });

        addToast({
          type: 'success',
          title: 'Anfitrião editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setOwnerProfileWindow(false);
        setEditOwnerDrawer(false);
        setOwner({} as IEventOwnerDTO);
        handleGetOwners();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar anfitrião',
          description: 'Erro ao editar o anfitrião, tente novamente.',
        });
      }
    },
    [addToast, eventId, owner, handleGetOwners],
  );
  const handleAddAppointment = useCallback(
    async (data: ICreateAppointment) => {
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

        await api.post(`/appointments`, {
          subject: data.subject,
          date,
          duration_minutes: Number(data.duration_minutes),
          address: data.address,
          weplanGuest: weplanUser,
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
      weplanUser,
      appointmentType,
      selectedDate,
    ],
  );
  const handleEditAppointment = useCallback(
    async (data: ICreateAppointment) => {
      try {
        console.log(data);
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

        await api.put(`/appointments/${appointment.id}`, {
          subject: data.subject,
          date,
          duration_minutes: Number(data.duration_minutes),
          address: data.address,
          weplanGuest: weplanUser,
          appointment_type: appointmentType,
        });

        addToast({
          type: 'success',
          title: 'Agendamento Criado com Sucesso',
          description:
            'Você já pode visualizar no seu dashboard de agendamentos.',
        });

        setEditAppointmentDrawer(false);
        handleGetAppointments();
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
      handleGetAppointments,
      weplanUser,
      appointmentType,
      selectedDate,
      appointment.id,
    ],
  );
  const handleCheckListChecked = useCallback(
    (item_checked: boolean) => {
      if (item_checked === true) {
        setCheckedListItemMessage('Feito! =D');
        setChecked(true);
      } else {
        setCheckedListItemMessage('Em progresso! No Worries ;D');
        setChecked(false);
      }
      return handleCheckedListItemDrawer();
    },
    [handleCheckedListItemDrawer],
  );
  const handleEditCheckListItem = useCallback(
    async (data: IEventCheckList) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          priority_level: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/check-list/${checkListItem.id}`, {
          name: data.name,
          priority_level: Number(data.priority_level),
          checked: checkListItem.checked,
        });

        addToast({
          type: 'success',
          title: 'Item editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditCheckListItemWindow(false);
        setCheckListItem({} as IEventCheckList);
        handleGetCheckListItems();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar item',
          description: 'Erro ao editar o item do check-list, tente novamente.',
        });
      }
    },
    [addToast, eventId, checkListItem, handleGetCheckListItems],
  );
  const handleEditCheckedCheckListItem = useCallback(
    async (data: IEventCheckList) => {
      try {
        await api.put(`events/${eventId}/check-list/${data.id}`, {
          name: data.name,
          priority_level: Number(data.priority_level),
          checked: !data.checked,
        });

        addToast({
          type: 'success',
          title: 'Item editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditCheckListItemWindow(false);
        setCheckListItem({} as IEventCheckList);
        handleGetCheckListItems();
      } catch (err) {
        throw new Error(err);

        addToast({
          type: 'error',
          title: 'Erro ao editar item',
          description: 'Erro ao editar o item do check-list, tente novamente.',
        });
      }
    },
    [addToast, eventId, handleGetCheckListItems],
  );
  const handleDeleteCheckListItem = useCallback(async () => {
    try {
      await api.delete(`events/${eventId}/check-list/${checkListItem.id}`);

      addToast({
        type: 'success',
        title: 'Item deletado com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setEditCheckListItemWindow(false);
      setCheckListItem({} as IEventCheckList);
      handleGetCheckListItems();
    } catch (err) {
      throw new Error(err);

      addToast({
        type: 'error',
        title: 'Erro ao deletar item',
        description: 'Erro ao deletar o item do check-list, tente novamente.',
      });
    }
  }, [addToast, eventId, checkListItem, handleGetCheckListItems]);

  const handleMyEventDashboard = useCallback(
    (my_event: IEvent) => {
      closeAllWindows();
      setEventId(my_event.id);
      return history.push(`/dashboard/my-event/${my_event.trimmed_name}`, {
        params: my_event,
      });
    },
    [closeAllWindows, history],
  );

  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);
  useEffect(() => {
    handleGetEvent();
  }, [handleGetEvent]);
  useEffect(() => {
    handleGetCheckListItems();
  }, [handleGetCheckListItems]);
  useEffect(() => {
    handleGetFriends();
  }, [handleGetFriends]);
  useEffect(() => {
    handleGetGuests();
  }, [handleGetGuests]);
  useEffect(() => {
    handleGetPlanners();
  }, [handleGetPlanners]);
  useEffect(() => {
    handleGetOwners();
  }, [handleGetOwners]);
  useEffect(() => {
    handleGetMembers();
  }, [handleGetMembers]);
  useEffect(() => {
    handleGetEventInfo();
  }, [handleGetEventInfo]);
  useEffect(() => {
    handleGetAppointments();
  }, [handleGetAppointments]);

  let guestCount = 0;
  let myGuestCount = 0;
  console.log(appointments);
  return (
    <Container>
      <MenuButton />
      <PageHeader />
      {/* {!!wpUserWindow && (
        <UserProfile
          user={profileUser}
          onChildClick={() => setWpUserWindow(false)}
        />
      )} */}
      {!!ownerProfileWindow && (
        <OwnerProfileDrawer
          owner={owner}
          onHandleOwnerDrawer={() => setOwnerProfileWindow(false)}
          onHandleNumberOfGuestDrawer={() => setEditOwnerDrawer(true)}
          onHandleDeleteOwnerDrawer={() => setDeleteOwnerDrawer(true)}
        />
      )}
      {!!memberProfileWindow && (
        <MemberProfileDrawer
          member={member}
          onHandleMemberDrawer={() => setMemberProfileWindow(false)}
          onHandleNumberOfGuestDrawer={() => setNumberOfGuestDrawer(true)}
          onHandleDeleteMemberDrawer={() => setDeleteMemberDrawer(true)}
        />
      )}
      {!!numberOfGuestDrawer && (
        <Form ref={formRef} onSubmit={handleEditMember}>
          <NumberOfGuestWindow>
            <span>
              <button
                type="button"
                onClick={() => setNumberOfGuestDrawer(false)}
              >
                <MdClose size={30} />
              </button>
            </span>
            <h1>Número de convidados</h1>

            <Input
              name="number_of_guests"
              type="number"
              defaultValue={member.number_of_guests}
            />

            <button type="submit">Salvar</button>
          </NumberOfGuestWindow>
        </Form>
      )}
      {!!editOwnerDrawer && (
        <Form ref={formRef} onSubmit={handleEditOwner}>
          <NumberOfGuestWindow>
            <span>
              <button type="button" onClick={() => setEditOwnerDrawer(false)}>
                <MdClose size={30} />
              </button>
            </span>
            <h1>Número de convidados</h1>

            <Input
              name="description"
              type="text"
              defaultValue={owner.description}
            />
            <Input
              name="number_of_guests"
              type="number"
              defaultValue={owner.number_of_guests}
            />
            <button type="submit">Salvar</button>
          </NumberOfGuestWindow>
        </Form>
      )}
      {!!deleteMemberDrawer && (
        <Form ref={formRef} onSubmit={handleDeleteMember}>
          <WeplanUserDrawer>
            <h1>Deseja mesmo deletar o membro?</h1>
            <div>
              <button type="button" onClick={handleDeleteMember}>
                Sim
              </button>
              <button
                type="button"
                onClick={() => setDeleteMemberDrawer(false)}
              >
                Não
              </button>
            </div>
          </WeplanUserDrawer>
        </Form>
      )}
      {!!deleteOwnerDrawer && (
        <Form ref={formRef} onSubmit={handleDeleteOwner}>
          <WeplanUserDrawer>
            <h1>Deseja mesmo deletar o anfitrião?</h1>
            <div>
              <button type="button" onClick={handleDeleteOwner}>
                Sim
              </button>
              <button type="button" onClick={() => setDeleteOwnerDrawer(false)}>
                Não
              </button>
            </div>
          </WeplanUserDrawer>
        </Form>
      )}
      {!!friendsWindow && (
        <FriendsListDrawer
          friends={friends}
          onHandleFriendsListDrawer={() => setFriendsWindow(false)}
          handleSelectedFriend={(friend: IUserInfoDTO) =>
            handleSelectedWeplanUser(friend)}
        />
      )}
      {!!eventInfoDrawer && (
        <EventInfoDrawer>
          <span>
            <button type="button" onClick={handleEventInfoDrawer}>
              <MdClose size={30} />
            </button>
          </span>
          <h1>Informações do evento</h1>
          <h2>{event.name}</h2>
          <EventInfo>
            <span>
              <div>
                <div>
                  <p>Duração: </p>
                  <h3>{eventInfo.duration}</h3>
                </div>
                <div>
                  <p>N° de convidados: </p>
                  <h3>{eventInfo.number_of_guests}</h3>
                </div>
                <div>
                  <p>Orçamento: </p>
                  <h3>{eventInfo.budget}</h3>
                </div>
              </div>
              <div>
                <div>
                  <p>País: </p>
                  <h3>{eventInfo.country}</h3>
                </div>
                <div>
                  <p>Estado: </p>
                  <h3>{eventInfo.local_state}</h3>
                </div>
                <div>
                  <p>Cidade: </p>
                  <h3>{eventInfo.city}</h3>
                </div>
              </div>
            </span>
            <div>
              <p>Endereço: </p>
              <h3>{eventInfo.address}</h3>
            </div>
          </EventInfo>
          <button type="button" onClick={() => setEditEventInfoDrawer(true)}>
            <h3>
              Editar <FiEdit3 size={24} />
            </h3>
          </button>
        </EventInfoDrawer>
      )}
      {!!addCheckListDrawer && (
        <Form ref={formRef} onSubmit={handleAddCheckListItem}>
          <AddCheckListDrawer>
            <span>
              <button type="button" onClick={handleAddCheckListDrawer}>
                <MdClose size={30} />
              </button>
            </span>
            <h1>Adicionar</h1>

            {CheckedListItemMessage === '' ? (
              <button type="button" onClick={handleCheckedListItemDrawer}>
                Tarefa realizada ?
              </button>
            ) : (
              <h1>
                <button type="button" onClick={handleCheckedListItemDrawer}>
                  {CheckedListItemMessage}
                </button>
              </h1>
            )}
            {!!checkedListItemDrawer && (
              <CheckedListItemDrawer>
                <h1>Tarefa Realizada?</h1>
                <div>
                  <button
                    type="button"
                    onClick={() => handleCheckListChecked(true)}
                  >
                    Sim!
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCheckListChecked(false)}
                  >
                    Ainda não ...
                  </button>
                </div>
              </CheckedListItemDrawer>
            )}
            <Input name="name" type="text" placeholder="Nome" />

            <Input
              name="priority_level"
              type="text"
              placeholder="Nível de prioridade (1 a 5)"
            />

            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </AddCheckListDrawer>
        </Form>
      )}
      {!!editCheckListItemWindow && (
        <Form ref={formRef} onSubmit={handleEditCheckListItem}>
          <AddCheckListDrawer>
            <span>
              <button
                type="button"
                onClick={() => setEditCheckListItemWindow(false)}
              >
                <MdClose size={30} />
              </button>
            </span>
            <h1>Número de convidados</h1>

            <Input name="name" type="text" defaultValue={checkListItem.name} />
            <Input
              name="priority_level"
              type="number"
              defaultValue={checkListItem.priority_level}
            />
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleDeleteCheckListItem}>
              Deletar
            </button>
          </AddCheckListDrawer>
        </Form>
      )}
      {!!deleteMemberDrawer && (
        <Form ref={formRef} onSubmit={handleDeleteMember}>
          <WeplanUserDrawer>
            <h1>Deseja mesmo deletar o membro?</h1>
            <div>
              <button type="button" onClick={handleDeleteMember}>
                Sim
              </button>
              <button
                type="button"
                onClick={() => setDeleteMemberDrawer(false)}
              >
                Não
              </button>
            </div>
          </WeplanUserDrawer>
        </Form>
      )}
      {!!addAppointmentDrawer && (
        <Form ref={formRef} onSubmit={handleAddAppointment}>
          <AddAppointmentDrawer>
            <div>
              <div>
                <span>
                  <button type="button" onClick={handleAddAppointmentDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Adicionar Compromisso</h1>

                <Input name="subject" type="text" placeholder="Assunto" />

                <Input type="text" placeholder="Hora" name="start_hour" />
                <Input type="text" placeholder="Minuto" name="start_minute" />
                <Input
                  name="duration_minutes"
                  type="number"
                  placeholder="Duração em minutos"
                />
              </div>
              <span>
                <div>
                  {wpUserName === '' ? (
                    <button
                      type="button"
                      onClick={() => setWpUserQuestionDrawer(true)}
                    >
                      Fornecedor Weplan ?
                    </button>
                  ) : (
                    <h1>
                      <button
                        type="button"
                        onClick={() => setWpUserQuestionDrawer(true)}
                      >
                        {wpUserName}
                      </button>
                    </h1>
                  )}
                  {appointmentType === '' ? (
                    <button type="button" onClick={handleAppointmentTypeDrawer}>
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
                <Input name="address" type="text" placeholder="Endereço" />
              </span>
            </div>
            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </AddAppointmentDrawer>
        </Form>
      )}
      {!!editAppointmentDrawer && (
        <Form ref={formRef} onSubmit={handleEditAppointment}>
          <AddAppointmentDrawer>
            <div>
              <div>
                <span>
                  <button type="button" onClick={handleEditAppointmentDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Editar Compromisso</h1>

                <Input
                  name="subject"
                  type="text"
                  defaultValue={appointment.subject}
                  placeholder="Assunto"
                />

                <Input
                  type="text"
                  defaultValue={appointment.start_hour}
                  placeholder="Hora"
                  name="start_hour"
                />
                <Input
                  type="text"
                  defaultValue={appointment.start_minute}
                  placeholder="Minuto"
                  name="start_minute"
                />
                <Input
                  name="duration_minutes"
                  type="number"
                  defaultValue={appointment.duration_minutes}
                  placeholder="Duração em minutos"
                />
              </div>
              <span>
                <div>
                  <h1>
                    <button
                      type="button"
                      onClick={() => setWpUserQuestionDrawer(true)}
                    >
                      {appointment.weplanGuest
                        ? 'Fornecedor Weplan ?'
                        : wpUserName}
                    </button>
                  </h1>
                  <h1>
                    <button type="button" onClick={handleAppointmentTypeDrawer}>
                      {appointment.appointment_type}
                    </button>
                  </h1>
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
                  defaultValue={appointment.address}
                />
              </span>
            </div>
            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </AddAppointmentDrawer>
        </Form>
      )}
      <EventPageContent>
        <SideBar>
          <MyEvents>
            <MyEventsDrawerButton type="button" onClick={handleMyEventsDrawer}>
              <h1>Meus Eventos</h1>
              {myEventsDrawer ? (
                <span>
                  <FiChevronUp size={30} />
                </span>
              ) : (
                <span>
                  <FiChevronDown size={30} />
                </span>
              )}
            </MyEventsDrawerButton>
            {myEventsDrawer && (
              <MyEventsDrawer>
                {myEvents.map(myEvent => (
                  <button
                    type="button"
                    onClick={() => handleMyEventDashboard(myEvent)}
                    key={myEvent.id}
                  >
                    {myEvent.name}
                    <span>
                      <FiChevronRight size={24} />
                    </span>
                  </button>
                ))}
              </MyEventsDrawer>
            )}
          </MyEvents>
          <button type="button" onClick={handleEventInfoDrawer}>
            Informações do Evento
          </button>

          {!!editEventInfoDrawer && (
            <Form ref={formRef} onSubmit={handleEditEventInfo}>
              <EditEventInfoDrawer>
                <span>
                  <button
                    type="button"
                    onClick={() => setEditEventInfoDrawer(false)}
                  >
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Editar informações do evento</h1>
                <div>
                  <div>
                    <Input
                      defaultValue={eventInfo.duration}
                      name="duration"
                      type="number"
                      placeholder="Duração (em horas)"
                    />
                    <Input
                      defaultValue={eventInfo.number_of_guests}
                      name="number_of_guests"
                      type="number"
                      placeholder="Número de convidados"
                    />
                    <Input
                      defaultValue={eventInfo.budget}
                      name="budget"
                      type="number"
                      placeholder="Orçamento"
                    />
                  </div>
                  <div>
                    <Input
                      defaultValue={eventInfo.country}
                      name="country"
                      type="text"
                      placeholder="País"
                    />
                    <Input
                      defaultValue={eventInfo.local_state}
                      name="local_state"
                      type="text"
                      placeholder="Estado"
                    />
                    <Input
                      defaultValue={eventInfo.city}
                      name="city"
                      type="text"
                      placeholder="Cidade"
                    />
                  </div>
                  <Input
                    defaultValue={eventInfo.address}
                    name="address"
                    type="text"
                    placeholder="Endereço"
                  />
                </div>
                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </EditEventInfoDrawer>
            </Form>
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
          <button type="button" onClick={handleAddPlannerDrawer}>
            <h1>Cerimonialistas</h1>
            <MdPersonAdd size={24} />
          </button>

          {!!addPlannerDrawer && (
            <Form ref={formRef} onSubmit={handleAddPlanner}>
              <AddPlannerDrawer>
                <span>
                  <button type="button" onClick={handleAddPlannerDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Adicionar Cerimonialista</h1>

                <Input
                  name="planner_id"
                  type="text"
                  placeholder="Qual o id do cerimonialista?"
                />

                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </AddPlannerDrawer>
            </Form>
          )}

          {planners.map(planner => (
            <span key={planner.id}>
              <button type="button">
                <h2>{planner.name}</h2>
              </button>
            </span>
          ))}

          <button type="button" onClick={handleAddOwnerDrawer}>
            <h1>Anfitriões: {numberOfOwners}</h1>
            <MdPersonAdd size={24} />
          </button>

          {!!addOwnerDrawer && (
            <Form ref={formRef} onSubmit={handleAddOwner}>
              <AddOwnerDrawer>
                <span>
                  <button type="button" onClick={handleAddOwnerDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Adicionar Anfitrião</h1>
                {wpUserId === '' && (
                  <button type="button" onClick={() => setFriendsWindow(true)}>
                    Escolher usuário
                  </button>
                )}

                <Input
                  name="description"
                  type="text"
                  placeholder="Título do Anfitrião (Noiva, Mãe da noiva, ...)"
                />
                <p>Número de convidados é opcional</p>
                <Input name="number_of_guests" type="number" defaultValue={0} />
                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </AddOwnerDrawer>
            </Form>
          )}

          {owners.map(eventOwner => (
            <span key={eventOwner.id}>
              <button
                type="button"
                onClick={() => handleOwnerProfileWindow(eventOwner)}
              >
                <h2>{eventOwner.name}</h2>
              </button>
            </span>
          ))}

          <button type="button" onClick={handleAddMemberDrawer}>
            <h1>Membros: {numberOfMembers}</h1>
            <MdPersonAdd size={24} />
          </button>

          {!!addMemberDrawer && (
            <Form ref={formRef} onSubmit={handleAddMember}>
              <AddMemberDrawer>
                <span>
                  <button type="button" onClick={handleAddMemberDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>

                <h1>Adicionar Membro</h1>

                {wpUserId === '' && (
                  <button type="button" onClick={() => setFriendsWindow(true)}>
                    Escolher usuário
                  </button>
                )}

                <p>Número de convidados é opcional</p>
                <Input name="number_of_guests" type="number" defaultValue={0} />

                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </AddMemberDrawer>
            </Form>
          )}

          <span>
            <button type="button" onClick={handleMembersWindow}>
              <h2>Visualizar</h2>
            </button>
          </span>

          {!!membersWindow && (
            <MembersWindow>
              <span>
                <h1>{event.name}</h1>

                <button type="button" onClick={handleMembersWindow}>
                  <MdClose size={30} />
                </button>

                <div>
                  <h1>Membros:</h1>
                  <strong>{members.length}</strong>
                </div>
              </span>

              <MembersContainer>
                {members.map(eventMember => (
                  <button
                    key={eventMember.id}
                    type="button"
                    onClick={() => handleMemberProfileWindow(eventMember)}
                  >
                    <img
                      src={
                        eventMember.avatar === ''
                          ? avatar_placeholder
                          : eventMember.avatar
                      }
                      alt={eventMember.name}
                    />

                    <h1>{eventMember.name}</h1>
                  </button>
                ))}
              </MembersContainer>
            </MembersWindow>
          )}
        </SideBar>
        <Main>
          <SubHeader>
            <span>
              <h1>{event.name}</h1>
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
                  <h2>Convidados</h2>
                  <p>
                    {confirmedGuests}/{eventGuests.length}
                  </p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleBudgetDrawer}>
                  <h2>Orçamento</h2>
                  <p>R$ {eventInfo.budget ? eventInfo.budget : ''}</p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleAppointmentsSection}>
                  <h2>Compromissos</h2>
                  <p>{appointments.length}</p>
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
                  <h2>Check-List</h2>
                  <p>
                    {resolvedCheckListItems}/{checkListItems.length}
                  </p>
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
                <Form ref={formRef} onSubmit={handleAddSupplier}>
                  <AddSupplierDrawer>
                    <span>
                      <button type="button" onClick={handleAddSupplierDrawer}>
                        <MdClose size={30} />
                      </button>
                    </span>
                    <h1>Adicionar Fornecedor</h1>

                    {isHiredMessage === '' ? (
                      <button type="button" onClick={handleIsHiredDrawer}>
                        Contratado?
                      </button>
                    ) : (
                      <h1>
                        <button type="button" onClick={handleIsHiredDrawer}>
                          {isHiredMessage}
                        </button>
                      </h1>
                    )}
                    {!!isHiredDrawer && (
                      <IsHiredDrawer>
                        <h1>Fornecedor contratado?</h1>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleIsHiredQuestion(true)}
                          >
                            Sim
                          </button>
                          <button
                            type="button"
                            onClick={() => handleIsHiredQuestion(false)}
                          >
                            Não
                          </button>
                        </div>
                      </IsHiredDrawer>
                    )}
                    <Input
                      name="supplier_id"
                      type="text"
                      placeholder="ID do fornecedor"
                    />
                    <Input
                      name="supplier_sub_category"
                      type="text"
                      placeholder="Qual o serviço contratado?"
                    />
                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </AddSupplierDrawer>
                </Form>
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
                    <button type="button">
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
              <span>
                <GuestNavigationButton
                  myGuestActive={guestWindow}
                  type="button"
                  onClick={() => handleGuestWindow(true)}
                >
                  Convidados da Festa
                </GuestNavigationButton>

                <GuestNavigationButton
                  type="button"
                  onClick={() => handleGuestWindow(false)}
                  myGuestActive={!guestWindow}
                >
                  Meus Convidados
                </GuestNavigationButton>

                <span>
                  <button type="button" onClick={handleAddGuestDrawer}>
                    <MdPersonAdd size={30} />
                  </button>
                </span>
              </span>

              {!guestWindow && (
                <h3>
                  {myGuestsConfirmed}/{myGuests.length}
                </h3>
              )}

              {guestWindow && (
                <h3>
                  {confirmedGuests}/{eventGuests.length}
                </h3>
              )}

              <div>
                {guestWindow &&
                  eventGuests.map(eGuest => {
                    guestCount += 1;

                    return (
                      <Guest key={eGuest.id}>
                        <span>
                          <p>{guestCount}</p>
                          {eGuest.host === user.name ? (
                            <button
                              type="button"
                              onClick={() => handleEditGuestDrawer(eGuest)}
                            >
                              <strong>{eGuest.first_name}</strong>{' '}
                              {eGuest.last_name}
                              <FiEdit3 size={16} />
                            </button>
                          ) : (
                            <NotHostGuest title={notHostMessage}>
                              <strong>{eGuest.first_name}</strong>{' '}
                              {eGuest.last_name}
                            </NotHostGuest>
                          )}
                        </span>

                        {eGuest.weplanUser && (
                          <button type="button">
                            <FiUser size={24} />
                          </button>
                        )}

                        {eGuest.host === user.name ? (
                          <div>
                            <button
                              type="button"
                              onClick={() => handleEditConfirmedGuest(eGuest)}
                            >
                              {eGuest.confirmed ? (
                                <FiCheckSquare size={24} />
                              ) : (
                                <FiSquare size={24} />
                              )}
                            </button>
                          </div>
                        ) : (
                          <div>
                            <NotHostGuest title={notHostMessage}>
                              {eGuest.confirmed ? (
                                <FiCheckSquare size={24} />
                              ) : (
                                <FiSquare size={24} />
                              )}
                            </NotHostGuest>
                          </div>
                        )}
                      </Guest>
                    );
                  })}

                {!guestWindow &&
                  myGuests.map(mGuest => {
                    myGuestCount += 1;
                    return (
                      <Guest key={mGuest.id}>
                        <span>
                          <p>{myGuestCount}</p>
                          <button
                            type="button"
                            onClick={() => handleEditGuestDrawer(mGuest)}
                          >
                            <strong>{mGuest.first_name}</strong>{' '}
                            {mGuest.last_name}
                            <FiEdit3 size={16} />
                          </button>
                        </span>
                        {mGuest.weplanUser && (
                          <button type="button">
                            <FiUser size={24} />
                          </button>
                        )}
                        <div>
                          <button
                            key={mGuest.id}
                            type="button"
                            onClick={() => handleEditConfirmedGuest(mGuest)}
                          >
                            {mGuest.confirmed ? (
                              <FiCheckSquare size={24} />
                            ) : (
                              <FiSquare size={24} />
                            )}
                          </button>
                        </div>
                      </Guest>
                    );
                  })}
              </div>
              {!!addGuestDrawer && (
                <Form ref={formRef} onSubmit={handleAddGuest}>
                  <AddGuestDrawer>
                    <span>
                      <button type="button" onClick={handleAddGuestDrawer}>
                        <MdClose size={30} />
                      </button>
                    </span>
                    <h1>Adicionar Convidado</h1>

                    {!weplanUser && (
                      <>
                        <Input
                          name="first_name"
                          type="text"
                          placeholder="Nome"
                        />
                        <Input
                          name="last_name"
                          type="text"
                          placeholder="Sobrenome"
                        />
                      </>
                    )}

                    <Input
                      name="description"
                      type="text"
                      defaultValue="Descrição"
                    />

                    <div>
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
                      {wpUserName === '' ? (
                        <button
                          type="button"
                          onClick={() => setWpUserQuestionDrawer(true)}
                        >
                          Convidado Weplan ?
                        </button>
                      ) : (
                        <h1>
                          <button
                            type="button"
                            onClick={() => setWpUserQuestionDrawer(true)}
                          >
                            {wpUserName}
                          </button>
                        </h1>
                      )}
                    </div>

                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </AddGuestDrawer>
                </Form>
              )}
            </GuestSection>
          )}
          {editGuestDrawer && (
            <Form ref={formRef} onSubmit={handleEditGuest}>
              <AddGuestDrawer>
                <span>
                  <button
                    type="button"
                    onClick={() => setEditGuestDrawer(false)}
                  >
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Editar Convidado</h1>

                {!updated_guest.weplanUser && (
                  <>
                    <Input
                      defaultValue={updated_guest.first_name}
                      name="first_name"
                      type="text"
                      placeholder="Nome"
                    />
                    <Input
                      defaultValue={updated_guest.last_name}
                      name="last_name"
                      type="text"
                      placeholder="Sobrenome"
                    />
                  </>
                )}
                <Input
                  defaultValue={updated_guest.description}
                  name="description"
                  type="text"
                  placeholder="Alguma descrição necessária?"
                />

                <button type="submit">
                  <h3>Salvar</h3>
                </button>

                <button type="button" onClick={handleDeleteGuest}>
                  <h3>Deletar</h3>
                </button>
              </AddGuestDrawer>
            </Form>
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
          {!!wpUserQuestionDrawer && (
            <WeplanUserDrawer>
              <h1>É usuário WePlan?</h1>
              <div>
                <button
                  type="button"
                  onClick={() => handleWeplanUserQuestion(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  onClick={() => handleWeplanUserQuestion(false)}
                >
                  Não
                </button>
              </div>
            </WeplanUserDrawer>
          )}
          {!!appointmentsSection && (
            <Appointments>
              {/* <NextAppointment>
                <h1>Próximo Compromisso</h1>
                <div>
                  <div>
                    <h1>Rullus Buffet</h1>
                    <span>17/10/2020 - 14:00</span>
                  </div>

                  <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                </div>
              </NextAppointment> */}
              <MyAppointments>
                <h1>Meus Compromissos</h1>
                <button type="button" onClick={handleAddAppointmentDrawer}>
                  <MdAdd size={30} />
                </button>
                <div>
                  {appointments.map(thisAppointment => (
                    <Appointment
                      type="button"
                      key={thisAppointment.id}
                      onClick={() =>
                        handleEditAppointmentDrawer(thisAppointment)
                      }
                    >
                      <div>
                        <h1>{thisAppointment.subject}</h1>
                        <span>
                          Faltam {thisAppointment.days_till_date} dias
                        </span>
                        <span>{thisAppointment.date}</span>
                      </div>
                      <p>Endereço: {thisAppointment.address}</p>
                    </Appointment>
                  ))}
                </div>
              </MyAppointments>
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
              <button type="button" onClick={handleAddCheckListDrawer}>
                <MdAdd size={30} />
              </button>
              <ul>
                {checkListItems.map(item => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleEditCheckListItemWindow(item)}
                    >
                      <span>{item.name}</span>
                    </button>
                    <span>prioridade: {item.priority_level}</span>
                    <button
                      type="button"
                      onClick={() => handleEditCheckedCheckListItem(item)}
                    >
                      {item.checked ? (
                        <FiCheckSquare size={24} />
                      ) : (
                        <FiSquare size={24} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </CheckList>
          )}
        </Main>
      </EventPageContent>
    </Container>
  );
};

export default EventHostDashboard;
