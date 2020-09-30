import React, { HTMLAttributes } from 'react';
import { Scope } from '@unform/core';

import InputMask from 'react-input-mask';
import Input from '../Input';
import PageContainer from '../PageContainer';
import CheckboxInput from '../CheckboxInput';

interface IFriendsDTO {
  id: string;
  name: string;
  avatar: string;
}

interface IPropsDTO extends HTMLAttributes<HTMLDivElement> {
  rowIndex: number;
  installmentDefaultAmount: number;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const TransactionInputRow: React.FC<IPropsDTO> = ({
  rowIndex,
  installmentDefaultAmount,
}: IPropsDTO) => {
  const transaction = `transactions[${rowIndex - 1}]`;

  const inputHeight = { height: '40px' };
  const containerStyle = { height: '80px' };

  const checkboxOptions: CheckboxOption[] = [
    {
      id: `transactions[${rowIndex - 1}]-PAGA`,
      value: 'true',
      label: 'Sim',
    },
    {
      id: `transactions[${rowIndex - 1}]-NâoPAGA`,
      value: 'false',
      label: 'Não',
    },
  ];

  return (
    <PageContainer containerStyle={containerStyle}>
      <Scope path={transaction}>
        <p>{rowIndex}° parcela</p>
        <div>
          <span>
            <p>Valor da Parcela</p>
            <Input
              name="amount"
              type="number"
              defaultValue={installmentDefaultAmount}
              containerStyle={inputHeight}
            />
          </span>
          <span>
            <p>Data de pagamento</p>
            <Input name="due_date" type="date" containerStyle={inputHeight} />
          </span>
          <span>
            <p>Parcela quitada?</p>
            <div>
              <CheckboxInput name="isPaid" options={checkboxOptions} />
            </div>
          </span>
        </div>
      </Scope>
    </PageContainer>
  );
};

export default TransactionInputRow;
