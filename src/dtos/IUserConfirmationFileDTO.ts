import IUserFileDTO from './IUserFileDTO';

export default interface IUserConfirmationFileDTO {
  id: string;
  file_id: string;
  user_confirmation_id: string;
  created_at: Date;
  updated_at: Date;
  file: IUserFileDTO;
}
