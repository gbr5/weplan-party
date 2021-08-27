export default interface INoteDTO {
  id: string;
  note: string;
  author_id: string;
  isNew: boolean;
  created_at: Date;
  updated_at: Date;
}
