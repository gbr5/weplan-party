import IUserDTO from './IUserDTO';

export default interface IEventOwnerDTO {
  id: string;
  description: string;
  number_of_guests: number;
  userEventOwner: IUserDTO;
}
