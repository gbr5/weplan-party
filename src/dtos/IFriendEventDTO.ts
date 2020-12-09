export default interface IFriendEventDTO {
  id: string;
  guest_id: string;
  event_name: string;
  host: string;
  date: Date;
  confirmed: boolean;
}
