import IEventDTO from './IEventDTO';
import IUserDTO from './IUserDTO';

export default interface IEventOwnerDTO {
  id: string;
  event_id: string;
  description: string;
  number_of_guests: number;
  event: IEventDTO;
  userEventOwner: IUserDTO;
  event_avatar_url?: string;
}
