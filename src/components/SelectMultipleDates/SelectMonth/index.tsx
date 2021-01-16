import React, { useCallback, useEffect, useState } from 'react';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import {
  Container,
  MonthContainer,
  BooleanButton,
  NextButton,
  PreviousButton,
} from './styles';

interface IProps {
  closeWindow: Function;
  selectMonth: Function;
  changeWindow: Function;
}

const SelectMonth: React.FC<IProps> = ({
  closeWindow,
  selectMonth,
  changeWindow,
}: IProps) => {
  const [january, setJanuary] = useState(false);
  const [february, setFebruary] = useState(false);
  const [march, setMarch] = useState(false);
  const [april, setApril] = useState(false);
  const [may, setMay] = useState(false);
  const [june, setJune] = useState(false);
  const [july, setJuly] = useState(false);
  const [august, setAugust] = useState(false);
  const [september, setSeptember] = useState(false);
  const [october, setOctober] = useState(false);
  const [november, setNovember] = useState(false);
  const [december, setDecember] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  useEffect(() => {
    if (
      january ||
      february ||
      march ||
      april ||
      may ||
      june ||
      july ||
      august ||
      september ||
      october ||
      november ||
      december
    ) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
  ]);

  const handleSelectMonth = useCallback(
    (props: string) => {
      selectMonth(props);
      props === '1' && setJanuary(!january);
      props === '2' && setFebruary(!february);
      props === '3' && setMarch(!march);
      props === '4' && setApril(!april);
      props === '5' && setMay(!may);
      props === '6' && setJune(!june);
      props === '7' && setJuly(!july);
      props === '8' && setAugust(!august);
      props === '9' && setSeptember(!september);
      props === '10' && setOctober(!october);
      props === '11' && setNovember(!november);
      props === '12' && setDecember(!december);
    },
    [
      selectMonth,
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
    ],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 30,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      <Container>
        <h2>Selecione os meses de interesse</h2>
        <MonthContainer>
          <BooleanButton
            isActive={january}
            type="button"
            onClick={() => handleSelectMonth('1')}
          >
            Janeiro
          </BooleanButton>
          <BooleanButton
            isActive={february}
            type="button"
            onClick={() => handleSelectMonth('2')}
          >
            Fevereiro
          </BooleanButton>
          <BooleanButton
            isActive={march}
            type="button"
            onClick={() => handleSelectMonth('3')}
          >
            Março
          </BooleanButton>
          <BooleanButton
            isActive={april}
            type="button"
            onClick={() => handleSelectMonth('4')}
          >
            Abril
          </BooleanButton>
          <BooleanButton
            isActive={may}
            type="button"
            onClick={() => handleSelectMonth('5')}
          >
            Maio
          </BooleanButton>
          <BooleanButton
            isActive={june}
            type="button"
            onClick={() => handleSelectMonth('6')}
          >
            Junho
          </BooleanButton>
          <BooleanButton
            isActive={july}
            type="button"
            onClick={() => handleSelectMonth('7')}
          >
            Julho
          </BooleanButton>
          <BooleanButton
            isActive={july}
            type="button"
            onClick={() => handleSelectMonth('8')}
          >
            Agosto
          </BooleanButton>
          <BooleanButton
            isActive={july}
            type="button"
            onClick={() => handleSelectMonth('9')}
          >
            Setembro
          </BooleanButton>
          <BooleanButton
            isActive={july}
            type="button"
            onClick={() => handleSelectMonth('10')}
          >
            Outubro
          </BooleanButton>
          <BooleanButton
            isActive={july}
            type="button"
            onClick={() => handleSelectMonth('11')}
          >
            Novembro
          </BooleanButton>
          <BooleanButton
            isActive={july}
            type="button"
            onClick={() => handleSelectMonth('12')}
          >
            Dezembro
          </BooleanButton>
        </MonthContainer>
        <footer>
          <PreviousButton type="button" onClick={() => changeWindow('Year')}>
            Anterior
          </PreviousButton>
          {nextButton && (
            <NextButton type="button" onClick={() => changeWindow('Weekday')}>
              Próximo
            </NextButton>
          )}
        </footer>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectMonth;
