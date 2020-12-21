import { base64 } from "../utils/general.type";
import { symptomId } from "./symptom-type";
import { vitalTypeId } from "./vital-types";

export type reportId = string;
type patientId = string;

export interface PatientReport {
    id: reportId;  // PK
    patientId: patientId; // GSI - PK
    type: 'VitalReport_date' | 'SymptomReport_date'; // GSI - SK

    // If Type === VITAL_REPORT_DATE
    vital_type: vitalTypeId
    vital_date: Date
    vital_type_field_values: [
        {
            name: string,
            value: number
        }
    ]
    // (END) If Type === VITAL_REPORT_DATE

    // If Type === SYMPTOM_REPORT_DATE
    symptom_name: symptomId
    symptom_date: Date
    symptom_note: string
    symptom_image: base64
    symptom_scale: number
    // (END) If Type === SYMPTOM_REPORT_DATE
    
}