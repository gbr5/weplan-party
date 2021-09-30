import IUserDTO from './IUserDTO';

export default interface ITaskFollowerDTO {
  id: string;
  user_id: string;
  task_id: string;
  type: string;
  follower: IUserDTO;
  created_at: Date;
  updated_at: Date;
}
