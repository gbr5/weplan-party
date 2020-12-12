import IUserDTO from './IUserDTO';

export default interface IEventNoteDTO {
  id: string;
  event_id: string;
  access: string;
  note: string;
  color: string;
  userEventNote: IUserDTO;
}
