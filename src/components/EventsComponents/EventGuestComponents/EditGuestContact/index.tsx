import React, { useCallback, useMemo, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../../Input';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';

import { Container, FormQuestion, Title } from './styles';
import Button from '../../../Button';
import { useEventGuests } from '../../../../hooks/eventGuests';
import { WindowHeader } from '../../../WindowHeader';
import { useEventVariables } from '../../../../hooks/eventVariables';

interface IFormData {
  contact_info: string;
}

export function EditGuestContact(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const { selectedEventGuest } = useEventVariables();
  const {
    updateGuestContact,
    loading,
    selectedGuestContact,
    handleGuestContactWindow,
  } = useEventGuests();

  const handleSubmit = useCallback(
    async ({ contact_info }: IFormData) => {
      await updateGuestContact({
        ...selectedGuestContact,
        contact_info,
      });
      handleGuestContactWindow();
    },
    [updateGuestContact, handleGuestContactWindow, selectedGuestContact],
  );

  const guestName = useMemo(
    () =>
      `Convidado: ${selectedEventGuest.first_name} ${selectedEventGuest.last_name}`,
    [selectedEventGuest],
  );

  const contactType = useMemo(() => {
    if (selectedGuestContact.contact_type === 'Phone') return 'Telefone';
    if (selectedGuestContact.contact_type === 'Address') return 'Endereço';
    return selectedGuestContact.contact_type;
  }, [selectedGuestContact.contact_type]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleGuestContactWindow}
      containerStyle={{
        height: '80%',
        left: '2%',
        top: '10%',
        width: '96%',
        zIndex: 11,
      }}
      zIndex={11}
    >
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <WindowHeader overTitle={guestName} title="Editar Contato" />
          <Title>{contactType}</Title>
          <Input
            name="contact_info"
            placeholder={
              selectedGuestContact.contact_info !== ' '
                ? selectedGuestContact.contact_info
                : 'contato'
            }
            defaultValue={selectedGuestContact.contact_info}
          />
          <Button loading={loading} type="submit">
            Salvar
          </Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
