import React from 'react';
import { FiEdit, FiEdit3 } from 'react-icons/fi';
import { MdGroupAdd, MdPersonAdd } from 'react-icons/md';
import IEventOwnerDTO from '../../../dtos/IEventOwnerDTO';

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
  handleLatestActionsSection: Function;
  // handleMessagesSection: Function;
  eventName: string;
  owners: IEventOwnerDTO[];
  planners: IUserInfoDTO[];
  numberOfOwners: number;
  numberOfMembers: number;
  numberOfPlanners: number;
  isOwner: boolean;
}

const SideMenu: React.FC<IProps> = ({
  openGuestAlocationWindow,
  handleEditEventNameDrawer,
  handleSelectFriendAsMember,
  handleOwnerProfileWindow,
  handleMembersWindow,
  handleAddPlannerDrawer,
  handleEventInfoWindow,
  handleLatestActionsSection,
  // handleMessagesSection,
  handleAddOwnerDrawer,
  eventName,
  owners,
  planners,
  numberOfOwners,
  numberOfMembers,
  numberOfPlanners,
  isOwner,
}: IProps) => {
  return (
    <Container>
      <button type="button" onClick={() => handleLatestActionsSection()}>
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

      {owners.length > 4 ? (
        <span style={{ overflowY: 'scroll', height: '200px' }}>
          {owners.map(eventOwner => (
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
          {owners.map(eventOwner => (
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
      <button type="button" onClick={() => handleLatestActionsSection()}>
        Últimas Atualizações
      </button>
      {/* <button type="button" onClick={() => handleMessagesSection()}>
        Mensagens
      </button> */}
    </Container>
  );
};

export default SideMenu;
