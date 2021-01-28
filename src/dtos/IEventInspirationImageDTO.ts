import IInspirationImageDTO from './IInspirationImageDTO';

export default interface IEventInspirationImageDTO {
  id: string;
  inspiration_image_id: string;
  event_id: string;
  created_at: Date;
  updated_at: Date;
  inspirationImage: IInspirationImageDTO;
}
