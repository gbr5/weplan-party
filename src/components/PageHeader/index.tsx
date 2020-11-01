import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import Swicth from 'react-switch';
import { ThemeContext } from 'styled-components';
import { differenceInCalendarDays, setMinutes } from 'date-fns';
import 'react-day-picker/lib/style.css';
import DayPicker from 'react-day-picker';
import * as Yup from 'yup';

import { useHistory, Link } from 'react-router-dom';
import { MdAdd, MdHelp, MdSchedule } from 'react-icons/md';
import { FiSettings, FiPower } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  Header,
  HeaderContent,
  Profile,
  Menu,
  AppointmentTypeDrawer,
  Calendar,
  AddAppointmentDrawer,
  MyAppointments,
  Appointment,
  ToggleButton,
} from './styles';
import { useToggleTheme } from '../../hooks/theme';

import profileImg from '../../assets/avatar_placeholder.jpg';
import logo from '../../assets/weplan.svg';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../Input';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import WindowContainer from '../WindowContainer';
import MenuButton from '../MenuButton';

interface ICreateAppointment {
  subject: string;
  duration_minutes: number;
  address: string;
  start_hour: number;
  start_minute: number;
  weplanGuest: boolean;
  appointment_type: string;
}
interface IAppointmentDTO {
  id: string;
  subject: string;
  duration_minutes: number;
  address: string;
  date: string;
  start_hour: number;
  start_minute: number;
  days_till_date: number;
  weplanGuest: boolean;
  appointment_type: string;
}

