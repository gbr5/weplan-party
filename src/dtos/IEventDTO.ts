import IEventInfoDTO from './IEventInfoDTO';

export default interface IEventDTO {
  id: string;
  name: string;
  trimmed_name: string;
  user_id: string;
  number_of_guests: number;
  event_type: string;
  date: Date | string;
  daysTillDate?: number;
  isGuest?: boolean;
  isOwner?: boolean;
  eventInfo: IEventInfoDTO;
}
