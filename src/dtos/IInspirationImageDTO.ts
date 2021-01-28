import IUserImageDTO from './IUserImageDTO';

export default interface IInspirationImageDTO {
  id: string;
  image_id: string;
  user_id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  image: IUserImageDTO;
}
