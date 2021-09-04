import React from 'react';

import { useEventGuests } from '../../../../hooks/eventGuests';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';

import { Container, Button, ButtonTitle } from './styles';
import { WindowHeader } from '../../../WindowHeader';
import { useFriends } from '../../../../hooks/friends';
import { useEventVariables } from '../../../../hooks/eventVariables';

export function NewGuestWindow(): JSX.Element {
  const { eventGuests } = useEventVariables();
  const {
    handleNewGuestForm,
    handleNewGuestWindow,
    handleSelectWePlanGuestsWindow,
    handleAddGuestListWindow,
  } = useEventGuests();
  const { getFriends, handleUnselectedFriends } = useFriends();

  async function handleNewWePlanGuest(): Promise<void> {
    const findWePlanGuests = eventGuests
      .filter(
        guest =>
          guest.weplanUser &&
          guest.weplanGuest &&
          guest.weplanGuest.weplanUserGuest,
      )
      .map(guest => guest.weplanGuest.weplanUserGuest);
    findWePlanGuests.length > 0 && handleUnselectedFriends(findWePlanGuests);

    await getFriends();
    handleSelectWePlanGuestsWindow();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleNewGuestWindow}
      containerStyle={{
        zIndex: 10,
        top: '10%',
        left: '2%',
        height: '70%',
        width: '96%',
      }}
      zIndex={9}
    >
      <Container>
        <WindowHeader title="Novo(a) Convidado(a)" />
        <Button onClick={handleAddGuestListWindow}>
          <ButtonTitle>Importar planilha</ButtonTitle>
        </Button>
        <Button onClick={handleNewWePlanGuest}>
          <ButtonTitle>Selecionar Contatos WePlan</ButtonTitle>
        </Button>
        <Button onClick={handleNewGuestForm}>
          <ButtonTitle>Criar manualmente</ButtonTitle>
        </Button>
      </Container>
    </WindowUnFormattedContainer>
  );
}
