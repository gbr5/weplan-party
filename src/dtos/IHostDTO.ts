import IEventGuestDTO from './IEventGuestDTO';

export default interface IHostDTO {
  id: string;
  first_name: string;
  last_name: string;
  isOwner: boolean;
  number_of_guests: number;
  user_id: string;
  event_id: string;
  invited_guests: IEventGuestDTO[];
}
