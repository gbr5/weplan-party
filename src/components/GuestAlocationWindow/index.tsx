import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';
import IEventMemberDTO from '../../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../../dtos/IEventOwnerDTO';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import BooleanButtonContainer from '../BooleanButtonContainer';

import { Container, SubTitle, Body } from './styles';
import HostListSection from './HostListSection';
import IHostDTO from '../../dtos/IHostDTO';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  availableNumberOfGuests: number;
  masterId: string;
  getOwners: Function;
  getMembers: Function;
  handleUpdateEventNumberOfGuests: MouseEventHandler;
  owners: IEventOwnerDTO[];
  members: IEventMemberDTO[];
  guests: IEventGuestDTO[];
  eventInfo: IEventInfoDTO;
}

const GuestAlocationWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  availableNumberOfGuests,
  masterId,
  getOwners,
  getMembers,
  handleUpdateEventNumberOfGuests,
  owners,
  members,
  guests,
  eventInfo,
}: IProps) => {
  const [ownersSection, setOwnersSection] = useState(true);
  const [ownersNumberOfGuests, setOwnersNumberOfGuests] = useState(0);
  const [membersNumberOfGuests, setMembersNumberOfGuests] = useState(0);
  const [ownersHosts, setOwnersHosts] = useState<IHostDTO[]>([]);
  const [membersHosts, setMembersHosts] = useState<IHostDTO[]>([]);

  const handleOwnersHosts = useCallback(() => {
    setOwnersNumberOfGuests(
      owners
        .map(owner => owner.number_of_guests)
        .reduce((a, b) => Number(a) + Number(b), 0),
    );
    setOwnersHosts(
      owners.map(owner => {
        const invited_guests = guests.filter(
          guest => guest.host_id === owner.userEventOwner.id,
        );
        return {
          id: owner.id,
          first_name: owner.userEventOwner.personInfo.first_name,
          last_name: owner.userEventOwner.personInfo.last_name,
          isOwner: true,
          number_of_guests: owner.number_of_guests,
          user_id: owner.userEventOwner.id,
          event_id: owner.event_id,
          invited_guests,
        };
      }),
    );
  }, [owners, guests]);

  useEffect(() => {
    handleOwnersHosts();
  }, [handleOwnersHosts]);

  const handleMembersHosts = useCallback(() => {
    setMembersNumberOfGuests(
      members
        .map(member => member.number_of_guests)
        .reduce((a, b) => Number(a) + Number(b), 0),
    );
    setMembersHosts(
      members.map(member => {
        const invited_guests = guests.filter(
          guest => guest.host_id === member.userEventMember.id,
        );
        return {
          id: member.id,
          first_name: member.userEventMember.personInfo.first_name,
          last_name: member.userEventMember.personInfo.last_name,
          isOwner: false,
          number_of_guests: member.number_of_guests,
          user_id: member.userEventMember.id,
          event_id: member.event_id,
          invited_guests,
        };
      }),
    );
  }, [members, guests]);

  useEffect(() => {
    handleMembersHosts();
  }, [handleMembersHosts]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 30,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      <Container>
        <h1>Alocação de Convidados</h1>

        <SubTitle>
          <div>
            <div>
              <h3>Restrição do evento:</h3>
              <strong>{eventInfo.number_of_guests}</strong>
            </div>
            <div>
              <h3>Anfitriões:</h3>
              <strong>{ownersNumberOfGuests}</strong>
            </div>
            <div>
              <h3>Membros:</h3>
              <strong>{membersNumberOfGuests}</strong>
            </div>
            <div>
              <h3>N° de convidados disponível:</h3>
              <strong>{availableNumberOfGuests}</strong>
            </div>
          </div>
          <button type="button" onClick={handleUpdateEventNumberOfGuests}>
            Atualizar convidados do evento
          </button>
        </SubTitle>
        <Body>
          <BooleanButtonContainer
            firstActive={ownersSection}
            firstClick={() => setOwnersSection(true)}
            firstLabel="Anfitriões"
            secondClick={() => setOwnersSection(false)}
            secondLabel="Membros"
          />

          {ownersSection ? (
            <HostListSection
              availableNumberOfGuests={availableNumberOfGuests}
              getHosts={getOwners}
              handleUpdateEventNumberOfGuests={handleUpdateEventNumberOfGuests}
              hosts={ownersHosts}
              masterId={masterId}
            />
          ) : (
            <HostListSection
              availableNumberOfGuests={availableNumberOfGuests}
              getHosts={getMembers}
              handleUpdateEventNumberOfGuests={handleUpdateEventNumberOfGuests}
              hosts={membersHosts}
              masterId={masterId}
            />
          )}
        </Body>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default GuestAlocationWindow;
