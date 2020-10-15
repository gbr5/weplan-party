import styled, { css, keyframes } from 'styled-components';
import '../../styles/global';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position: relative;
  height: 100%;
`;

export const Content = styled.main`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  height: 100%;
`;

export const Modules = styled.section`
  background: transparent;
  width: 98%;
  transition: 0.5s;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  margin: 0 auto;

  border-bottom: 1px solid var(--primary-color);

  > button {
    background: transparent;
    border: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface IActivePropsDTO {
  isActive: boolean;
}

export const ModuleTitle = styled.div<IActivePropsDTO>`
  transition: 0.3s;
  height: 32px;
  animation: ${appearFromTop} 0.5s;

  &:hover {
    border-bottom: 1px solid var(--primary-color);

    > strong {
      color: var(--letter-color-2);
    }
  }

  > strong {
    color: var(--letter-color-4);
    font-size: 20px;
    line-height: 26px;
    transition: 0.3s;
    display: block;
  }

  ${props =>
    props.isActive &&
    css`
      border: none;
      border-bottom: 1px solid var(--title-color);
      transition: 0.25s;

      > strong {
        color: var(--primary-color);
      }

      &:hover {
        opacity: 0.8;

        > strong {
          color: var(--title-color);
        }
      }
    `}
`;

export const UpperPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  gap: 16px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    gap: 16px;
    width: 100%;
  }
`;

export const BottomPage = styled.div`
  position: fixed;
  bottom: 0;
  background: transparent;
  width: 100%;
  transition: 0.5s;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  margin: 24px auto 0;

  border-bottom: 1px solid var(--primary-color);

  > button {
    background: transparent;
    border: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MiddlePage = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`;
