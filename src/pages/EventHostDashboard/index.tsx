import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import * as Yup from 'yup';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useEvent } from '../../hooks/event';
import { useFriends } from '../../hooks/friends';
import { useEventVariables } from '../../hooks/eventVariables';
import { useCurrentEvent } from '../../hooks/currentEvent';
import { useEventOwners } from '../../hooks/eventOwners';
import { useEventSuppliers } from '../../hooks/eventSuppliers';
import { useTransaction } from '../../hooks/transactions';
import { useNote } from '../../hooks/notes';

import IEventDTO from '../../dtos/IEventDTO';
import IFriendDTO from '../../dtos/IFriendDTO';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';
import IEventSupplierDTO from '../../dtos/IEventSupplierDTO';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';
import IEventMemberDTO from '../../dtos/IEventMemberDTO';

import PageHeader from '../../components/PageHeader';
import { FirstRow } from '../../components/EventHostComponents/FirstRow';
import SideMenu from '../../components/EventHostComponents/SideMenu';
import MemberProfileDrawer from '../../components/MemberProfileDrawer';
import OwnerProfileDrawer from '../../components/OwnerProfileDrawer';
import EditEventNameWindow from '../../components/EditEventNameWindow';
import EditMemberNumberOfGuestsWindow from '../../components/EditEventMemberNumberOfGuestsWindow';
import DeleteConfirmationWindow from '../../components/DeleteConfirmationWindow';
import { EventTaskSection } from '../../components/EventsComponents/EventTaskComponents/EventTaskSection';
import EventGuestSection from '../../components/EventGuestSection';
import EventSupplierSection from '../../components/EventSupplierSection';
import AddMemberWindow from '../../components/AddMemberWindow';
import AddOwnerWindow from '../../components/AddOwnerWindow';
import FriendsListWindow from '../../components/FriendsListWindow';
import EventInfoWindow from '../../components/EventInfoWindow';
import MembersWindow from '../../components/MembersWindow';
import EditEventInfoWindow from '../../components/EditEventInfoWindow';
import AddPlannerWindow from '../../components/AddPlannerWindow';
import CreateEventInfoWindowForm from '../../components/CreateEventInfoWindowForm';
import UpdateEventNumberOfGuestsWindow from '../../components/UpdateEventNumberOfGuestsWindow';
import GuestAlocationWindow from '../../components/GuestAlocationWindow';
import EditEventBudgetWindow from '../../components/EditEventBudgetWindow';
import { EventMainDashboard } from '../../components/EventHostComponents/EventMainDashboard';
import { EditSupplierCategory } from '../../components/EventsComponents/EventSupplierComponents/EditSupplierCategory';
import { EditSupplierName } from '../../components/EventsComponents/EventSupplierComponents/EditSupplierName';
import { SupplierTransactionsWindow } from '../../components/EventsComponents/EventSupplierComponents/SupplierTransactionsWindow';
import { SupplierNotesSection } from '../../components/EventsComponents/EventSupplierComponents/SupplierNotesWindow';
import { TransactionsFilterWindow } from '../../components/TransactionComponents/TransactionsFilterWindow';
import { SupplierTransactionAgreementsWindow } from '../../components/EventsComponents/EventSupplierComponents/SupplierTransactionAgreementsWindow';
import { EventSupplierFilesWindow } from '../../components/EventsComponents/EventSupplierComponents/EventSupplierFilesWindow';
import { CancelAllAgreements } from '../../components/EventsComponents/EventSupplierComponents/CancelAllAgreements';
import { DischargeSupplierWindow } from '../../components/EventsComponents/EventSupplierComponents/DischargeSupplierWindow';
import { SelectSupplierCategory } from '../../components/EventsComponents/EventSupplierComponents/SelectSupplierCategory';
import { NewSupplierForm } from '../../components/EventsComponents/EventSupplierComponents/NewSupplierForm';
import { CreateSupplierTransactionAgreement } from '../../components/EventsComponents/EventSupplierComponents/CreateSupplierTransactionAgreement';
import { NewEventSupplierTransactionAgreementConfirmation } from '../../components/EventsComponents/EventSupplierComponents/NewEventSupplierTransactionAgreementConfirmation';
import { EditNewTransactionAmount } from '../../components/TransactionComponents/EditNewTransactionAmount';
import { EditSupplierBudgetAmount } from '../../components/EventsComponents/EventSupplierComponents/EditSupplierBudgetAmount';
import { EditSupplierBudgetDescription } from '../../components/EventsComponents/EventSupplierComponents/EditSupplierBudgetDescription';
import { EditTransactionAmount } from '../../components/TransactionComponents/EditTransactionAmount';
import { NotesSection } from '../../components/EventsComponents/EventNotesComponents/NotesSection';
import { EventNoteForm } from '../../components/EventsComponents/EventNotesComponents/EventNoteForm';
import { EditNoteWindow } from '../../components/NotesComponents/EditNoteWindow';
import { CreateEvent } from '../../components/EventsComponents/CreateEvent';
import { FinancialSection } from '../../components/EventsComponents/FinancialComponents/FinancialSection';
import { EventSupplierAgreementTransactionsWindow } from '../../components/EventsComponents/FinancialComponents/EventSupplierAgreementTransactionsWindow';

