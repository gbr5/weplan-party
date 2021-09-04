import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { FiCamera } from 'react-icons/fi';

import placeholder from '../../../../assets/WePlanLogo.svg';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import { getEventType } from '../../../../utils/getEventType';

import {
  Container,
  AvatarInput,
  EventSection,
  InsideSection,
  PublishedButton,
} from './styles';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useCurrentEvent } from '../../../../hooks/currentEvent';

export function FirstSection(): ReactElement {
  const { addToast } = useToast();
  const { getEvent } = useCurrentEvent();
  const { selectedEvent, master } = useEventVariables();

  const [avatar, setAvatar] = useState(selectedEvent.avatar_url || placeholder);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        const response = await api.patch(
          `/events/avatar/${selectedEvent.id}`,
          data,
        );
        setAvatar(response.data);
        await getEvent(selectedEvent.id);
        addToast({
          type: 'success',
          title: 'Atualização enviada.',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, getEvent, selectedEvent],
  );

  const handleEventIsPublished = useCallback(async () => {
    try {
      await api.put(`event/is-published/${selectedEvent.id}`);

      await getEvent(selectedEvent.id);
      addToast({
        type: 'info',
        title: 'Atualização enviada!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar o evento, tente novamente.',
      });
      throw new Error(err);
    }
  }, [selectedEvent, getEvent, addToast]);

  return (
    <Container>
      <AvatarInput>
        <img src={avatar} alt="WePlan" />
        <label htmlFor="avatar">
          <FiCamera />
          <input type="file" id="avatar" onChange={handleAvatarChange} />
        </label>
      </AvatarInput>
      <EventSection>
        <h1>{selectedEvent.name}</h1>
        <InsideSection>
          <span>
            <p>Anfitrião Master</p>
            <p>{master.name}</p>
          </span>
          <span>
            <p>Tipo de evento: {getEventType(selectedEvent.event_type)}</p>
            <PublishedButton
              isPublished={selectedEvent.isPublished}
              type="button"
              onClick={handleEventIsPublished}
            >
              {selectedEvent.isPublished ? 'Publicado' : 'Publicar'}
            </PublishedButton>
          </span>
        </InsideSection>
      </EventSection>
    </Container>
  );
}
