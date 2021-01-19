import React, { useCallback, useState } from 'react';
import IEventDTO from '../../../../dtos/IEventDTO';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import dateToFormattedDate from '../../../../utils/dateToFormattedDate';
import Input from '../../../Input';
import SetTimeWindow from '../../../SetTimeWindow';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: Function;
  getEvent: Function;
  // eslint-disable-next-line react/require-default-props
  event?: IEventDTO;
}

const SetEventDate: React.FC<IProps> = ({
  event,
  getEvent,
  closeWindow,
}: IProps) => {
  const { addToast } = useToast();

  const [timeWindow, setTimeWindow] = useState(false);
  const [time, setTime] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      if (event !== undefined) {
        const day = `${updatedDate.split('')[0]}${updatedDate.split('')[1]}`;
        const month = `${updatedDate.split('')[2]}${updatedDate.split('')[3]}`;
        const year = `${updatedDate.split('')[4]}${updatedDate.split('')[5]}${
          updatedDate.split('')[6]
        }${updatedDate.split('')[7]}`;
        const hour = time.split(':')[0];
        const minute = time.split(':')[1];
        const date = new Date(
          `${Number(month)}/${Number(day)}/${Number(year)}`,
        );
        date.setHours(Number(hour));
        date.setMinutes(Number(minute));
        await api.put(`event/is-date-defined/${event.id}`, {
          isDateDefined: true,
          date,
        });

        getEvent();
        closeWindow();
        setTimeWindow(false);
      }

      addToast({
        type: 'success',
        title: 'Data Atualizada com sucesso',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao atualizar data do evento.',
      });
    }
  }, [addToast, closeWindow, event, getEvent, time, updatedDate]);

  const handleSetTime = useCallback(
    (props: string) => {
      setTime(props);
      handleSubmit();
    },
    [handleSubmit],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '30%',
        left: '10%',
        height: '30%',
        width: '80%',
      }}
    >
      {timeWindow && (
        <SetTimeWindow
          closeWindow={() => setTimeWindow(false)}
          setTime={(e: string) => handleSetTime(e)}
          containerStyle={{
            zIndex: 15,
            top: '30%',
            left: '10%',
            height: '30%',
            width: '80%',
          }}
          message="Defina o horário"
        />
      )}
      <Container>
        <h1>Defina a data</h1>

        {event !== undefined && (
          <Input
            pattern="\d*"
            onChange={e => setUpdatedDate(e.target.value)}
            mask="brlDateFormat"
            placeholder={dateToFormattedDate(String(event.date))}
            name="date"
            type="text"
            containerStyle={{
              width: '128px',
              height: '40px',
            }}
          />
        )}
        {updatedDate !== '' && (
          <button type="button" onClick={() => setTimeWindow(true)}>
            Salvar
          </button>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SetEventDate;
