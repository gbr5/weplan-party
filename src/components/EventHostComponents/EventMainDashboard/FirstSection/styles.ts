import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;
export const Container = styled.div`
  /* padding: 2rem; */
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  justify-content: stretch;
  gap: 1vh;
  animation: ${appearFromTop} 0.5s;

  @media (max-width: 1000px) {
    display: block;
  }

  img {
    width: 300px;
    height: 300px;
    margin: auto;

    @media (max-width: 1000px) {
      margin-top: 2px;
      width: 100%;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  /* top: 16px; */
  width: 186px;
  margin: 0 auto 32px;
  z-index: 3;
  align-self: center;

  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
    box-shadow: var(--box-shadow);
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--primary-color);
    border-radius: 50%;
    bottom: 0;
    right: 1%;
    border: none;
    transition: background-color 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
      color: var(--letter-color-4);
    }

    &:hover {
      background-color: ${shade(0.3, '#ff9000')};
    }
  }
`;

export const EventSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: 2vh;
  height: 100%;

  h1 {
    border-bottom: 1px solid var(--title-color);
    width: 100%;
    text-align: center;
    margin: 2vh auto 4vh;
  }

  span {
    display: flex;
    gap: 2vh;
    width: 100%;

    p {
      width: 100%;
      font-size: 14px;
    }
  }

  @media (max-width: 1000px) {
    margin: 1vh auto 2vh;
    padding: 0;
    border-bottom: 1px solid var(--secondary-color);
  }
`;

export const InsideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  width: 100%;

  span {
    display: flex;
    grid-template-columns: 2fr 3fr;
    align-items: left;
    justify-content: left;
    gap: 2vh;
    width: 100%;
    padding: 0 1vh;

    p {
      text-align: left;
      font-size: 14px;
      width: 100%;
    }
  }
`;

export const PublishedButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 4px;
  border: var(--title-color);
  box-shadow: var(--box-shadow);
  color: var(--title-color);

  &:hover {
    background: var(--primary-color);
    color: var(--secondary-color);
    border: var(--primary-color);
    box-shadow: var(--box-shadow);
  }
`;
export const EditButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--title-color);
  border: none;
  width: 40px;
  border-radius: 4px;
  padding: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

export const EventInfoSection = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding: 1vh;
  overflow-y: scroll;

  h1 {
    border-bottom: 1px solid var(--title-color);
    width: 100%;
    text-align: center;
    margin: 2vh auto 4vh;
  }

  span {
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: stretch;
    justify-content: stretch;
    gap: 2vh;
    margin: 2vh auto;

    p {
      font-size: 14px;
    }
  }

  @media (max-width: 1000px) {
    margin: 1vh auto 2vh;
    padding: 0;
    border-bottom: 1px solid var(--secondary-color);
  }
`;
