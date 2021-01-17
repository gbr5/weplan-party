import IUserFileDTO from './IUserFileDTO';

export default interface IEventFileDTO {
  id: string;
  file_id: string;
  event_id: string;
  created_at: Date;
  updated_at: Date;
  file: IUserFileDTO;
}
