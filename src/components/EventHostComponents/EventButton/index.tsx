import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import IEventDTO from '../../../dtos/IEventDTO';
import { useCurrentEvent } from '../../../hooks/currentEvent';
import { useEventVariables } from '../../../hooks/eventVariables';

import {
  Container,
  IconButton,
  Name,
  DateSection,
  Body,
  CreatedAt,
} from './styles';
import formatOnlyTime from '../../../utils/formatOnlyTime';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';

interface IProps {
  event: IEventDTO;
}

export function EventButton({ event }: IProps): JSX.Element {
  const history = useHistory();
  const {
    handleSelectedEvent,
    handleDeleteEventConfirmationWindow,
  } = useCurrentEvent();
  const { unsetVariables } = useEventVariables();

  function handleMyEventDashboard(): void {
    unsetVariables();
    handleSelectedEvent(event);
    history.push(`/dashboard/my-event/${event.trimmed_name}`, {
      params: event,
    });
  }

  function handleDeleteEventWindow(): void {
    handleSelectedEvent(event);
    handleDeleteEventConfirmationWindow();
  }

  return (
    <Container>
      <Body type="button" onClick={() => handleMyEventDashboard()}>
        <DateSection>
          {formatOnlyTime(String(event.date))} -{' '}
          {formatOnlyDateShort(String(event.date))}
        </DateSection>
        <Name>{event.name}</Name>
        <CreatedAt>
          Criado em: {formatOnlyTime(String(event.created_at))} -{' '}
          {formatOnlyDateShort(String(event.created_at))}
        </CreatedAt>
      </Body>
      <IconButton type="button" onClick={handleDeleteEventWindow}>
        <FiSettings size={20} />
      </IconButton>
    </Container>
  );
}
