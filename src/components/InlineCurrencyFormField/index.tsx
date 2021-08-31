/* eslint-disable react/require-default-props */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { MdClose, MdDone } from 'react-icons/md';
import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import Input from '../Input';

import { Container } from './styles';

interface IFormParams {
  name: string;
}

interface IProps {
  defaultValue: string;
  placeholder: string;
  handleOnSubmit: (e: number) => void;
  closeComponent?: () => void;
}

export function InlineCurrencyFormField({
  defaultValue,
  handleOnSubmit,
  placeholder,
  closeComponent,
}: IProps): JSX.Element {
  const iconsize = 32;
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    ({ name }: IFormParams) => {
      const value = Number(name.replace(/\./g, '').replace(',', '.'));
      if (!value) return closeComponent && closeComponent();
      handleOnSubmit(value);
      return closeComponent && closeComponent();
    },
    [closeComponent, handleOnSubmit],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        {closeComponent && (
          <span>
            <button type="button" onClick={() => closeComponent()}>
              <MdClose size={iconsize} />
            </button>
          </span>
        )}
        <Input
          containerStyle={{
            border: 'none',
            background: 'transparent',
            borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
            padding: '0.5rem',
            margin: '0 auto',
            width: '100%',
            minWidth: '15rem',
            boxShadow: 'none',
            borderRadius: '0',
            textAlign: 'center',
            color: 'black',
          }}
          name="name"
          type="numeric"
          defaultValue={formatBrlCurrency(Number(defaultValue))}
          placeholder={placeholder}
          mask="currency"
        />

        <button type="submit">
          <MdDone size={iconsize} />
        </button>
      </Container>
    </Form>
  );
}
