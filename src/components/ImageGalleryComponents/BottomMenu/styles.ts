import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5;
  background: rgba(50, 50, 50, 0.95);
  padding: 0 4px;

  display: flex;
  align-items: stretch;
  justify-content: center;

  width: 100%;
  transition: 0.3s;
  padding: 0 10%;

  &:hover {
    color: var(--primary-color);
    opacity: 0.8;
  }
`;

export const MenuButton = styled.button`
  background: rgba(50, 50, 50, 0.95);
  border-radius: 4px;
  background: transparent;
  border: none;
  color: var(--primary-color);
  margin: 4px auto;
`;
