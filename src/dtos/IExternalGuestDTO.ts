import IEventGuestDTO from './IEventGuestDTO';

export default interface IExternalGuestDTO {
  name: string;
  trimmed_name: string;
  date: Date;
  avatar_url: string;
  duration: number;
  event_type: string;
  description: string;
  country: string;
  local_state: string;
  city: string;
  address: string;
  dress_code: string;
  guest: IEventGuestDTO;
}
