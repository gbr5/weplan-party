import IUserDTO from './IUserDTO';

interface IFriendGroupDTO {
  id: string;
  name: string;
}

export default interface IFriendDTO {
  id: string;
  user_id: string;
  friend_id: string;
  friend: IUserDTO;
  friendGroup: IFriendGroupDTO;
}
