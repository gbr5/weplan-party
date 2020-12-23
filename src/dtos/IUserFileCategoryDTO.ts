import IUserFileDTO from './IUserFileDTO';

interface ICategoryFileDTO {
  id: string;
  file_id: string;
  category_id: string;
  file: IUserFileDTO;
}

export default interface IUserFileCategoryDTO {
  id: string;
  user_id: string;
  name: string;
  description: string;
  color: string;
  created_at: Date;
  updated_at: Date;
  categoryFiles: ICategoryFileDTO[];
}
