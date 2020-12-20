export default interface IEventInfoDTO {
  id: string;
  event_id: string;
  number_of_guests: number;
  duration: number;
  budget: number;
  description: string;
  country: string;
  local_state: string;
  city: string;
  address: string;
  dress_code?: string;
}
