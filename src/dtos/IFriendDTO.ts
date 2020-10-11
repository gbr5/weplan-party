interface IUserFriendDTO {
  id: string;
  name: string;
  avatar: string;
}
interface IFriendGroupDTO {
  id: string;
  name: string;
}

export default interface IFriendDTO {
  id: string;
  user_id: string;
  avatar?: string;
  friend: IUserFriendDTO;
  friendGroup: IFriendGroupDTO;
}
