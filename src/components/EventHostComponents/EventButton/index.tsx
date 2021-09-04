import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiSettings, FiStar } from 'react-icons/fi';
import IEventDTO from '../../../dtos/IEventDTO';
import { useAuth } from '../../../hooks/auth';
import { useCurrentEvent } from '../../../hooks/currentEvent';
import { useEventVariables } from '../../../hooks/eventVariables';
import formatStringToDate from '../../../utils/formatStringToDate';

import { Container, DateSection } from './styles';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';

interface IProps {
  event: IEventDTO;
}

export function EventButton({ event }: IProps): JSX.Element {
  const history = useHistory();
  const { user } = useAuth();
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
      <button type="button" onClick={() => handleMyEventDashboard()}>
        <h3>{event.name}</h3>
      </button>
      {event.user_id === user.id && <FiStar size={16} />}

      <div>
        <DateSection>
          {event.date && formatOnlyDateShort(String(event.date))}
        </DateSection>
        <span>
          <button type="button" onClick={handleDeleteEventWindow}>
            <FiSettings size={20} />
          </button>
        </span>
      </div>
    </Container>
  );
}
