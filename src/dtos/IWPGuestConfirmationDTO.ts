import IUserConfirmationDTO from './IUserConfirmationDTO';
import IUserDTO from './IUserDTO';

export default interface IWPGuestConfirmationDTO {
  userConfirmation: IUserConfirmationDTO;
  sender: IUserDTO;
  receiver: IUserDTO;
}
