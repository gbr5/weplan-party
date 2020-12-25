import React, { memo, MouseEventHandler, useCallback, useMemo } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import placeholder from '../../assets/WePlanLogo.svg';

import { Container, SideMenu, Body, Message } from './styles';
import formatStringToDate from '../../utils/formatDateToString';

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

  const avatar = useMemo(() => {
    const xAvatar =
      eventGuest.weplanGuest &&
      eventGuest.weplanGuest.weplanUserGuest &&
      eventGuest.weplanGuest.weplanUserGuest.avatar_url
        ? eventGuest.weplanGuest.weplanUserGuest.avatar_url
        : placeholder;
    return xAvatar;
  }, [eventGuest]);

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
          <img src={avatar} alt="WePlan User Avatar" />
          <h1>@{eventGuest.host.trimmed_name}</h1>
          <h2>
            <strong>Anfitrião:</strong> {eventGuest.host.personInfo.first_name}{' '}
            {eventGuest.host.personInfo.last_name}
          </h2>
          <h2>
            <strong>Evento:</strong> {eventGuest.weplanGuest.event.name}
          </h2>
          <h2>
            <strong>Data:</strong>{' '}
            {formatStringToDate(String(eventGuest.weplanGuest.event.date))}
          </h2>
          <h2>
            <strong>Traje:</strong>{' '}
            {eventGuest.weplanGuest.event.eventInfo &&
              eventGuest.weplanGuest.event.eventInfo.dress_code &&
              eventGuest.weplanGuest.event.eventInfo.dress_code}
          </h2>
          <h2>
            <strong>RSVP:</strong>
            <button type="button" onClick={handleEditConfirmedGuest}>
              {eventGuest.confirmed ? (
                <>
                  <p>Confirmado</p>
                  <FiCheckSquare />
                </>
              ) : (
                <>
                  <p>Não confirmado</p>
                  <FiSquare />
                </>
              )}
            </button>
          </h2>
        </SideMenu>
        <Body>
          {eventGuest.weplanGuest.userConfirmations.map(conversation => {
            return (
              <Message
                isUser={conversation.sender_id === eventGuest.weplanGuest.id}
              >
                {conversation.sender_id !== eventGuest.weplanGuest.id && (
                  <h1>@{eventGuest.host.trimmed_name}</h1>
                )}
                <h3>
                  <strong>Título: </strong>
                  {conversation.title}
                </h3>
                <p>
                  <strong>Mensagem: </strong>
                  {conversation.message}
                </p>
                {eventGuest.weplanGuest.userConfirmations.length > 0 && (
                  <div>
                    <h3>Arquivos</h3>
                    {conversation.userConfirmationFiles.map(file => {
                      return (
                        <a target="blank" href={file.file.file_url}>
                          {file.file.file_name}
                        </a>
                      );
                    })}
                  </div>
                )}
              </Message>
            );
          })}
        </Body>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default memo(GuestToUserMessageWindow);
