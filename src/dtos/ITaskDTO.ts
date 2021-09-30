import ITaskFollowerDTO from './ITaskFollowerDTO';
import ITaskNoteDTO from './ITaskNoteDTO';

export default interface ITaskDTO {
  id: string;
  user_id: string;
  title: string;
  priority: 'low' | 'neutral' | 'high';
  status: 'not started' | 'running' | 'finnished';
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  notes: ITaskNoteDTO[];
  followers: ITaskFollowerDTO[];
}
