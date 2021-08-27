import React, { ReactElement, useMemo } from 'react';
import {
  FiPhone,
  FiMail,
  FiLinkedin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiGlobe,
} from 'react-icons/fi';

import IUserContactDTO from '../../../dtos/IUserContactDTO';

import { Container, Title } from './styles';

interface IProps {
  contact: IUserContactDTO;
}

export function UserContactButton({ contact }: IProps): ReactElement {
  const iconSize = 24;
  const { icon, text } = useMemo(() => {
    if (contact.contact_type === 'Phone')
      return {
        icon: 'phone',
        text: 'Telefone',
      };
    if (contact.contact_type === 'Email')
      return {
        icon: 'mail',
        text: 'E-mail',
      };
    if (contact.contact_type === 'Address')
      return {
        icon: 'map',
        text: 'Endereço',
      };
    if (contact.contact_type === 'Whatsapp')
      return {
        icon: 'phone',
        text: 'Whatsapp',
      };
    if (contact.contact_type === 'Linkedin')
      return {
        icon: 'linkedin',
        text: 'Linkedin',
      };
    if (contact.contact_type === 'Twitter')
      return {
        icon: 'twitter',
        text: 'Twitter',
      };
    if (contact.contact_type === 'Instagram')
      return {
        icon: 'instagram',
        text: 'Instagram',
      };
    if (contact.contact_type === 'Facebook')
      return {
        icon: 'facebook',
        text: 'Facebook',
      };
    if (contact.contact_type === 'Tiktok')
      return {
        icon: 'tiktok',
        text: 'Tiktok',
      };
    if (contact.contact_type === 'Website')
      return {
        icon: 'globe',
        text: 'Site',
      };
    return {
      icon: '',
      text: '',
    };
  }, [contact]);
  return (
    <Container>
      {icon === 'phone' && <FiPhone size={iconSize} />}
      {icon === 'mail' && <FiMail size={iconSize} />}
      {icon === 'linkedin' && <FiLinkedin size={iconSize} />}
      {icon === 'facebook' && <FiFacebook size={iconSize} />}
      {icon === 'twitter' && <FiTwitter size={iconSize} />}
      {icon === 'instagram' && <FiInstagram size={iconSize} />}
      {icon === 'globe' && <FiGlobe size={iconSize} />}
      <Title>{text}</Title>
    </Container>
  );
}
