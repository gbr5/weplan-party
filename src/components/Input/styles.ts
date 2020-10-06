import styled, { css } from 'styled-components';
import '../../styles/global';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--input-container-color);
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid var(--input-container-color);
  color: var(--letter-color-5);
  box-shadow: var(--box-shadow);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red-color);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--primary-color);
      border-color: var(--primary-color);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--primary-color);
    `}

  input {
    flex: 1;
    width: 100%;
    background: transparent;
    border: 0;
    color: var(--header-background-color);

    &::placeholder {
      color: var(--letter-color-5);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  font-size: 16px;
  color: var(--title-color);
  margin-right: auto;
  transition: 0.25s;

  &:hover {
    opacity: 0.8;
    color: var(--primary-color);
  }

  > strong {
    font-weight: 500;
  }
  svg {
    margin: 0;
  }

  span {
    background: var(--red-color);
    color: var(--letter-color-1);

    &::before {
      border-color: var(--red-color) transparent;
    }
  }
`;
