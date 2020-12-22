import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiChevronRight } from 'react-icons/fi';
import Input from '../Input';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import weplanLogo from '../../assets/WePlanLogo.svg';

import {
  Container,
  Section,
  InfoSection,
  Header,
  Body,
  InputContainer,
  InfoInputContainer,
} from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import IWeplanGuestDTO from '../../dtos/IWeplanGuestDTO';
import { useAuth } from '../../hooks/auth';

interface IFormDTO {
  title: string;
  message: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  wpGuests: IWeplanGuestDTO[];
  handleCloseWindow: Function;
  handleGetGuests: Function;
}

const EventInvitationWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  wpGuests,
  handleCloseWindow,
  handleGetGuests,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user } = useAuth();

  const [selectedWPGuests, setSelectedWPGuests] = useState<IWeplanGuestDTO[]>(
    [],
  );

  const selectWPGuest = useCallback(
    (props: IWeplanGuestDTO) => {
      const alreadySelected = selectedWPGuests.find(
        guest => guest.id === props.id,
      );

      if (alreadySelected) {
        const updatedSelectedWPGuests = selectedWPGuests.filter(
          guest => guest.id !== props.id,
        );
        setSelectedWPGuests(updatedSelectedWPGuests);

        return updatedSelectedWPGuests;
      }
      const updatedSelectedWPGuests: IWeplanGuestDTO[] = [];
      selectedWPGuests.map(guest => {
        updatedSelectedWPGuests.push(guest);
        return guest;
      });
      updatedSelectedWPGuests.push(props);
      setSelectedWPGuests(updatedSelectedWPGuests);

      return updatedSelectedWPGuests;
    },
    [selectedWPGuests],
  );

  const handleSendInvitationsToSelectedWPGuests = useCallback(
    async (data: IFormDTO) => {
      try {
        Promise.all(
          selectedWPGuests.map(guest => {
            return api.post('user/confirmations', {
              sender_id: user.id,
              receiver_id: guest.id,
              title: data.title,
              message: data.message,
              isConfirmed: false,
            });
          }),
        );
        addToast({
          type: 'success',
          title: 'Convites enviados com sucesso!',
          description: 'Os seus convidados WePlan já receberam seus convites!',
        });
        handleCloseWindow();
        handleGetGuests();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Algo parece ter dado errado!',
          description:
            'Tente novamente, se o problema persistir, envia uma mensagem para a gente!',
        });
        throw new Error(err);
      }
    },
    [addToast, handleCloseWindow, handleGetGuests, user, selectedWPGuests],
  );

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
      <Form ref={formRef} onSubmit={handleSendInvitationsToSelectedWPGuests}>
        <Container>
          <Header>
            <h1>Convites WePlan</h1>
          </Header>
          <Body>
            <Section>
              <InputContainer>
                <p>Título:</p>
                <Input name="title" type="text" placeholder="Título" />
              </InputContainer>
              <InputContainer>
                <p>Mensagem:</p>
                <Input name="message" type="text" placeholder="Mensagem" />
              </InputContainer>

              <button type="submit">Enviar para selecionados</button>
            </Section>
            <Section>
              <h2>Convidados WePlan</h2>
              <InfoSection>
                {wpGuests.map(wpGuest => {
                  const userAvatar =
                    wpGuest.weplanUserGuest.avatar_url || weplanLogo;

                  const userName = wpGuest.weplanUserGuest.name;
                  const personName = `${wpGuest.weplanUserGuest.personInfo.first_name} ${wpGuest.weplanUserGuest.personInfo.last_name}`;
                  const isSelected = selectedWPGuests.find(
                    guest => guest.id === wpGuest.id,
                  );

                  return (
                    <InfoInputContainer
                      isActive={!!isSelected}
                      key={wpGuest.id}
                    >
                      <button
                        type="button"
                        onClick={() => selectWPGuest(wpGuest)}
                      >
                        <div>
                          <img
                            src={userAvatar}
                            alt={wpGuest.weplanUserGuest.name}
                          />
                          <strong>{userName}</strong>
                        </div>
                        <div>
                          <strong>{personName}</strong>
                          <FiChevronRight size={32} />
                        </div>
                      </button>
                    </InfoInputContainer>
                  );
                })}
              </InfoSection>
            </Section>
          </Body>
        </Container>
      </Form>
    </WindowUnFormattedContainer>
  );
};

export default EventInvitationWindow;
