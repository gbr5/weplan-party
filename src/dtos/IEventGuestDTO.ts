import IGuestContactInfoDTO from './IGuestContactInfoDTO';
import IUserDTO from './IUserDTO';
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
  host: IUserDTO;
  weplanGuest: IWeplanGuestDTO;
  guestContactInfos: IGuestContactInfoDTO[];
  event_avatar_url?: string;
}
