export default interface ICreateEventSupplierBudgetDTO {
  supplier_id: string;
  amount: number;
  description: string;
  isActive: boolean;
  due_date: Date;
}
