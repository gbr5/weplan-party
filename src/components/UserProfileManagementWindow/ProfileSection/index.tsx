import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MdArrowBack, MdArrowUpward, MdPhone, MdWeb } from 'react-icons/md';
import { FiMail, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import IUserDTO from '../../../dtos/IUserDTO';
import api from '../../../services/api';
import Input from '../../Input';
import whatsappImg from '../../../assets/whatsapp.svg';
import facebookImg from '../../../assets/facebook.svg';
import instagramImg from '../../../assets/instagram.svg';
import twitterImg from '../../../assets/twitter.svg';
import linkedinImg from '../../../assets/linkedin.svg';

import {
  Container,
  AddressInfoInputContainer,
  InfoSection,
  InfoInputContainer,
} from './styles';
import { useToast } from '../../../hooks/toast';

interface IFormData {
  first_name: string;
  last_name: string;
  person_id: string;
  Whatsapp: string;
  Phone: string;
  Email: string;
  Instagram: string;
  Facebook: string;
  Linkedin: string;
  Twitter: string;
  Website: string;
  Address: string;
}

interface IProps {
  updateUser: Function;
  user: IUserDTO;
  userId: string;
}

const ProfileSection: React.FC<IProps> = ({
  user,
  updateUser,
  userId,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [personIdField, setPersonIdField] = useState(false);
  const [firstNameField, setFirstNameField] = useState(false);
  const [lastNameField, setLastNameField] = useState(false);
  const [whatsappField, setWhatsappField] = useState(false);
  const [phoneField, setPhoneField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [addressField, setAddressField] = useState(false);
  const [instagramField, setInstagramField] = useState(false);
  const [facebookField, setFacebookField] = useState(false);
  const [twitterField, setTwitterField] = useState(false);
  const [linkedinField, setLinkedinField] = useState(false);
  const [websiteField, setWebsiteField] = useState(false);

  const closeAllFields = useCallback(() => {
    setFirstNameField(false);
    setLastNameField(false);
    setPersonIdField(false);
    setWhatsappField(false);
    setPhoneField(false);
    setEmailField(false);
    setAddressField(false);
    setInstagramField(false);
    setFacebookField(false);
    setTwitterField(false);
    setLinkedinField(false);
    setWebsiteField(false);
  }, []);

  const [userDefaultWhatsapp, setUserDefaultWhatsapp] = useState('Whatsapp');
  const [userDefaultPhone, setUserDefaultPhone] = useState('Telefone');
  const [userDefaultEmail, setUserDefaultEmail] = useState('Email');
  const [userDefaultAddress, setUserDefaultAddress] = useState('Endereço');
  const [userDefaultWebsite, setUserDefaultWebsite] = useState('Website');
  const [userDefaultLinkedin, setUserDefaultLinkedin] = useState('Linkedin');
  const [userDefaultFacebook, setUserDefaultFacebook] = useState('Facebook');
  const [userDefaultInstagram, setUserDefaultInstagram] = useState('Instagram');
  const [userDefaultTwitter, setUserDefaultTwitter] = useState('Twitter');

  useEffect(() => {
    if (user.userContacts) {
      user.userContacts.map(contact => {
        contact.contact_type === 'Whatsapp' &&
          setUserDefaultWhatsapp(contact.contact_info);
        contact.contact_type === 'Phone' &&
          setUserDefaultPhone(contact.contact_info);
        contact.contact_type === 'Email' &&
          setUserDefaultEmail(contact.contact_info);
        contact.contact_type === 'Address' &&
          setUserDefaultAddress(contact.contact_info);
        contact.contact_type === 'Instagram' &&
          setUserDefaultInstagram(contact.contact_info);
        contact.contact_type === 'Facebook' &&
          setUserDefaultFacebook(contact.contact_info);
        contact.contact_type === 'Twitter' &&
          setUserDefaultTwitter(contact.contact_info);
        contact.contact_type === 'Linkedin' &&
          setUserDefaultLinkedin(contact.contact_info);
        contact.contact_type === 'Website' &&
          setUserDefaultWebsite(contact.contact_info);
        return contact.contact_type;
      });
    } else {
      setUserDefaultWhatsapp('Whatsapp');
      setUserDefaultPhone('Telefone');
      setUserDefaultEmail('Email');
      setUserDefaultAddress('Endereço');
      setUserDefaultInstagram('Instagram');
      setUserDefaultFacebook('Facebook');
      setUserDefaultTwitter('Twitter');
      setUserDefaultWebsite('Website');
      setUserDefaultLinkedin('Linkedin');
    }
  }, [user]);
  // const avatar = useMemo(() => {
  //   return user.avatar_url ? user.avatar_url : AvatarPlaceholder;
  // }, [user]);

  const imgAlt = useMemo(() => {
    return `${user.avatar_url} - WePlan Party`;
  }, [user]);

  const updatePersonInfo = useCallback(
    async (first_name: string, last_name: string, person_id: string) => {
      try {
        await api.put('/person-info/edit', {
          first_name,
          last_name,
          person_id,
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [],
  );
  const updateUserContactInfo = useCallback(
    async (contact_info: string, contact_type: string) => {
      try {
        const contactType = user.userContacts.find(
          contact => contact.contact_type === contact_type,
        );

        if (contactType) {
          await api.put(`/profile/contact-info/edit/${contactType.id}`, {
            contact_info,
          });
        } else {
          await api.post(`/profile/contact-info/add/${userId}`, {
            contact_info,
            contact_type,
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    [userId, user],
  );

  const createPersonInfo = useCallback(
    async (data: IFormData) => {
      try {
        await api.post(`person-info/${userId}`, {
          first_name: data.first_name,
          last_name: data.last_name,
          person_id: data.person_id,
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [userId],
  );

  const createUserContactInfos = useCallback(
    async (data: IFormData) => {
      try {
        Promise.all([
          api.post(`/profile/contact-info/add/${userId}`, {
            contact_info: data.Whatsapp ? data.Whatsapp : 'n/a',
            contact_type: 'Whatsapp',
          }),
          api.post(`/profile/contact-info/add/${userId}`, {
            contact_info: data.Phone ? data.Phone : 'n/a',
            contact_type: 'Phone',
          }),
          api.post(`/profile/contact-info/add/${userId}`, {
            contact_info: data.Email ? data.Email : 'n/a',
            contact_type: 'Email',
          }),
          api.post(`/profile/contact-info/add/${userId}`, {
            contact_info: data.Address ? data.Address : 'n/a',
            contact_type: 'Address',
          }),
          api.post(`/profile/contact-info/add/${userId}`, {
            contact_info: data.Instagram ? data.Instagram : 'n/a',
            contact_type: 'Instagram',
          }),
          api.post(`/profile/contact-info/add/${userId}`, {
            contact_info: data.Facebook ? data.Facebook : 'n/a',
            contact_type: 'Facebook',
          }),
          api.post(`/profile/contact-info/add/${userId}`, {
            contact_info: data.Linkedin ? data.Linkedin : 'n/a',
            contact_type: 'Linkedin',
          }),
          api.post(`/profile/contact-info/add/${userId}`, {
            contact_info: data.Website ? data.Website : 'n/a',
            contact_type: 'Website',
          }),
        ]);
      } catch (err) {
        throw new Error(err);
      }
    },
    [userId],
  );

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        !user.personInfo && createPersonInfo(data);
        !user.userContacts && createUserContactInfos(data);
        firstNameField &&
          lastNameField &&
          personIdField &&
          updatePersonInfo(data.first_name, data.last_name, data.person_id);
        const firstName = user.personInfo ? user.personInfo.first_name : 'n/a';
        const lastName = user.personInfo ? user.personInfo.last_name : 'n/a';
        const personID = user.personInfo ? user.personInfo.person_id : 'n/a';
        firstNameField &&
          !lastNameField &&
          !personIdField &&
          updatePersonInfo(data.first_name, lastName, personID);
        firstNameField &&
          lastNameField &&
          !personIdField &&
          updatePersonInfo(data.first_name, data.last_name, personID);
        firstNameField &&
          !lastNameField &&
          personIdField &&
          updatePersonInfo(data.first_name, lastName, data.person_id);
        !firstNameField &&
          lastNameField &&
          !personIdField &&
          updatePersonInfo(firstName, data.last_name, personID);
        !firstNameField &&
          lastNameField &&
          personIdField &&
          updatePersonInfo(firstName, data.last_name, data.person_id);
        !firstNameField &&
          !lastNameField &&
          personIdField &&
          updatePersonInfo(firstName, lastName, data.person_id);

        whatsappField && updateUserContactInfo(data.Whatsapp, 'Whatsapp');
        phoneField && updateUserContactInfo(data.Phone, 'Phone');
        emailField && updateUserContactInfo(data.Email, 'Email');
        addressField && updateUserContactInfo(data.Address, 'Address');
        instagramField && updateUserContactInfo(data.Instagram, 'Instagram');
        facebookField && updateUserContactInfo(data.Facebook, 'Facebook');
        linkedinField && updateUserContactInfo(data.Linkedin, 'Linkedin');
        twitterField && updateUserContactInfo(data.Twitter, 'Twitter');
        websiteField && updateUserContactInfo(data.Website, 'Website');

        closeAllFields();
        updateUser();
        addToast({
          type: 'success',
          title: 'Informações de usuário atualizadas com sucesso',
          description: 'As alterações já foram propagadas.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar informações de usuário.',
          description: 'Erro ao editar informações, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      updateUser,
      closeAllFields,
      user,
      updateUserContactInfo,
      updatePersonInfo,
      createPersonInfo,
      createUserContactInfos,
      personIdField,
      firstNameField,
      lastNameField,
      whatsappField,
      phoneField,
      emailField,
      addressField,
      instagramField,
      facebookField,
      linkedinField,
      twitterField,
      websiteField,
    ],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <h2>Informações de contato</h2>
        <InfoSection>
          <InfoInputContainer>
            <p>
              <FiUser />
              Nome:
              {firstNameField && (
                <button type="button" onClick={() => setFirstNameField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!firstNameField ? (
              <button
                type="button"
                onClick={() => setFirstNameField(!firstNameField)}
              >
                {user.personInfo && user.personInfo.first_name}
              </button>
            ) : (
              <Input
                name="first_name"
                placeholder={user.personInfo && user.personInfo.first_name}
              />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <FiUser />
              Sobrenome:
              {lastNameField && (
                <button type="button" onClick={() => setLastNameField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!lastNameField ? (
              <button
                type="button"
                onClick={() => setLastNameField(!lastNameField)}
              >
                {user.personInfo && user.personInfo.last_name}
              </button>
            ) : (
              <Input
                name="last_name"
                placeholder={user.personInfo && user.personInfo.last_name}
              />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <FiUser />
              Identidade:
              {personIdField && (
                <button type="button" onClick={() => setPersonIdField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!personIdField ? (
              <button
                type="button"
                onClick={() => setPersonIdField(!personIdField)}
              >
                {user.personInfo && user.personInfo.person_id}
              </button>
            ) : (
              <Input
                name="person_id"
                placeholder={user.personInfo && user.personInfo.person_id}
              />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <img src={whatsappImg} alt={imgAlt} />
              Whatsapp:
              {whatsappField && (
                <button type="button" onClick={() => setWhatsappField(false)}>
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
                {userDefaultWhatsapp === 'n/a'
                  ? 'Informar'
                  : userDefaultWhatsapp}
              </button>
            ) : (
              <Input name="Whatsapp" placeholder={userDefaultWhatsapp} />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <MdPhone />
              Telefone:
              {phoneField && (
                <button type="button" onClick={() => setPhoneField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!phoneField ? (
              <button type="button" onClick={() => setPhoneField(!phoneField)}>
                {userDefaultPhone === 'n/a' ? 'Informar' : userDefaultPhone}
              </button>
            ) : (
              <Input name="Phone" placeholder={userDefaultPhone} />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <FiMail />
              email:
              {emailField && (
                <button type="button" onClick={() => setEmailField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!emailField ? (
              <button type="button" onClick={() => setEmailField(!emailField)}>
                {userDefaultEmail === 'n/a' ? 'Informar' : userDefaultEmail}
              </button>
            ) : (
              <Input name="Email" placeholder={userDefaultEmail} />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <img src={instagramImg} alt={imgAlt} />
              Instagram:
              {!instagramField &&
                userDefaultInstagram !== 'n/a' &&
                userDefaultInstagram !== 'Instagram' && (
                  <a target="blank" href={userDefaultInstagram}>
                    <MdArrowUpward size={32} />
                  </a>
                )}
              {instagramField && (
                <button type="button" onClick={() => setInstagramField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!instagramField ? (
              <button
                type="button"
                onClick={() => setInstagramField(!instagramField)}
              >
                {userDefaultInstagram === 'n/a'
                  ? 'Informar'
                  : userDefaultInstagram}
              </button>
            ) : (
              <Input name="Instagram" placeholder={userDefaultInstagram} />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <img src={facebookImg} alt={imgAlt} />
              Facebook:
              {!facebookField &&
                userDefaultFacebook !== 'n/a' &&
                userDefaultFacebook !== 'Facebook' && (
                  <a target="blank" href={userDefaultFacebook}>
                    <MdArrowUpward size={32} />
                  </a>
                )}
              {facebookField && (
                <button type="button" onClick={() => setFacebookField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!facebookField ? (
              <button
                type="button"
                onClick={() => setFacebookField(!facebookField)}
              >
                {userDefaultFacebook === 'n/a'
                  ? 'Informar'
                  : userDefaultFacebook}
              </button>
            ) : (
              <Input name="Facebook" placeholder={userDefaultFacebook} />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <img src={linkedinImg} alt={imgAlt} />
              Linkedin:
              {!linkedinField &&
                userDefaultLinkedin !== 'n/a' &&
                userDefaultLinkedin !== 'Linkedin' && (
                  <a target="blank" href={userDefaultLinkedin}>
                    <MdArrowUpward size={32} />
                  </a>
                )}
              {linkedinField && (
                <button type="button" onClick={() => setLinkedinField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!linkedinField ? (
              <button
                type="button"
                onClick={() => setLinkedinField(!linkedinField)}
              >
                {userDefaultLinkedin === 'n/a'
                  ? 'Informar'
                  : userDefaultLinkedin}
              </button>
            ) : (
              <Input name="Linkedin" placeholder={userDefaultLinkedin} />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <img src={twitterImg} alt={imgAlt} />
              Twitter:
              {!twitterField &&
                userDefaultTwitter !== 'n/a' &&
                userDefaultTwitter !== 'Twitter' && (
                  <a target="blank" href={userDefaultTwitter}>
                    <MdArrowUpward size={32} />
                  </a>
                )}
              {twitterField && (
                <button type="button" onClick={() => setTwitterField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!twitterField ? (
              <button
                type="button"
                onClick={() => setTwitterField(!twitterField)}
              >
                {userDefaultTwitter === 'n/a' ? 'Informar' : userDefaultTwitter}
              </button>
            ) : (
              <Input name="Twitter" placeholder={userDefaultTwitter} />
            )}
          </InfoInputContainer>
          <InfoInputContainer>
            <p>
              <MdWeb />
              Website:
              {!websiteField &&
                userDefaultWebsite !== 'n/a' &&
                userDefaultWebsite !== 'Website' && (
                  <a target="blank" href={userDefaultWebsite}>
                    <MdArrowUpward size={32} />
                  </a>
                )}
              {websiteField && (
                <button type="button" onClick={() => setWebsiteField(false)}>
                  <MdArrowBack />
                  <MdArrowBack />
                </button>
              )}
            </p>
            {!websiteField ? (
              <button
                type="button"
                onClick={() => setWebsiteField(!websiteField)}
              >
                {userDefaultWebsite === 'n/a' ? 'Informar' : userDefaultWebsite}
              </button>
            ) : (
              <Input name="Website" placeholder={userDefaultWebsite} />
            )}
          </InfoInputContainer>
        </InfoSection>
        <AddressInfoInputContainer>
          <p>
            Endereço:
            {addressField && (
              <button type="button" onClick={() => setAddressField(false)}>
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
              {userDefaultAddress === 'n/a' ? 'Informar' : userDefaultAddress}
            </button>
          ) : (
            <Input name="Address" placeholder={userDefaultAddress} />
          )}
        </AddressInfoInputContainer>
        <button type="submit">Salvar</button>
      </Container>
    </Form>
  );
};

export default ProfileSection;
