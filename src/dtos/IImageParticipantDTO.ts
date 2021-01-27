import IUserImageDTO from './IUserImageDTO';
import IUserDTO from './IUserDTO';

export default interface IImageParticipantDTO {
  id: string;
  user_id: string;
  image_id: string;
  user: IUserDTO;
  userImage: IUserImageDTO;
}
