import React, {
  MouseEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { MdArrowBack, MdFavorite, MdGroupAdd } from 'react-icons/md';

import Input from '../Input';

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
import IFriendDTO from '../../dtos/IFriendDTO';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import IContactTypeDTO from '../../dtos/IContactTypeDTO';
import BooleanQuestionWindow from '../BooleanQuestionWindow';
import { useEventVariables } from '../../hooks/eventVariables';

interface ICreateGuest {
  first_name: string;
  last_name: string;
  description: string;
  confirmed: boolean;
  weplanUser: boolean;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
}

interface IProps {
  weplanUser: boolean;
  myAvailableNumberOfGuests: number;
  handleCloseWindow: Function;
  handleGuestAllocationWindow: MouseEventHandler;
  handleGetGuests: Function;
  selectedFriend: IFriendDTO;
  handleAddGuestListWindow: MouseEventHandler;
  openWPGuestQuestionWindow: Function;
  handleGuestConfirmedWindow: MouseEventHandler;
  guestConfirmed: boolean;
}

export function AddGuestWindow({
  weplanUser,
  myAvailableNumberOfGuests,
  handleCloseWindow,
  handleGuestAllocationWindow,
  handleGetGuests,
  selectedFriend,
  handleAddGuestListWindow,
  openWPGuestQuestionWindow,
  handleGuestConfirmedWindow,
  guestConfirmed,
}: IProps): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { isOwner, selectedEvent } = useEventVariables();

  const [whatsappField, setWhatsappField] = useState(false);
  const [phoneField, setPhoneField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [addressField, setAddressField] = useState(false);
  const [
    weplanGuestContactInfoQuestion,
    setWeplanGuestContactInfoQuestion,
  ] = useState(false);
  const [weplanGuestContactInfo, setWeplanGuestContactInfo] = useState(false);

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

  const getContactTypes = useCallback(async () => {
    try {
      await api.get<IContactTypeDTO[]>('/contact-types').then(response => {
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

  const weplanGuestDefaultWhatsapp = useMemo(() => {
    const friend = selectedFriend && selectedFriend.friend;
    const whats =
      friend &&
      friend.userContacts.find(contact => contact.contact_type === 'Whatsapp');
    return whats ? whats.contact_info : 'Informar';
  }, [selectedFriend]);
  const weplanGuestDefaultPhone = useMemo(() => {
    const friend = selectedFriend && selectedFriend.friend;
    const phone =
      friend &&
      friend.userContacts.find(contact => contact.contact_type === 'Phone');
    return phone ? phone.contact_info : 'Informar';
  }, [selectedFriend]);
  const weplanGuestDefaultEmail = useMemo(() => {
    const friend = selectedFriend && selectedFriend.friend;
    const email =
      friend &&
      friend.userContacts.find(contact => contact.contact_type === 'Email');
    return email ? email.contact_info : 'Informar';
  }, [selectedFriend]);
  const weplanGuestDefaultAddress = useMemo(() => {
    const friend = selectedFriend && selectedFriend.friend;
    const address =
      friend &&
      friend.userContacts.find(contact => contact.contact_type === 'Address');
    return address ? address.contact_info : 'Informar';
  }, [selectedFriend]);

  const handleAddGuest = useCallback(
    async (data: ICreateGuest) => {
      try {
        formRef.current?.setErrors([]);

        if (myAvailableNumberOfGuests <= 0) {
          addToast({
            type: 'error',
            title: 'Erro ao adicionar anfitrião',
            description:
              'Número de convidados excede o limite, tente novamente.',
          });
          throw new Error('Number of guests is higher than allowed!');
        }

        if (weplanUser && selectedFriend.friend.personInfo) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const guest = await api.post(`events/${selectedEvent.id}/guests`, {
            first_name: selectedFriend.friend.personInfo.first_name,
            last_name: selectedFriend.friend.personInfo.last_name,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: selectedFriend.friend.id,
          });

          if (weplanGuestContactInfo && selectedFriend.friend.userContacts) {
            Promise.all([
              api.post(`guest-contact-info/`, {
                contact_info:
                  weplanGuestDefaultWhatsapp !== 'Informar'
                    ? weplanGuestDefaultWhatsapp
                    : 'n/a',
                contact_type_id: whatsappContactType.id,
                guest_id: guest.data.id,
              }),
              api.post(`guest-contact-info/`, {
                contact_info:
                  weplanGuestDefaultPhone !== 'Informar'
                    ? weplanGuestDefaultPhone
                    : 'n/a',
                contact_type_id: phoneContactType.id,
                guest_id: guest.data.id,
              }),
              api.post(`guest-contact-info/`, {
                contact_info:
                  weplanGuestDefaultEmail !== 'Informar'
                    ? weplanGuestDefaultEmail
                    : 'n/a',
                contact_type_id: emailContactType.id,
                guest_id: guest.data.id,
              }),
              api.post(`guest-contact-info/`, {
                contact_info:
                  weplanGuestDefaultAddress !== 'Informar'
                    ? weplanGuestDefaultAddress
                    : 'n/a',
                contact_type_id: addressContactType.id,
                guest_id: guest.data.id,
              }),
            ]);
          } else {
            Promise.all([
              api.post(`guest-contact-info/`, {
                contact_info: data.whatsapp ? data.whatsapp : 'n/a',
                contact_type_id: whatsappContactType.id,
                guest_id: guest.data.id,
              }),
              api.post(`guest-contact-info/`, {
                contact_info: data.phone ? data.phone : 'n/a',
                contact_type_id: phoneContactType.id,
                guest_id: guest.data.id,
              }),
              api.post(`guest-contact-info/`, {
                contact_info: data.email ? data.email : 'n/a',
                contact_type_id: emailContactType.id,
                guest_id: guest.data.id,
              }),
              api.post(`guest-contact-info/`, {
                contact_info: data.address ? data.address : 'n/a',
                contact_type_id: addressContactType.id,
                guest_id: guest.data.id,
              }),
            ]);
          }
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const guest = await api.post(`events/${selectedEvent.id}/guests`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: '0',
          });

          Promise.all([
            api.post(`guest-contact-info/`, {
              contact_info: data.whatsapp ? data.whatsapp : 'n/a',
              contact_type_id: whatsappContactType.id,
              guest_id: guest.data.id,
            }),
            api.post(`guest-contact-info/`, {
              contact_info: data.phone ? data.phone : 'n/a',
              contact_type_id: phoneContactType.id,
              guest_id: guest.data.id,
            }),
            api.post(`guest-contact-info/`, {
              contact_info: data.email ? data.email : 'n/a',
              contact_type_id: emailContactType.id,
              guest_id: guest.data.id,
            }),
            api.post(`guest-contact-info/`, {
              contact_info: data.address ? data.address : 'n/a',
              contact_type_id: addressContactType.id,
              guest_id: guest.data.id,
            }),
          ]);
        }

        handleCloseWindow();
        handleGetGuests();
        return addToast({
          type: 'success',
          title: 'Convidado criado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
        return addToast({
          type: 'error',
          title: 'Erro ao criar convidado',
          description: 'Erro ao criar o convidado, tente novamente.',
        });
      }
    },
    [
      addToast,
      selectedEvent.id,
      weplanUser,
      guestConfirmed,
      handleGetGuests,
      myAvailableNumberOfGuests,
      selectedFriend,
      handleCloseWindow,
      whatsappContactType,
      phoneContactType,
      addressContactType,
      emailContactType,
      weplanGuestContactInfo,
      weplanGuestDefaultAddress,
      weplanGuestDefaultEmail,
      weplanGuestDefaultPhone,
      weplanGuestDefaultWhatsapp,
    ],
  );

  useEffect(() => {
    if (weplanUser) {
      setWeplanGuestContactInfoQuestion(true);
    }
  }, [weplanUser, selectedFriend]);

  const handleWeplaGuestContactInfoOption = useCallback(() => {
    setWeplanGuestContactInfo(true);
    setWeplanGuestContactInfoQuestion(false);
  }, []);

  return (
    <>
      {weplanGuestContactInfoQuestion && (
        <BooleanQuestionWindow
          onHandleCloseWindow={() => setWeplanGuestContactInfoQuestion(false)}
          question="Caso o usuário tenha informações de contato cadastradas, gostaria de adicioná-las como informações do convidado?"
          selectBooleanOption={handleWeplaGuestContactInfoOption}
        />
      )}
      <WindowUnFormattedContainer
        onHandleCloseWindow={() => handleCloseWindow()}
        containerStyle={{
          zIndex: 15,
          top: '0%',
          left: '0%',
          height: '100%',
          width: '100%',
          overflowY: 'scroll',
        }}
      >
        <Form ref={formRef} onSubmit={handleAddGuest}>
          <Container>
            <Header>
              <h1>Formulário de Convidados</h1>
              <p>
                Você pode adicionar até{' '}
                <strong>{myAvailableNumberOfGuests}</strong> convidados
              </p>
              <ButtonContainer>
                <button type="button" onClick={handleAddGuestListWindow}>
                  Lista de convidados
                  <MdGroupAdd size={24} />
                </button>
                {isOwner && (
                  <button type="button" onClick={handleGuestAllocationWindow}>
                    Alocação de convidados
                  </button>
                )}
              </ButtonContainer>
            </Header>
            <Body>
              <Section>
                {!weplanUser && (
                  <>
                    <InputContainer>
                      <p>Nome:</p>
                      <Input name="first_name" type="text" placeholder="Nome" />
                    </InputContainer>
                    <InputContainer>
                      <p>Sobrenome:</p>
                      <Input
                        name="last_name"
                        type="text"
                        placeholder="Sobrenome"
                      />
                    </InputContainer>
                  </>
                )}
                <InfoInputContainer>
                  <p>Descrição:</p>
                  <Input
                    name="description"
                    type="text"
                    defaultValue="Descrição"
                  />
                </InfoInputContainer>

                <ButtonContainer>
                  {!guestConfirmed ? (
                    <button type="button" onClick={handleGuestConfirmedWindow}>
                      Não confirmado
                    </button>
                  ) : (
                    <button type="button" onClick={handleGuestConfirmedWindow}>
                      <MdFavorite />
                      Confirmado!
                    </button>
                  )}
                  {!weplanUser && !selectedFriend.friend ? (
                    <button
                      type="button"
                      onClick={() => openWPGuestQuestionWindow(true)}
                    >
                      Convidado Weplan ?
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openWPGuestQuestionWindow(true)}
                    >
                      {selectedFriend &&
                        selectedFriend.friend &&
                        selectedFriend.friend.name}
                    </button>
                  )}
                </ButtonContainer>
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
                        {weplanGuestDefaultWhatsapp}
                      </button>
                    ) : (
                      <Input
                        name="whatsapp"
                        placeholder={weplanGuestDefaultWhatsapp}
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
                        {weplanGuestDefaultPhone}
                      </button>
                    ) : (
                      <Input
                        name="phone"
                        placeholder={weplanGuestDefaultPhone}
                      />
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
                        {weplanGuestDefaultEmail}
                      </button>
                    ) : (
                      <Input
                        name="email"
                        placeholder={weplanGuestDefaultEmail}
                      />
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
                      {weplanGuestDefaultAddress}
                    </button>
                  ) : (
                    <Input
                      name="address"
                      placeholder={weplanGuestDefaultAddress}
                    />
                  )}
                </InfoInputContainer>
              </Section>
            </Body>

            <button type="submit">
              <h3>Salvar</h3>
            </button>
          </Container>
        </Form>
      </WindowUnFormattedContainer>
    </>
  );
}
