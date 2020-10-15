export default interface IListEventDTO {
  id: string;
  userEvent_id?: string;
  name: string;
  trimmed_name: string;
  number_of_guests: number;
  isOwner: boolean;
  owner_master: string;
  isGuest: boolean;
  event_type: string;
  date: Date | string;
  daysTillDate?: number;
}
