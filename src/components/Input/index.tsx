import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  FormEvent,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import {
  cep,
  brlID,
  currency,
  brlDateFormat,
  hour,
  minute,
} from '../../utils/masks';

import { Container, Error, Prefix } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  mask?: 'cep' | 'currency' | 'brlID' | 'brlDateFormat' | 'hour' | 'minute';
  prefix?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  mask,
  prefix,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask) {
        mask === 'cep' && cep(e);
        mask === 'brlID' && brlID(e);
        mask === 'currency' && currency(e);
        mask === 'brlDateFormat' && brlDateFormat(e);
        mask === 'hour' && hour(e);
        mask === 'minute' && minute(e);
      }
    },
    [mask],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {prefix && <Prefix>{prefix}</Prefix>}
      {Icon && <Icon size={20} />}
      <input
        onKeyUp={(e: FormEvent<HTMLInputElement>) => handleKeyUp(e)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
