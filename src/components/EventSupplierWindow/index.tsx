import React, { useCallback, useState } from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiChevronRight, FiEdit3 } from 'react-icons/fi';
import { Container, Contracts, DeleteButton } from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';

import WindowContainer from '../WindowContainer';
import IEventSupplierDTO from '../../dtos/IEventSupplierDTO';
import TransactionAgreementForm from '../TransactionAgreementForm';
import ITransactionAgreementDTO from '../../dtos/ITransactionAgreementDTO';

interface IPropsDTO {
  isOwner: boolean;
  eventSupplier: IEventSupplierDTO;
  onHandleEventSupplierDrawer: MouseEventHandler;
  onHandleEventSupplierUpdate: MouseEventHandler;
  onHandleDeleteEventSupplierDrawer: MouseEventHandler;
  handleGetSuppliers: Function;
  getHiredSuppliers: Function;
}

const EventSupplierWindow: React.FC<IPropsDTO> = ({
  isOwner,
  eventSupplier,
  onHandleEventSupplierDrawer,
  onHandleEventSupplierUpdate,
  onHandleDeleteEventSupplierDrawer,
  handleGetSuppliers,
  getHiredSuppliers,
}: IPropsDTO) => {
  const [editSupplierWindow, setEditSupplierWindow] = useState(false);
  const [thisAgreement, setThisAgreement] = useState<ITransactionAgreementDTO>(
    {} as ITransactionAgreementDTO,
  );

  const handleEditSupplierWindow = useCallback(
    props => {
      setThisAgreement(props);
      setEditSupplierWindow(!editSupplierWindow);
    },
    [editSupplierWindow],
  );

  let iAgreement = 0;
  return (
    <>
      {!!editSupplierWindow && (
        <TransactionAgreementForm
          agreement={thisAgreement}
          handleGetSuppliers={handleGetSuppliers}
          getHiredSuppliers={getHiredSuppliers}
          hiredSupplier={eventSupplier}
          onHandleCloseWindow={() => setEditSupplierWindow(false)}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleEventSupplierDrawer}
        containerStyle={{ top: '5%', left: '5%', height: '90%', width: '90%' }}
      >
        <Container>
          <div>
            <div>
              <img src={avatar_placeholder} alt={eventSupplier.name} />

              {isOwner ? (
                <button type="button" onClick={onHandleEventSupplierUpdate}>
                  <FiEdit3 size={24} />

                  <h1>{eventSupplier.name}</h1>
                </button>
              ) : (
                <button type="button">
                  <h1>{eventSupplier.name}</h1>
                </button>
              )}
            </div>

            {eventSupplier.transactionAgreement &&
              (eventSupplier.transactionAgreement.length > 1 ? (
                <h2>Contratos:</h2>
              ) : (
                <h2>Contrato:</h2>
              ))}
          </div>

          {eventSupplier.transactionAgreement && (
            <Contracts>
              {eventSupplier.transactionAgreement.map(agreement => {
                iAgreement += 1;
                return (
                  <button
                    key={agreement.id}
                    type="button"
                    onClick={() => handleEditSupplierWindow(agreement)}
                  >
                    <h2>{iAgreement}.</h2>
                    <h1>
                      R$
                      {agreement.amount}/ parcelado em{' '}
                      {agreement.number_of_installments}
                    </h1>
                    <div>
                      <p>24/09/20</p>
                      <FiChevronRight size={40} />
                    </div>
                  </button>
                );
              })}
            </Contracts>
          )}
          <DeleteButton
            type="button"
            onClick={onHandleDeleteEventSupplierDrawer}
          >
            Deletar
            <MdDelete size={24} />
          </DeleteButton>
        </Container>
      </WindowContainer>
    </>
  );
};

export default EventSupplierWindow;
