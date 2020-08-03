import styled from 'styled-components';
import '../../styles/global';

import { shade } from 'polished';

export const Container = styled.button`
  background: var(--primary-color);
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: var(--background-color);
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#ff9000')};
  }
`;
