import IUserDTO from './IUserDTO';

export default interface IWeplanAppointmentGuestDTO {
  id: string;
  appointment_id: string;
  guest_id: string;
  host_id: string;
  guest: IUserDTO;
}
