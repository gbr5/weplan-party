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
  isPublished: boolean;
  isDateDefined: boolean;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}