import { Container, EventPageContent, Main } from './styles';

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
  const { user } = useAuth();
  const { addToast } = useToast();
  const { friends } = useFriends();
  const { createEventWindow } = useEvent();
  const {
    eventGuests,
    selectEventOwner,
    selectEventMember,
    eventOwners,
    eventMembers,
    selectedEventOwner,
    selectedEventMember,
    isOwner,
    currentSection,
    selectedEventSupplierTransactionAgreement,
  } = useEventVariables();
  const { getEventMembers, getEventOwners, budgetWindow } = useCurrentEvent();
  const { deleteEventOwner } = useEventOwners();
  const {
    editSupplierCategoryWindow,
    createSupplierTransactionAgreementWindow,
    addSupplierWindow,
    editSupplierBudgetAmountWindow,
    editSupplierBudgetDescriptionWindow,
    supplierNotesWindow,
    supplierFilesWindow,
    supplierTransactionsWindow,
    supplierTransactionAgreementsWindow,
    editSupplierNameWindow,
    cancelAgreementsWindow,
    dischargingWindow,
    supplierCategoryWindow,
    eventSupplierAgreementTransactionsWindow,
  } = useEventSuppliers();
  const {
    filterTransactionWindow,
    editEventTransactionValueWindow,
    editNewTransactionValueWindow,
    newEventSupplierTransactionAgreement,
  } = useTransaction();
  const { createEventNoteWindow, editNoteWindow } = useNote();

  const location = useLocation<IParams>();
  const pageEvent = location.state.params;

  const eventId = pageEvent.id;
  const [eventName, setEventName] = useState(pageEvent.name);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [guestAlocationWindow, setGuestAlocationWindow] = useState(false);
  const [membersWindow, setMembersWindow] = useState(false);
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [editEventInfoDrawer, setEditEventInfoDrawer] = useState(false);
  const [editEventNameDrawer, setEditEventNameDrawer] = useState(false);
  const [addPlannerDrawer, setAddPlannerDrawer] = useState(false);
  const [addOwnerDrawer, setAddOwnerDrawer] = useState(false);
  const [addMemberWindowForm, setAddMemberWindowForm] = useState(false);
  const [memberProfileWindow, setMemberProfileWindow] = useState(false);
  const [ownerProfileWindow, setOwnerProfileWindow] = useState(false);
  const [numberOfGuestDrawer, setNumberOfGuestDrawer] = useState(false);
  const [deleteMemberDrawer, setDeleteMemberDrawer] = useState(false);
  const [deleteOwnerDrawer, setDeleteOwnerDrawer] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [
    updateEventNumberOfGuestsWindow,
    setUpdateEventNumberOfGuestsWindow,
  ] = useState(false);
  const [createEventInfoWindowForm, setCreateEventInfoWindowForm] = useState(
    false,
  );
  const [numberOfPlanners, setNumberOfPlanners] = useState(0);
  const [totalGuestNumber, setTotalGuestNumber] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState<IFriendDTO>(
    {} as IFriendDTO,
  );
  const [planners, setPlanners] = useState<IUserInfoDTO[]>([]);
  const [eventInfo, setEventInfo] = useState<IEventInfoDTO>(
    {} as IEventInfoDTO,
  );
  const [selectedSupplier, setSelectedSupplier] = useState<IEventSupplierDTO>(
    {} as IEventSupplierDTO,
  );

  const closeAllWindows = useCallback(() => {
    setGuestAlocationWindow(false);
    setCreateEventInfoWindowForm(false);
    setUpdateEventNumberOfGuestsWindow(false);
    setSelectedFriend({} as IFriendDTO);
    setSelectedSupplier({} as IEventSupplierDTO);
    setFriendsWindow(false);
    setMembersWindow(false);
    setEditEventInfoDrawer(false);
    setOwnerProfileWindow(false);
    setDeleteOwnerDrawer(false);
    setEventInfoDrawer(false);
    setAddMemberWindowForm(false);
    setAddOwnerDrawer(false);
    setEditEventNameDrawer(false);
    setAddPlannerDrawer(false);
    setMemberProfileWindow(false);
    setDeleteMemberDrawer(false);
    setNumberOfGuestDrawer(false);
    setSidebar(false);
  }, []);
  const handleSideBar = useCallback(() => {
    setSidebar(!sidebar);
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
      selectEventOwner(props);
      setOwnerProfileWindow(true);
    },
    [closeAllWindows, selectEventOwner],
  );
  const handleMemberProfileWindow = useCallback(
    (props: IEventMemberDTO) => {
      closeAllWindows();
      selectEventMember(props);
      setMemberProfileWindow(true);
    },
    [closeAllWindows, selectEventMember],
  );
  const handleMembersWindow = useCallback(() => {
    closeAllWindows();
    setMembersWindow(!membersWindow);
  }, [membersWindow, closeAllWindows]);
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
  const currentNumberOfGuests = useMemo(() => {
    const currentMembersGuestNumber: number = eventMembers
      .map(tmember => tmember.number_of_guests)
      .reduce((a, b) => Number(a) + Number(b), 0);
    const currentOwnersGuestNumber: number = eventOwners
      .map(towner => towner.number_of_guests)
      .reduce((a, b) => Number(a) + Number(b), 0);

    const currentGuestNumber =
      currentMembersGuestNumber + currentOwnersGuestNumber;
    return currentGuestNumber;
  }, [eventMembers, eventOwners]);
  const availableNumberOfGuests = useMemo(() => {
    const availableGuestNumber = totalGuestNumber - currentNumberOfGuests;
    return availableGuestNumber;
  }, [totalGuestNumber, currentNumberOfGuests]);
  const myAvailableNumberOfGuests = useMemo(() => {
    const myGuests = eventGuests.filter(guest => guest.host_id === user.id);
    let myNumberOfGuests = 0;
    if (isOwner) {
      const meAsOwner = eventOwners.find(
        xOwner => xOwner.userEventOwner.id === user.id,
      );
      myNumberOfGuests = meAsOwner ? meAsOwner.number_of_guests : 0;
    } else {
      const meAsMember = eventMembers.find(
        xMember => xMember.userEventMember.id === user.id,
      );
      myNumberOfGuests = meAsMember ? meAsMember.number_of_guests : 0;
    }
    const availableGuestNumber = Number(myNumberOfGuests) - myGuests.length;
    return availableGuestNumber;
  }, [eventOwners, eventMembers, user, isOwner, eventGuests]);
  const handleCloseAddPlannerWindow = useCallback(() => {
    setSelectedSupplier({} as IEventSupplierDTO);
    setAddPlannerDrawer(false);
    handleAddPlannerDrawer();
    handleGetPlanners();
  }, [handleAddPlannerDrawer, handleGetPlanners]);
  const handleCloseAddMemberWindow = useCallback(async () => {
    setSelectedFriend({} as IFriendDTO);
    setAddMemberWindowForm(false);
    await getEventMembers(eventId);
  }, [getEventMembers, eventId]);

  const handleCloseEditEventInfoWindow = useCallback(
    (data: IEventInfoDTO) => {
      setEventInfo(data);
      setEditEventInfoDrawer(false);
      handleGetEventInfo();
    },
    [handleGetEventInfo],
  );
  const handleCloseAddOwnerWindow = useCallback(async () => {
    setSelectedFriend({} as IFriendDTO);
    setAddOwnerDrawer(false);
    await getEventOwners(eventId);
  }, [getEventOwners, eventId]);
  const handleCloseEditEventNameWindow = useCallback(() => {
    setEditEventNameDrawer(false);
    handleGetEventInfo();
  }, [handleGetEventInfo]);
  const handleCloseEditMemberNumberOfGuestsWindow = useCallback(async () => {
    setNumberOfGuestDrawer(false);
    setMemberProfileWindow(false);
    selectEventMember({} as IEventMemberDTO);
    await getEventMembers(eventId);
  }, [getEventMembers, eventId, selectEventMember]);
  const handleDeleteMember = useCallback(async () => {
    try {
      await api.delete(
        `/events/${eventId}/event-members/${selectedEventMember.userEventMember.id}`,
      );
      addToast({
        type: 'success',
        title: 'Membro excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
      setMemberProfileWindow(false);
      setDeleteMemberDrawer(false);
      await getEventMembers(eventId);
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
  }, [eventId, selectedEventMember, addToast, getEventMembers]);
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
    selectEventOwner({} as IEventOwnerDTO);
  }, [selectEventOwner]);
  const handleEditEventInfoWindow = useCallback(() => {
    setEventInfoDrawer(false);
    setEditEventInfoDrawer(true);
  }, []);
  useEffect(() => {
    handleGetPlanners();
  }, [handleGetPlanners]);
  const closeEventInfoWindowForm = useCallback(() => {
    handleGetEventInfo();
    setCreateEventInfoWindowForm(false);
  }, [handleGetEventInfo]);

  return (
    <Container>
      <PageHeader />
      {/* Supplier Windows */}
      {editSupplierCategoryWindow && <EditSupplierCategory />}
      {createSupplierTransactionAgreementWindow && (
        <CreateSupplierTransactionAgreement />
      )}
      {editSupplierNameWindow && <EditSupplierName />}
      {supplierTransactionsWindow && <SupplierTransactionsWindow />}
      {supplierFilesWindow && <EventSupplierFilesWindow />}
      {cancelAgreementsWindow && <CancelAllAgreements />}
      {dischargingWindow && <DischargeSupplierWindow />}
      {supplierCategoryWindow && <SelectSupplierCategory />}
      {addSupplierWindow && <NewSupplierForm />}
      {editSupplierBudgetAmountWindow && <EditSupplierBudgetAmount />}
      {editSupplierBudgetDescriptionWindow && <EditSupplierBudgetDescription />}
      {supplierTransactionAgreementsWindow && (
        <SupplierTransactionAgreementsWindow />
      )}
      {supplierNotesWindow && <SupplierNotesSection />}
      {newEventSupplierTransactionAgreement && (
        <NewEventSupplierTransactionAgreementConfirmation />
      )}
      {/* End of Supplier Windows */}
      {/* Transaction Windows */}
      {filterTransactionWindow && <TransactionsFilterWindow />}
      {editNewTransactionValueWindow && <EditNewTransactionAmount />}
      {editEventTransactionValueWindow && <EditTransactionAmount />}
      {selectedEventSupplierTransactionAgreement &&
        selectedEventSupplierTransactionAgreement.id &&
        eventSupplierAgreementTransactionsWindow && (
          <EventSupplierAgreementTransactionsWindow />
        )}
      {/* End of Transaction Windows */}
      {/* Notes Windows */}
      {createEventNoteWindow && <EventNoteForm />}
      {editNoteWindow && <EditNoteWindow />}
      {/* End of Notes Windows */}
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
          availableNumberOfGuests={availableNumberOfGuests}
          eventInfo={eventInfo}
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
      {!!ownerProfileWindow && selectedEventOwner && (
        <OwnerProfileDrawer
          getEventInfo={handleGetEventInfo}
          availableNumberOfGuests={availableNumberOfGuests}
          handleCloseWindow={handleCloseOwnerWindow}
          onHandleCloseWindow={() => handleCloseOwnerWindow()}
        />
      )}
      {!!memberProfileWindow && selectedEventMember && (
        <MemberProfileDrawer
          onHandleMemberDrawer={() => setMemberProfileWindow(false)}
          onHandleNumberOfGuestDrawer={() => setNumberOfGuestDrawer(true)}
          onHandleDeleteMemberDrawer={() => setDeleteMemberDrawer(true)}
        />
      )}
      {!!numberOfGuestDrawer && (
        <EditMemberNumberOfGuestsWindow
          availableNumberOfGuests={availableNumberOfGuests}
          eventId={eventId}
          member={selectedEventMember}
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
      {!!deleteOwnerDrawer && selectedEventOwner && selectedEventOwner.id && (
        <DeleteConfirmationWindow
          handleDelete={() => deleteEventOwner(selectedEventOwner.id)}
          onHandleCloseWindow={() => setDeleteOwnerDrawer(false)}
        />
      )}
      {!!eventInfoDrawer && (
        <EventInfoWindow
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
          handleCloseWindow={handleCloseAddMemberWindow}
          onHandleCloseWindow={() => handleCloseAddMemberWindow()}
          handleFriendsWindow={() => setFriendsWindow(true)}
        />
      )}
      {!!membersWindow && (
        <MembersWindow
          handleMemberProfileWindow={(e: IEventMemberDTO) =>
            handleMemberProfileWindow(e)
          }
          members={eventMembers}
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
            handleMembersWindow={handleMembersWindow}
            handleOwnerProfileWindow={handleOwnerProfileWindow}
            handleSelectFriendAsMember={handleSelectFriendAsMember}
            numberOfPlanners={numberOfPlanners}
            openGuestAlocationWindow={openGuestAlocationWindow}
            planners={planners}
          />
        )}
        <Main>
          <FirstRow />
          {createEventWindow && <CreateEvent />}
          {currentSection === 'notes' && <NotesSection />}
          {budgetWindow && <EditEventBudgetWindow />}
          {currentSection === 'dashboard' && <EventMainDashboard />}
          {currentSection === 'suppliers' && <EventSupplierSection />}
          {currentSection === 'guests' && (
            <EventGuestSection
              handleGuestAllocationWindow={openGuestAlocationWindow}
              myAvailableNumberOfGuests={myAvailableNumberOfGuests}
              closeAllWindows={closeAllWindows}
            />
          )}
          {currentSection === 'financial' && <FinancialSection />}
          {currentSection === 'tasks' && <EventTaskSection />}
        </Main>
      </EventPageContent>
    </Container>
  );
};

export default EventHostDashboard;
