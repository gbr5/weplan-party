import IPersonInfoDTO from './IPersonInfoDTO';
import IUserContactDTO from './IUserContactDTO';

interface ICompanyInfoDTO {
  id: string;
  company_id: string;
  name: string;
  logo_url: string;
}
export default interface IUserDTO {
  id: string;
  name: string;
  email: string;
  trimmed_name: string;
  avatar_url: string;
  isActive: boolean;
  isDeleted: boolean;
  personInfo?: IPersonInfoDTO;
  companyInfo?: ICompanyInfoDTO;
  userContacts: IUserContactDTO[];
}
