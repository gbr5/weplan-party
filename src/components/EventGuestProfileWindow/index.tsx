import React, { MouseEventHandler, useCallback } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import api from '../../services/api';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container, Section } from './styles';

interface IProps {
  guest: IEventGuestDTO;
  onHandleCloseWindow: MouseEventHandler;
}

const EventGuestProfileWindow: React.FC<IProps> = ({
  guest,
  onHandleCloseWindow,
}: IProps) => {
  const handleUpdateGuestConfirmation = useCallback(() => {
    try {
      api.put(`/event-guests/confirmation/${guest.id}`);
    } catch (err) {
      throw new Error(err);
    }
  }, [guest]);

  const containerStyle = {
    zIndex: 12,
    top: '5%',
    left: '5%',
    height: '90%',
    width: '90%',
  };

  return (
    <>
      <WindowUnFormattedContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={containerStyle}
      >
        <Container>
          <h1>Perfil do Convidado</h1>
          <div>
            <Section>
              <span>
                <button type="button">
                  <MdEdit />
                </button>
              </span>
              <div>
                <h3>
                  <strong>{guest.first_name}</strong>
                  {guest.last_name}
                </h3>
                <button type="button" onClick={handleUpdateGuestConfirmation}>
                  {guest.confirmed ? (
                    <FiCheckSquare size={56} />
                  ) : (
                    <FiSquare size={56} />
                  )}
                </button>
              </div>
              <p>{guest.description}</p>
            </Section>
            <Section>
              <h2>Informações de contato</h2>
            </Section>
          </div>
        </Container>
      </WindowUnFormattedContainer>
    </>
  );
};

export default EventGuestProfileWindow;
