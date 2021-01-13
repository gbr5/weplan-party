import IEventDTO from './IEventDTO';
import IUserDTO from './IUserDTO';

export default interface IEventMemberDTO {
  id: string;
  event_id: string;
  number_of_guests: number;
  event: IEventDTO;
  userEventMember: IUserDTO;
  event_avatar_url?: string;
}
