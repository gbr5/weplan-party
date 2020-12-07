import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import * as Yup from 'yup';
import {
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiEdit3,
  FiChevronLeft,
  FiEdit,
} from 'react-icons/fi';
import { MdPersonAdd } from 'react-icons/md';
import { differenceInCalendarDays } from 'date-fns/esm';
import { useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  Container,
  EventPageContent,
  FirstRow,
  SideBar,
  Main,
  BudgetDrawer,
} from './styles';
import PageHeader from '../../components/PageHeader';

import api from '../../services/api';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';
import MemberProfileDrawer from '../../components/MemberProfileDrawer';
import OwnerProfileDrawer from '../../components/OwnerProfileDrawer';
import WindowContainer from '../../components/WindowContainer';
import EventFinanceSection from '../../components/EventFinanceSection';
import { numberFormat } from '../../utils/numberFormat';
import IListEventDTO from '../../dtos/IListEventDTO';
import IFriendDTO from '../../dtos/IFriendDTO';

import EditEventNameWindow from '../../components/EditEventNameWindow';
import IEventMemberDTO from '../../dtos/IEventMemberDTO';
import EditMemberNumberOfGuestsWindow from '../../components/EditEventMemberNumberOfGuestsWindow';
import EditEventOwnerWindow from '../../components/EditEventOwnerWindow';
import DeleteConfirmationWindow from '../../components/DeleteConfirmationWindow';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';
import EventCheckListSection from '../../components/EventCheckListSection';
import EventGuestSection from '../../components/EventGuestSection';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';
import IEventCheckListDTO from '../../dtos/IEventCheckListDTO';
import EventSupplierSection from '../../components/EventSupplierSection';
import AddMemberWindow from '../../components/AddMemberWindow';
import AddOwnerWindow from '../../components/AddOwnerWindow';
import FriendsListDrawer from '../../components/FriendsListDrawer';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';
import EventInfoWindow from '../../components/EventInfoWindow';
import MembersWindow from '../../components/MembersWindow';
import EditEventInfoWindow from '../../components/EditEventInfoWindow';
import AddPlannerWindow from '../../components/AddPlannerWindow';
import MessageSection from '../../components/MessageSection';
import LatestNewsSection from '../../components/LatestNewsSection';

interface IEvent {
  id: string;
  name: string;
  trimmed_name: string;
  date: string;
  event_type: string;
  daysTillDate: number;
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
interface IEventParams {
  params: {
    id: string;
    name: string;
    trimmed_name: string;
    number_of_guests: number;
    isOwner: boolean;
    owner_master: string;
    isGuest: boolean;
    event_type: string;
    date: Date | string;
    daysTillDate: number;
  };
}
interface IUserInfoDTO {
  id: string;
  name: string;
  avatar: string;
}

const EventHostDashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const location = useLocation<IEventParams>();
  const { user } = useAuth();

  const pageEvent = location.state.params;

  const eventId = pageEvent.id;

  const [checkListSection, setCheckListSection] = useState(false);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<IFriendDTO>(
    {} as IFriendDTO,
  );

  const handleSeletedFriend = useCallback(
    (props: IFriendDTO) => {
      if (selectedFriend.id === props.id) {
        return setSelectedFriend({} as IFriendDTO);
      }
      return setSelectedFriend(props);
    },
    [selectedFriend],
  );

  const [event, setEvent] = useState<IListEventDTO>({} as IListEventDTO);
  const [friends, setFriends] = useState<IFriendDTO[]>([]);

