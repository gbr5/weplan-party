import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 54px;
  padding: 1vh 0;

  overflow-x: scroll;

  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;

    font-size: 14px;
    font-weight: 400;

    @media (max-width: 1000px) {
      font-size: 12px;
      width: 100%;
    }
  }

  strong + strong {
    border-left: 1px solid var(--primary-color);
  }
`;
