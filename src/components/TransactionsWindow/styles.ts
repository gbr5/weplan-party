import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 600px;
  box-sizing: border-box;
  overflow-y: scroll;

  > h3 {
    margin: 8px auto 24px;
    font-size: 18px;
    color: var(--title-color);
    border-bottom: 1px solid var(--primary-color);
  }

  > div {
    border-bottom: 1px solid var(--letter-color-4);
    padding-bottom: 8px;
  }
`;
