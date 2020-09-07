import styled, { css } from 'styled-components';
import '../../styles/global';
import { shade } from 'polished';

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
`;

export const EventPageContent = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  padding-right: 80px;
  gap: 80px;
`;

export const SideBar = styled.div`
  margin: 0;
  background: var(--header-background-color);
  width: 22%;
  min-width: 220px;
  height: 100%;
  padding: 86px 16px 11px;
  display: flex;
  flex-direction: column;

  > button {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 16px;
    color: var(--letter-color-2);
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;
    justify-content: left;
    position: relative;

    > h1 {
      left: 0;
      font-size: 20px;
      color: var(--primary-color);
      margin: 8px 0 4px;
      opacity: 0.9;
    }

    svg {
      position: absolute;
      color: var(--primary-color);
      right: 0;
      margin: 6px 0 4px;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 16px;
    margin-bottom: 8px;

    > button {
      margin-top: 8px;
      margin-bottom: 8px;
      font-size: 16px;
      border: none;
      background: transparent;

      &:hover {
        opacity: 0.8;
      }
      h2 {
        font-size: 18px;
        color: var(--letter-color-3);
      }

      h3 {
        font-size: 18px;
        color: var(--letter-color-2);
      }
    }

    p {
      margin-right: auto;
      margin-top: 8px;
      margin-top: 4px;
      font-size: 16px;
      color: var(--letter-color-2);
    }
  }
`;

export const MyEvents = styled.button`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: var(--primary-color);

  img {
    width: 176px;
    height: 176px;
    border-radius: 50%;
  }
`;

export const MyEventsDrawer = styled.div`
  top: 40px;
  z-index: 1000;
  left: 0px;
  position: absolute;
  height: 300px;
  width: 500px;
  background-color: var(--card-color);
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  overflow-y: scroll;

  > button {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;
    position: relative;

    > span {
      > svg {
        top: 13px;
        margin: auto;
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
    svg {
      margin-left: auto;
    }
  }
`;

export const MyEventsDrawerButton = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);

    &:hover {
      opacity: 0.6;
    }
  }

  > span {
    > svg {
      top: 0;
      margin: auto;
    }
  }
`;

export const EventInfoDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 110px;
  left: 400px;
  width: 600px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;
  gap: 16px;

  span {
    position: absolute;
    top: 0;
    right: 8px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 16px;
      > input {
        height: 40px;
        width: 100%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
      }
    }
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 32px;
  gap: 32px;
`;

export const SubHeader = styled.div`
  margin: 60px auto 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: auto;
    font-size: 24px;
    color: var(--letter-color-3);
    margin-bottom: 16px;

    > button {
      background: transparent;
      border: none;
      margin-left: 32px;
      color: var(--title-color);
    }
  }
`;

export const EditEventNameDrawer = styled.div`
  top: 140px;
  left: 535px;
  z-index: 100;
  position: absolute;
  height: 178px;
  width: 400px;
  background-color: var(--card-color);
  opacity: 0.95;
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
    }

    input {
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      width: 300px;
      height: 32px;
    }

    button {
      margin-left: auto;
      margin-top: 16px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
      border: none;

      > h3 {
        color: var(--title-color);
        font-size: 16px;
      }

      &:hover {
        border: 1px solid var(--title-color);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const EditEventNameCloseButton = styled.button`
  position: absolute;
  top: 115px;
  right: 391px;
  background: transparent;
  border: none;

  > svg {
    color: red;
  }
`;

export const FirstRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  gap: 80px;

  div {
    display: flex;
    width: 130px;
    height: 130px;
    border: 3px solid var(--primary-color);
    background: var(--header-background-color);
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;

      &:hover {
        opacity: 0.8;
      }

      h2 {
        font-size: 16px;
        color: var(--title-color);
        margin-bottom: 8px;
      }

      p {
        font-size: 16px;
        color: var(--letter-color-3);
      }
    }
  }
`;

