import IUserDTO from './IUserDTO';

export default interface IUserFollowerDTO {
  follower: IUserDTO;
  type: string;
}
