import React, { useCallback, useState } from 'react';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';
import PageContainer from '../PageContainer';

import { Container, Suppliers } from './styles';

interface IPropsDTO {
  hiredSuppliers: ISelectedSupplierDTO[];
  // updateHiredSuppliers: Function;
}

const EventFinanceSection: React.FC<IPropsDTO> = ({
  hiredSuppliers,
}: // updateHiredSuppliers,
IPropsDTO) => {
  const [transactionList, setTransactionList] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<
    ISelectedSupplierDTO
  >({} as ISelectedSupplierDTO);

  const handleSelectedSupplier = useCallback(props => {
    setSelectedSupplier(props);
    setTransactionList(true);
  }, []);
  let supplierIndex = 0;
  let agreementIndex = 0;

  return (
    <>
      {/* {!!} */}
      <Container>
        <h1>Financeiro</h1>
        <span>
          <button type="button">
            <h3>Todas as transações</h3>
          </button>
          <button type="button">
            <h3>Custo Total do Evento</h3>
          </button>
          <button type="button">
            <h3>Total pago</h3>
          </button>
          <button type="button">
            <h3>Total há pagar</h3>
          </button>
        </span>
        <div>
          <Suppliers>
            <h2>Suppliers</h2>
            <div>
              {hiredSuppliers.map(supplier => {
                supplierIndex += 1;
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectedSupplier(supplier)}
                    key={supplier.id}
                  >
                    <p>{supplierIndex}</p>
                    <h3>{supplier.name}</h3>
                  </button>
                );
              })}
            </div>
          </Suppliers>

          <PageContainer>
            {!!transactionList && (
              <>
                <h1>{selectedSupplier.name}</h1>
                <div>
                  {selectedSupplier.transactionAgreement?.map(agreement => {
                    agreementIndex += 1;
                    return (
                      <>
                        <p>{agreementIndex}</p>
                        <h2 key={agreement.id}>{agreement.amount}</h2>
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </PageContainer>
        </div>
      </Container>
    </>
  );
};

export default EventFinanceSection;
