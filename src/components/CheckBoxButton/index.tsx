/* eslint-disable react/require-default-props */
import React from 'react';
import { FiCheckSquare, FiLoader, FiSquare } from 'react-icons/fi';

import { Container } from './styles';

interface IProps {
  isActive: boolean;
  handleIsActive: () => Promise<void>;
  loading: boolean;
  iconSize?: number;
  margin?: string;
}

export function CheckBoxButton({
  handleIsActive,
  iconSize,
  isActive,
  margin,
  loading,
}: IProps): JSX.Element {
  return (
    <Container style={{ margin }} onClick={handleIsActive}>
      {loading && <FiLoader size={iconSize ?? 24} />}
      {isActive ? (
        <FiCheckSquare size={iconSize ?? 24} />
      ) : (
        <FiSquare size={iconSize ?? 24} />
      )}
    </Container>
  );
}
