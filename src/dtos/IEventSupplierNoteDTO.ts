import INoteDTO from "./INoteDTO";

export default interface IEventSupplierNoteDTO {
    id: string;
    supplier_id: string;
    note_id: string;
    created_at: string;
    updated_at: string;
    note: INoteDTO;
}
