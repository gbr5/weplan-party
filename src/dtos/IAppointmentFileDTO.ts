import IUserFileDTO from './IUserFileDTO';

export default interface IAppointmentFileDTO {
  id: string;
  file_id: string;
  appointment_id: string;
  file: IUserFileDTO;
}
