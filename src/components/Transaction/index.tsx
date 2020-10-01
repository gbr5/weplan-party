import React, { memo, useCallback } from 'react';
import {
  FiAlertCircle,
  FiCheck,
  FiCheckSquare,
  FiSquare,
} from 'react-icons/fi';
import { numberFormat } from '../../utils/numberFormat';

import ITransactionDTO from '../../dtos/ITransactionDTO';

import { Container, TransactionDate } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface IPropsDTO {
  transaction: ITransactionDTO;
  key: string;
  refreshHiredSuppliers: Function;
  allTransactions: boolean;
}

const Transaction: React.FC<IPropsDTO> = ({
  key,
  transaction,
  refreshHiredSuppliers,
  allTransactions,
}: IPropsDTO) => {
  const { addToast } = useToast();

  let transactionMessage = '';
  if (transaction.difference_in_days) {
    if (transaction.isPaid) {
      transactionMessage = 'Pago';
    } else {
      transactionMessage =
        transaction.difference_in_days > 0
          ? `${transaction.difference_in_days} dias para o vencimento`
          : `Atrasado a ${transaction.difference_in_days * -1} dias`;
    }
  }

  const handleUpdateTransactionTransactionIsPaid = useCallback(async () => {
    try {
      await api.put(`finances/agreements/transactions/${transaction.id}`, {
        amount: transaction.amount,
        due_date: transaction.due_date,
        isPaid: !transaction.isPaid,
      });

      addToast({
        type: 'success',
        title: `Parcela atualizada com Sucesso`,
        description:
          'Você já pode visualizar as alterações na página do seu evento.',
      });
      refreshHiredSuppliers();
    } catch (err) {
      addToast({
        type: 'error',
        title: `Erro ao atualizar a parcela`,
        description: 'Erro ao atualizar a parcela, tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, refreshHiredSuppliers, transaction]);
  return (
    <Container key={key}>
      <div>
        <h2>{numberFormat(transaction.amount)}</h2>
        {!!transaction.isPaid && <FiCheck color="green" size={24} />}
        {!!transaction.difference_in_days &&
          transaction.difference_in_days < 0 &&
          !transaction.isPaid && <FiAlertCircle size={24} color="red" />}
      </div>
      <TransactionDate title={transactionMessage}>
        <h3>{transaction.supplier_name}</h3>

        <p>{transaction.formattedDate}</p>

        {!allTransactions && (
          <button
            type="button"
            onClick={handleUpdateTransactionTransactionIsPaid}
          >
            Pago:
            {transaction.isPaid ? (
              <FiCheckSquare size={24} />
            ) : (
              <FiSquare size={24} />
            )}
          </button>
        )}
      </TransactionDate>
    </Container>
  );
};

export default memo(Transaction);
