import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 24px 16px 8px 16px;
  border-radius: 5px;
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  top: -8px;
  z-index: 5;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const SubContainer = styled.div`
  position: relative;
  background-color: var(--letter-color-1);
  padding: 8px 8px 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 8px;
  padding-top: 8px;
  min-height: 56px;
  width: 100%;
`;

export const Button = styled.button`
  position: relative;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  padding: 8px 8px 0;
  border-radius: 8px;
  border: none;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  min-height: 56px;
  width: 100%;
`;

export const Label = styled.p`
  position: absolute;
  top: 4px;
  left: 8px;
  font-size: 14px;
  color: var(--letter-color-4);
  font-weight: bold;
`;

export const Amount = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
  text-align: center;
  flex: 1;
  padding: 0 16px;
  width: 100%;
  margin-top: 12px;
`;