  const [eventGuests, setEventGuests] = useState<IEventGuest[]>([]);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myGuests, setMyGuests] = useState<IEventGuest[]>([]);
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [planners, setPlanners] = useState<IUserInfoDTO[]>([]);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [owner, setOwner] = useState<IEventOwnerDTO>({} as IEventOwnerDTO);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [member, setMember] = useState<IEventMemberDTO>({} as IEventMemberDTO);
  const [membersWindow, setMembersWindow] = useState(false);
  const [eventInfo, setEventInfo] = useState<IEventInfoDTO>(
    {} as IEventInfoDTO,
  );
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [editEventInfoDrawer, setEditEventInfoDrawer] = useState(false);
  const [budgetDrawer, setBudgetDrawer] = useState(false);
  const [editEventNameDrawer, setEditEventNameDrawer] = useState(false);
  const [latestActionsSection, setLatestActionsSection] = useState(true);
  const [guestsSection, setGuestsSection] = useState(false);
  const [financeSection, setFinanceSection] = useState(false);
  const [supplierSection, setSupplierSection] = useState(false);
  const [messagesSection, setMessagesSection] = useState(false);

  const [addPlannerDrawer, setAddPlannerDrawer] = useState(false);
  const [addOwnerDrawer, setAddOwnerDrawer] = useState(false);
  const [addMemberDrawer, setAddMemberDrawer] = useState(false);
  const [memberProfileWindow, setMemberProfileWindow] = useState(false);
  const [ownerProfileWindow, setOwnerProfileWindow] = useState(false);
  const [numberOfGuestDrawer, setNumberOfGuestDrawer] = useState(false);
  const [editOwnerDrawer, setEditOwnerDrawer] = useState(false);
  const [deleteMemberDrawer, setDeleteMemberDrawer] = useState(false);
  const [deleteOwnerDrawer, setDeleteOwnerDrawer] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<
    ISelectedSupplierDTO
  >({} as ISelectedSupplierDTO);

  const [hiredSuppliers, setHiredSuppliers] = useState<ISelectedSupplierDTO[]>(
    [],
  );
  const [selectedSuppliers, setSelectedSuppliers] = useState<
    ISelectedSupplierDTO[]
  >([]);
  const [numberOfOwners, setNumberOfOwners] = useState(0);
  const [numberOfMembers, setNumberOfMembers] = useState(0);
  const [numberOfPlanners, setNumberOfPlanners] = useState(0);
  const [eventDate, setEventDate] = useState(new Date());
  const [firstRow, setFirstRow] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [inProgressCheckListTasks, setInProgressCheckListTasks] = useState<
    IEventCheckListDTO[]
  >([]);
  const [resolvedCheckListTasks, setResolvedCheckListTasks] = useState<
    IEventCheckListDTO[]
  >([]);
  const [notStartedCheckListTasks, setNotStartedCheckListTasks] = useState<
    IEventCheckListDTO[]
  >([]);
  const [totalGuestNumber, setTotalGuestNumber] = useState(0);
  const [checkListTasks, setCheckListTasks] = useState(0);

  const closeAllWindows = useCallback(() => {
    setEventInfoDrawer(false);
    setBudgetDrawer(false);
    setAddMemberDrawer(false);
    setAddOwnerDrawer(false);
    setEditEventNameDrawer(false);
    setAddPlannerDrawer(false);
    setMemberProfileWindow(false);
    setDeleteMemberDrawer(false);
    setNumberOfGuestDrawer(false);
  }, []);

  const handleFirstRow = useCallback(() => {
    setFirstRow(!firstRow);
    setSidebar(false);
    closeAllWindows();
  }, [firstRow, closeAllWindows]);
  const handleSideBar = useCallback(() => {
    setSidebar(!sidebar);
    setFirstRow(false);
  }, [sidebar]);
  const closeAllSections = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
    setFirstRow(false);
    setSidebar(false);
  }, []);
  const handleEventInfoDrawer = useCallback(() => {
    closeAllWindows();
    setEventInfoDrawer(!eventInfoDrawer);
  }, [eventInfoDrawer, closeAllWindows]);
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
  const handleBudgetDrawer = useCallback(() => {
    closeAllWindows();
    setBudgetDrawer(!budgetDrawer);
  }, [budgetDrawer, closeAllWindows]);

  const handleEditEventNameDrawer = useCallback(() => {
    closeAllWindows();
    setEditEventNameDrawer(!editEventNameDrawer);
  }, [editEventNameDrawer, closeAllWindows]);
  const handleAddMemberDrawer = useCallback(() => {
    closeAllWindows();
    setAddMemberDrawer(!addMemberDrawer);
  }, [addMemberDrawer, closeAllWindows]);
  const handleAddOwnerDrawer = useCallback(() => {
    closeAllWindows();
    setAddOwnerDrawer(!addOwnerDrawer);
  }, [addOwnerDrawer, closeAllWindows]);
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

  const handleGetCheckListTasks = useCallback(() => {
    try {
      api
        .get<IEventCheckListDTO[]>(`/events/${eventId}/check-list`)
        .then(response => {
          setCheckListTasks(response.data.length);
          setResolvedCheckListTasks(
            response.data.filter(item => Number(item.status) === 3),
          );
          setInProgressCheckListTasks(
            response.data.filter(item => Number(item.status) === 2),
          );
          setNotStartedCheckListTasks(
            response.data.filter(item => Number(item.status) === 1),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetPlanners = useCallback(() => {
    try {
      api
        .get<IUserInfoDTO[]>(`events/${eventId}/event-planner`)
        .then(response => {
          setPlanners(response.data);
          setNumberOfPlanners(response.data.length);
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
  const handleGetEventInfo = useCallback(() => {
    try {
      api.get<IEventInfoDTO>(`/events/${eventId}/event-info`).then(response => {
        setEventInfo(response.data);
        setTotalGuestNumber(response.data.number_of_guests);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetFriends = useCallback(() => {
    try {
      eventId &&
        api.get<IFriendDTO[]>(`/users/friends/list`).then(response => {
          setFriends(
            response.data.filter(friend => friend.friendGroup.name === 'All'),
          );
        });
    } catch (err) {
      throw new Error(err);
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
      api.get<IListEventDTO>(`/events/${pageEvent.id}`).then(response => {
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
          userEvent_id: response.data.userEvent_id,
          number_of_guests: response.data.number_of_guests,
          event_type: response.data.event_type,
          daysTillDate: differenceInCalendarDays(date, new Date()),
          isGuest: false,
          isOwner: pageEvent.isOwner,
          owner_master: pageEvent.owner_master,
        });
        setEventDate(date);
      });
    } catch (err) {
      throw Error(err);
    }
  }, [pageEvent]);

  const currentNumberOfGuests = useMemo(() => {
    const currentMembersGuestNumber: number = members
      .map(tmember => tmember.number_of_guests)
      .reduce((a, b) => Number(a) + Number(b), 0);
    const currentOwnersGuestNumber: number = owners
      .map(towner => towner.number_of_guests)
      .reduce((a, b) => Number(a) + Number(b), 0);

    const currentGuestNumber =
      currentMembersGuestNumber + currentOwnersGuestNumber;
    return currentGuestNumber;
  }, [members, owners]);

  const availableNumberOfGuests = useMemo(() => {
    const availableGuestNumber = totalGuestNumber - currentNumberOfGuests;
    return availableGuestNumber;
  }, [totalGuestNumber, currentNumberOfGuests]);
  const myAvailableNumberOfGuests = useMemo(() => {
    const availableGuestNumber =
      Number(pageEvent.number_of_guests) - myGuests.length;
    return availableGuestNumber;
  }, [pageEvent, myGuests]);

  const handleGetSuppliers = useCallback(() => {
    try {
      api
        .get<ISelectedSupplierDTO[]>(`events/event-suppliers/${pageEvent.id}`)
        .then(response => {
          setSelectedSuppliers(
            response.data.filter(selected => !selected.isHired),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [pageEvent.id]);

  const handleCloseAddPlannerWindow = useCallback(() => {
    setSelectedSupplier({} as ISelectedSupplierDTO);
    setAddPlannerDrawer(false);

    handleAddPlannerDrawer();
    handleGetPlanners();
  }, [handleAddPlannerDrawer, handleGetPlanners]);

  const handleCloseAddMemberWindow = useCallback(() => {
    setSelectedFriend({} as IFriendDTO);
    setAddMemberDrawer(false);
    handleGetMembers();
  }, [handleGetMembers]);

  const handleGetHiredSuppliers = useCallback(() => {
    try {
      api
        .get<ISelectedSupplierDTO[]>(`events/hired-suppliers/${pageEvent.id}`)
        .then(response => {
          setHiredSuppliers(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [pageEvent.id]);
  const handleCloseEditEventInfoWindow = useCallback(
    (data: IEventInfoDTO) => {
      setEventInfo(data);
      setEditEventInfoDrawer(false);
      handleGetEvent();
    },
    [handleGetEvent],
  );

  const handleCloseAddOwnerWindow = useCallback(() => {
    setSelectedFriend({} as IFriendDTO);
    setAddOwnerDrawer(false);
    handleGetOwners();
  }, [handleGetOwners]);
  const handleEditBudget = useCallback(
    async (data: IEventInfoDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          budget: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-info`, {
          duration: eventInfo.duration,
          number_of_guests: eventInfo.number_of_guests,
          budget: Number(data.budget),
          description: eventInfo.description,
          country: eventInfo.country,
          local_state: eventInfo.local_state,
          city: eventInfo.city,
          address: eventInfo.address,
        });

        setBudgetDrawer(false);
        handleGetEventInfo();
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
    [addToast, eventId, eventInfo, handleGetEventInfo],
  );
  const handleCloseEditEventNameWindow = useCallback(() => {
    setEditEventNameDrawer(false);
    handleGetEvent();
  }, [handleGetEvent]);
  const handleCloseEditMemberNumberOfGuestsWindow = useCallback(() => {
    setNumberOfGuestDrawer(false);
    setMemberProfileWindow(false);
    setMember({} as IEventMemberDTO);
    handleGetMembers();
    handleGetEvent();
  }, [handleGetEvent, handleGetMembers]);
  const handleCloseEditEventOwnerWindow = useCallback(() => {
    setOwnerProfileWindow(false);
    setEditOwnerDrawer(false);
    setOwner({} as IEventOwnerDTO);
    handleGetOwners();
  }, [handleGetOwners]);
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

  const totalEventCost = useMemo(() => {
    const totalCost: number = hiredSuppliers
      .map(supplier => {
        let cost = 0;
        if (supplier.transactionAgreement) {
          if (supplier.transactionAgreement) {
            cost = supplier.transactionAgreement
              .map(agreement => Number(agreement.amount))
              .reduce((a, b) => a + b, 0);
          }
          return cost;
        }
        return cost;
      })
      .reduce((a, b) => a + b, 0);
    return totalCost;
  }, [hiredSuppliers]);

  useEffect(() => {
    handleGetSuppliers();
  }, [handleGetSuppliers]);
  useEffect(() => {
    handleGetCheckListTasks();
  }, [handleGetCheckListTasks]);
  useEffect(() => {
    handleGetEvent();
  }, [handleGetEvent]);
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
    handleGetHiredSuppliers();
  }, [handleGetHiredSuppliers]);

  return (
    <Container>
      <PageHeader>
        {pageEvent.isOwner ? (
          <span>
            <button type="button" onClick={handleEditEventNameDrawer}>
              <h5>
                {event.name}
                <FiEdit3 size={16} />
              </h5>
            </button>
          </span>
        ) : (
          <span>
            <button type="button">
              <h5>{event.name}</h5>
            </button>
          </span>
        )}
      </PageHeader>
      {!!editEventNameDrawer && (
        <EditEventNameWindow
          handleCloseWindow={handleCloseEditEventNameWindow}
          eventDate={eventDate}
          eventId={eventId}
          eventName={event.name}
          onHandleCloseWindow={() => setEditEventNameDrawer(false)}
        />
      )}
      {!!ownerProfileWindow && (
        <OwnerProfileDrawer
          isOwner={pageEvent.isOwner}
          owner={owner}
          onHandleOwnerDrawer={() => setOwnerProfileWindow(false)}
          onHandleNumberOfGuestDrawer={() => setEditOwnerDrawer(true)}
          onHandleDeleteOwnerDrawer={() => setDeleteOwnerDrawer(true)}
        />
      )}
      {!!memberProfileWindow && (
        <MemberProfileDrawer
          isGuest={pageEvent.isGuest}
          isOwner={pageEvent.isOwner}
          member={member}
          onHandleMemberDrawer={() => setMemberProfileWindow(false)}
          onHandleNumberOfGuestDrawer={() => setNumberOfGuestDrawer(true)}
          onHandleDeleteMemberDrawer={() => setDeleteMemberDrawer(true)}
        />
      )}

      {!!numberOfGuestDrawer && (
        <EditMemberNumberOfGuestsWindow
          availableNumberOfGuests={availableNumberOfGuests}
          eventId={eventId}
          member={member}
          onHandleCloseWindow={() => setNumberOfGuestDrawer(false)}
          handleCloseWindow={handleCloseEditMemberNumberOfGuestsWindow}
        />
      )}
      {!!editOwnerDrawer && (
        <EditEventOwnerWindow
          handleCloseWindow={handleCloseEditEventOwnerWindow}
          availableNumberOfGuests={availableNumberOfGuests}
          eventId={eventId}
          onHandleCloseWindow={() => setEditOwnerDrawer(false)}
          owner={owner}
        />
      )}
      {!!deleteMemberDrawer && (
        <DeleteConfirmationWindow
          handleDelete={() => handleDeleteMember()}
          onHandleCloseWindow={() => setDeleteMemberDrawer(false)}
        />
      )}
      {!!deleteOwnerDrawer && (
        <DeleteConfirmationWindow
          handleDelete={() => handleDeleteOwner()}
          onHandleCloseWindow={() => setDeleteOwnerDrawer(false)}
        />
      )}

      {!!eventInfoDrawer && (
        <EventInfoWindow
          eventInfo={eventInfo}
          handleEditEventInfo={() => setEditEventInfoDrawer(true)}
          onHandleCloseWindow={() => setEventInfoDrawer(false)}
          pageEvent={pageEvent}
        />
      )}
      {!!editEventInfoDrawer && (
        <EditEventInfoWindow
          currentNumberOfGuests={currentNumberOfGuests}
          eventId={eventId}
          eventInfo={eventInfo}
          handleCloseWindow={(e: IEventInfoDTO) =>
            handleCloseEditEventInfoWindow(e)
          }
          onHandleCloseWindow={() => setEditEventInfoDrawer(false)}
        />
      )}

      {!!addPlannerDrawer && (
        <AddPlannerWindow
          eventId={eventId}
          handleCloseWindow={handleCloseAddPlannerWindow}
          onHandleCloseWindow={() => handleCloseAddPlannerWindow()}
          selectedSupplier={selectedSupplier}
        />
      )}
      {!!addOwnerDrawer && (
        <AddOwnerWindow
          handleFriendsWindow={() => setFriendsWindow(true)}
          availableNumberOfGuests={availableNumberOfGuests}
          eventId={eventId}
          handleCloseWindow={handleCloseAddOwnerWindow}
          onHandleCloseWindow={() => setAddOwnerDrawer(false)}
          wpUserId={selectedFriend.id}
        />
      )}
      {friendsWindow && (
        <FriendsListDrawer
          friends={friends}
          handleSelectedFriend={handleSeletedFriend}
          onHandleCloseWindow={() => setFriendsWindow(false)}
        />
      )}
      {!!addMemberDrawer && (
        <AddMemberWindow
          availableNumberOfGuests={availableNumberOfGuests}
          eventId={eventId}
          handleCloseWindow={handleCloseAddMemberWindow}
          onHandleCloseWindow={() => handleCloseAddMemberWindow()}
          wpUserId={selectedFriend.id}
          handleFriendsWindow={() => setFriendsWindow(true)}
        />
      )}
      {!!membersWindow && (
        <MembersWindow
          handleMemberProfileWindow={(e: IEventMemberDTO) =>
            handleMemberProfileWindow(e)
          }
          members={members}
          onHandleCloseWindow={() => setMembersWindow(false)}
        />
      )}
      <EventPageContent>
        {sidebar ? (
          <span>
            <button type="button" onClick={handleSideBar}>
              <FiChevronLeft size={60} />
            </button>
          </span>
        ) : (
          <button type="button" onClick={handleSideBar}>
            <FiChevronRight size={60} />
          </button>
        )}

        {sidebar && (
          <SideBar>
            {pageEvent.owner_master === user.id ? (
              <button type="button" onClick={handleAddOwnerDrawer}>
                <h1>Anfitriões: {numberOfOwners}</h1>
                <MdPersonAdd size={24} />
              </button>
            ) : (
              <button type="button">
                <h1>Anfitriões: {numberOfOwners}</h1>
              </button>
            )}

            {owners.length > 4 ? (
              <span style={{ overflowY: 'scroll', height: '200px' }}>
                {owners.map(eventOwner => (
                  <button
                    key={eventOwner.id}
                    type="button"
                    onClick={() => handleOwnerProfileWindow(eventOwner)}
                  >
                    <h2>{eventOwner.name}</h2>
                  </button>
                ))}
              </span>
            ) : (
              <span>
                {owners.map(eventOwner => (
                  <button
                    key={eventOwner.id}
                    type="button"
                    onClick={() => handleOwnerProfileWindow(eventOwner)}
                  >
                    <h2>{eventOwner.name}</h2>
                  </button>
                ))}
              </span>
            )}

            {pageEvent.isOwner ? (
              <button type="button" onClick={handleAddMemberDrawer}>
                <h1>Membros: {numberOfMembers}</h1>
                <MdPersonAdd size={24} />
              </button>
            ) : (
              <button type="button">
                <h1>Membros: {numberOfMembers}</h1>
              </button>
            )}

            <span>
              <button type="button" onClick={handleMembersWindow}>
                <h2>Visualizar</h2>
              </button>
            </span>
            {pageEvent.isOwner ? (
              <button type="button" onClick={handleAddPlannerDrawer}>
                <h1>Cerimonialistas: {numberOfPlanners}</h1>
                <MdPersonAdd size={24} />
              </button>
            ) : (
              <button type="button">
                <h1>Cerimonialistas: {numberOfPlanners}</h1>
              </button>
            )}
            {planners.map(planner => (
              <span key={planner.id}>
                {pageEvent.isOwner ? (
                  <button type="button">
                    <h2>{planner.name}</h2>
                    <FiEdit size={24} />
                  </button>
                ) : (
                  <button type="button">
                    <h2>{planner.name}</h2>
                  </button>
                )}
              </span>
            ))}
            <button type="button" onClick={handleEventInfoDrawer}>
              Informações do Evento
            </button>
            <button type="button" onClick={handleLatestActionsSection}>
              Últimas Atualizações
            </button>
            <button type="button" onClick={handleMessagesSection}>
              Mensagens
            </button>
          </SideBar>
        )}
        <Main>
          {firstRow ? (
            <span>
              <button type="button" onClick={handleFirstRow}>
                <FiChevronUp size={60} />
              </button>
            </span>
          ) : (
            <button type="button" onClick={handleFirstRow}>
              <FiChevronDown size={60} />
            </button>
          )}
          {!!firstRow && (
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
                {pageEvent.owner_master === user.id ? (
                  <button type="button" onClick={handleBudgetDrawer}>
                    <h2>Orçamento</h2>
                    <p>
                      {eventInfo.budget ? numberFormat(eventInfo.budget) : ''}
                    </p>
                  </button>
                ) : (
                  <button type="button">
                    <h2>Orçamento</h2>
                    <p>
                      {eventInfo.budget ? numberFormat(eventInfo.budget) : ''}
                    </p>
                  </button>
                )}
              </div>
              <div>
                <button type="button" onClick={handleSupplierSection}>
                  <h2>Fornecedores</h2>
                  <p>
                    {hiredSuppliers.length}/
                    {selectedSuppliers.length + hiredSuppliers.length}
                  </p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleFinanceSection}>
                  <h2>Financeiro</h2>
                  <p>
                    {Math.round((totalEventCost / eventInfo.budget) * 100)}%
                  </p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleCheckListSection}>
                  <h2>Check-List</h2>
                  <p>
                    {resolvedCheckListTasks.length}/{checkListTasks}
                  </p>
                </button>
              </div>
            </FirstRow>
          )}
          {!!budgetDrawer && (
            <WindowContainer
              onHandleCloseWindow={() => setBudgetDrawer(false)}
              containerStyle={{
                zIndex: 10,
                top: '30%',
                left: '40%',
                height: '40%',
                width: '30%',
              }}
            >
              <Form ref={formRef} onSubmit={handleEditBudget}>
                <BudgetDrawer>
                  <span>
                    <h2>Novo Orçamento</h2>

                    <Input
                      name="budget"
                      placeholder="Orçamento"
                      defaultValue={eventInfo.budget}
                      type="text"
                    />

                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </span>
                </BudgetDrawer>
              </Form>
            </WindowContainer>
          )}
          {!!latestActionsSection && <LatestNewsSection />}
          {!!supplierSection && (
            <EventSupplierSection
              handleGetHiredSuppliers={handleGetHiredSuppliers}
              handleGetSuppliers={handleGetSuppliers}
              hiredSuppliers={hiredSuppliers}
              pageEvent={pageEvent}
              selectedSuppliers={selectedSuppliers}
            />
          )}
          {!!messagesSection && <MessageSection />}
          {!!guestsSection && (
            <EventGuestSection
              friends={friends}
              myGuestsConfirmed={myGuestsConfirmed}
              myAvailableNumberOfGuests={myAvailableNumberOfGuests}
              myGuests={myGuests}
              pageEvent={pageEvent}
              closeAllWindows={closeAllWindows}
              confirmedGuests={confirmedGuests}
              eventGuests={eventGuests}
              handleGetEvent={handleGetEvent}
              handleGetGuests={handleGetGuests}
            />
          )}
          {!!financeSection && (
            <EventFinanceSection
              isOwner={pageEvent.isOwner}
              refreshHiredSuppliers={handleGetHiredSuppliers}
              hiredSuppliers={hiredSuppliers}
            />
          )}
          {!!checkListSection && (
            <EventCheckListSection
              inProgressCheckListTasks={inProgressCheckListTasks}
              notStartedCheckListTasks={notStartedCheckListTasks}
              resolvedCheckListTasks={resolvedCheckListTasks}
              handleGetCheckListTasks={handleGetCheckListTasks}
              closeAllWindows={closeAllWindows}
              pageEvent={pageEvent}
            />
          )}
        </Main>
      </EventPageContent>
    </Container>
  );
};

export default EventHostDashboard;
