import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { MdClose, MdDone } from 'react-icons/md';
import { CloseButton } from '../CloseButton';
import Input from '../Input';

import { Container, DoneButton } from './styles';

interface IFormParams {
  name: string;
}

interface IProps {
  defaultValue: string;
  placeholder: string;
  handleOnSubmit: (e: string) => void;
  closeComponent?: () => void;
}

const InlineFormField: React.FC<IProps> = ({
  defaultValue,
  handleOnSubmit,
  placeholder,
  closeComponent,
}) => {
  const iconsize = 32;
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (data: IFormParams) => {
      if (data.name !== '') {
        handleOnSubmit(data.name);
      }
      closeComponent && closeComponent();
    },
    [closeComponent, handleOnSubmit],
  );

  return (
    <>
      {closeComponent && <CloseButton closeFunction={closeComponent} />}
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
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
            defaultValue={defaultValue}
            placeholder={placeholder}
          />

          <DoneButton type="submit">
            <MdDone size={iconsize} />
          </DoneButton>
        </Container>
      </Form>
    </>
  );
};

export default InlineFormField;
