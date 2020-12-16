import React, { useCallback, useState } from 'react';
import IGuestContactInfoDTO from '../../../dtos/IGuestContactInfoDTO';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';

import { Container } from './styles';

interface IProps {
  defaultValue: string;
  guestContactInfo: IGuestContactInfoDTO;
}

const GuestInfoRow: React.FC<IProps> = ({
  defaultValue,
  guestContactInfo,
}: IProps) => {
  const { addToast } = useToast();
  const [isSelected, setIsSelected] = useState(false);
  const [updatedGuestContactInfo, setUpdatedGuestContactInfo] = useState(
    guestContactInfo.contact_info,
  );

  const handleIsSelected = useCallback(() => {
    setIsSelected(!isSelected);
  }, [isSelected]);

  const handleSubmit = useCallback(() => {
    try {
      api.put(`/guest-contact-info/${guestContactInfo.id}`, {
        contact_info: updatedGuestContactInfo,
      });

      addToast({
        type: 'success',
        title: 'Informação do convidado alterada com sucesso',
        description:
          'As informações já podem ser visualizadas na página do evento.',
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [addToast, guestContactInfo, updatedGuestContactInfo]);

  return (
    <Container>
      {isSelected ? (
        <>
          <input
            defaultValue={defaultValue}
            onChange={e => setUpdatedGuestContactInfo(e.target.value)}
          />

          <button type="button" onClick={handleSubmit}>
            Salvar
          </button>
          <button type="button" onClick={handleIsSelected}>
            Cancelar
          </button>
        </>
      ) : (
        <button type="button" onClick={handleIsSelected}>
          {}
        </button>
      )}
    </Container>
  );
};

export default GuestInfoRow;
