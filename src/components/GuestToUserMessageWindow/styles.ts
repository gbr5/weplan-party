import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 26px;

  display: grid;
  grid-template-columns: 1fr 5fr;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

export const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: auto;

  > h2 {
    text-align: left;
    width: 200px;
    font-size: 16px;
    color: var(--letter-color-4);
  }
`;

export const Body = styled.div`
  display: flex;
  gap: 16px;
  margin-right: auto;

  > h2 {
    text-align: left;
    width: 200px;
    font-size: 16px;
    color: var(--letter-color-4);
  }
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: auto;

  > h2 {
    text-align: left;
    width: 200px;
    font-size: 16px;
    color: var(--letter-color-4);
  }
`;
