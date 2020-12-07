import React, {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdFileDownload, MdFileUpload } from 'react-icons/md';

import WindowContainer from '../WindowContainer';

import guestListImage from '../../assets/guestList_0.svg';
import guestListImage1 from '../../assets/guestList_1.svg';
import guestListImage2 from '../../assets/guestList_2.svg';
import guestListImage3 from '../../assets/guestList_3.svg';
import guestListImage4 from '../../assets/guestList_4.svg';
import logo from '../../assets/weplan.svg';

import {
  BackButton,
  JumpButton,
  PageContainer,
  MenuButtonContainer,
  NextButton,
  BodyContainer,
} from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  eventId: string;
  myAvailableNumberOfGuests: number;
  handleCloseWindow: Function;
}

const AddEventGuestListWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  eventId,
  myAvailableNumberOfGuests,
  handleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();

  const [firstWindow, setFirstWindow] = useState(true);
  const [secondWindow, setSecondWindow] = useState(false);
  const [thirdWindow, setThirdWindow] = useState(false);
  const [fourthWindow, setFourthWindow] = useState(false);
  const [fifthWindow, setFifthWindow] = useState(false);
  const [sixthWindow, setSixthWindow] = useState(false);

  const closeAllWindows = useCallback(() => {
    setFirstWindow(false);
    setSecondWindow(false);
    setThirdWindow(false);
    setFourthWindow(false);
    setFifthWindow(false);
    setSixthWindow(false);
  }, []);

  const handleNextWindow = useCallback(
    (props: number) => {
      if (props === 1) {
        closeAllWindows();
        setSecondWindow(true);
      }
      if (props === 2) {
        closeAllWindows();
        setThirdWindow(true);
      }
      if (props === 3) {
        closeAllWindows();
        setFourthWindow(true);
      }
      if (props === 4) {
        closeAllWindows();
        setFifthWindow(true);
      }
      if (props === 5) {
        closeAllWindows();
        setSixthWindow(true);
      }
    },
    [closeAllWindows],
  );

  const handlePreviousWindow = useCallback(
    (props: number) => {
      if (props === 6) {
        closeAllWindows();
        setFifthWindow(true);
      }
      if (props === 5) {
        closeAllWindows();
        setFourthWindow(true);
      }
      if (props === 4) {
        closeAllWindows();
        setThirdWindow(true);
      }
      if (props === 3) {
        closeAllWindows();
        setSecondWindow(true);
      }
      if (props === 2) {
        closeAllWindows();
        setFirstWindow(true);
      }
    },
    [closeAllWindows],
  );

  const handleGuestListUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        if (e.target.files) {
          const data = new FormData();

          data.append('file', e.target.files[0]);
          await api.post(
            `events/${eventId}/guests/import/${myAvailableNumberOfGuests}`,
            data,
          );
        }
        handleCloseWindow();
        return addToast({
          type: 'success',
          title: 'Convidados criados com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar convidado',
          description: 'Erro ao criar o convidado, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, eventId, myAvailableNumberOfGuests, handleCloseWindow],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 100,
        top: '5%',
        left: '10%',
        height: '90%',
        width: '80%',
      }}
    >
      {!!firstWindow && (
        <PageContainer>
          <MenuButtonContainer>
            <a href="https://weplan-user.s3.amazonaws.com/planilha_de_convidados_WePlan-Exemplo.csv">
              modelo.csv
              <MdFileDownload size={60} />
            </a>
            <JumpButton type="button" onClick={() => handleNextWindow(5)}>
              Pular
            </JumpButton>
            <NextButton type="button" onClick={() => handleNextWindow(1)}>
              <FiChevronRight size={40} />
            </NextButton>
          </MenuButtonContainer>
          <img src={guestListImage} alt="GuestList" />
        </PageContainer>
      )}
      {!!secondWindow && (
        <PageContainer>
          <MenuButtonContainer>
            <a href="https://weplan-user.s3.amazonaws.com/planilha_de_convidados_WePlan-Exemplo.csv">
              modelo.csv
              <MdFileDownload size={60} />
            </a>
            <BackButton type="button" onClick={() => handlePreviousWindow(2)}>
              <FiChevronLeft size={40} />
            </BackButton>
            <JumpButton type="button" onClick={() => handleNextWindow(5)}>
              Pular
            </JumpButton>
            <NextButton type="button" onClick={() => handleNextWindow(2)}>
              <FiChevronRight size={40} />
            </NextButton>
          </MenuButtonContainer>
          <img src={guestListImage1} alt="GuestList1" />
        </PageContainer>
      )}
      {!!thirdWindow && (
        <PageContainer>
          <MenuButtonContainer>
            <a href="https://weplan-user.s3.amazonaws.com/planilha_de_convidados_WePlan-Exemplo.csv">
              modelo.csv
              <MdFileDownload size={60} />
            </a>
            <BackButton type="button" onClick={() => handlePreviousWindow(3)}>
              <FiChevronLeft size={40} />
            </BackButton>
            <JumpButton type="button" onClick={() => handleNextWindow(5)}>
              Pular
            </JumpButton>
            <NextButton type="button" onClick={() => handleNextWindow(3)}>
              <FiChevronRight size={40} />
            </NextButton>
          </MenuButtonContainer>
          <img src={guestListImage2} alt="GuestList2" />
        </PageContainer>
      )}
      {!!fourthWindow && (
        <PageContainer>
          <MenuButtonContainer>
            <a href="https://weplan-user.s3.amazonaws.com/planilha_de_convidados_WePlan-Exemplo.csv">
              modelo.csv
              <MdFileDownload size={60} />
            </a>
            <BackButton type="button" onClick={() => handlePreviousWindow(4)}>
              <FiChevronLeft size={40} />
            </BackButton>
            <JumpButton type="button" onClick={() => handleNextWindow(5)}>
              Pular
            </JumpButton>
            <NextButton type="button" onClick={() => handleNextWindow(4)}>
              <FiChevronRight size={40} />
            </NextButton>
          </MenuButtonContainer>
          <img src={guestListImage3} alt="GuestList3" />
        </PageContainer>
      )}
      {!!fifthWindow && (
        <PageContainer>
          <MenuButtonContainer>
            <a href="https://weplan-user.s3.amazonaws.com/planilha_de_convidados_WePlan-Exemplo.csv">
              modelo.csv
              <MdFileDownload size={60} />
            </a>
            <BackButton type="button" onClick={() => handlePreviousWindow(5)}>
              <FiChevronLeft size={40} />
            </BackButton>
            <JumpButton type="button" onClick={() => handleNextWindow(5)}>
              Pular
            </JumpButton>
            <NextButton type="button" onClick={() => handleNextWindow(5)}>
              <FiChevronRight size={40} />
            </NextButton>
          </MenuButtonContainer>
          <img src={guestListImage4} alt="GuestList4" />
        </PageContainer>
      )}
      {!!sixthWindow && (
        <PageContainer>
          <MenuButtonContainer>
            <a href="https://weplan-user.s3.amazonaws.com/planilha_de_convidados_WePlan-Exemplo.csv">
              modelo.csv
              <MdFileDownload size={60} />
            </a>
            <BackButton type="button" onClick={() => handlePreviousWindow(6)}>
              <FiChevronLeft size={40} />
            </BackButton>
          </MenuButtonContainer>
          <BodyContainer>
            <div>
              <img src={logo} alt="WePlan" />
              <h1>Escolha o arquivo</h1>
              <p>
                Você pode adicionar até {myAvailableNumberOfGuests} convidados
              </p>
            </div>
            <label htmlFor="file">
              Upload
              <MdFileUpload size={30} />
              <input type="file" id="file" onChange={handleGuestListUpload} />
            </label>
          </BodyContainer>
        </PageContainer>
      )}
    </WindowContainer>
  );
};

export default AddEventGuestListWindow;