export const BudgetDrawer = styled.div`
  top: 240px;
  left: 435px;
  z-index: 100;
  position: absolute;
  height: 178px;
  width: 300px;
  background-color: var(--card-color);
  opacity: 0.95;
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
    }

    input {
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      height: 32px;
    }

    button {
      margin-left: auto;
      margin-top: 16px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
      border: none;

      > h3 {
        color: var(--title-color);
        font-size: 16px;
      }

      &:hover {
        border: 1px solid var(--title-color);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const BudgetCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  color: red;
`;

export const Appointments = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 32px;
`;

export const NextAppointment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 10px 5px rgba(100, 50, 50, 0.3);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    > p {
      font-size: 16px;
      color: var(--letter-color-2);
    }

    > div {
      display: flex;
      align-items: flex-start;
      gap: 16px;

      > h1 {
        font-size: 18px;
        color: var(--title-color);
      }

      > span {
        font-size: 16px;
        color: var(--letter-color-1);
      }
    }
  }
`;

export const MyAppointments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > button {
    right: 0;
    position: absolute;
    background: transparent;
    border: none;
    color: var(--title-color);
  }

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Appointment = styled.div`
  width: 100%;
  margin-bottom: 8px;

  > p {
    font-size: 16px;
    color: var(--letter-color-2);
  }

  > div {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 8px;

    > h1 {
      font-size: 18px;
      color: var(--title-color);
    }

    > span {
      margin-left: auto;
      font-size: 16px;
      color: var(--letter-color-1);
    }
  }
`;

export const AddAppointmentDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 5%;
  left: 2%;
  width: 96%;
  height: 85%;
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 2fr 1fr; */
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 32px;

    > span {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;

      > div {
        display: flex;

        > button {
          height: 40px;
          width: 90%;
          border-radius: 4px;
          padding: 0 16px;
          border: none;
          margin: 16px;
        }
      }
    }

    > div {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;

      > h1 {
        font-size: 24px;
        color: var(--title-color);
        margin-bottom: 40px;
      }

      > button {
        height: 40px;
        width: 90%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
        margin: 16px;
      }

      span {
        position: absolute;
        top: 4px;
        right: 4px;
        > button {
          background: transparent;
          border: none;

          svg {
            color: red;
          }
        }
      }
      /*
      > input {
        height: 40px;
        width: 90%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
        margin: 16px;
      } */

      > p {
        margin-top: 32px;
        font-size: 20px;
        color: var(--primary-color);
      }

      div {
        display: flex;
        gap: 16px;
        margin-right: 16px;

        > input {
          height: 40px;
          width: 90%;
          border-radius: 4px;
          padding: 0 16px;
          border: none;
          margin: 16px;
        }
      }
    }
  }

  > button {
    margin-top: 16px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const SupplierSection = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  background: var(--header-background-color);
  border: none;
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    > h1 {
      position: absolute;
      top: 24px;
      left: 24px;
      font-size: 24px;
      color: var(--title-color);
    }

    > button {
      position: absolute;
      top: 0;
      right: 8px;
      background: transparent;
      border: none;
    }
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 32px;
    width: 100%;
    gap: 32px;

    button {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-radius: 8px;
      background: var(--letter-color-3);
      height: 80px;
      padding: 32px auto;
      gap: 16px;
      box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
      transition: 0.6s;

      > img {
        margin-left: 14px;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
        transition: 0.6s;

        &:hover {
          box-shadow: 5px 5px 6px 2px rgba(255, 150, 10, 0.4);
        }
      }

      > h1 {
        font-size: 20px;
        color: var(--letter-color-5);
      }

      svg {
        color: var(--primary-color);
      }

      &:hover {
        box-shadow: 4px 4px 6px 2px rgba(255, 150, 10, 0.3);
        opacity: 0.8;
      }
    }
  }
`;

export const SelectedSuppliers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;

  > button {
    background: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    color: var(--title-color);
  }

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const HiredSuppliers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > button {
    background: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    color: var(--title-color);
  }

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Supplier = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > h1 {
    font-size: 18px;
    color: var(--title-color);
  }

  > svg {
    margin-left: auto;
  }
`;

