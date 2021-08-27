export default interface ICreateEventTaskDTO {
  event_id: string;
  title: string;
  priority: 'low' | 'neutral' | 'high';
  status: 'not started' | 'running' | 'finnished';
  due_date: Date;
}
