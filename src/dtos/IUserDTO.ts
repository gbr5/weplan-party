import IPersonInfoDTO from './IPersonInfoDTO';

interface ICompanyInfoDTO {
  id: string;
  company_id: string;
  name: string;
  logo_url: string;
}
export default interface IUserDTO {
  id: string;
  name: string;
  trimmed_name: string;
  avatar_url: string;
  personInfo: IPersonInfoDTO;
  companyInfo: ICompanyInfoDTO;
}
