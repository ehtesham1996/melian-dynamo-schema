import { careLineProviderId } from "./careline";
import { countryId } from "./country";
import { base64, gender, url } from "../utils/general.type";
import { specialityId } from "./speciality";
import { symptomName } from "./symptom-type";
import { vitalTypeName } from "./vital-types";
import { addictionId } from "./addictions";
import { allergyId } from "./allergies";
import { pathologyId } from "./pathology";

export type userId = string;
export enum Type {
    DETAIL = 'detail',
    PROFESSIONAL = 'professional',
    PATIENT = 'patient',
    NETWORK = 'network',
    VITAL_REPORT_DATE = 'patient#vitalReport_date',
    SYMPTOM_REPORT_DATE = 'patient#symptomReport_date'
}

export enum NetworkStatus {
    CONNECTED = 'connected',
    PENDING = 'pending'
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

    // If Type === network#userId
    /**
     * 
     * 
     * @usecase1 - If you have to get your own connection your query would be
     *      Suppose user1 = your id
     *      Get where (@id == user1 and @Type BEGINS_WITH network# and @network_status == CONNECTED)
     *                                  +
     *      Get where (@Type == network#user1 and network_status == CONNECTED)
     * 
     * @usecase2 - if you want to get those user who have sent you invitation
     *      Suppose user1 = your id
     *      Get where (@Type == network#user1 and @network_status == PENDING)
     * 
     * @usecase3 - if you want to get those user whom you have sent invitations
     *      Suppose user1 = your id
     *      Get where (@id == user1 and @Type BEGINS_WITH network# and @network_status == PENDING)
     */
    network_status: NetworkStatus;
    // (END) If Type === network#userId


    // If Type === VITAL_REPORT_DATE
    vitalType: vitalTypeName
    vital_date: Date
    vital_type_field_values: [
        {
            name: string,
            value: number
        }
    ]
    // (END) If Type === VITAL_REPORT_DATE

    // If Type === SYMPTOM_REPORT_DATE
    symptom_name: symptomName
    date: Date
    note: string
    symptom_image: base64
    scale: number
    // (END) If Type === SYMPTOM_REPORT_DATE

}
