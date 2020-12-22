import IUserConfirmationFileDTO from './IUserConfirmationFileDTO';

export default interface IUserConfirmationDTO {
  id: string;
  sender_id: string;
  receiver_id: string;
  title: string;
  message: string;
  isConfirmed: boolean;
  created_at: Date;
  updated_at: Date;
  userConfirmationFiles: IUserConfirmationFileDTO[];
}
