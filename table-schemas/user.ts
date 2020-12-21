import { careLineProviderId } from "./careline";
import { countryId } from "./country";
import { gender, url } from "../utils/general.type";
import { specialityId } from "./speciality";
import { addictionId } from "./addictions";
import { allergyId } from "./allergies";
import { pathologyId } from "./pathology";
import { Medicine, DosageForm } from "./medicine";


/**
 * @NOTE DATE variable refers to Javascript new Date().toISOString()
 */


export type carelineId = string;
export type userId = string;
export enum Type {
    DETAIL = 'detail',
    PROFESSIONAL = 'professional',
    PATIENT = 'patient',
    PRESCRIPTION_ENDDATE = 'patient#prescription_endDate', // endDate is variable
    APPOINTMENT_DUEDATE = 'patient#appointment_dueDate',  // dueDate is variable
    CARELINE_UUID = 'patient#careline_uuid' // uuid is variable
}
export interface User {


    id: userId;  // PK
    type: Type // SK  /** @GSI for networks */

    // If Type === DETAIL
    name: string;
    telephone: number;
    country: countryId;  /** @GSI to obtain one country users */
    email: string;
    gender: gender;
    birthdate: Date;
    terms_accepted: boolean,
    confidentiality_accepeted: boolean
    photo: url;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    // (END) If Type === DETAIL

    // If Type === PATIENT
    blood_type: string;
    careline_provider: careLineProviderId;
    addictions: [addictionId];
    allergies: [allergyId];
    pathologies: [pathologyId];
    // (END) If Type === PATIENT

    // If Type === PROFESSIONAL
    credential_type: string
    credential: string
    working_places: [
        {
            name: string;
            zip_code: string;
            address: string;
            country: countryId;
            city: string;
        }
    ],
    specialities: [specialityId]
    // (END) If Type === PROFESSIONAL

    // If Type === PRESCRIPTION_ENDDATE
    prescription_start_date: Date;
    prescription_end_date: Date;
    prescription_strength: string;
    prescription_quantity: string;
    prescription_notes: string;
    prescription_careline_id?: carelineId  /** If any . Create GSI if needed */
    prescription_medicine: Medicine & {
        dosage_suggested: DosageForm
    };
    prescription_created_by: Date;
    prescription_updated_by: Date;
    prescription_intraday_frequeny: [Date];
    prescription_frequency: string;
    prescription_purpose: [string];
    // (END) If Type === PRESCRIPTION_ENDDATE

    // If Type === APPOINTMENT_DUEDATE
    appointment_start_date: Date;
    appointment_end_date : Date;
    appointment_careline_id?: carelineId /** If any */
    appointment_due_date : Date;
    appointment_name : string;
    appointment_notes : string;
    // (END) If Type === APPOINTMENT_DUEDATE


     // If Type === CARELINE_UUID
     careline_id : carelineId;
     careline_pathology_id: pathologyId;
     updated_date : Date;
     created_date : Date;
     // (END) If Type === CARELINE_UUID

}
