import ITransactionAgreementDTO from './ITransactionAgreementDTO';

export default interface IEventSupplierHiredDTO {
  id: string;
  name: string;
  transactionAgreement: ITransactionAgreementDTO[];
}
