import React, { useCallback, useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useMemo } from 'react';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { useEventGuests } from '../../../../hooks/eventGuests';
import { useEventVariables } from '../../../../hooks/eventVariables';

import Button from '../../../Button';
import Input from '../../../Input';
import SelectContactType from '../../../SelectContactType';

import { Container, Title } from './styles';
import { WindowHeader } from '../../../WindowHeader';

interface IFormData {
  contact_info: string;
}

export function CreateGuestContactWindow(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const { selectedEventGuest } = useEventVariables();
  const {
    createGuestContact,
    loading,
    handleCreateGuestContactWindow,
  } = useEventGuests();
  const [contactTypeWindow, setContactTypeWindow] = useState(true);
  const [contact_type, setContactType] = useState('Whatsapp');

  const handleContactTypeWindow = useCallback((e: boolean) => {
    setContactTypeWindow(e);
  }, []);

  const selectContactType = useCallback((e: string) => {
    setContactType(e);
  }, []);

  const handleSubmit = useCallback(
    async ({ contact_info }: IFormData) => {
      await createGuestContact({
        contact_info,
        contact_type,
        guest_id: selectedEventGuest.id,
      });
      handleCreateGuestContactWindow();
    },
    [
      createGuestContact,
      handleCreateGuestContactWindow,
      contact_type,
      selectedEventGuest,
    ],
  );

  const guestName = useMemo(
    () =>
      `Convidado: ${selectedEventGuest.first_name} ${selectedEventGuest.last_name}`,
    [selectedEventGuest],
  );

  const contactType = useMemo(() => {
    if (contact_type === 'Phone') return 'Telefone';
    if (contact_type === 'Address') return 'Endereço';
    return contact_type;
  }, [contact_type]);

  return (
    <>
      {contactTypeWindow && (
        <SelectContactType
          closeWindow={() => handleContactTypeWindow(false)}
          selectContactType={(e: string) => selectContactType(e)}
          selectedContactType={contact_type}
        />
      )}
      <WindowUnFormattedContainer
        onHandleCloseWindow={handleCreateGuestContactWindow}
        containerStyle={{
          height: '70%',
          left: '2%',
          top: '10%',
          width: '96%',
          zIndex: 15,
        }}
        zIndex={15}
      >
        <Container>
          <WindowHeader overTitle={guestName} title="Novo Contato" />
          <Title>{contactType}</Title>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input placeholder="contato" name="contact_info" />
            <Button loading={loading} type="submit">
              Salvar
            </Button>
          </Form>
        </Container>
      </WindowUnFormattedContainer>
    </>
  );
}
