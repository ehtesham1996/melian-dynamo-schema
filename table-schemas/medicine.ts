import { url } from "../utils/general.type";
export type medicineId = string;

export interface DosageForm {
    dosage_name: string,
    strength_scale: string,
    dosage_scale: string,
    icon: url,
    locale: object
}

export interface Medicine {
    medicine_id: medicineId, /** @PK - @GSI with projected attribute of medicine name, to_get all medicine names*/
    medicine_name: string,
    locale: object,
    dosage: DosageForm[]
}
