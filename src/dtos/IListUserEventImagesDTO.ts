import IEventDTO from './IEventDTO';
import IUserImageDTO from './IUserImageDTO';

export default interface IListUserEventImagesDTO {
  id: string;
  image_id: string;
  event_id: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  image: IUserImageDTO;
  event: IEventDTO;
}
