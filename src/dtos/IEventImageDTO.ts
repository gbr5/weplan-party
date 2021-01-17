import IUserImageDTO from './IUserImageDTO';

export default interface IEventImageDTO {
  id: string;
  image_id: string;
  event_id: string;
  created_at: Date;
  updated_at: Date;
  image: IUserImageDTO;
}
