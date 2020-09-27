import React from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiChevronRight, FiEdit3 } from 'react-icons/fi';
import { Container, DeleteButton } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';

import WindowContainer from '../WindowContainer';
import IEventSupplierHiredDTO from '../../dtos/IEventSupplierHiredDTO';

interface IPropsDTO {
  eventSupplier: IEventSupplierHiredDTO;
  onHandleEventSupplierDrawer: MouseEventHandler;
  onHandleEventSupplierUpdate: MouseEventHandler;
  onHandleDeleteEventSupplierDrawer: MouseEventHandler;
}

const EventSupplierWindow: React.FC<IPropsDTO> = ({
  eventSupplier,
  onHandleEventSupplierDrawer,
  onHandleEventSupplierUpdate,
  onHandleDeleteEventSupplierDrawer,
}: IPropsDTO) => {
  let iAgreement = 0;
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleEventSupplierDrawer}
      containerStyle={{ top: '20%', left: '25%', height: '60%', width: '50%' }}
    >
      <Container>
        <img src={avatar_placeholder} alt={eventSupplier.name} />

        <button type="button" onClick={onHandleEventSupplierUpdate}>
          <FiEdit3 size={24} />

          <h1>{eventSupplier.name}</h1>
        </button>

        {eventSupplier.transactionAgreement.length > 0 &&
          (eventSupplier.transactionAgreement.length > 1 ? (
            <h2>Contratos:</h2>
          ) : (
            <h2>Contrato:</h2>
          ))}
        {eventSupplier.transactionAgreement.length > 0 && (
          <div>
            {eventSupplier.transactionAgreement.map(agreement => {
              iAgreement += 1;
              return (
                <button type="button">
                  <h2>{iAgreement}.</h2>
                  <h1>
                    R$
                    {agreement.amount}/ parcelado em{' '}
                    {agreement.number_of_installments}
                  </h1>
                  <p>24/09/20</p>
                  <FiChevronRight size={20} />
                </button>
              );
            })}
          </div>
        )}
        <DeleteButton type="button" onClick={onHandleDeleteEventSupplierDrawer}>
          Deletar
          <MdDelete size={24} />
        </DeleteButton>
      </Container>
    </WindowContainer>
  );
};

export default EventSupplierWindow;
