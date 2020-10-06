import styled from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

export const Container = styled.div`
  position: relative;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 5;

  width: 100%;
  padding: 16px 0;

  background: var(--header-background-color);
  box-shadow: var(--box-shadow);
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 72px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: var(--letter-color-2);
      width: 30px;
      height: 30px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  > img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: var(--letter-color-3);
    }

    a {
      text-decoration: none;
      color: var(--primary-color);
      transition: 0.25s;
    }

    a:hover {
      opacity: 0.7;
    }
  }
`;

export const Content = styled.main`
  position: relative;
  top: 72px;
  max-width: 1120px;
  margin: 64px auto 16px;
  display: flex;
`;

export const SubContent = styled.main`
  position: relative;
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    font-weight: bold;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 16px;
      background: var(--primary-color);
      margin: 0 8px;
    }
  }
`;

export const SecondSchedule = styled.div`
  display: flex;
  flex-direction: columns;
  width: 100%;

  gap: 80px;
  margin: 0 auto;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: var(--letter-color-2);
    display: flex;
    align-items: center;
    font-weight: bold;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 16px;
      background: var(--primary-color);
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: var(--letter-color-2);
    font-size: 20px;
  }

  div {
    background: var(--background-color);
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10px;
      content: '';
      background: var(--primary-color);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin: 24px;
      color: var(--letter-color-1);
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: var(--letter-color-2);

      svg {
        color: var(--primary-color);
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;
  width: 100%;

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    width: 80px;
    display: flex;
    align-items: center;
    color: var(--letter-color-3);

    svg {
      color: var(--primary-color);
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: var(--letter-color-4);
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin: 24px;
      color: var(--letter-color-1);
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 50%;

  .DayPicker {
    background: var(--background-color);
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker {
    width: 100%;
  }

  .DayPicker-Month {
    width: 90%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: var(--letter-color-4);
    border-radius: 10px;
    color: var(--letter-color-1);
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: var(--primary-color) !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
