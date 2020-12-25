import React, { memo, MouseEventHandler, useCallback } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container, SideMenu, Body, Message } from './styles';

interface IPropsDTO {
  eventGuest: IEventGuestDTO;
  onHandleCloseWindow: MouseEventHandler;
  getEventsAsGuest: Function;
  handleCloseWindow: Function;
}

const GuestToUserMessageWindow: React.FC<IPropsDTO> = ({
  eventGuest,
  onHandleCloseWindow,
  getEventsAsGuest,
  handleCloseWindow,
}: IPropsDTO) => {
  const { addToast } = useToast();

  const handleEditConfirmedGuest = useCallback(async () => {
    try {
      await api.put(`events/weplan-user-guest/${eventGuest.id}`);

      addToast({
        type: 'success',
        title: 'Convidado editado com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
      getEventsAsGuest();
      handleCloseWindow();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao editar convidado',
        description: 'Erro ao editar o convidado, tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, getEventsAsGuest, handleCloseWindow, eventGuest]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <SideMenu>
          <h1>@{eventGuest.host.name}</h1>
          <h2>
            {eventGuest.host.personInfo.first_name}{' '}
            {eventGuest.host.personInfo.last_name}
          </h2>
          <button type="button" onClick={handleEditConfirmedGuest}>
            {eventGuest.confirmed ? <FiCheckSquare /> : <FiSquare />}
          </button>
        </SideMenu>
        <Body>
          {eventGuest.weplanGuest.userConfirmations.map(conversation => {
            return (
              <Message>
                <h3>{conversation.title}</h3>
                <p>{conversation.message}</p>
                <div>
                  {conversation.userConfirmationFiles.map(file => {
                    return (
                      <a target="blank" href={file.file.file_url}>
                        {file.file.file_name}
                      </a>
                    );
                  })}
                </div>
              </Message>
            );
          })}
        </Body>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default memo(GuestToUserMessageWindow);
