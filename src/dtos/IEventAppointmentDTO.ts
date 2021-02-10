import IAppointmentDTO from './IAppointmentDTO';

export default interface IEventAppointmentDTO {
  id: string;
  event_id: string;
  appointment_id: string;
  appointment: IAppointmentDTO;
}
