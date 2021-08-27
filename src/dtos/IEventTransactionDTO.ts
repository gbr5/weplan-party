import ITransactionDTO from './ITransactionDTO';

export default interface IEventTransactionDTO {
  event_id: string;
  transaction: ITransactionDTO;
  agreement_type: string;
  agreement_id: string;
}
