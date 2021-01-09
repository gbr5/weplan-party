import React, { useCallback, useState, useRef } from 'react';

import { MdMenu } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
// import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
// import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../Input';

import { Button, EventInfoDrawer } from './styles';
import MainFriendsWindow from '../MainFriendsWindow';
import ICreateEventInfoDTO from '../../dtos/ICreateEventInfoDTO';
import UploadFileWindow from '../UploadFileWindow';
import MenuDrawer from './MenuDrawer';
import EventTypeWindow from '../EventTypeWindow';
import CreateEventWindow from '../CreateEventWindow';

interface IProps {
  signOut: Function;
}
interface IEvent {
  id: string;
  name: string;
  trimmed_name: string;
}

const MenuButton: React.FC<IProps> = ({ signOut }: IProps) => {
  const [menuDrawer, setMenuDrawer] = useState(false);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [createEventDrawer, setCreateEventDrawer] = useState(false);
  const [eventTypeDrawer, setEventTypeDrawer] = useState(false);
  const [uploadFileWindow, setUploadFileWindow] = useState(false);
  const [eventType, setEventType] = useState<string>();
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [myEvents, setMyEvents] = useState<IEvent[]>([]);
  const [eventName, setEventName] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [tipoDeEvento, setTipoDeEvento] = useState('Outros');

  const handleCreateEventDrawer = useCallback(() => {
    setCreateEventDrawer(!createEventDrawer);
    setEventTypeDrawer(true);
  }, [createEventDrawer]);

  const handleEventTypeDrawer = useCallback(() => {
    setEventTypeDrawer(!eventTypeDrawer);
  }, [eventTypeDrawer]);

  const handleNavigateToFriends = useCallback(() => {
    setFriendsWindow(true);
  }, []);

  const handleEventTypeChange = useCallback(
    (option: string) => {
      setEventType(option);
      option === 'Wedding' && setTipoDeEvento('Casamento');
      option === 'Prom' && setTipoDeEvento('Formatura');
      option === 'Birthday' && setTipoDeEvento('Aniversário');

      option === 'Sweet_15' && setTipoDeEvento('15 Anos');
      option === 'Sweet_16' && setTipoDeEvento('Sweet 16');
      option === 'Wedding_Anniversary' && setTipoDeEvento('Bodas');

      option === 'Corporate' && setTipoDeEvento('Corporativo');
      option === 'Christmas' && setTipoDeEvento('Natal');
      option === 'New_Year' && setTipoDeEvento('Ano Novo');

      option === 'Baptism' && setTipoDeEvento('Batismo');
      option === 'Hanukkah' && setTipoDeEvento('Hanukkah');
      option === 'Others' && setTipoDeEvento('Outros');

      handleEventTypeDrawer();
    },
    [handleEventTypeDrawer, setEventType],
  );

  const handleEventInfoDrawer = useCallback(() => {
    setCreateEventDrawer(false);
    setEventInfoDrawer(!eventInfoDrawer);
  }, [eventInfoDrawer]);

  const handlePostEventInfo = useCallback(
    async (data: ICreateEventInfoDTO) => {
      try {
        const new_event = myEvents.find(event => event.name === eventName);
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.string().required('Nome é obrigatório'),
          duration: Yup.string(),
          budget: Yup.number().required(''),
          description: Yup.string().required(),
          country: Yup.string().required(),
          local_state: Yup.string().required(),
          city: Yup.string().required(),
          address: Yup.string().required(),
          dress_code: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const hours = Number(data.duration.split(':')[0]) * 60;
        const minutes = Number(data.duration.split(':')[1]);
        new_event &&
          (await api.post(`events/${new_event.id}/event-info`, {
            number_of_guests: data.number_of_guests,
            duration: hours + minutes,
            budget: data.budget,
            description: data.description,
            country: data.country,
            local_state: data.local_state,
            city: data.city,
            address: data.address,
            dress_code: data.dress_code,
          }));

        addToast({
          type: 'success',
          title: 'Item criado com Sucesso',
          description: 'O item foi adicionado à sua check-list.',
        });
        handleEventInfoDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar item da check-list',
          description: 'Erro  ao criar o item, tente novamente.',
        });
      }
    },
    [addToast, handleEventInfoDrawer, myEvents, eventName],
  );

  const handleGetMyEvents = useCallback(async () => {
    const response = await api.get('events');
    setMyEvents(response.data);
    handleEventInfoDrawer();
  }, [handleEventInfoDrawer]);

  return (
    <>
      <Button type="button" onClick={() => setMenuDrawer(!menuDrawer)}>
        <MdMenu size={24} />
      </Button>
      {menuDrawer && (
        <MenuDrawer
          handleNavigateToFriends={handleNavigateToFriends}
          handleCreateEventDrawer={handleCreateEventDrawer}
          signOut={signOut}
          handleUploadFileWindow={() => setUploadFileWindow(!uploadFileWindow)}
        />
      )}
      {!!friendsWindow && (
        <MainFriendsWindow
          onHandleCloseWindow={() => setFriendsWindow(false)}
        />
      )}
      {!!createEventDrawer && (
        <CreateEventWindow
          eventType={eventType}
          handleEventInfoDrawer={handleEventInfoDrawer}
          handleEventTypeDrawer={handleEventTypeDrawer}
          handleGetMyEvents={handleGetMyEvents}
          onHandleCloseWindow={() => setCreateEventDrawer(false)}
          tipoDeEvento={tipoDeEvento}
          handleSetEventName={(e: string) => setEventName(e)}
        />
      )}
      {!!eventTypeDrawer && (
        <EventTypeWindow
          onHandleCloseWindow={() => setEventTypeDrawer(false)}
          selectEventType={(e: string) => handleEventTypeChange(e)}
        />
      )}
      {!!eventInfoDrawer && (
        <Form ref={formRef} onSubmit={handlePostEventInfo}>
          <EventInfoDrawer>
            <h1>Informações do evento</h1>
            <div>
              <div>
                <p>Duração (em minutos)</p>
                <Input
                  name="duration"
                  type="time"
                  placeholder="Duração (em horas)"
                />
                <p>Número de Convidados</p>
                <Input
                  name="number_of_guests"
                  type="number"
                  placeholder="Número de convidados"
                />
                <p>Orçamento</p>
                <Input name="budget" type="number" placeholder="Orçamento" />
                <p>Descrição</p>
                <Input name="description" type="text" placeholder="Descrição" />
              </div>
              <div>
                <p>País</p>
                <Input name="country" type="text" placeholder="País" />
                <p>Estado</p>
                <Input name="local_state" type="text" placeholder="Estado" />
                <p>Cidade</p>
                <Input name="city" type="text" placeholder="Cidade" />
                <p>Traje</p>
                <Input name="dress_code" type="text" placeholder="Traje" />
              </div>
              <p>Endereço</p>
              <Input name="address" type="text" placeholder="Endereço" />
            </div>

            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </EventInfoDrawer>
        </Form>
      )}
      {uploadFileWindow && (
        <UploadFileWindow
          handleCloseWindow={() => setUploadFileWindow(false)}
          onHandleCloseWindow={() => setUploadFileWindow(false)}
        />
      )}
    </>
  );
};

export default MenuButton;
