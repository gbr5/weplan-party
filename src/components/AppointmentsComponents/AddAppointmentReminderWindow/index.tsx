import React, { useCallback, useState } from 'react';

import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';

import { Container, TypeButton, ButtonContainer, SaveButton } from './styles';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import SelectDate from '../../UserComponents/SelectDate';

interface IProps {
  closeWindow: Function;
  getAppointments: Function;
  appointment: IAppointmentDTO;
}

const AddAppointmentReminderWindow: React.FC<IProps> = ({
  closeWindow,
  getAppointments,
  appointment,
}: IProps) => {
  const { addToast } = useToast();
  const today = new Date();

  const [selectDateWindow, setSelectDateWindow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [reminderType, setReminderType] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      await api.post('appointment/reminders', {
        appointment_id: appointment.id,
        date: selectedDate,
        reminder_type: reminderType,
      });

      addToast({
        type: 'success',
        title: 'Compromisso criado com sucesso',
      });
      closeWindow();
      getAppointments();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar compromisso',
        description: 'Tente novamente!',
      });
      throw new Error(err);
    }
  }, [
    addToast,
    selectedDate,
    reminderType,
    closeWindow,
    appointment,
    getAppointments,
  ]);

  const handleReminderType = useCallback((e: string) => {
    setReminderType(e);
    setSelectDateWindow(true);
  }, []);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={closeWindow}
      containerStyle={{
        zIndex: 20,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      <Container>
        <h3>Definir lembrete</h3>
        {reminderType !== '' && selectedDate !== today ? (
          <SaveButton type="button" onClick={handleSubmit}>
            Salvar
          </SaveButton>
        ) : (
          <ButtonContainer>
            <TypeButton
              type="button"
              onClick={() => handleReminderType('email')}
            >
              e-mail
            </TypeButton>
            <TypeButton
              type="button"
              onClick={() => handleReminderType('whatsapp')}
            >
              Whatsapp
            </TypeButton>
            <TypeButton
              type="button"
              onClick={() => handleReminderType('notification')}
            >
              Notificação
            </TypeButton>
          </ButtonContainer>
        )}
      </Container>
      {selectDateWindow && (
        <SelectDate
          closeWindow={() => setSelectDateWindow(false)}
          selectDate={(e: Date) => setSelectedDate(e)}
        />
      )}
    </WindowUnFormattedContainer>
  );
};

export default AddAppointmentReminderWindow;
