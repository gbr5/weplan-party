import IEventTaskNoteDTO from './IEventTaskNoteDTO';

export default interface IEventTaskDTO {
  id: string;
  event_id: string;
  title: string;
  priority: 'low' | 'neutral' | 'high';
  status: 'not started' | 'running' | 'finnished';
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  notes: IEventTaskNoteDTO[];
}
