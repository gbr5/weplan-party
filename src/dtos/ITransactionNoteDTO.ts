import INoteDTO from './INoteDTO';

export default interface ITransactionNoteDTO {
  id: string;
  transaction_id: string;
  note_id: string;
  note: INoteDTO;
  created_at: Date;
  updated_at: Date;
}