export const AddSupplierDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 150px;
  left: 400px;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  span {
    position: absolute;
    top: 2px;
    right: 4px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > input {
    height: 40px;
    width: 90%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 90%;
    border-radius: 4px;
  }
`;

export const GuestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;

  > span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    > button {
      font-size: 32px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;

      > svg {
        color: var(--primary-color);
      }
    }
  }

  > div {
    width: 100%;
    height: 500px;
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 8px;
    background: var(--card-color);
    border-radius: 8px;
  }
`;

interface ButtonProps {
  myGuestActive: boolean;
}

export const GuestNavigationButton = styled.button<ButtonProps>`
  font-size: 32px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }
  > svg {
    color: var(--primary-color);
  }

  ${props =>
    props.myGuestActive &&
    css`
      color: var(--title-color);
      opacity: 1;
    `}
`;

export const Guest = styled.div`
  width: 100%;
  padding: 8px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 4px;
  transition: 0.3s;

  &:hover {
    box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    > p {
      color: var(--primary-color);
      font-size: 16px;
      margin-left: 8px;
    }

    > button {
      background: transparent;
      border: none;
      font-size: 16px;
      color: var(--title-color);
      margin-right: auto;
      transition: 0.3s;

      &:hover {
        opacity: 0.8;
        color: var(--primary-color);
      }

      > strong {
        font-weight: 500;
      }
    }
  }

  > button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    margin: 0 auto;
    transition: 0.3s;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    transition: 0.3s;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--title-color);
    }
  }
`;

export const AddGuestDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 5%;
  left: 20%;
  width: 60%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  span {
    position: absolute;
    top: 2px;
    right: 4px;

    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 32px;
    margin-bottom: 32px;
    color: var(--title-color);
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    width: 100%;
    margin-bottom: 16px;

    > button {
      height: 40px;
      width: 100%;
      border-radius: 4px;
      padding: 0 16px;
      border: none;
      transition: 0.3s;

      &:hover {
        opacity: 0.8;
        box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
      }
    }

    > h1 {
      > button {
        background: transparent;
        border: none;
        color: var(--primary-color);
        font-size: 24px;
        font-weight: 500;
        transition: 0.3s;

        &:hover {
          opacity: 0.8;
          box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
        }
      }
    }
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 90%;
    border-radius: 4px;
    margin-bottom: 16px;
    transition: 0.3s;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }
  }
`;

export const CheckList = styled.section`
  height: 100%;
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 1px 1px 5px 4px rgba(90, 90, 90, 0.02);
  position: relative;

  > button {
    right: 16px;
    top: 16px;
    position: absolute;
    background: transparent;
    border: none;
    color: var(--title-color);
  }

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 16px;
    display: flex;
    grid-template-columns: 4fr 16fr 1fr;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      margin-right: auto;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const AddCheckListDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 150px;
  left: 400px;
  width: 600px;
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  span {
    position: absolute;
    top: 2px;
    right: 4px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > input {
    height: 40px;
    width: 90%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 90%;
    border-radius: 4px;
  }
`;

export const Financial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  box-sizing: border-box;

  img {
    width: 100%;
    border-radius: 8px;
  }
`;

export const LatestNews = styled.div`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  height: 300px;
  box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
  flex: 1;
  align-items: center;

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 12px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    h3 {
      color: var(--title-color);
    }

    span {
      margin-left: 4px;
      color: var(--primary-color);
    }
    p {
      margin-right: auto;
      margin-left: 16px;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const Payments = styled.section`
  background: var(--header-background-color);
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 1px 1px 5px 4px rgba(90, 90, 90, 0.02);

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      margin-right: auto;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const MessagesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1px;
`;

export const UsersChat = styled.div`
  display: grid;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    > h1 {
      width: 100%;
      margin-top: 3px;
      font-size: 24px;
      color: var(--primary-color);
      border-bottom: 1px solid var(--letter-color-2);
      padding-bottom: 8px;
    }
  }
`;

export const UserChat = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > h1 {
    font-size: 18px;
    color: var(--title-color);
  }

  > svg {
    margin-left: auto;
  }
`;

