import IEventDTO from './IEventDTO';
import IUserDTO from './IUserDTO';

export default interface IWeplanGuestDTO {
  id: string;
  guest_id: string;
  user_id: string;
  event_id: string;
  number_of_guests: number;
  event: IEventDTO;
  weplanUserGuest: IUserDTO;
}
