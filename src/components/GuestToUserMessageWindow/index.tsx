import React, {
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

import { MdAttachFile } from 'react-icons/md';
import { differenceInSeconds } from 'date-fns';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import placeholder from '../../assets/WePlanLogo.svg';

import { Container, SideMenu, Body, Message, DialogBox } from './styles';
import formatStringToDate from '../../utils/formatDateToString';
import IUserConfirmationDTO from '../../dtos/IUserConfirmationDTO';

interface IWPGuestMessagesDTO {
  wpGuestSentMessages: IUserConfirmationDTO[];
  wpGuestReceivedMessages: IUserConfirmationDTO[];
}

interface IPropsDTO {
  eventGuest: IEventGuestDTO;
  onHandleCloseWindow: MouseEventHandler;
  getEventsAsGuest: Function;
}

const GuestToUserMessageWindow: React.FC<IPropsDTO> = ({
  eventGuest,
  onHandleCloseWindow,
  getEventsAsGuest,
}: IPropsDTO) => {
  const { addToast } = useToast();

  const [guestTitleMessage, setGuestTitleMessage] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [messages, setMessages] = useState<IUserConfirmationDTO[]>([]);
  const [updatedEventGuest, setUpdatedEventGuest] = useState(eventGuest);

  const updateEventGuest = useCallback(() => {
    try {
      api
        .get<IEventGuestDTO>(`event-guests/${eventGuest.id}`)
        .then(response => {
          setUpdatedEventGuest(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventGuest]);

  const sortByMessagesCreatedAt = useCallback(
    (a: IUserConfirmationDTO, b: IUserConfirmationDTO) => {
      if (
        differenceInSeconds(new Date(a.created_at), new Date(b.created_at)) > 0
      ) {
        return 1;
      }
      if (
        differenceInSeconds(new Date(a.created_at), new Date(b.created_at)) < 0
      ) {
        return -1;
      }
      return 0;
    },
    [],
  );

  const getMessages = useCallback(() => {
    try {
      api
        .get<IWPGuestMessagesDTO>(
          `weplan-guest-messages/${eventGuest.weplanGuest.id}`,
        )
        .then(response => {
          const guestMessages: IUserConfirmationDTO[] = [];
          response.data.wpGuestSentMessages.map(message =>
            guestMessages.push(message),
          );
          response.data.wpGuestReceivedMessages.map(message =>
            guestMessages.push(message),
          );
          const sortedMessages = guestMessages.sort(sortByMessagesCreatedAt);
          setMessages(sortedMessages);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventGuest, sortByMessagesCreatedAt]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const handleEditConfirmedGuest = useCallback(async () => {
    try {
      await api.put(`events/weplan-user-guest/${eventGuest.id}`);

      addToast({
        type: 'success',
        title: 'Convidado editado com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });
      getEventsAsGuest();
      updateEventGuest();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao editar convidado',
        description: 'Erro ao editar o convidado, tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, getEventsAsGuest, updateEventGuest, eventGuest]);

  const sendMessage = useCallback(async () => {
    try {
      await api.post('user/confirmations', {
        sender_id: eventGuest.weplanGuest.id,
        receiver_id: eventGuest.host_id,
        title: guestTitleMessage,
        message: guestMessage,
        isConfirmed: false,
      });
      getEventsAsGuest();
      getMessages();
      updateEventGuest();
      addToast({
        type: 'success',
        title: 'Mensagem enviada com sucesso.',
        description: 'O anfitrião já pode visualizar a sua mensagem.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao enviar mensagem',
        description: 'Erro ao mensagem para o anfitrião, tente novamente.',
      });
      throw new Error(err);
    }
  }, [
    addToast,
    getMessages,
    updateEventGuest,
    getEventsAsGuest,
    eventGuest,
    guestMessage,
    guestTitleMessage,
  ]);

  const avatar = useMemo(() => {
    const xAvatar = eventGuest.host.avatar_url
      ? eventGuest.host.avatar_url
      : placeholder;
    return xAvatar;
  }, [eventGuest]);

  const hostName = useMemo(() => {
    const { host } = updatedEventGuest;
    const firstName = host.personInfo ? host.personInfo.first_name : host.name;
    const lastName = host.personInfo ? host.personInfo.last_name : '';
    return `${firstName} ${lastName}`;
  }, [updatedEventGuest]);

  const messageDate = useMemo(() => {
    return formatStringToDate(String(updatedEventGuest));
  }, [updatedEventGuest]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 25,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
        display: 'block',
      }}
      zIndex={24}
    >
      <Container>
        <SideMenu>
          <img src={avatar} alt="WePlan User Avatar" />
          <h1>@{updatedEventGuest.host.trimmed_name}</h1>
          <h2>
            <strong>Anfitrião:</strong> {hostName}
          </h2>
          <h2>
            <strong>Evento:</strong> {updatedEventGuest.weplanGuest.event.name}
          </h2>
          <h2>
            <strong>Data:</strong> {messageDate}
          </h2>
          <h2>
            <strong>Traje:</strong>{' '}
            {updatedEventGuest.weplanGuest.event.eventInfo &&
              updatedEventGuest.weplanGuest.event.eventInfo.dress_code &&
              updatedEventGuest.weplanGuest.event.eventInfo.dress_code}
          </h2>
          <h2>
            <strong>RSVP:</strong>
            <button type="button" onClick={handleEditConfirmedGuest}>
              {updatedEventGuest.confirmed ? (
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
          {messages.map(conversation => {
            return (
              <Message
                isUser={
                  conversation.sender_id === updatedEventGuest.weplanGuest.id
                }
              >
                {conversation.sender_id !==
                  updatedEventGuest.weplanGuest.id && (
                  <h1>@{updatedEventGuest.host.trimmed_name}</h1>
                )}
                <h3>
                  <strong>Título: </strong>
                  {conversation.title}
                </h3>
                <p>
                  <strong>Mensagem: </strong>
                  {conversation.message}
                </p>
                {updatedEventGuest.weplanGuest.userConfirmations.length > 0 && (
                  <div>
                    <h3>Arquivos</h3>
                    {conversation.userConfirmationFiles.map(file => {
                      return (
                        <a target="blank" href={file.file.file_url}>
                          {file.file.file_name}
                          <MdAttachFile />
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
      <DialogBox>
        <h3>Mensagem:</h3>
        <input
          type="text"
          placeholder="Título"
          onChange={e => setGuestTitleMessage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mensagem"
          onChange={e => setGuestMessage(e.target.value)}
        />
        {guestTitleMessage !== '' && guestMessage !== '' && (
          <button type="button" onClick={sendMessage}>
            Enviar
          </button>
        )}
      </DialogBox>
    </WindowUnFormattedContainer>
  );
};

export default memo(GuestToUserMessageWindow);
