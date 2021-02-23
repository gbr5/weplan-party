import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCheckSquare, FiCode, FiSquare } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';

import weplanLogo from '../../assets/WePlanLogo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import {
  Container,
  EventContainer,
  EventImageContainer,
  LogoContainer,
  Content,
  AnimationContainer,
  Background,
} from './styles';
import IExternalGuestDTO from '../../dtos/IExternalGuestDTO';
import formatDateToString from '../../utils/formatDateToString';

interface IParams {
  event_name: string;
  guest_id?: string;
}

const EventExternalPage: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { event_name, guest_id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const [guestId, setGuestId] = useState('');
  const [eventGuest, setEventGuest] = useState({} as IExternalGuestDTO);

  const getGuest = useCallback(() => {
    try {
      setLoading(true);
      api.get(`external-guests/${guest_id || guestId}`).then(response => {
        setEventGuest(response.data);
        if (event_name !== response.data.trimmed_name) {
          history.push('/signin');
        }
      });
      addToast({
        type: 'success',
        title: 'Convidado atualizado',
      });
    } catch (err) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }, [guestId, guest_id, history, event_name, addToast]);

  const guestConfirmation = useCallback(async () => {
    if (guestId === '' && !guest_id) {
      return;
    }
    setLoading(true);
    try {
      await api.put(`external-guests/${guest_id || guestId}`);
      getGuest();
      addToast({
        type: 'info',
        title: 'Atualização enviada',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Ocorreu algum erro, tente novamente',
      });
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }, [guestId, getGuest, addToast, guest_id]);

  useEffect(() => {
    if (guest_id) {
      getGuest();
    }
  }, [getGuest, guest_id]);

  return (
    <Container>
      {!guest_id && eventGuest && !eventGuest.name && (
        <Content>
          <AnimationContainer>
            <LogoContainer>
              <img src={weplanLogo} alt="WePlan - Party" />
              <h1>WePlan</h1>
            </LogoContainer>
            <Form ref={formRef} onSubmit={getGuest}>
              <h1>Digite o seu ID</h1>

              <Input
                name="id"
                icon={FiCode}
                type="text"
                onChange={e => setGuestId(e.target.value)}
                placeholder="ID de convidado"
              />

              <Button loading={loading} type="submit">
                Enviar
              </Button>
            </Form>
            <Link to="/signup">
              <FiArrowLeft />
              Cadastro WePlan
            </Link>
          </AnimationContainer>
        </Content>
      )}
      {eventGuest && eventGuest.guest && (
        <EventContainer>
          <EventImageContainer>
            <img src={eventGuest.avatar_url} alt={eventGuest.name} />
            <h1>{eventGuest.name}</h1>
          </EventImageContainer>
          <h1>Oi {eventGuest.guest.first_name}</h1>
          <strong>Data: {formatDateToString(String(eventGuest.date))}</strong>
          <strong>
            Localidade: {eventGuest.city}, {eventGuest.local_state} -{' '}
            {eventGuest.country}
          </strong>
          <strong>Endereço: {eventGuest.address}</strong>

          <button type="button" onClick={guestConfirmation}>
            {eventGuest.guest.confirmed ? (
              <>
                <h1>Confirmado</h1>
                <FiCheckSquare size={40} />
              </>
            ) : (
              <>
                <h1>Não Confirmado</h1>
                <FiSquare size={40} />
              </>
            )}
          </button>
          <Link to="/signup">
            <FiArrowLeft />
            Cadastro WePlan
          </Link>
        </EventContainer>
      )}
      <Background />
    </Container>
  );
};
export default EventExternalPage;
