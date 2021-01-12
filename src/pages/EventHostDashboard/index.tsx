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
  FiChevronLeft,
} from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, EventPageContent, Main, BudgetDrawer } from './styles';
import PageHeader from '../../components/PageHeader';
import FirstRow from '../../components/EventHostComponents/FirstRow';
import SideMenu from '../../components/EventHostComponents/SideMenu';

import api from '../../services/api';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';
import MemberProfileDrawer from '../../components/MemberProfileDrawer';
import OwnerProfileDrawer from '../../components/OwnerProfileDrawer';
import EventFinanceSection from '../../components/EventFinanceSection';
import IEventDTO from '../../dtos/IEventDTO';
import IFriendDTO from '../../dtos/IFriendDTO';

import EditEventNameWindow from '../../components/EditEventNameWindow';
import IEventMemberDTO from '../../dtos/IEventMemberDTO';
import EditMemberNumberOfGuestsWindow from '../../components/EditEventMemberNumberOfGuestsWindow';
import DeleteConfirmationWindow from '../../components/DeleteConfirmationWindow';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';
import EventCheckListSection from '../../components/EventCheckListSection';
import EventGuestSection from '../../components/EventGuestSection';
import IEventSupplierDTO from '../../dtos/IEventSupplierDTO';
import IEventCheckListDTO from '../../dtos/IEventCheckListDTO';
import EventSupplierSection from '../../components/EventSupplierSection';
import AddMemberWindow from '../../components/AddMemberWindow';
import AddOwnerWindow from '../../components/AddOwnerWindow';
import FriendsListWindow from '../../components/FriendsListWindow';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';
import EventInfoWindow from '../../components/EventInfoWindow';
import MembersWindow from '../../components/MembersWindow';
import EditEventInfoWindow from '../../components/EditEventInfoWindow';
import AddPlannerWindow from '../../components/AddPlannerWindow';
import MessageSection from '../../components/MessageSection';
import LatestNewsSection from '../../components/LatestNewsSection';
import CreateEventInfoWindowForm from '../../components/CreateEventInfoWindowForm';
import UpdateEventNumberOfGuestsWindow from '../../components/UpdateEventNumberOfGuestsWindow';
import GuestAlocationWindow from '../../components/GuestAlocationWindow';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import WindowUnFormattedContainer from '../../components/WindowUnFormattedContainer';

interface IUserInfoDTO {
  id: string;
  name: string;
  avatar: string;
}

interface IParams {
  params: IEventDTO;
}

const EventHostDashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const location = useLocation<IParams>();
  const { user } = useAuth();

  const pageEvent = location.state.params;

  const eventId = pageEvent.id;

  const [eventName, setEventName] = useState(pageEvent.name);

  const [isOwner, setIsOwner] = useState(false);

  const [friendsWindow, setFriendsWindow] = useState(false);
  const [guestAlocationWindow, setGuestAlocationWindow] = useState(false);
  const [membersWindow, setMembersWindow] = useState(false);
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [editEventInfoDrawer, setEditEventInfoDrawer] = useState(false);
  const [budgetDrawer, setBudgetDrawer] = useState(false);
  const [editEventNameDrawer, setEditEventNameDrawer] = useState(false);
  const [addPlannerDrawer, setAddPlannerDrawer] = useState(false);
  const [addOwnerDrawer, setAddOwnerDrawer] = useState(false);
  const [addMemberWindowForm, setAddMemberWindowForm] = useState(false);
  const [memberProfileWindow, setMemberProfileWindow] = useState(false);
  const [ownerProfileWindow, setOwnerProfileWindow] = useState(false);
  const [numberOfGuestDrawer, setNumberOfGuestDrawer] = useState(false);
  const [deleteMemberDrawer, setDeleteMemberDrawer] = useState(false);
  const [deleteOwnerDrawer, setDeleteOwnerDrawer] = useState(false);
  const [firstRow, setFirstRow] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  const [latestActionsSection, setLatestActionsSection] = useState(false);
  const [guestsSection, setGuestsSection] = useState(false);
  const [financeSection, setFinanceSection] = useState(false);
  const [supplierSection, setSupplierSection] = useState(false);
  const [checkListSection, setCheckListSection] = useState(true);
  const [messagesSection, setMessagesSection] = useState(false);
  const [
    updateEventNumberOfGuestsWindow,
    setUpdateEventNumberOfGuestsWindow,
  ] = useState(false);
  const [createEventInfoWindowForm, setCreateEventInfoWindowForm] = useState(
    false,
  );

  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [numberOfOwners, setNumberOfOwners] = useState(0);
  const [numberOfMembers, setNumberOfMembers] = useState(0);
  const [numberOfPlanners, setNumberOfPlanners] = useState(0);
  const [totalGuestNumber, setTotalGuestNumber] = useState(0);
  const [checkListTasks, setCheckListTasks] = useState(0);

  const [myGuests, setMyGuests] = useState<IEventGuestDTO[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<IFriendDTO>(
    {} as IFriendDTO,
  );
  const [friends, setFriends] = useState<IFriendDTO[]>([]);
  const [eventGuests, setEventGuests] = useState<IEventGuestDTO[]>([]);
  const [planners, setPlanners] = useState<IUserInfoDTO[]>([]);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [owner, setOwner] = useState<IEventOwnerDTO>({} as IEventOwnerDTO);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [member, setMember] = useState<IEventMemberDTO>({} as IEventMemberDTO);
  const [eventInfo, setEventInfo] = useState<IEventInfoDTO>(
    {} as IEventInfoDTO,
  );
  const [selectedSupplier, setSelectedSupplier] = useState<IEventSupplierDTO>(
    {} as IEventSupplierDTO,
  );
  const [hiredSuppliers, setHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<
    IEventSupplierDTO[]
  >([]);
  const [inProgressCheckListTasks, setInProgressCheckListTasks] = useState<
    IEventCheckListDTO[]
  >([]);
  const [resolvedCheckListTasks, setResolvedCheckListTasks] = useState<
    IEventCheckListDTO[]
  >([]);
  const [notStartedCheckListTasks, setNotStartedCheckListTasks] = useState<
    IEventCheckListDTO[]
  >([]);

  const closeAllWindows = useCallback(() => {
    setGuestAlocationWindow(false);
    setCreateEventInfoWindowForm(false);
    setUpdateEventNumberOfGuestsWindow(false);
    setSelectedFriend({} as IFriendDTO);
    setOwner({} as IEventOwnerDTO);
    setMember({} as IEventMemberDTO);
    setSelectedSupplier({} as IEventSupplierDTO);
    setFriendsWindow(false);
    setMembersWindow(false);
    setEditEventInfoDrawer(false);
    setOwnerProfileWindow(false);
    setDeleteOwnerDrawer(false);
    setEventInfoDrawer(false);
    setFirstRow(false);
    setBudgetDrawer(false);
    setAddMemberWindowForm(false);
    setAddOwnerDrawer(false);
    setEditEventNameDrawer(false);
    setAddPlannerDrawer(false);
    setMemberProfileWindow(false);
    setDeleteMemberDrawer(false);
    setNumberOfGuestDrawer(false);
    setSidebar(false);
  }, []);

  const closeAllSections = useCallback(() => {
    setSelectedFriend({} as IFriendDTO);
    setOwner({} as IEventOwnerDTO);
    setMember({} as IEventMemberDTO);
    setSelectedSupplier({} as IEventSupplierDTO);
    setLatestActionsSection(false);
    setGuestsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
    setFirstRow(false);
    setSidebar(false);
  }, []);

  const closeEventInfoWindowForm = useCallback(() => {
    setCreateEventInfoWindowForm(false);
  }, []);

  const openEventInfoWindowForm = useCallback(() => {
    setCreateEventInfoWindowForm(true);
  }, []);

  useEffect(() => {
    if (!pageEvent.eventInfo && !eventInfo.id) {
      openEventInfoWindowForm();
    }
  }, [openEventInfoWindowForm, eventInfo, pageEvent]);

  const handleFirstRow = useCallback(() => {
    closeAllWindows();
    setFirstRow(!firstRow);
  }, [firstRow, closeAllWindows]);
  const handleSideBar = useCallback(() => {
    setSidebar(!sidebar);
    setFirstRow(false);
  }, [sidebar]);

  const openGuestAlocationWindow = useCallback(() => {
    setGuestAlocationWindow(true);
  }, []);

  const closeGuestAlocationWindow = useCallback(() => {
    setGuestAlocationWindow(false);
  }, []);

  const openUpdateEventNumberOfGuestsWindow = useCallback(() => {
    setUpdateEventNumberOfGuestsWindow(true);
  }, []);

  const closeUpdateEventNumberOfGuestsWindow = useCallback(() => {
    setUpdateEventNumberOfGuestsWindow(false);
  }, []);

  const handleEventInfoWindow = useCallback(() => {
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
  const handleSelectFriendAsMember = useCallback(() => {
    closeAllWindows();
    setFriendsWindow(true);
    setAddMemberWindowForm(true);
  }, [closeAllWindows]);
  const handleSelectFriendAsOwner = useCallback(() => {
    closeAllWindows();
    setFriendsWindow(true);
    setAddOwnerDrawer(true);
  }, [closeAllWindows]);
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
          response.data.map(xOwner => {
            xOwner.userEventOwner.id === user.id && setIsOwner(true);
            return xOwner;
          });
          setOwners(response.data);
          setNumberOfOwners(response.data.length);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId, user]);
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
      api.get<IEventGuestDTO[]>(`/events/${eventId}/guests`).then(response => {
        setEventGuests(response.data);
        setConfirmedGuests(
          response.data.filter(guest => guest.confirmed === true).length,
        );
        setMyGuests(response.data.filter(guest => guest.host_id === user.id));
        setMyGuestsConfirmed(
          response.data.filter(
            guest => guest.host_id === user.id && guest.confirmed === true,
          ).length,
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId, user]);

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
    let myNumberOfGuests = 0;
    if (isOwner) {
      const meAsOwner = owners.find(
        xOwner => xOwner.userEventOwner.id === user.id,
      );
      myNumberOfGuests = meAsOwner ? meAsOwner.number_of_guests : 0;
    } else {
      const meAsMember = members.find(
        xMember => xMember.userEventMember.id === user.id,
      );
      myNumberOfGuests = meAsMember ? meAsMember.number_of_guests : 0;
    }
    const availableGuestNumber = Number(myNumberOfGuests) - myGuests.length;
    return availableGuestNumber;
  }, [myGuests, owners, members, isOwner, user]);

  const handleGetSuppliers = useCallback(() => {
    try {
      api
        .get<IEventSupplierDTO[]>(`events/event-suppliers/${pageEvent.id}`)
        .then(response => {
          setSelectedSuppliers(
            response.data.filter(selected => !selected.isHired),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [pageEvent]);

  const handleCloseAddPlannerWindow = useCallback(() => {
    setSelectedSupplier({} as IEventSupplierDTO);
    setAddPlannerDrawer(false);

    handleAddPlannerDrawer();
    handleGetPlanners();
  }, [handleAddPlannerDrawer, handleGetPlanners]);

  const handleCloseAddMemberWindow = useCallback(() => {
    setSelectedFriend({} as IFriendDTO);
    setAddMemberWindowForm(false);
    handleGetMembers();
  }, [handleGetMembers]);

  const handleGetHiredSuppliers = useCallback(() => {
    try {
      api
        .get<IEventSupplierDTO[]>(`events/hired-suppliers/${pageEvent.id}`)
        .then(response => {
          setHiredSuppliers(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [pageEvent]);

  const handleCloseEditEventInfoWindow = useCallback(
    (data: IEventInfoDTO) => {
      setEventInfo(data);
      setEditEventInfoDrawer(false);
      handleGetEventInfo();
    },
    [handleGetEventInfo],
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
    handleGetEventInfo();
  }, [handleGetEventInfo]);
  const handleCloseEditMemberNumberOfGuestsWindow = useCallback(() => {
    setNumberOfGuestDrawer(false);
    setMemberProfileWindow(false);
    setMember({} as IEventMemberDTO);
    handleGetMembers();
  }, [handleGetMembers]);

  const handleDeleteMember = useCallback(async () => {
    try {
      await api.delete(
        `/events/${eventId}/event-members/${member.userEventMember.id}`,
      );

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
      await api.delete(
        `/events/${eventId}/event-owners/${owner.userEventOwner.id}`,
      );

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
  // const handleEditOwnerWindow = useCallback(() => {
  //   setOwnerProfileWindow(false);
  //   setEditOwnerDrawer(true);
  // }, []);
  const totalEventCost = useMemo(() => {
    const totalCost: number = hiredSuppliers
      .map(supplier => {
        let cost = 0;
        if (supplier.transactionAgreements) {
          cost = supplier.transactionAgreements
            .map(agreement => Number(agreement.amount))
            .reduce((a, b) => a + b, 0);
        }
        return cost;
      })
      .reduce((a, b) => a + b, 0);
    return totalCost;
  }, [hiredSuppliers]);

  const handleSeletedFriend = useCallback(
    (props: IFriendDTO) => {
      if (addMemberWindowForm) {
        closeAllWindows();
        setSelectedFriend(props);

        return setAddMemberWindowForm(true);
      }
      if (addOwnerDrawer) {
        closeAllWindows();
        setSelectedFriend(props);
        return setAddOwnerDrawer(true);
      }
      return '';
    },
    [addMemberWindowForm, addOwnerDrawer, closeAllWindows],
  );

  const handleCloseOwnerWindow = useCallback(() => {
    setOwnerProfileWindow(false);
    setOwner({} as IEventOwnerDTO);
  }, []);

  const handleEditEventInfoWindow = useCallback(() => {
    setEventInfoDrawer(false);
    setEditEventInfoDrawer(true);
  }, []);

  useEffect(() => {
    handleGetSuppliers();
  }, [handleGetSuppliers]);
  useEffect(() => {
    handleGetCheckListTasks();
  }, [handleGetCheckListTasks]);
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
        {/* {isOwner ? (
          <span>
            <button type="button" onClick={handleEditEventNameDrawer}>
              <h5>
                {eventName}
                <FiEdit3 size={16} />
              </h5>
            </button>
          </span>
        ) : (
          <span>
            <button type="button">
              <h5>{eventName}</h5>
            </button>
          </span>
        )} */}
      </PageHeader>
      {!!createEventInfoWindowForm && (
        <CreateEventInfoWindowForm
          eventId={eventId}
          getEventInfo={handleGetEventInfo}
          handleCloseWindow={closeEventInfoWindowForm}
        />
      )}
      {guestAlocationWindow && (
        <GuestAlocationWindow
          onHandleCloseWindow={() => closeGuestAlocationWindow()}
          masterId={pageEvent.user_id}
          members={members}
          owners={owners}
          availableNumberOfGuests={availableNumberOfGuests}
          eventInfo={eventInfo}
          getMembers={handleGetMembers}
          getOwners={handleGetOwners}
          guests={eventGuests}
          handleUpdateEventNumberOfGuests={openUpdateEventNumberOfGuestsWindow}
        />
      )}
      {!!editEventNameDrawer && (
        <EditEventNameWindow
          setEventName={(e: string) => setEventName(e)}
          handleCloseWindow={handleCloseEditEventNameWindow}
          eventId={eventId}
          eventName={eventName}
          onHandleCloseWindow={() => setEditEventNameDrawer(false)}
        />
      )}
      {!!ownerProfileWindow && (
        <OwnerProfileDrawer
          getOwners={handleGetOwners}
          getEventInfo={handleGetEventInfo}
          availableNumberOfGuests={availableNumberOfGuests}
          isOwner={isOwner}
          owner={owner}
          eventMaster={pageEvent.user_id}
          eventId={eventId}
          handleCloseWindow={handleCloseOwnerWindow}
          onHandleCloseWindow={() => handleCloseOwnerWindow()}
        />
      )}
      {!!memberProfileWindow && (
        <MemberProfileDrawer
          isOwner={isOwner}
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
          isOwner={isOwner}
          eventInfo={eventInfo}
          handleEditEventInfo={() => handleEditEventInfoWindow()}
          onHandleCloseWindow={() => setEventInfoDrawer(false)}
          eventName={eventName}
        />
      )}
      {!!editEventInfoDrawer && (
        <EditEventInfoWindow
          eventId={eventId}
          eventInfo={eventInfo}
          currentNumberOfGuests={currentNumberOfGuests}
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
          handleFriendsWindow={() => handleSelectFriendAsOwner()}
          availableNumberOfGuests={availableNumberOfGuests}
          eventId={eventId}
          handleCloseWindow={handleCloseAddOwnerWindow}
          onHandleCloseWindow={() => setAddOwnerDrawer(false)}
          selectedFriend={selectedFriend}
        />
      )}
      {friendsWindow && (
        <FriendsListWindow
          selectedFriend={selectedFriend}
          friends={friends}
          handleSelectedFriend={(e: IFriendDTO) => handleSeletedFriend(e)}
          onHandleCloseWindow={() => setFriendsWindow(false)}
        />
      )}
      {!!addMemberWindowForm && (
        <AddMemberWindow
          availableNumberOfGuests={availableNumberOfGuests}
          eventId={eventId}
          handleCloseWindow={handleCloseAddMemberWindow}
          onHandleCloseWindow={() => handleCloseAddMemberWindow()}
          selectedFriend={selectedFriend}
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
      {!!updateEventNumberOfGuestsWindow && (
        <UpdateEventNumberOfGuestsWindow
          setEventInfo={(e: IEventInfoDTO) => setEventInfo(e)}
          currentNumberOfGuests={currentNumberOfGuests}
          eventId={eventId}
          eventInfo={eventInfo}
          handleCloseWindow={closeUpdateEventNumberOfGuestsWindow}
          onHandleCloseWindow={() => closeUpdateEventNumberOfGuestsWindow()}
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
          <SideMenu
            eventName={eventName}
            handleAddOwnerDrawer={handleAddOwnerDrawer}
            handleAddPlannerDrawer={handleAddPlannerDrawer}
            handleEditEventNameDrawer={handleEditEventNameDrawer}
            handleEventInfoWindow={handleEventInfoWindow}
            handleLatestActionsSection={handleLatestActionsSection}
            handleMembersWindow={handleMembersWindow}
            handleMessagesSection={handleMessagesSection}
            handleOwnerProfileWindow={handleOwnerProfileWindow}
            handleSelectFriendAsMember={handleSelectFriendAsMember}
            isOwner={isOwner}
            numberOfMembers={numberOfMembers}
            numberOfOwners={numberOfOwners}
            numberOfPlanners={numberOfPlanners}
            openGuestAlocationWindow={openGuestAlocationWindow}
            owners={owners}
            planners={planners}
          />
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
            <FirstRow
              checkListTasks={checkListTasks}
              confirmedGuests={confirmedGuests}
              eventGuests={eventGuests}
              eventInfo={eventInfo}
              handleBudgetDrawer={handleBudgetDrawer}
              handleCheckListSection={handleCheckListSection}
              handleFinanceSection={handleFinanceSection}
              handleGuestsSection={handleGuestsSection}
              handleSupplierSection={handleSupplierSection}
              hiredSuppliers={hiredSuppliers}
              isOwner={isOwner}
              resolvedCheckListTasks={resolvedCheckListTasks}
              selectedSuppliers={selectedSuppliers}
              totalEventCost={totalEventCost}
            />
          )}
          {!!budgetDrawer && (
            <WindowUnFormattedContainer
              onHandleCloseWindow={() => setBudgetDrawer(false)}
              containerStyle={{
                zIndex: 10,
                top: '29vh',
                left: '5%',
                height: '42vh',
                width: '90%',
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
            </WindowUnFormattedContainer>
          )}
          {!!latestActionsSection && <LatestNewsSection />}
          {!!supplierSection && (
            <EventSupplierSection
              handleGetHiredSuppliers={handleGetHiredSuppliers}
              handleGetSuppliers={handleGetSuppliers}
              hiredSuppliers={hiredSuppliers}
              eventId={eventId}
              isOwner={isOwner}
              selectedSuppliers={selectedSuppliers}
            />
          )}
          {!!messagesSection && <MessageSection />}
          {!!guestsSection && (
            <EventGuestSection
              isOwner={isOwner}
              handleGuestAllocationWindow={openGuestAlocationWindow}
              friends={friends}
              myGuestsConfirmed={myGuestsConfirmed}
              myAvailableNumberOfGuests={myAvailableNumberOfGuests}
              myGuests={myGuests}
              eventId={eventId}
              closeAllWindows={closeAllWindows}
              confirmedGuests={confirmedGuests}
              eventGuests={eventGuests}
              handleGetGuests={handleGetGuests}
            />
          )}
          {!!financeSection && (
            <EventFinanceSection
              isOwner={isOwner}
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
              eventId={eventId}
              isOwner={isOwner}
            />
          )}
        </Main>
      </EventPageContent>
    </Container>
  );
};

export default EventHostDashboard;
