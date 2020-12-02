interface IUserSupplierDTO {
  id: string;
  name: string;
  avatar: string;
}

export default interface ISupplierDTO {
  id: string;
  user_id: string;
  sub_category_name: string;
  supplier: IUserSupplierDTO;
}
