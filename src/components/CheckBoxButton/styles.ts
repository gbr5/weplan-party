import styled from 'styled-components';

interface IconProps {
  isActive: boolean;
  iconSize: number;
}

export const Container = styled.button`
  padding: 4px;
  border-radius: 5px;
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;
