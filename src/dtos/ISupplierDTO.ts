import IUserDTO from './IUserDTO';

export default interface ISupplierDTO {
  id: string;
  user_id: string;
  sub_category_name: string;
  userBySupplierCategory: IUserDTO;
}
