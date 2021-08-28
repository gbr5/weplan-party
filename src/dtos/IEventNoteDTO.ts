import INoteDTO from './INoteDTO';

export default interface IEventNoteDTO {
  id: string;
  event_id: string;
  note_id: string;
  note: INoteDTO;
  created_at: Date;
  updated_at: Date;
}
