import IUserDTO from './IUserDTO';

export default interface IEventMemberDTO {
  id: string;
  number_of_guests: number;
  userEventMember: IUserDTO;
}
