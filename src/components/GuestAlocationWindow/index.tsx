import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import IEventInfoDTO from '../../dtos/IEventInfoDTO';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import BooleanButtonContainer from '../BooleanButtonContainer';

import { Container, SubTitle, Body } from './styles';
import HostListSection from './HostListSection';
import IHostDTO from '../../dtos/IHostDTO';
import { useEventVariables } from '../../hooks/eventVariables';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  availableNumberOfGuests: number;
  handleUpdateEventNumberOfGuests: MouseEventHandler;
  eventInfo: IEventInfoDTO;
}

const GuestAlocationWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  availableNumberOfGuests,
  handleUpdateEventNumberOfGuests,
  eventInfo,
}: IProps) => {
  const { eventMembers, eventOwners, eventGuests } = useEventVariables();
  const [ownersSection, setOwnersSection] = useState(true);
  const [ownersNumberOfGuests, setOwnersNumberOfGuests] = useState(0);
  const [membersNumberOfGuests, setMembersNumberOfGuests] = useState(0);
  const [ownersHosts, setOwnersHosts] = useState<IHostDTO[]>([]);
  const [membersHosts, setMembersHosts] = useState<IHostDTO[]>([]);

  const handleOwnersHosts = useCallback(() => {
    setOwnersNumberOfGuests(
      eventOwners
        .map(owner => owner.number_of_guests)
        .reduce((a, b) => Number(a) + Number(b), 0),
    );
    setOwnersHosts(
      eventOwners.map(owner => {
        const invited_guests = eventGuests.filter(
          guest => guest.host_id === owner.userEventOwner.id,
        );
        const userOwner = owner.userEventOwner;
        const first_name = userOwner.personInfo
          ? userOwner.personInfo.first_name
          : userOwner.name;
        const last_name = userOwner.personInfo
          ? userOwner.personInfo.last_name
          : '';
        return {
          id: owner.id,
          first_name,
          last_name,
          isOwner: true,
          number_of_guests: owner.number_of_guests,
          user_id: owner.userEventOwner.id,
          event_id: owner.event_id,
          invited_guests,
        };
      }),
    );
  }, [eventOwners, eventGuests]);

  useEffect(() => {
    handleOwnersHosts();
  }, [handleOwnersHosts]);

  const handleMembersHosts = useCallback(() => {
    setMembersNumberOfGuests(
      eventMembers
        .map(member => member.number_of_guests)
        .reduce((a, b) => Number(a) + Number(b), 0),
    );
    setMembersHosts(
      eventMembers.map(member => {
        const invited_guests = eventGuests.filter(
          guest => guest.host_id === member.userEventMember.id,
        );
        const userMember = member.userEventMember;
        const first_name = userMember.personInfo
          ? userMember.personInfo.first_name
          : userMember.name;
        const last_name = userMember.personInfo
          ? userMember.personInfo.last_name
          : '';
        return {
          id: member.id,
          first_name,
          last_name,
          isOwner: false,
          number_of_guests: member.number_of_guests,
          user_id: member.userEventMember.id,
          event_id: member.event_id,
          invited_guests,
        };
      }),
    );
  }, [eventMembers, eventGuests]);

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
      zIndex={29}
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
            firstActive={!ownersSection}
            firstClick={() => setOwnersSection(true)}
            firstLabel="Anfitriões"
            secondClick={() => setOwnersSection(false)}
            secondLabel="Membros"
          />

          {ownersSection ? (
            <HostListSection
              availableNumberOfGuests={availableNumberOfGuests}
              handleUpdateEventNumberOfGuests={handleUpdateEventNumberOfGuests}
              hosts={ownersHosts}
            />
          ) : (
            <HostListSection
              availableNumberOfGuests={availableNumberOfGuests}
              handleUpdateEventNumberOfGuests={handleUpdateEventNumberOfGuests}
              hosts={membersHosts}
            />
          )}
        </Body>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default GuestAlocationWindow;
