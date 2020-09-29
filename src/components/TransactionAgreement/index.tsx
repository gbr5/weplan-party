import React, { memo } from 'react';
import { numberFormat } from '../../utils/numberFormat';

import ITransactionAgreementDTO from '../../dtos/ITransactionAgreementDTO';

import { Container } from './styles';

interface IPropsDTO {
  transactionAgreement: ITransactionAgreementDTO;
}

const TransactionAgreement: React.FC<IPropsDTO> = ({
  transactionAgreement,
}: IPropsDTO) => {
  return (
    <Container key={transactionAgreement.index}>
      <p>{transactionAgreement.index}</p>
      <h3>{numberFormat(transactionAgreement.amount)}</h3>
      {transactionAgreement.number_of_installments > 1 && (
        <span>
          parcelado em {transactionAgreement.number_of_installments} vezes
        </span>
      )}
    </Container>
  );
};

export default memo(TransactionAgreement);
