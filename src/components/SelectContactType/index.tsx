import React, { useCallback } from 'react';
import { FiMail, FiMapPin, FiPhone, FiPhoneCall } from 'react-icons/fi';

import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import {
  Container,
  ContactTypeButton,
  ContactTypeText,
  Title,
  IconContainer,
} from './styles';

interface IProps {
  selectedContactType: string;
  selectContactType: (e: string) => void;
  closeWindow: () => void;
}

const SelectContactType: React.FC<IProps> = ({
  closeWindow,
  selectContactType,
  selectedContactType,
}) => {
  const iconSize = 24;
  const handleSelectContactType = useCallback(
    (e: string) => {
      selectContactType(e);
      closeWindow();
    },
    [selectContactType, closeWindow],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={closeWindow}
      zIndex={17}
      containerStyle={{
        height: '90%',
        left: '2%',
        top: '5%',
        width: '96%',
        zIndex: 17,
      }}
    >
      <Container>
        <Title>Selecione o tipo de contato</Title>
        <ContactTypeButton
          isActive={selectedContactType === 'Whatsapp'}
          onClick={() => handleSelectContactType('Whatsapp')}
        >
          <ContactTypeText isActive={selectedContactType === 'Whatsapp'}>
            Whatsapp
          </ContactTypeText>
          <IconContainer>
            <FiPhone size={iconSize} />
          </IconContainer>
        </ContactTypeButton>
        <ContactTypeButton
          isActive={selectedContactType === 'Phone'}
          onClick={() => handleSelectContactType('Phone')}
        >
          <ContactTypeText isActive={selectedContactType === 'Phone'}>
            Phone
          </ContactTypeText>
          <IconContainer>
            <FiPhoneCall size={iconSize} />
          </IconContainer>
        </ContactTypeButton>
        <ContactTypeButton
          isActive={selectedContactType === 'Address'}
          onClick={() => handleSelectContactType('Address')}
        >
          <ContactTypeText isActive={selectedContactType === 'Address'}>
            Address
          </ContactTypeText>
          <IconContainer>
            <FiMapPin size={iconSize} />
          </IconContainer>
        </ContactTypeButton>
        <ContactTypeButton
          isActive={selectedContactType === 'Email'}
          onClick={() => handleSelectContactType('Email')}
        >
          <ContactTypeText isActive={selectedContactType === 'Email'}>
            Email
          </ContactTypeText>
          <IconContainer>
            <FiMail size={iconSize} />
          </IconContainer>
        </ContactTypeButton>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectContactType;
