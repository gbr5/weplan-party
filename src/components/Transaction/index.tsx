import React, { memo } from 'react';
import { numberFormat } from '../../utils/numberFormat';

import ITransactionDTO from '../../dtos/ITransactionDTO';

import { Container } from './styles';

interface IPropsDTO {
  transaction: ITransactionDTO;
  key: number;
}

const Transaction: React.FC<IPropsDTO> = ({ key, transaction }: IPropsDTO) => {
  return (
    <Container>
      <p>{key}</p>
      <h3>{numberFormat(transaction.amount)}</h3>
      <h3>
        {transaction.difference_in_days &&
          (transaction.difference_in_days > 0
            ? `Faltam ${transaction.difference_in_days}`
            : `Está atrasado ${transaction.difference_in_days}`)}
      </h3>
      <h3>{transaction.formattedDate}</h3>
    </Container>
  );
};

export default memo(Transaction);
