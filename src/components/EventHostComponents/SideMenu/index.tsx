import React from 'react';
import { useMemo } from 'react';
import { FiEdit, FiEdit3 } from 'react-icons/fi';
import { MdGroupAdd, MdPersonAdd } from 'react-icons/md';
import { useEventVariables } from '../../../hooks/eventVariables';

import { Container } from './styles';

interface IUserInfoDTO {
  id: string;
  name: string;
  avatar: string;
}

interface IProps {
  openGuestAlocationWindow: Function;
  handleEditEventNameDrawer: Function;
  handleAddOwnerDrawer: Function;
  handleSelectFriendAsMember: Function;
  handleOwnerProfileWindow: Function;
  handleMembersWindow: Function;
  handleAddPlannerDrawer: Function;
  handleEventInfoWindow: Function;
  eventName: string;
  planners: IUserInfoDTO[];
  numberOfPlanners: number;
}

const SideMenu: React.FC<IProps> = ({
  openGuestAlocationWindow,
  handleEditEventNameDrawer,
  handleSelectFriendAsMember,
  handleOwnerProfileWindow,
  handleMembersWindow,
  handleAddPlannerDrawer,
  handleEventInfoWindow,
  handleAddOwnerDrawer,
  eventName,
  planners,
  numberOfPlanners,
}: IProps) => {
  const {
    eventOwners,
    eventMembers,
    isOwner,
    handleCurrentSection,
  } = useEventVariables();

  const numberOfOwners = useMemo(() => eventOwners.length, [eventOwners]);
  const numberOfMembers = useMemo(() => eventMembers.length, [eventMembers]);

  return (
    <Container>
      <button type="button" onClick={() => handleCurrentSection('dashboard')}>
        <h1>Dashboard</h1>
      </button>
      {isOwner ? (
        <button type="button" onClick={() => handleEditEventNameDrawer()}>
          <h3>{eventName}</h3>
          <FiEdit3 size={16} />
        </button>
      ) : (
        <button type="button">
          <h5>{eventName}</h5>
        </button>
      )}
      {isOwner && (
        <button type="button" onClick={() => openGuestAlocationWindow()}>
          <h3>Alocação de Convidados:</h3>
          <MdGroupAdd size={24} />
        </button>
      )}

      {isOwner ? (
        <button type="button" onClick={() => handleAddOwnerDrawer()}>
          <h1>Anfitriões: {numberOfOwners}</h1>
          <MdPersonAdd size={24} />
        </button>
      ) : (
        <button type="button">
          <h1>Anfitriões: {numberOfOwners}</h1>
        </button>
      )}

      {eventOwners.length > 4 ? (
        <span style={{ overflowY: 'scroll', height: '200px' }}>
          {eventOwners.map(eventOwner => (
            <button
              key={eventOwner.id}
              type="button"
              onClick={() => handleOwnerProfileWindow(eventOwner)}
            >
              <h2>{eventOwner.userEventOwner.name}</h2>
            </button>
          ))}
        </span>
      ) : (
        <span>
          {eventOwners.map(eventOwner => (
            <button
              key={eventOwner.id}
              type="button"
              onClick={() => handleOwnerProfileWindow(eventOwner)}
            >
              <h2>{eventOwner.userEventOwner.name}</h2>
            </button>
          ))}
        </span>
      )}

      {isOwner ? (
        <button type="button" onClick={() => handleSelectFriendAsMember()}>
          <h1>Membros: {numberOfMembers}</h1>
          <MdPersonAdd size={24} />
        </button>
      ) : (
        <button type="button">
          <h1>Membros: {numberOfMembers}</h1>
        </button>
      )}

      <span>
        <button type="button" onClick={() => handleMembersWindow()}>
          <h2>Visualizar</h2>
        </button>
      </span>
      {isOwner ? (
        <button type="button" onClick={() => handleAddPlannerDrawer()}>
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
          {isOwner ? (
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
      <button type="button" onClick={() => handleEventInfoWindow()}>
        Informações do Evento
      </button>
      <button type="button" onClick={() => handleCurrentSection('notes')}>
        Últimas Atualizações
      </button>
      {/* <button type="button" onClick={() => handleMessagesSection()}>
        Mensagens
      </button> */}
    </Container>
  );
};

export default SideMenu;
