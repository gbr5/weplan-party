import React, { memo } from 'react';
import { FiCheckSquare, FiSettings, FiSquare } from 'react-icons/fi';

import IEventGuestDTO from '../../../dtos/IEventGuestDTO';
import formatStringToDate from '../../../utils/formatDateToString';

import { Container, EventButton, EventSettingsButton } from './styles';

interface IPropsDTO {
  eventAsGuest: IEventGuestDTO;
  deleteEvent: Function;
  selectEventGuest: Function;
}

const FriendsEvents: React.FC<IPropsDTO> = ({
  eventAsGuest,
  deleteEvent,
  selectEventGuest,
}: IPropsDTO) => {
  return (
    <Container key={eventAsGuest.id}>
      <EventButton type="button" onClick={() => selectEventGuest(eventAsGuest)}>
        {eventAsGuest.weplanGuest.event.name}
      </EventButton>
      <div>
        <span>
          {formatStringToDate(String(eventAsGuest.weplanGuest.event.date))}
        </span>
        <span>
          <EventSettingsButton
            type="button"
            onClick={() => deleteEvent(eventAsGuest.id)}
          >
            <FiSettings size={20} />
          </EventSettingsButton>
        </span>
        <p>{eventAsGuest.confirmed ? <FiCheckSquare /> : <FiSquare />}</p>
        {/* <button
          type="button"
          onClick={() => handleEditConfirmedGuest(eventAsGuest)}
        >
          {eventAsGuest.confirmed ? (
            <FiCheckSquare size={24} />
          ) : (
            <FiSquare size={24} />
          )}
        </button> */}
      </div>
    </Container>
  );
};

export default memo(FriendsEvents);
