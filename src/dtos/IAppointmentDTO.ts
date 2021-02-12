import IAppointmentFileDTO from './IAppointmentFileDTO';
import IAppointmentReminderDTO from './IAppointmentReminderDTO';
import IWeplanAppointmentGuestDTO from './IWeplanAppointmentGuestDTO';

interface IEventDateDTO {
  id: string;
  date: Date;
}

export default interface IAppointmentDTO {
  id: string;
  subject: string;
  date: Date;
  duration_minutes: number;
  address: string;
  appointment_type: string;
  weplanGuest: boolean;
  guest: boolean;
  host_id: string;
  weplanGuestAppointments: IWeplanAppointmentGuestDTO[];
  appointmentFiles: IAppointmentFileDTO[];
  appointmentReminders: IAppointmentReminderDTO[];
}
