import styled from 'styled-components';

export const Container = styled.div`
  display: inline-flexbox;
  align-items: stretch;
  justify-content: stretch;
  /* width: 100%; */
  height: 54px;

  overflow-x: scroll;

  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    height: 40px;
    padding: 0 4vw;

    font-size: 14px;
    font-weight: 400;

    @media (max-width: 1000px) {
      font-size: 14px;
      /* width: 100%; */
    }
  }

  strong + strong {
    border-left: 1px solid var(--primary-color);
  }
`;
