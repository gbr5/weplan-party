import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { MouseEventHandler } from 'react-select';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { SuppliersList, SaveButton, SuppliersContainer } from './styles';
import WindowContainer from '../WindowContainer';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import Input from '../Input';
import IPersonInfoDTO from '../../dtos/IPersonInfoDTO';
import IUserDTO from '../../dtos/IUserDTO';

interface IForm {
  title: string;
  message: string;
}

interface IContactInfo {
  info_type: string;
  info: string;
}

interface ICompanyContact {
  id: string;
  name: string;
  description: string;
  company_contact_type: string;
  weplanUser: boolean;
  isCompany: boolean;
  company: IUserDTO;
  contact_infos: IContactInfo[];
}

interface IWPContact {
  id: string;
  user_id: string;
  companyContact: ICompanyContact;
}

interface IPropsDTO {
  supplier_id: string;
  event_id: string;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
}

const SupplierServiceOrderFormWindow: React.FC<IPropsDTO> = ({
  supplier_id,
  event_id,
  handleCloseWindow,
  onHandleCloseWindow,
}: IPropsDTO) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [personInfo, setPersonInfo] = useState<IPersonInfoDTO>(
    {} as IPersonInfoDTO,
  );

  const [wpContact, setWPContact] = useState<IWPContact>({} as IWPContact);

  const getPersonInfo = useCallback(() => {
    api.get<IPersonInfoDTO>(`person-info/${user.id}`).then(response => {
      setPersonInfo(response.data);
    });
  }, [user]);

  useEffect(() => {
    getPersonInfo();
  }, [getPersonInfo]);

  const getWPCompanyContact = useCallback(() => {
    api
      .get<IWPContact>(`company/contact/wp-user/show/${user.id}/${supplier_id}`)
      .then(response => {
        setWPContact(response.data);
      });
  }, [user, supplier_id]);

  useEffect(() => {
    getWPCompanyContact();
  }, [getWPCompanyContact]);

  const handleSubmit = useCallback(
    async (data: IForm) => {
      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          title: Yup.string().required('Título da mensagem é obrigatório'),
          message: Yup.string().required('Mensagem é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (wpContact.id === undefined) {
          let companyContact = {} as ICompanyContact;
          if (personInfo.first_name && personInfo.last_name) {
            const response = await api.post('/company/contacts', {
              company_id: supplier_id,
              name: `${personInfo.first_name} ${personInfo.last_name}`,
              description: 'Cliente Weplan',
              company_contact_type: 'Customer',
              weplanUser: true,
              isCompany: user.isCompany,
            });
            Promise.all([
              api.post('company/contacts/info/', {
                company_contact_id: response.data.id,
                info_type: 'Email',
                info: user.email,
              }),
              api.post('company/contact/wp-user/', {
                company_contact_id: response.data.id,
                user_id: user.id,
              }),
            ]);
            companyContact = response.data;
          } else {
            const response1 = await api.post('/company/contacts', {
              company_id: supplier_id,
              name: user.name,
              description: 'Cliente Weplan',
              company_contact_type: 'Customer',
              weplanUser: true,
              isCompany: user.isCompany,
            });
            Promise.all([
              api.post('company/contacts/info/', {
                company_contact_id: response1.data.id,
                info_type: 'Email',
                info: user.email,
              }),
              api.post('company/contact/wp-user/', {
                company_contact_id: response1.data.id,
                user_id: user.id,
              }),
            ]);
            companyContact = response1.data;
          }
          const customerServiceOrder = await api.post(
            '/service-order/customer',
            {
              customer_id: companyContact.id,
              company_id: supplier_id,
              title: data.title,
              message: data.message,
              isResponded: false,
            },
          );

          await api.post('event/service-orders', {
            customer_service_order_id: customerServiceOrder.data.id,
            event_id,
          });
        } else {
          const customerServiceOrder = await api.post(
            '/service-order/customer',
            {
              customer_id: wpContact.companyContact.id,
              company_id: supplier_id,
              title: data.title,
              message: data.message,
              isResponded: false,
            },
          );

          await api.post('event/service-orders', {
            customer_service_order_id: customerServiceOrder.data.id,
            event_id,
          });
        }

        handleCloseWindow();
        addToast({
          type: 'success',
          title: 'Ordem de serviço criada com Sucesso',
          description: 'Sua ordem de serviço foi entregue ao fornecedor.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao criar orderm de serviço!',
          description: 'Erro  ao criar a ordem de serviço, tente novamente.',
        });
      }
    },
    [
      addToast,
      handleCloseWindow,
      event_id,
      wpContact,
      supplier_id,
      user,
      personInfo,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SuppliersContainer>
          <h1>Pedido de orçamento</h1>
          <SuppliersList>
            <p>Assunto</p>
            <Input
              name="title"
              containerStyle={{ height: '40px', width: '100%' }}
              placeholder="Assunto"
            />
            <p>Mensagem</p>
            <Input
              name="message"
              containerStyle={{ height: '40px', width: '100%' }}
              placeholder="Mensagem"
            />
          </SuppliersList>
          <SaveButton>
            <button type="submit">Enviar</button>
          </SaveButton>
        </SuppliersContainer>
      </Form>
    </WindowContainer>
  );
};

export default SupplierServiceOrderFormWindow;
