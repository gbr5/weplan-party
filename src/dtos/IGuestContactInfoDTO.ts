import IContactTypeDTO from './IContactTypeDTO';

export default interface IGuestContactInfoDTO {
  id: string;
  contact_info: string;
  contactType: IContactTypeDTO;
  guest_id: string;
}
