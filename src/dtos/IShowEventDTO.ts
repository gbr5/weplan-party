import IEventCheckListDTO from './IEventCheckListDTO';
import IEventDTO from './IEventDTO';
import IEventGuestDTO from './IEventGuestDTO';
import IEventNoteDTO from './IEventNoteDTO';
import ISelectedSupplierDTO from './IEventSupplierDTO';

export default interface IShowEventDTO {
  event: IEventDTO;
  checkLists: IEventCheckListDTO[];
  guests: IEventGuestDTO[];
  suppliers: ISelectedSupplierDTO[];
  eventNotes: IEventNoteDTO[];
  event_avatar_url: string;
}
