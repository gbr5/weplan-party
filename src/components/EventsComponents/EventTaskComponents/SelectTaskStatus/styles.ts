import styled from 'styled-components';

interface IProps {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  padding: 8px;
  width: 100%;
  overflow-x: scroll;
  position: absolute;
  bottom: -20px;
  left: 0px;
  z-index: 5;
  gap: 16px;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding-top: 16px;
  align-items: center;
  justify-content: center;
`;

export const StatusButton = styled.button<IProps>`
  border: none;
  background-color: var(--letter-color-1);
  border-radius: 5px;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: var(--letter-color-6);
`;

export const Arrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  top: 180px;
  left: 44px;
  z-index: 6;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 15px solid var(--letter-color-1);
`;
