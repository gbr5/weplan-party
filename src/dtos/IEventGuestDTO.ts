import IGuestContactDTO from './IGuestContactDTO';
import IWeplanGuestDTO from './IWeplanGuestDTO';

export default interface IEventGuestDTO {
  id: string;
  first_name: string;
  last_name: string;
  description: string;
  event_id: string;
  host_id: string;
  confirmed: boolean;
  weplanUser: boolean;
  weplanGuest: IWeplanGuestDTO;
  contacts: IGuestContactDTO[];
  event_avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}
