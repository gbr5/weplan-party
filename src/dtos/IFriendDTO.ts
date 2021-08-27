import IUserDTO from './IUserDTO';

export default interface IFriendDTO {
  id: string;
  user_id: string;
  friend_id: string;
  friend: IUserDTO;
  isConfirmed: boolean;
}
