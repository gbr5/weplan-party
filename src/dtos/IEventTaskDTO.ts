import ITaskDTO from './ITaskDTO';

export default interface IEventTaskDTO {
  id: string;
  event_id: string;
  task_id: string;
  task: ITaskDTO;
}
