import React, { useMemo, useState } from 'react';
import IUserFollowerDTO from '../../../../dtos/IUserFollowerDTO';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../hooks/eventVariables';
import Button from '../../../Button';
import { WindowHeader } from '../../../WindowHeader';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { NewEventTaskFollower } from '../NewEventTaskFollower';

import { Container, Underline, Menu, MenuButton, MenuText } from './styles';

export function AddEventTaskFollowersWindow(): JSX.Element {
  const {
    eventOwners,
    eventMembers,
    eventSuppliers,
    eventGuests,
    selectedEventTask,
    selectedEvent,
  } = useEventVariables();
  const {
    handleCreateEventTaskFollowersWindow,
    createMultipleEventTaskFollowers,
  } = useEventTasks();

  const [selectedFollowers, setSelectedFollowers] = useState<
    IUserFollowerDTO[]
  >([]);
  const [selectedType, setSelectedType] = useState('owner');

  async function handleAddFollowers(): Promise<void> {
    await createMultipleEventTaskFollowers(selectedFollowers);
    handleCreateEventTaskFollowersWindow();
  }

  function handleSelectedFollowers(follower: IUserFollowerDTO): void {
    const findFollower = selectedFollowers.find(
      item => item.follower.id === follower.follower.id,
    );
    if (findFollower) {
      const newFollowers = selectedFollowers.filter(
        item => item.follower.id !== follower.follower.id,
      );
      return setSelectedFollowers(newFollowers);
    }
    return setSelectedFollowers([...selectedFollowers, follower]);
  }

  const possibleNewFollowersOwners = useMemo(() => {
    const followers: IUserFollowerDTO[] = [];
    if (eventOwners.length > 1) {
      eventOwners.map(owner => {
        const findOwner = selectedEventTask.task.followers.find(
          item => item.follower.id === owner.userEventOwner.id,
        );
        if (!findOwner) {
          followers.push({
            follower: owner.userEventOwner,
            type: 'owner',
          });
        }
        return owner;
      });
    }
    return followers;
  }, [eventOwners, selectedEventTask.task.followers]);

  const possibleNewFollowersMembers = useMemo(() => {
    const followers: IUserFollowerDTO[] = [];
    if (selectedEvent.event_type !== 'Prom') return followers;
    if (eventMembers.length > 0) {
      eventMembers.map(member => {
        const findMember = selectedEventTask.task.followers.find(
          item => item.follower.id === member.userEventMember.id,
        );
        if (!findMember) {
          followers.push({
            follower: member.userEventMember,
            type: 'member',
          });
        }
        return member;
      });
    }
    return followers;
  }, [eventMembers, selectedEventTask.task.followers, selectedEvent]);

  const possibleNewFollowersSuppliers = useMemo(() => {
    const followers: IUserFollowerDTO[] = [];
    if (eventSuppliers.length > 0) {
      eventSuppliers
        .filter(
          supplier =>
            supplier.weplanUser &&
            supplier.eventWeplanSupplier &&
            supplier.eventWeplanSupplier.weplanEventSupplier &&
            supplier.eventWeplanSupplier.weplanEventSupplier.id,
        )
        .map(supplier => {
          const findFollower = selectedEventTask.task.followers.find(
            follower =>
              follower.user_id ===
              supplier.eventWeplanSupplier.weplanEventSupplier.id,
          );
          if (!findFollower) {
            followers.push({
              follower: supplier.eventWeplanSupplier.weplanEventSupplier,
              type: 'supplier',
            });
          }
          return supplier;
        });
    }
    return followers;
  }, [eventSuppliers, selectedEventTask]);

  const possibleNewFollowersGuests = useMemo(() => {
    const followers: IUserFollowerDTO[] = [];
    if (eventGuests.length > 0) {
      eventGuests
        .filter(
          guest =>
            guest.weplanUser &&
            guest.weplanGuest &&
            guest.weplanGuest.weplanUserGuest &&
            guest.weplanGuest.weplanUserGuest.id,
        )
        .map(guest => {
          const findFollower = selectedEventTask.task.followers.find(
            follower =>
              follower.user_id === guest.weplanGuest.weplanUserGuest.id,
          );
          if (!findFollower) {
            followers.push({
              follower: guest.weplanGuest.weplanUserGuest,
              type: 'guest',
            });
          }
          return guest;
        });
    }
    return followers;
  }, [eventGuests, selectedEventTask.task.followers]);

  function handleSelectedType(data: string): void {
    setSelectedType(data);
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleCreateEventTaskFollowersWindow}
      zIndex={8}
      containerStyle={{
        zIndex: 9,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader overTitle="Adicionar" title="Seguidores" />
        <Menu>
          {possibleNewFollowersOwners.length > 0 && (
            <MenuButton
              onClick={() => handleSelectedType('owner')}
              isActive={selectedType === 'owner'}
            >
              <MenuText>Anfitriões</MenuText>
            </MenuButton>
          )}
          {possibleNewFollowersMembers.length > 0 &&
            selectedEvent.event_type === 'Prom' && (
              <MenuButton
                onClick={() => handleSelectedType('member')}
                isActive={selectedType === 'member'}
              >
                <MenuText>Membros</MenuText>
              </MenuButton>
            )}
          {possibleNewFollowersSuppliers.length > 0 && (
            <MenuButton
              onClick={() => handleSelectedType('supplier')}
              isActive={selectedType === 'supplier'}
            >
              <MenuText>Fornecedores</MenuText>
            </MenuButton>
          )}
          {possibleNewFollowersGuests.length > 0 && (
            <MenuButton
              onClick={() => handleSelectedType('guest')}
              isActive={selectedType === 'guest'}
            >
              <MenuText>Convidados</MenuText>
            </MenuButton>
          )}
        </Menu>
        <Underline />
        {selectedFollowers.length > 0 && (
          <Button onClick={handleAddFollowers}>Adicionar</Button>
        )}
        {possibleNewFollowersOwners.length > 0 &&
          selectedType === 'owner' &&
          possibleNewFollowersOwners.map(owner => {
            const findFollower = selectedFollowers.find(
              item => item.follower.id === owner.follower.id,
            );
            return (
              <NewEventTaskFollower
                handleSelectFollower={handleSelectedFollowers}
                isSelected={!!findFollower}
                user={owner}
                key={owner.follower.id}
              />
            );
          })}
        {possibleNewFollowersMembers.length > 0 &&
          selectedType === 'member' &&
          possibleNewFollowersMembers.map(member => {
            const findFollower = selectedFollowers.find(
              item => item.follower.id === member.follower.id,
            );
            return (
              <NewEventTaskFollower
                handleSelectFollower={handleSelectedFollowers}
                isSelected={!!findFollower}
                user={member}
                key={member.follower.id}
              />
            );
          })}
        {possibleNewFollowersSuppliers.length > 0 &&
          selectedType === 'supplier' &&
          possibleNewFollowersSuppliers.map(supplier => {
            const findFollower = selectedFollowers.find(
              item => item.follower.id === supplier.follower.id,
            );
            return (
              <NewEventTaskFollower
                handleSelectFollower={handleSelectedFollowers}
                isSelected={!!findFollower}
                user={supplier}
                key={supplier.follower.id}
              />
            );
          })}
        {possibleNewFollowersGuests.length > 0 &&
          selectedType === 'guest' &&
          possibleNewFollowersGuests.map(guest => {
            const findFollower = selectedFollowers.find(
              item => item.follower.id === guest.follower.id,
            );
            return (
              <NewEventTaskFollower
                handleSelectFollower={handleSelectedFollowers}
                isSelected={!!findFollower}
                user={guest}
                key={guest.follower.id}
              />
            );
          })}
      </Container>
    </WindowUnFormattedContainer>
  );
}