export const ChatMessages = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    > span {
      width: 100%;

      > button {
        margin-right: auto;
        background: transparent;
        border: none;

        > h1 {
          width: 100%;
          font-size: 24px;
          color: var(--primary-color);
          border-bottom: 1px solid var(--letter-color-2);
          padding-bottom: 8px;
        }
      }
    }

    button {
      width: 100%;
      height: 40px;
      background-color: var(--primary-color);
      opacity: 0.9;
      border: none;
      border-radius: 4px;
    }

    input {
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
      background-color: var(--letter-color-4);
      color: var(--letter-color-2);
    }
  }
`;

export const Messages = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > p {
    font-size: 16px;
    color: var(--letter-color-1);
    margin-right: 16px;
  }
  > p + p {
    margin-left: auto;
  }
  > span {
    margin-right: 16px;
    color: var(--letter-color-3);
  }
`;

export const WeplanGuestDrawer = styled.div`
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 0;
  width: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const GuestConfirmedDrawer = styled.div`
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 0;
  width: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const WeplanSupplierAppointmentDrawer = styled.div`
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 0;
  width: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const AppointmentTypeDrawer = styled.div`
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 0;
  width: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 100%;
  height: 30%;

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

export const CheckedListItemDrawer = styled.div`
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 0;
  width: 200px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const IsHiredDrawer = styled.div`
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 0;
  width: 200px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const AddPlannerDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 110px;
  left: 400px;
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;
  gap: 16px;

  span {
    position: absolute;
    top: 0;
    right: 8px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin-bottom: 32px;
  }

  button {
    margin-top: 24px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;

export const AddOwnerDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 110px;
  left: 400px;
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;
  gap: 16px;

  span {
    position: absolute;
    top: 0;
    right: 8px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin-bottom: 32px;
  }

  button {
    margin-top: 24px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;

export const AddMemberDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 110px;
  left: 400px;
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;
  gap: 16px;

  span {
    position: absolute;
    top: 0;
    right: 8px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin-bottom: 32px;
  }

  button {
    margin-top: 24px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;

export const MembersWindow = styled.div`
  position: fixed;
  z-index: 10;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-rows: 1fr 5fr;
  background: var(--header-background-color);
  border: none;
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    > h1 {
      position: absolute;
      top: 24px;
      left: 24px;
      font-size: 24px;
      color: var(--title-color);
    }

    > button {
      position: absolute;
      top: 0;
      right: 8px;
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 32px;
        color: var(--primary-color);
      }

      strong {
        font-size: 32px;
        color: var(--title-color);
      }
    }
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 32px;
    width: 100%;
    gap: 32px;

    button {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-radius: 8px;
      background: var(--letter-color-3);
      height: 100px;
      padding: 32px auto;
      gap: 16px;
      box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
      transition: 0.6s;

      > img {
        margin-left: 14px;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
        transition: 0.6s;

        &:hover {
          box-shadow: 5px 5px 6px 2px rgba(255, 150, 10, 0.4);
        }
      }

      > h1 {
        font-size: 24px;
        color: var(--letter-color-5);
      }

      &:hover {
        box-shadow: 4px 4px 6px 2px rgba(255, 150, 10, 0.3);
        opacity: 0.8;
      }
    }
  }
`;

export const FriendsList = styled.div`
  top: 20%;
  z-index: 100000;
  left: 30%;
  position: fixed;
  height: 60%;
  width: 40%;
  background-color: var(--background-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 24px;
  overflow-y: scroll;

  > span {
    position: absolute;
    top: 4px;
    right: 4px;

    button {
      background: transparent;
      border: none;
      color: red;
    }
  }

  > button {
    background-color: var(--primary-color);
    display: flex;
    justify-content: center;
    color: var(--letter-color-1);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);

    > span {
      > svg {
        top: 13px;
        margin: auto;
      }
    }

    &:hover {
      opacity: 0.8;
      box-shadow: 2px 2px 5px 3px rgba(255, 150, 10, 0.3);
    }
    svg {
      margin-left: auto;
    }
  }
`;