const PageHeader: React.FC = ({ children }) => {
  const { colors } = useContext(ThemeContext);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [appointmentsWindow, setAppointmentsWindow] = useState(false);
  const [appointments, setAppointments] = useState<IAppointmentDTO[]>([]);
  const [appointment, setAppointment] = useState<IAppointmentDTO>(
    {} as IAppointmentDTO,
  );
  const [editAppointmentDrawer, setEditAppointmentDrawer] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointmentTypeDrawer, setAppointmentTypeDrawer] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');
  const [addAppointmentDrawer, setAddAppointmentDrawer] = useState(false);
  const [helpWindow, setHelpWindow] = useState(false);
  const [settingsWindow, setSettingsWindow] = useState(false);

  const { signOut, user } = useAuth();
  const { toggleTheme, themeBoolean } = useToggleTheme();
  const history = useHistory();

  const closeAllWindows = useCallback(() => {
    setAppointmentsWindow(false);
    setHelpWindow(false);
    setSettingsWindow(false);
  }, []);

  const handleAppointmentTypeQuestion = useCallback(
    (appointment_type: string) => {
      if (appointment_type === 'Comercial') {
        setAppointmentType('Comercial');
      } else {
        setAppointmentType('Técnico');
      }
      return setAppointmentTypeDrawer(false);
    },
    [],
  );

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);
  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  const handleAppointmentsWindow = useCallback(() => {
    closeAllWindows();
    setAppointmentsWindow(true);
  }, [closeAllWindows]);

  const handleHelpWindow = useCallback(() => {
    closeAllWindows();
    setHelpWindow(!helpWindow);
  }, [closeAllWindows, helpWindow]);

  const handleSettingsWindow = useCallback(() => {
    closeAllWindows();
    setSettingsWindow(!settingsWindow);
  }, [closeAllWindows, settingsWindow]);

  const handleAppointmentTypeDrawer = useCallback(() => {
    setAppointmentTypeDrawer(!appointmentTypeDrawer);
  }, [appointmentTypeDrawer]);
  const handleEditAppointmentDrawer = useCallback(
    props => {
      closeAllWindows();
      setEditAppointmentDrawer(true);
      setAppointment(props);
    },
    [closeAllWindows],
  );
  const handleAddAppointmentDrawer = useCallback(() => {
    console.log(currentMonth);
    closeAllWindows();
    setAddAppointmentDrawer(!addAppointmentDrawer);
  }, [addAppointmentDrawer, closeAllWindows, currentMonth]);

  const handleGetAppointments = useCallback(() => {
    try {
      api
        .get<IAppointmentDTO[]>(`appointments/my-appointments`)
        .then(response =>
          setAppointments(
            response.data.map(ap => {
              const date = new Date(ap.date);
              const tillMinutes =
                setMinutes(date, ap.duration_minutes).getMinutes() < 10
                  ? `0${date.getMinutes()}`
                  : date.getMinutes();
              const tillHour =
                setMinutes(date, ap.duration_minutes).getHours() < 10
                  ? `0${date.getHours()}`
                  : date.getHours();
              const year = date.getFullYear();
              const month =
                date.getMonth() < 9
                  ? `0${date.getMonth() + 1}`
                  : date.getMonth() + 1;
              const day =
                date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
              const hour =
                date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
              const minute =
                date.getMinutes() < 10
                  ? `0${date.getMinutes()}`
                  : date.getMinutes();
              return {
                id: ap.id,
                subject: ap.subject,
                duration_minutes: ap.duration_minutes,
                address: ap.address,
                date: `${hour}:${minute} às ${tillHour}:${tillMinutes} | ${day}/${month}/${year}`,
                start_hour: Number(hour),
                start_minute: Number(minute),
                days_till_date: differenceInCalendarDays(date, new Date()),
                weplanGuest: ap.weplanGuest,
                appointment_type: ap.appointment_type,
              };
            }),
          ),
        );
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const handleAddAppointment = useCallback(
    async (data: ICreateAppointment) => {
      try {
        formRef.current?.setErrors([]);
        const date = new Date(selectedDate);

        date.setHours(Number(data.start_hour));
        date.setMinutes(Number(data.start_minute));

        const schema = Yup.object().shape({
          subject: Yup.string().required('Assunto é obrigatório'),
          duration_minutes: Yup.number(),
          address: Yup.string(),
          start_hour: Yup.number().required(),
          start_minute: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`/appointments`, {
          subject: data.subject,
          date,
          duration_minutes: Number(data.duration_minutes),
          address: data.address,
          weplanGuest: false,
          appointment_type: appointmentType,
        });

        addToast({
          type: 'success',
          title: 'Agendamento Criado com Sucesso',
          description:
            'Você já pode visualizar no seu dashboard de agendamentos.',
        });

        handleAddAppointmentDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar agendamento',
          description: 'Erro  ao criar o agendamento, tente novamente.',
        });
      }
    },
    [addToast, handleAddAppointmentDrawer, appointmentType, selectedDate],
  );

  const handleEditAppointment = useCallback(
    async (data: ICreateAppointment) => {
      try {
        formRef.current?.setErrors([]);
        const date = new Date(selectedDate);

        date.setHours(Number(data.start_hour));
        date.setMinutes(Number(data.start_minute));

        const schema = Yup.object().shape({
          subject: Yup.string().required('Assunto é obrigatório'),
          duration_minutes: Yup.number(),
          address: Yup.string(),
          start_hour: Yup.number().required(),
          start_minute: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (appointmentType === '') {
          return handleAppointmentTypeDrawer();
        }

        await api.put(`/appointments/${appointment.id}`, {
          subject: data.subject,
          date,
          duration_minutes: Number(data.duration_minutes),
          address: data.address,
          appointment_type: appointmentType,
          weplanGuest: false,
        });

        addToast({
          type: 'success',
          title: 'Agendamento Criado com Sucesso',
          description:
            'Você já pode visualizar no seu dashboard de agendamentos.',
        });

        setEditAppointmentDrawer(false);
        setAppointmentType('');
        handleGetAppointments();
        return date;
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar agendamento',
          description: 'Erro  ao criar o agendamento, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      handleGetAppointments,
      appointmentType,
      selectedDate,
      appointment.id,
      handleAppointmentTypeDrawer,
    ],
  );

  const handleDeleteAppointment = useCallback(async () => {
    try {
      await api.delete(`appointments/${appointment.id}`);

      addToast({
        type: 'success',
        title: 'Compromisso deletado com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setEditAppointmentDrawer(false);
      setAppointmentType('');
      handleGetAppointments();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar compromisso',
        description: 'Erro ao deletar o compromisso, tente novamente.',
      });

      throw new Error(err);
    }
  }, [addToast, appointment.id, handleGetAppointments]);

  const handleNavigateToDashboard = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  useEffect(() => {
    handleGetAppointments();
  }, [handleGetAppointments]);

  const imageProfile = user.avatar_url ? user.avatar_url : profileImg;

  return (
    <>
      <Header>
        <HeaderContent>
          <h1>
            <MenuButton />
          </h1>

          <button type="button" onClick={handleNavigateToDashboard}>
            <img src={logo} alt="WePlan" />
          </button>

          <Profile>
            <Link to="/profile">
              <img src={imageProfile} alt="oi" />
            </Link>
          </Profile>
          {children}
          <Menu>
            <button type="button" onClick={handleAppointmentsWindow}>
              <MdSchedule size={30} />
            </button>
            <button type="button" onClick={handleHelpWindow}>
              <MdHelp size={30} />
            </button>
            <button type="button" onClick={handleSettingsWindow}>
              <FiSettings size={30} />
            </button>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Menu>
        </HeaderContent>
      </Header>
      {!!appointmentTypeDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAppointmentTypeDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '35%',
            left: '40%',
            height: '30%',
            width: '20%',
          }}
        >
          <AppointmentTypeDrawer>
            <h1>Qual o tipo de compromisso?</h1>
            <div>
              <button
                type="button"
                onClick={() => handleAppointmentTypeQuestion('Comercial')}
              >
                Comercial
              </button>
              <button
                type="button"
                onClick={() => handleAppointmentTypeQuestion('Técnico')}
              >
                Técnico
              </button>
            </div>
          </AppointmentTypeDrawer>
        </WindowContainer>
      )}
      {!!addAppointmentDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddAppointmentDrawer(false)}
          containerStyle={{
            zIndex: 100,
            top: '2%',
            left: '5%',
            height: '96%',
            width: '90%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddAppointment}>
            <AddAppointmentDrawer>
              <h1>Adicionar Compromisso</h1>
              <div>
                <div>
                  <div>
                    {appointmentType === '' ? (
                      <button
                        type="button"
                        onClick={handleAppointmentTypeDrawer}
                      >
                        Tipo de compromisso
                      </button>
                    ) : (
                      <h1>
                        <button
                          type="button"
                          onClick={handleAppointmentTypeDrawer}
                        >
                          {appointmentType}
                        </button>
                      </h1>
                    )}
                  </div>
                  <Input
                    name="subject"
                    type="text"
                    placeholder="Assunto"
                    containerStyle={{ height: '50px' }}
                  />

                  <Input
                    type="text"
                    placeholder="Hora"
                    name="start_hour"
                    containerStyle={{ height: '50px' }}
                  />
                  <Input
                    type="text"
                    placeholder="Minuto"
                    name="start_minute"
                    containerStyle={{ height: '50px' }}
                  />
                  <Input
                    name="duration_minutes"
                    type="number"
                    placeholder="Duração em minutos"
                    containerStyle={{ height: '50px' }}
                  />
                </div>
                <span>
                  <Calendar>
                    <DayPicker
                      weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                      fromMonth={new Date()}
                      onMonthChange={handleMonthChange}
                      selectedDays={selectedDate}
                      onDayClick={handleDateChange}
                      months={[
                        'Janeiro',
                        'Fevereiro',
                        'Março',
                        'Abril',
                        'Maio',
                        'Junho',
                        'Julho',
                        'Agosto',
                        'Setembro',
                        'Outubro',
                        'Novembro',
                        'Dezembro',
                      ]}
                    />
                  </Calendar>
                </span>
              </div>
              <Input
                name="address"
                type="text"
                placeholder="Endereço"
                containerStyle={{ height: '50px' }}
              />
              <button type="submit">
                <h3>Salvar</h3>
              </button>
            </AddAppointmentDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!editAppointmentDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setEditAppointmentDrawer(false)}
          containerStyle={{
            zIndex: 100,
            top: '2%',
            left: '5%',
            height: '96%',
            width: '90%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditAppointment}>
            <AddAppointmentDrawer>
              <h1>Editar Compromisso</h1>
              <div>
                <div>
                  <div>
                    <h1>
                      <button
                        type="button"
                        onClick={handleAppointmentTypeDrawer}
                      >
                        {appointment.appointment_type}
                      </button>
                    </h1>
                  </div>

                  <Input
                    name="subject"
                    type="text"
                    defaultValue={appointment.subject}
                    placeholder="Assunto"
                    containerStyle={{ height: '50px' }}
                  />

                  <Input
                    type="text"
                    defaultValue={appointment.start_hour}
                    placeholder="Hora"
                    name="start_hour"
                    containerStyle={{ height: '50px' }}
                  />
                  <Input
                    type="text"
                    defaultValue={appointment.start_minute}
                    placeholder="Minuto"
                    name="start_minute"
                    containerStyle={{ height: '50px' }}
                  />
                  <Input
                    name="duration_minutes"
                    type="number"
                    defaultValue={appointment.duration_minutes}
                    placeholder="Duração em minutos"
                    containerStyle={{ height: '50px' }}
                  />
                </div>
                <span>
                  <Calendar>
                    <DayPicker
                      weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                      fromMonth={new Date()}
                      onMonthChange={handleMonthChange}
                      selectedDays={selectedDate}
                      onDayClick={handleDateChange}
                      months={[
                        'Janeiro',
                        'Fevereiro',
                        'Março',
                        'Abril',
                        'Maio',
                        'Junho',
                        'Julho',
                        'Agosto',
                        'Setembro',
                        'Outubro',
                        'Novembro',
                        'Dezembro',
                      ]}
                    />
                  </Calendar>
                </span>
              </div>
              <Input
                name="address"
                type="text"
                placeholder="Endereço"
                defaultValue={appointment.address}
                containerStyle={{ height: '50px' }}
              />
              <span>
                <button type="submit">
                  <h3>Salvar</h3>
                </button>
                <div>
                  <button type="button" onClick={handleDeleteAppointment}>
                    <h3>Delete</h3>
                  </button>
                </div>
              </span>
            </AddAppointmentDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!appointmentsWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setAppointmentsWindow(false)}
          containerStyle={{
            zIndex: 15,
            top: '2%',
            left: '5%',
            height: '96%',
            width: '90%',
          }}
        >
          <MyAppointments>
            <h1>Meus Compromissos</h1>
            <button type="button" onClick={handleAddAppointmentDrawer}>
              <MdAdd size={30} />
            </button>
            <div>
              {appointments.map(thisAppointment => (
                <Appointment
                  type="button"
                  key={thisAppointment.id}
                  onClick={() => handleEditAppointmentDrawer(thisAppointment)}
                >
                  <div>
                    <h1>{thisAppointment.subject}</h1>
                    <h2>{thisAppointment.date}</h2>
                  </div>
                  <div>
                    <p>Endereço: {thisAppointment.address}</p>
                    <span>
                      Faltam {thisAppointment.days_till_date} dias
                    </span>{' '}
                  </div>
                </Appointment>
              ))}
            </div>
          </MyAppointments>
        </WindowContainer>
      )}
      {!!helpWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setHelpWindow(false)}
          containerStyle={{
            top: '2%',
            left: '5%',
            height: '96%',
            width: '90%',
            zIndex: 15,
          }}
        >
          <h1>Opções de ajuda</h1>
        </WindowContainer>
      )}
      {!!settingsWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setSettingsWindow(false)}
          containerStyle={{
            top: '100px',
            right: '8px',
            height: '200px',
            width: '250px',
            zIndex: 15,
          }}
        >
          <ToggleButton>
            <h3>Tema {themeBoolean ? 'Escuro' : 'Claro'}</h3>
            <Swicth
              onChange={toggleTheme}
              checked={themeBoolean}
              checkedIcon={false}
              uncheckedIcon={false}
              height={10}
              width={40}
              handleDiameter={20}
              offColor={colors.secondary}
              onColor={colors.primary}
            />
          </ToggleButton>
        </WindowContainer>
      )}
    </>
  );
};

export default PageHeader;
