import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { MdArrowBack, MdFavorite } from 'react-icons/md';
import Input from '../Input';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import {
  Container,
  ButtonContainer,
  Section,
  InfoSection,
  Header,
  Body,
  InputContainer,
  InfoInputContainer,
} from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import IEventGuestDTO from '../../dtos/IEventGuestDTO';
import IContactTypeDTO from '../../dtos/IContactTypeDTO';
import IFriendDTO from '../../dtos/IFriendDTO';
import SelectFriendWindow from '../SelectFriendWindow';

interface IFormDTO extends IEventGuestDTO {
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  eventId: string;
  eventGuest: IEventGuestDTO;
  handleCloseWindow: Function;
  handleGetGuests: Function;
}

const EditGuestWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventId,
  eventGuest,
  handleCloseWindow,
  handleGetGuests,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [whatsappField, setWhatsappField] = useState(false);
  const [phoneField, setPhoneField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [addressField, setAddressField] = useState(false);

  const [whatsappContactType, setWhatsappContactType] = useState<
    IContactTypeDTO
  >({} as IContactTypeDTO);
  const [phoneContactType, setPhoneContactType] = useState<IContactTypeDTO>(
    {} as IContactTypeDTO,
  );
  const [emailContactType, setEmailContactType] = useState<IContactTypeDTO>(
    {} as IContactTypeDTO,
  );
  const [addressContactType, setAddressContactType] = useState<IContactTypeDTO>(
    {} as IContactTypeDTO,
  );

  const getContactTypes = useCallback(() => {
    try {
      api.get<IContactTypeDTO[]>('/contact-types').then(response => {
        response.data.map(type => {
          type.name === 'Phone' && setPhoneContactType(type);
          type.name === 'Whatsapp' && setWhatsappContactType(type);
          type.name === 'Address' && setAddressContactType(type);
          type.name === 'Email' && setEmailContactType(type);
          return type;
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getContactTypes();
  }, [getContactTypes]);

  const [guest, setGuest] = useState(eventGuest);

  const [selectFriendWindow, setSelectFriendWindow] = useState(false);
  const [guestDefaultWhatsapp, setGuestDefaultWhatsapp] = useState('Whatsapp');
  const [guestDefaultWhatsappId, setGuestDefaultWhatsappId] = useState('');
  const [guestDefaultPhone, setGuestDefaultPhone] = useState('Telefone');
  const [guestDefaultPhoneId, setGuestDefaultPhoneId] = useState('');
  const [guestDefaultEmail, setGuestDefaultEmail] = useState('Email');
  const [guestDefaultEmailId, setGuestDefaultEmailId] = useState('');
  const [guestDefaultAddress, setGuestDefaultAddress] = useState('Endereço');
  const [guestDefaultAddressId, setGuestDefaultAddressId] = useState('');

  const updateGuest = useCallback(() => {
    try {
      api.get<IEventGuestDTO>(`/event-guests/${guest.id}`).then(response => {
        setGuest(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [guest]);

  useEffect(() => {
    if (guest.guestContactInfos) {
      guest.guestContactInfos.map(contact => {
        contact.contactType.name === 'Whatsapp' &&
          setGuestDefaultWhatsapp(contact.contact_info);
        contact.contactType.name === 'Whatsapp' &&
          setGuestDefaultWhatsappId(contact.id);
        contact.contactType.name === 'Phone' &&
          setGuestDefaultPhone(contact.contact_info);
        contact.contactType.name === 'Phone' &&
          setGuestDefaultPhoneId(contact.id);
        contact.contactType.name === 'Email' &&
          setGuestDefaultEmail(contact.contact_info);
        contact.contactType.name === 'Email' &&
          setGuestDefaultEmailId(contact.id);
        contact.contactType.name === 'Address' &&
          setGuestDefaultAddress(contact.contact_info);
        contact.contactType.name === 'Address' &&
          setGuestDefaultAddressId(contact.id);
        return contact.contactType.id;
      });
    } else {
      setGuestDefaultWhatsapp('Whatsapp');
      setGuestDefaultPhone('Telefone');
      setGuestDefaultEmail('Email');
      setGuestDefaultAddress('Endereço');
    }
  }, [guest]);

  const handleEditGuest = useCallback(
    async (data: IFormDTO) => {
      try {
        formRef.current?.setErrors([]);

        if (whatsappField) {
          await api.put(`guest-contact-info/${guestDefaultWhatsappId}`, {
            contact_info: data.whatsapp ? data.whatsapp : 'n/a',
            contact_type_id: whatsappContactType.id,
            guest_id: guest.id,
          });
        }

        if (phoneField) {
          await api.put(`guest-contact-info/${guestDefaultPhoneId}`, {
            contact_info: data.phone ? data.phone : 'n/a',
            contact_type_id: phoneContactType.id,
            guest_id: guest.id,
          });
        }

        if (emailField) {
          await api.put(`guest-contact-info/${guestDefaultEmailId}`, {
            contact_info: data.email ? data.email : 'n/a',
            contact_type_id: emailContactType.id,
            guest_id: guest.id,
          });
        }

        if (addressField) {
          await api.put(`guest-contact-info/${guestDefaultAddressId}`, {
            contact_info: data.address ? data.address : 'n/a',
            contact_type_id: addressContactType.id,
            guest_id: guest.id,
          });
        }

        if (guest.weplanUser) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${eventId}/guests/${guest.id}`, {
            first_name: guest.first_name,
            last_name: guest.last_name,
            description: data.description,
            confirmed: guest.confirmed,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${eventId}/guests/${guest.id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            confirmed: guest.confirmed,
          });
        }

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        handleGetGuests();
        updateGuest();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
      }
    },
    [
      addToast,
      eventId,
      guest,
      handleGetGuests,
      addressContactType,
      emailContactType,
      phoneContactType,
      whatsappContactType,
      addressField,
      emailField,
      phoneField,
      whatsappField,
      guestDefaultAddressId,
      guestDefaultEmailId,
      guestDefaultPhoneId,
      guestDefaultWhatsappId,
      updateGuest,
    ],
  );

  const handleDeleteGuest = useCallback(async () => {
    try {
      if (guest.weplanGuest && guest.weplanGuest.id) {
        Promise.all([
          api.delete(`/event/weplan-guests/${guest.weplanGuest.id}`),
          api.delete(`/events/guests/${guest.id}`),
        ]);
      } else {
        await api.delete(`/events/guests/${guest.id}`);
      }
      addToast({
        type: 'success',
        title: 'Convidado excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      handleCloseWindow(false);
      handleGetGuests();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir convidado',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [guest, addToast, handleGetGuests, handleCloseWindow]);

  const updateGuestConfirmation = useCallback(async () => {
    try {
      await api.put(`/event-guests/confirmation/${guest.id}`);
      addToast({
        type: 'success',
        title: 'Convidado editado com sucesso!',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      handleGetGuests();
      updateGuest();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir convidado',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
      throw new Error(err);
    }
  }, [guest, handleGetGuests, addToast, updateGuest]);

  const deleteWeplanGuestAssociation = useCallback(async () => {
    try {
      await api.delete(`/event/weplan-guests/${guest.weplanGuest.id}`);
      addToast({
        type: 'success',
        title: 'Convidado editado com sucesso!',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      handleGetGuests();
      updateGuest();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir associação com usuário WePlan.',
        description: 'Erro, tente novamente.',
      });
      throw new Error(err);
    }
  }, [guest, addToast, handleGetGuests, updateGuest]);

  const addWePlanUserToGuest = useCallback(
    async (props: IFriendDTO) => {
      try {
        await api.post(`/event/weplan-guests/`, {
          event_id: guest.event_id,
          guest_id: guest.id,
          user_id: props.friend.id,
        });
        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        handleGetGuests();
        updateGuest();
        setSelectFriendWindow(false);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
      }
    },
    [guest, addToast, handleGetGuests, updateGuest],
  );

  return (
    <>
      {selectFriendWindow && (
        <SelectFriendWindow
          handleSelectedFriend={addWePlanUserToGuest}
          onHandleCloseWindow={() => setSelectFriendWindow(false)}
        />
      )}
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
        <Form ref={formRef} onSubmit={handleEditGuest}>
          <Container>
            <Header>
              <h1>
                Formulário de Convidado | {guest.first_name} {guest.last_name}
              </h1>
            </Header>
            <Body>
              <Section>
                <InputContainer>
                  <p>Nome:</p>
                  {!guest.weplanGuest ? (
                    <Input
                      defaultValue={guest.first_name}
                      name="first_name"
                      type="text"
                    />
                  ) : (
                    <h3>{guest.first_name}</h3>
                  )}
                </InputContainer>
                <InputContainer>
                  <p>Sobrenome:</p>
                  {!guest.weplanGuest ? (
                    <Input
                      defaultValue={guest.last_name}
                      name="last_name"
                      type="text"
                    />
                  ) : (
                    <h3>{guest.last_name}</h3>
                  )}
                </InputContainer>
                <InfoInputContainer>
                  <p>Descrição:</p>
                  <Input
                    defaultValue={guest.description}
                    name="description"
                    type="text"
                  />
                </InfoInputContainer>

                <ButtonContainer>
                  {!guest.confirmed ? (
                    <button type="button" onClick={updateGuestConfirmation}>
                      Não confirmado
                    </button>
                  ) : (
                    <button type="button" onClick={updateGuestConfirmation}>
                      <MdFavorite />
                      Confirmado!
                    </button>
                  )}
                  {!guest.weplanGuest && (
                    <button
                      type="button"
                      onClick={() => setSelectFriendWindow(true)}
                    >
                      Associar a um usuário WePlan ?
                    </button>
                  )}
                </ButtonContainer>
                {guest.weplanGuest && guest.weplanGuest.weplanUserGuest && (
                  <button type="button" onClick={deleteWeplanGuestAssociation}>
                    Deletar usuário WePlan associado a convidado
                  </button>
                )}
              </Section>
              <Section>
                <h2>Informações de contato</h2>
                <InfoSection>
                  <InfoInputContainer>
                    <p>
                      Whatsapp:
                      {whatsappField && (
                        <button
                          type="button"
                          onClick={() => setWhatsappField(false)}
                        >
                          <MdArrowBack />
                          <MdArrowBack />
                        </button>
                      )}
                    </p>
                    {!whatsappField ? (
                      <button
                        type="button"
                        onClick={() => setWhatsappField(!whatsappField)}
                      >
                        {guestDefaultWhatsapp === 'n/a'
                          ? 'Informar'
                          : guestDefaultWhatsapp}
                      </button>
                    ) : (
                      <Input
                        name="whatsapp"
                        placeholder={guestDefaultWhatsapp}
                      />
                    )}
                  </InfoInputContainer>
                  <InfoInputContainer>
                    <p>
                      Telefone:
                      {phoneField && (
                        <button
                          type="button"
                          onClick={() => setPhoneField(false)}
                        >
                          <MdArrowBack />
                          <MdArrowBack />
                        </button>
                      )}
                    </p>
                    {!phoneField ? (
                      <button
                        type="button"
                        onClick={() => setPhoneField(!phoneField)}
                      >
                        {guestDefaultPhone === 'n/a'
                          ? 'Informar'
                          : guestDefaultPhone}
                      </button>
                    ) : (
                      <Input name="phone" placeholder={guestDefaultPhone} />
                    )}
                  </InfoInputContainer>
                  <InfoInputContainer>
                    <p>
                      email:
                      {emailField && (
                        <button
                          type="button"
                          onClick={() => setEmailField(false)}
                        >
                          <MdArrowBack />
                          <MdArrowBack />
                        </button>
                      )}
                    </p>
                    {!emailField ? (
                      <button
                        type="button"
                        onClick={() => setEmailField(!emailField)}
                      >
                        {guestDefaultEmail === 'n/a'
                          ? 'Informar'
                          : guestDefaultEmail}
                      </button>
                    ) : (
                      <Input name="email" placeholder={guestDefaultEmail} />
                    )}
                  </InfoInputContainer>
                </InfoSection>
                <InfoInputContainer>
                  <p>
                    Endereço:
                    {addressField && (
                      <button
                        type="button"
                        onClick={() => setAddressField(false)}
                      >
                        <MdArrowBack size={24} />
                        <MdArrowBack size={24} />
                      </button>
                    )}
                  </p>
                  {!addressField ? (
                    <button
                      type="button"
                      onClick={() => setAddressField(!addressField)}
                    >
                      {guestDefaultAddress === 'n/a'
                        ? 'Informar'
                        : guestDefaultAddress}
                    </button>
                  ) : (
                    <Input name="address" placeholder={guestDefaultAddress} />
                  )}
                </InfoInputContainer>
              </Section>
            </Body>

            <button type="submit">
              <h3>Salvar</h3>
            </button>

            <button type="button" onClick={handleDeleteGuest}>
              <h3>Deletar</h3>
            </button>
          </Container>
        </Form>
      </WindowUnFormattedContainer>
    </>
  );
};

export default EditGuestWindow;
