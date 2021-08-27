export default interface IEventSupplierBudgetDTO {
  id: string;
  supplier_id: string;
  amount: number;
  description: string;
  isActive: boolean;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
}
