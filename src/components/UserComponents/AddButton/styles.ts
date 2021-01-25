import styled from 'styled-components';
import '../../../styles/global';

export const Container = styled.button`
  position: absolute;
  z-index: 2;

  top: 16px;
  right: 16px;

  height: 32px;
  width: 32px;

  border-radius: 8px;
  border: none;

  background: var(--primary-color);
  color: var(--secondary-color);
  box-shadow: var(--box-shadow);

  transition: 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--primary-color);
    background: var(--secondary-color);
    box-shadow: var(--window-box-shadow);
  }
`;
