import React, { useState } from 'react';
import InlineFormField from '../../../InlineFormField';
import { ContactLink } from '../../../ContactLink';
import IGuestContactDTO from '../../../../dtos/IGuestContactDTO';
import { useEventGuests } from '../../../../hooks/eventGuests';

import {
  ContactInfo,
  OutContainer,
  Container,
  ContainerButton,
  ContactType,
} from './styles';

interface IProps {
  guestContact: IGuestContactDTO;
}

export function GuestContact({ guestContact }: IProps): JSX.Element {
  const { updateGuestContact } = useEventGuests();

  const [editContact, setEditContact] = useState(false);

  function handleEditContact(): void {
    setEditContact(!editContact);
  }

  async function handleUpdateContact(contact_info: string): Promise<void> {
    await updateGuestContact({
      ...guestContact,
      contact_info,
    });
  }

  return (
    <OutContainer>
      {editContact ? (
        <Container>
          <ContactLink
            type={guestContact.contact_type}
            contact={guestContact.contact_info}
          />
          <InlineFormField
            defaultValue={guestContact.contact_info}
            placeholder={guestContact.contact_info}
            handleOnSubmit={handleUpdateContact}
            closeComponent={handleEditContact}
          />
        </Container>
      ) : (
        <ContainerButton onClick={handleEditContact}>
          <ContactType>{guestContact.contact_type}</ContactType>
          <ContactInfo>{guestContact.contact_info}</ContactInfo>
        </ContainerButton>
      )}
    </OutContainer>
  );
}
